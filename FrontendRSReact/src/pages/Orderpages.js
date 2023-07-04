import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

import ModalHistory from "../components/orderPages/ModalHistory";
import ModalOrderItem from "../components/orderPages/ModalOrderItem";
// import ModalAcceptedOffer from "../components/orderPages/ModalAcceptedOffer";
// import ModalSubmittedOffer from "../components/orderPages/ModalSubmittedOffer";
import ModalOffer from "../components/orderPages/ModalOffer";
import ModalPayoutDetails from "../components/orderPages/ModalPayoutDetails";
import ModalProductDetails from "../components/orderPages/ModalProductDetails";
import ModalOrderDetails from "../components/orderPages/ModalOrderDetails";
import ModalRefund from "../components/orderPages/ModalRefund";
import ModalConfirm from "../components/orderPages/ModalConfirm";
import ModalShipping from "../components/orderPages/ModalShipping";

import logo from '../assets/images/logo.jpg';

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [refund, setRefund] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [filterDateFromOlderToNewer, setFilterDateFromOlderToNewer] = useState(true);

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
            item.status === "CHECKING" ||
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
        if (role === "KEU") {
          uniqueData = uniqueData.filter((item) => item.status === "PAYMENT");
        }
      }

      setData(uniqueData);
      setFilteredStatusData(uniqueData);
      console.log("order filter: ", uniqueData);
      console.log("order: ", response.data);
      setLoading(false);

      // open modal if receivedProductId exist
      if (receivedProductId) {
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

  const getHistory = async () => {
    axios
      .get(
        `http://rsudsamrat.site:8990/api/bid-exchange/history/${selectedOrder.id}`
      )
      .then((res) => {
        console.log("History", res.data);
        setHistory(res.data);
        console.log("Berhasil");
      })
      .catch((err) => console.log(err));
  };

  /* History function */
  const handleHistory = () => {
    setShowHistoryModal(true);
    console.log("history modal", showHistoryModal);
    getHistory();
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

  const postShippingStatus = (status, selectedOrderId) => {
    console.log("order id", selectedOrderId, "status", status);
    axios
      .post(`http://rsudsamrat.site:8990/order-status`, {
        orderId: selectedOrderId,
        status: status,
      })
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
        // send notification to vendor
        axios
          .post("http://rsudsamrat.site:8990/api/v1/notifikasi", {
            orderId: selectedOrder.id,
            orderItemId: refund.id,
            status: "REFUND",
            message: `Refund untuk produk ${refund.productName} berhasil.`,
          })
          .then((response) => {
            console.log("Notifikasi berhasil dikirim", response);
          })
          .catch((error) => {
            console.error(error);
          });

        handleSetOrderItemStatus("REFUND", refund.id);
        postShippingStatus("CHECKING", selectedOrder.id);
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
        setTimeout(() => {
          setShowActionToast(false);
          setActionToastHeader("");
          setActionToastBody("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        // Show the toast
        setActionToastHeader("Refund Gagal");
        setActionToastBody(`Refund untuk produk ${refund.productName} gagal.`);
        setShowActionToast(true);
        setTimeout(() => {
          setShowActionToast(false);
          setActionToastHeader("");
          setActionToastBody("");
        }, 3000);
      });
  };

  const handleSubmitConfirm = () => {
    // if all the selectedOrder.orderItems is
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/status`,
        {
          status: "CHECKING",
        }
      )
      .then((response) => {
        handleSetOrderItemStatus("CHECKED", confirm.id);
        postShippingStatus("CHECKING", selectedOrder.id);
        // send notification to vendor
        axios
          .post("http://rsudsamrat.site:8990/api/v1/notifikasi", {
            sender: role,
            senderId: idUser,
            receiver: selectedOrder.orderItems[0].product.vendor.name,
            receiverId: selectedOrder.orderItems[0].product.vendor.id,
            message: `Pesanan ${selectedOrder.orderItems[0].productName} telah diterima.`,
          })
          .then((res) => {
            console.log("Notifikasi berhasil dikirim");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConfirm = (orderItemId) => {
    const selectedOrderItem = selectedOrder.orderItems.find(
      (orderItem) => orderItem.id === orderItemId
    );
    setConfirm(selectedOrderItem);
    setShowConfirmModal(true);
  };

  const handleOffer = (orderItemId) => {
    const selectedOrderItem = selectedOrder.orderItems.find(
      (orderItem) => orderItem.id === orderItemId
    );
    setSelectedOrderItem(selectedOrderItem);
    setShowOfferModal(true);
  };

  const handleAcceptOrder = (orderItemId) => {
    const selectedOrderItem = selectedOrder.orderItems.find(
      (orderItem) => orderItem.id === orderItemId
    );
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/items/${selectedOrderItem.id}`,
        {
          orderItemId: selectedOrderItem.id,
          bidPrice: selectedOrderItem.bidPrice,
          status: "ACCEPTED",
          message: "Order accepted",
        }
      )
      .then((response) => {
        // Handle the response
        console.log("Order accepted:", response.data);
        // Close the offer modal
        setShowOfferModal(false);
        // Update the state to show the success modal
        // setIsOfferSubmitted(true);
        // Update the state
        setSelectedOrder(response.data);
        // Show the toast
        setActionToastHeader("Order Accepted");
        setActionToastBody(
          `Your offer for the product ${selectedOrderItem.product.name} has been accepted.`
        );
        setShowActionToast(true);
        setTimeout(() => {
          setShowActionToast(false);
          setActionToastHeader("");
          setActionToastBody("");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
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
        postShippingStatus("NEGOTIATION", selectedOrder.id);
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
        setTimeout(() => {
          setShowActionToast(false);
          setActionToastHeader("");
          setActionToastBody("");
        }, 3000);
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
        setTimeout(() => {
          setShowActionToast(false);
          setActionToastHeader("");
          setActionToastBody("");
        }, 3000);
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
        setTimeout(() => {
          setShowActionToast(false);
          setActionToastHeader("");
          setActionToastBody("");
        }, 3000);
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
        setTimeout(() => {
          setShowActionToast(false);
          setActionToastHeader("");
          setActionToastBody("");
        }, 3000);
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

  const handleShipping = (orderItemId) => {
    // set shipping modal open
    setShowShippingModal(true);

    setShipping(orderItemId);
  };

  const filterFilteredStatusDataUsingDate = () => {
    const newFilteredStatusData = filteredStatusData.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);

      if (filterDateFromOlderToNewer) return dateA - dateB;
      else if (!filterDateFromOlderToNewer) return dateB - dateA;
    });

    setFilterDateFromOlderToNewer(!filterDateFromOlderToNewer);
    setFilteredStatusData(newFilteredStatusData);
  };

  const cetakPDF = () => {
    let rows = "";
    filteredStatusData.forEach(data => {
      const row = `
        <tr>
          <th>${data.orderId}</th>
          <th>${data.status}</th>
          <th>${formatDate(data.orderDate)}</th>
          <th>${new Date(data.orderDate).toLocaleTimeString()}</th>
        </tr>
      `;
      rows += row;
    });

    const HTMLToBeConvertedToPDF = `
      <style>
        @page {
          size: letter;
          margin: 1in;
        }
        body {
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
        }
        table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }
        table td,
        table th {
          padding: 8px;
          border: 1px solid #000;
        }
        table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        img {
          max-width: 50px;
        }
      </style>
      <body>
        <p style="text-align: center; line-height: 1; margin-bottom: 5px;">
          <img src=${logo} alt="Logo" className="logo" style="float: left; margin-right: 10px; height: 50px;">
          <strong style="font-size: 16px;">PEMERINTAH KABUPATEN MINAHASA</strong>
        </p>
        <p style="text-align: center; line-height: 1; margin-bottom: 5px;">
          <strong style="font-size: 14px;">RUMAH SAKIT UMUM DAERAH DR. SAM RATULANGI TONDANO</strong>
        </p>
        <p style="text-align: center; font-size: 12px; line-height: 1;">
          Jl. Suprapto Luaan Kecamatan Tondano Timur Telp. (0431) 321171 Fax. (0431) 321172
        </p>
        <hr style="border: none; height: 1px; background-color: #444444; opacity: 0.5; margin: 10px 0;">

        <h2 style="text-align: center;"><b>Order List</b></h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
          ${rows}
        </table>
      </body>
    `;

    const element = document.createElement("div");
    element.innerHTML = HTMLToBeConvertedToPDF;
    const options = {
      margin: [20, 20, 20, 20]
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <>
      {/* Order Details Modal */}
      {selectedOrder && (
        <ModalOrderDetails
          onClose={handleModalOrderDetailsOnClose}
          selectedOrder={selectedOrder}
          selectedOrderItem={selectedOrderItem}
          getHistory={getHistory}
          handleHistory={handleHistory}
          history={history}
          handleShipping={handleShipping}
          handleDetailProduct={handleDetailProduct}
          handleOffer={handleOffer}
          handleOfferAccepted={handleAcceptOrder}
          handleRefund={handleRefund}
          handleConfirm={handleConfirm}
          handleOpenSubmitModal={handleOpenSubmitModal}
          handlePayoutDetail={handlePayoutDetail}
          setShowActionToast={setShowActionToast}
          setActionToastHeader={setActionToastHeader}
          setActionToastBody={setActionToastBody}
          fetchData={fetchData}
          postShippingStatus={postShippingStatus}
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

      {/* History Modal */}
      {showShippingModal && (
        <ModalShipping
          shipping={shipping}
          onClose={() => setShowShippingModal(null)}
        />
      )}

      {/* Refund Modal */}
      {showRefundModal && (
        <ModalRefund
          refund={refund}
          selectedOrder={selectedOrder}
          onClose={() => setShowRefundModal(null)}
          onSubmit={() => handleSubmitRefund()}
        />
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <ModalConfirm
          confirm={confirm}
          selectedOrder={selectedOrder}
          onClose={() => setShowConfirmModal(null)}
          onSubmit={() => handleSubmitConfirm()}
        />
      )}

      <div className="container flex flex-col px-[6.5rem] mx-auto">
        <h1 className="mb-2 text-xl font-bold">
          <span className="text-primary-1">Order</span> Status
        </h1>
        <div className="flex items-center justify-center gap-2 mb-2">
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
            onClick={() => handleFilterStatus("NEGOTIATION")}
          >
            Negotiation
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("VALIDATING")}
          >
            Validating
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("SHIPPING")}
          >
            Shipping
          </button>
          {role === "PANPEN" ||
            (role === "PPKOM" && (
              <button
                className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
                onClick={() => handleFilterStatus("CHECKING")}
              >
                Checking
              </button>
            ))}
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("PAYMENT")}
          >
            Payment
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("CANCEL")}
          >
            Cancel
          </button>
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={() => handleFilterStatus("COMPLETE")}
          >
            Completed
          </button>
        </div>
        <div className="flex gap-2 mb-2 items-center justify-center">
          <button
            className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={cetakPDF}
            disabled={loading}
          >
            Cetak PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th onClick={filterFilteredStatusDataUsingDate}>Date</th>
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
                        className="text-white btn btn-sm bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
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
      {showActionToast && (
        <div className="toast toast-end z-[99999]">
          <div className="alert flex flex-col justify-start items-start gap-2">
            <h3 className="font-semibold">{actionToastHeader}</h3>
            <span>{actionToastBody}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Orderpages;
