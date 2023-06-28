import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ModalHistory from "../components/orderPagesNew/ModalHistory";
import ModalOrderItem from "../components/orderPagesNew/ModalOrderItem";
// import ModalAcceptedOffer from "../components/orderPagesNew/ModalAcceptedOffer";
// import ModalSubmittedOffer from "../components/orderPagesNew/ModalSubmittedOffer";
import ModalOffer from "../components/orderPagesNew/ModalOffer";
import ModalPayoutDetails from "../components/orderPagesNew/ModalPayoutDetails";
import ModalProductDetails from "../components/orderPagesNew/ModalProductDetails";
import ModalOrderDetails from "../components/orderPagesNew/ModalOrderDetails";
import ModalRefund from "../components/orderPagesNew/ModalRefund";

const Orderpages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [page, setPage] = useState(0);
  // const [sort, setSort] = useState("status");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [message, setMessage] = useState("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  // const [isOfferAccepted, setIsOfferAccepted] = useState(false);
  // const [isOfferSubmitted, setIsOfferSubmitted] = useState(false);
  const [history, setHistory] = useState([]);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refund, setRefund] = useState(null);

  const role = useSelector((state) => state.auth.role);
  const idUser = useSelector((state) => state.auth.id);

  // action toast
  const [showActionToast, setShowActionToast] = useState(false);
  const [actionToastHeader, setActionToastHeader] = useState("");
  const [actionToastBody, setActionToastBody] = useState("");

  const [filteredStatusData, setFilteredStatusData] = useState([]);

  // productId (taken when user click card in notifications page)
  const location = useLocation();
  let receivedProductId = location.state;

  useEffect(() => {
    fetchData();
  }, [role]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock`
      );
      // Filter and remove duplicate IDs
      console.log(response.data);
      let uniqueData = [];
      const seenIds = new Set();

      response.data.forEach((item) => {
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
            item.status === "SHIPPING" ||
            item.status === "CANCEL"
        );
      }
      if (role === "PPKOM") {
        uniqueData = uniqueData.filter(
          (item) =>
            item.status === "ORDER" ||
            item.status === "NEGOTIATION" ||
            item.status === "CANCEL" ||
            item.status === "SHIPPING" ||
            item.status === "VALIDATING"
        );
      }
      if (role === "PANPEN") {
        uniqueData = uniqueData.filter(
          (item) =>
            item.status === "VALIDATING" ||
            item.status === "CHECKING" ||
            item.status === "SHIPPING"
        );
      }

      setData(uniqueData);
      setFilteredStatusData(uniqueData);
      console.log("order filter: ", uniqueData);
      console.log("order: ", response.data);
      setLoading(false);

      // open modal if receivedProductId exist
      if(receivedProductId) {
        openModal(receivedProductId);
        receivedProductId = null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };

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

  const handleRefund = (orderItemId) => {
    const selectedOrderItem = selectedOrder.orderItems.find(
      (orderItem) => orderItem.id === orderItemId
    );
    setRefund(selectedOrderItem);
    setShowRefundModal(true);
  };

  const handleSetOrderItemStatus = (status, itemId) => {
    console.log("order item id", itemId, "status", status);
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orderitems/${itemId}/status`,
        {
          orderItemId: itemId,
          status: status,
        }
      )
      .then((response) => {
        // Handle the response
        console.log("ITEM STATUS UPDATED", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitRefund = () => {
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/status`,
        {
          status: "CHECKING",
        }
      )
      .then((response) => {
        handleSetOrderItemStatus("REFUND", refund.id);
        // Handle the response
        console.log("Refund updated:", response.data);
        // Close the refund modal
        setShowRefundModal(false);
        // Update the state
        setSelectedOrder(response.data);
        // Show the toast
        setActionToastHeader("Refund Berhasil");
        setActionToastBody(
          `Refund untuk produk ${refund.productName} berhasil.`
        );
        setShowActionToast(true);
      })
      .catch((error) => {
        console.error(error);
        // Show the toast
        setActionToastHeader("Refund Gagal");
        setActionToastBody(`Refund untuk produk ${refund.productName} gagal.`);
        setShowActionToast(true);
      });
  };

  const handleConfirm = (orderItemId) => {
    console.log("selectedOrder", selectedOrder.id);
    handleSetOrderItemStatus("CHECKED", orderItemId);
    setActionToastHeader("Konfirmasi Berhasil");
    setActionToastBody(`Order berhasil dikonfirmasi.`);
    setShowActionToast(true);
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
          message: message,
        }
      )
      .then((response) => {
        // Handle the response
        console.log("Offer updated:", response.data);
        // Close the offer modal
        setShowOfferModal(false);
        // Update the state to show the success modal
        // setIsOfferSubmitted(true);

        setShowActionToast(true);
        setActionToastHeader("Berhasil");
        setActionToastBody(
          `Your offer for the product ${selectedOrderItem.product.name} has been successfully submitted..`
        );
        handleModalOfferOnClose();

        //send notif
        axios
          .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
            sender: role,
            senderId: idUser,
            receiver: selectedOrderItem.product.vendor.name,
            receiverId: selectedOrderItem.product.vendor.id,
            message: `OFFER PRODUCT FROM ${role}, Product ${selectedOrderItem.product.name}, QUANTITY : ${selectedOrderItem.quantity} `,
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error updating offer:", error);
        setShowActionToast(true);
        setActionToastHeader("Gagal");
        setActionToastBody(
          `Your offer for the product ${selectedOrderItem.product.name} has failed.`
        );
        handleModalOfferOnClose();
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
        // setIsOfferAccepted(true);

        setShowActionToast(true);
        setActionToastHeader("Berhasil");
        setActionToastBody(
          `Your offer for the product ${selectedOrderItem.product.name} has been accepted.`
        );
        handleModalOfferOnClose();

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
        setShowActionToast(true);
        setActionToastHeader("Gagal");
        setActionToastBody(
          `Your offer for the product ${selectedOrderItem.product.name} has failed.`
        );
        handleModalOfferOnClose();
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

  function handleModalOrderDetailsOnClose() {
    setTimeout(() => {
      setShowActionToast(false);
      setActionToastHeader("");
      setActionToastBody("");
    }, 3000);
    setSelectedOrder(null);
  }

  function handleModalOfferOnClose() {
    setShowOfferModal(false);
    setBidPrice("");
    setMessage("");
    handleModalOrderDetailsOnClose();
  }

  // Function to format the date
  const formatDate = (dateString) => {
    const orderDate = new Date(dateString);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return orderDate.toLocaleDateString(undefined, options);
  };

  const handleFilterStatus = (status) => {
    console.log("status", status);
    console.log("filter status", filteredStatusData);
    if (status === "ALL") {
      setFilteredStatusData(data);
    } else {
      const filteredData = data.filter((order) => order.status === status);
      setFilteredStatusData(filteredData);
    }
  };

  return (
    <>
      {/* Order Details Modal */}
      {selectedOrder && (
        <ModalOrderDetails
          onClose={handleModalOrderDetailsOnClose}
          selectedOrder={selectedOrder}
          selectedOrderItem={selectedOrderItem}
          handleHistory={handleHistory}
          handleDetailProduct={handleDetailProduct}
          handleOffer={handleOffer}
          handleRefund={handleRefund}
          handleConfirm={handleConfirm}
          handleOpenSubmitModal={handleOpenSubmitModal}
          handlePayoutDetail={handlePayoutDetail}
          setShowActionToast={setShowActionToast}
          setActionToastHeader={setActionToastHeader}
          setActionToastBody={setActionToastBody}
          fetchData={fetchData}
        />
      )}

      {/* Product Info Modal */}
      {showProductDetailModal && selectedProduct && (
        <ModalProductDetails
          onClose={() => setShowProductDetailModal(false)}
          selectedProduct={selectedProduct}
        />
      )}

      {/* Negotiation Modal */}
      {showOfferModal && selectedOrderItem && (
        <ModalOffer
          onClose={handleModalOfferOnClose}
          onAccept={handleOfferAccepted}
          onSubmit={handleOfferSubmit}
          bidPrice={bidPrice}
          setBidPrice={setBidPrice}
          message={message}
          setMessage={setMessage}
          selectedOrderItem={selectedOrderItem}
        />
      )}

      {/* Payout Modal */}
      {payoutDetails && (
        <ModalPayoutDetails
          onClose={() => setPayoutDetails(null)}
          payoutDetails={payoutDetails}
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

      {/* Refund Modal */}
      {showRefundModal && (
        <ModalRefund
          refund={refund}
          onClose={() => setShowRefundModal(null)}
          onSubmit={() => handleSubmitRefund()}
        />
      )}

      <div className="container flex flex-col px-[6.5rem] mx-auto">
        <h1 className="font-bold text-xl mb-2">
          <span className="text-primary-1">Order</span> Status
        </h1>
        <div className="flex gap-2 mb-2 items-center justify-center">
          <button
            className="flex-1 text-white btn btn-outline border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("ALL")}
          >
            All
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("ORDER")}
          >
            Order
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("VALIDATING")}
          >
            Validating
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("NEGOTIATION")}
          >
            Negotiation
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("SHIPPING")}
          >
            Shipping
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("CHECKING")}
          >
            Checking
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredStatusData.map((order, index) => (
                  <tr key={index}>
                    <td className="font-bold">{order.orderId}</td>
                    <td className="font-medium text-primary-1">
                      {order.status}
                    </td>
                    <td>{formatDate(order.orderDate)}</td>
                    <td>{new Date(order.orderDate).toLocaleTimeString()}</td>
                    <td>
                      <button
                        onClick={() => {
                          openModal(order.orderId);
                        }}
                        className="btn btn-sm bg-primary-1 text-white hover:bg-primary-2 hover:border-primary-2"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orderpages;
