import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import ModalHistory from "../components/orderPages/ModalHistory";
import ModalOrderItem from "../components/orderPages/ModalOrderItem";
import ModalAcceptedOffer from "../components/orderPages/ModalAcceptedOffer";
import ModalSubmittedOffer from "../components/orderPages/ModalSubmittedOffer";
import ModalOffer from "../components/orderPages/ModalOffer";
import ModalPayoutDetails from "../components/orderPages/ModalPayoutDetails";
import ModalProductDetails from "../components/orderPages/ModalProductDetails";
import ModalOrderDetails from "../components/orderPages/ModalOrderDetails";

const Orderpages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("status");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);
  const [isOfferSubmitted, setIsOfferSubmitted] = useState(false);
  const [history, setHistory] = useState([]);

  const role = useSelector((state) => state.auth.role);
  const idUser = useSelector((state) => state.auth.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock?page=${page}&sort=${sort}`
        );
        // Filter and remove duplicate IDs
        let uniqueData = [];
        const seenIds = new Set();

        response.data.content.forEach((item) => {
          if (!seenIds.has(item.orderId)) {
            uniqueData.push(item);
            seenIds.add(item.orderId);
          }
        });

        console.log("unique data", uniqueData);

        // Filter data based on role and status
        if (role === "PP") {
          uniqueData = uniqueData.filter(
            (item) =>
              item.status === "ORDER" ||
              item.status === "NEGOTIATION" ||
              item.status === "VALIDATING" ||
              item.status === "CANCEL"
          );
        }
        if (role === "PPKOM") {
          uniqueData = uniqueData.filter(
            (item) =>
              item.status === "ORDER" ||
              item.status === "NEGOTIATION" ||
              item.status === "CANCEL" ||
              item.status === "VALIDATING"
          );
        }
        if (role === "PANPEN") {
          uniqueData = uniqueData.filter(
            (item) => item.status === "VALIDATING"
          );
        }

        setData(uniqueData);
        console.log("order filter: ", uniqueData);
        console.log("order: ", response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, role, sort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const openModal = async (orderId) => {
    try {
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${orderId}`
      );
      console.log("orderssss", response.data);

      setSelectedOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* History function */
  const handleHistory = (orderItemId) => {
    setShowHistoryModal(true);
    axios
      .get(
        `http://rsudsamrat.site:8090/api/bid-exchange/bid-items/${selectedOrder.id}/${orderItemId}`
      )
      .then((res) => {
        console.log(res);
        setHistory(res.data);
        console.log("Berhasil");
      })
      .catch((err) => console.log(err));
  };

  const handleDetailProduct = async (productUuid) => {
    try {
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/${productUuid}`
      );
      setSelectedProduct(response.data);
      setShowProductDetailModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayoutDetail = async () => {
    try {
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}`
      );
      setPayoutDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOffer = (orderItemId) => {
    const selectedOrderItem = selectedOrder.orderItems.find(
      (orderItem) => orderItem.id === orderItemId
    );
    setSelectedOrderItem(selectedOrderItem);
    setShowOfferModal(true);
  };

  const handleOfferSubmit = () => {
    const status = "OFFER";
    // Make the API call to update the order item
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/items/${selectedOrderItem.id}`,
        {
          orderItemId: selectedOrderItem.id,
          bidPrice: parseFloat(bidPrice),
          status: status,
        }
      )
      .then((response) => {
        // Handle the response
        console.log("Offer updated:", response.data);
        // Close the offer modal
        setShowOfferModal(false);
        // Update the state to show the success modal
        setIsOfferSubmitted(true);
        //send notif
        axios.post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
          sender: role,
          senderId: idUser,
          receiver: selectedOrderItem.product.vendor.name,
          receiverId: selectedOrderItem.product.vendor.id,
          message: `OFFER PRODUCT FROM ${role}`,
        });
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error updating offer:", error);
      });
  };

  const handleOfferAccepted = () => {
    const status = "ACCEPTED";
    // Make the API call to update the order item
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/items/${selectedOrderItem.id}`,
        { orderItemId: selectedOrderItem.id, status: status }
      )
      .then((response) => {
        // Handle the response
        console.log("Offer accepted:", response.data);
        // Close the offer modal
        setShowOfferModal(false);
        // Update the state to show the success modal
        setIsOfferAccepted(true);

        axios.post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
          sender: role,
          senderId: idUser,
          receiver: selectedOrderItem.product.vendor.name,
          receiverId: selectedOrderItem.product.vendor.id,
          message: `Product ${selectedOrderItem.id} Accepted`,
        });
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error accepting offer:", error);
      });
  };

  // Function to handle closing the submit modal
  const handleCloseSubmitModal = () => {
    console.log("closed modal");
    setSubmitModalOpen(false);
  };

  const handleSubmitOrderItem = async () => {
    try {
      // PUT request to update payment using Axios
      const response = await axios.put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/${selectedOrderItem.id}/payment`
      );

      // Extract the order items from the response
      const { orderItems } = response.data;

      // Create the message to display in the alert
      const orderItemsMessage = orderItems
        .map((orderItem) => `Order Item: ${orderItem.quantity}`)
        .join(", ");

      // Display a success alert with the order items data
      alert(
        `Payment submitted to the vendor successfully!\nOrder Items: ${orderItemsMessage}`
      );
    } catch (error) {
      // Display an error alert
      alert("Failed to submit payment to the vendor. Please try again.");
    }
  };

  // Function to open the submit modal
  const handleOpenSubmitModal = (orderItem) => {
    setSelectedOrderItem(orderItem);
    setSubmitModalOpen(true);
  };

  const getRowId = (orderItem) => orderItem.orderId;

  const orderRows = data.filter((item) => item.status === "ORDER");
  const validatingRows = data.filter((item) => item.status === "VALIDATING");
  const negotiationRows = data.filter((item) => item.status === "NEGOTIATION");

  const handleRowClick = (selectedOrder) => {
    openModal(selectedOrder.orderId);
  };

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Sort */}
          <div className="mb-3">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" className="form-control">
              <option value="orderDate">Order Status</option>
              <option value="orderId">Order ID</option>
            </select>
          </div>

          {/* Main Table */}
          {/* <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.orderItemId}>
                  <td>{item.orderId}</td>
                  <td>{item.orderDate}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => openModal(item.orderId)}
                    >
                      Nota
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <div className="d-flex flex-column gap-3">
            {/* ORDER Table */}
            <div>
              <h2>ORDER Table</h2>
              {orderRows.length > 0 ? (
                <DataGrid
                  rows={orderRows}
                  columns={[
                    { field: "orderId", headerName: "Order ID", flex: 1 },
                    { field: "orderDate", headerName: "Order Date", flex: 1 },
                    // Additional columns as needed
                  ]}
                  getRowId={getRowId}
                  onRowClick={(params) => handleRowClick(params.row)}
                  autoHeight
                  // Add other DataGrid props and customization options
                  className="data-grid"
                />
              ) : (
                <div>NO DATA</div>
              )}
            </div>

            {/* VALIDATING Table */}
            <div>
              <h2>VALIDATING Table</h2>
              {validatingRows.length > 0 ? (
                <DataGrid
                  rows={validatingRows}
                  columns={[
                    { field: "orderId", headerName: "Order ID", flex: 1 },
                    { field: "orderDate", headerName: "Order Date", flex: 1 },
                    // Additional columns as needed
                  ]}
                  getRowId={getRowId}
                  onRowClick={(params) => handleRowClick(params.row)}
                  // Add other DataGrid props and customization options
                  className="data-grid"
                />
              ) : (
                <div>NO DATA</div>
              )}
            </div>

            {/* NEGOTIATION Table */}
            <div>
              <h2>NEGOTIATION Table</h2>
              {negotiationRows.length > 0 ? (
                <DataGrid
                  rows={negotiationRows}
                  columns={[
                    { field: "orderId", headerName: "Order ID", flex: 1 },
                    { field: "orderDate", headerName: "Order Date", flex: 1 },
                    // Additional columns as needed
                  ]}
                  getRowId={getRowId}
                  onRowClick={(params) => handleRowClick(params.row)}
                  // Add other DataGrid props and customization options
                  className="data-grid"
                />
              ) : (
                <div>NO DATA</div>
              )}
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <ModalOrderDetails
              onClose={() => setSelectedOrder(null)}
              selectedOrder={selectedOrder}
              handleHistory={handleHistory}
              handleDetailProduct={handleDetailProduct}
              handleOffer={handleOffer}
              handleOpenSubmitModal={handleOpenSubmitModal}
              handlePayoutDetail={handlePayoutDetail}
            />
          )}

          {/* Product Details Modal */}
          {showProductDetailModal && selectedProduct && (
            <ModalProductDetails
              onClose={() => setShowProductDetailModal(false)}
              selectedProduct={selectedProduct}
            />
          )}

          {/* Payout Details Modal */}
          {payoutDetails && (
            <ModalPayoutDetails
              onClose={() => setPayoutDetails(null)}
              payoutDetails={payoutDetails}
            />
          )}

          {/* Offer Modal */}
          {showOfferModal && selectedOrderItem && (
            <ModalOffer
              onClose={() => setShowOfferModal(false)}
              onAccept={handleOfferAccepted}
              onSubmit={handleOfferSubmit}
              bidPrice={bidPrice}
              setBidPrice={setBidPrice}
              selectedOrderItem={selectedOrderItem}
            />
          )}

          {/* Submitted Offer Modal */}
          {isOfferSubmitted && (
            <ModalSubmittedOffer
              onClose={() => setIsOfferSubmitted(false)}
              product={selectedOrderItem.product.name}
            />
          )}

          {/* Accepted Offer Modal */}
          {isOfferAccepted && (
            <ModalAcceptedOffer
              product={selectedOrderItem.product.name}
              onClose={() => setIsOfferAccepted(false)}
            />
          )}

          {/* Order Item Modal */}
          {selectedOrderItem && submitModalOpen && (
            <ModalOrderItem
              onClose={() => handleCloseSubmitModal(null)}
              onSubmit={() => handleSubmitOrderItem()}
              selectedOrderItem={selectedOrderItem}
            />
          )}
          {/* History Modal */}
          {showHistoryModal && (
            <ModalHistory
              history={history}
              onClose={() => setShowHistoryModal(null)}
            />
          )}

          {/* Pagination */}
          <div className="pagination">
            <button
              className="btn btn-secondary"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Orderpages;
