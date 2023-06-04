import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/vendorpages.css";
import {
  FaTrash,
  FaInfoCircle,
  FaHandshake,
  FaCheck,
  FaPrint,
} from "react-icons/fa";
import html2pdf from "html2pdf.js";

//import { saveAs } from 'file-saver';
//import {Document, Page, Text, PDFDownloadLink, StyleSheet, pdf} from '@react-pdf/renderer';
//import ProductRequestDocument from './Report/ProductRequestDocument';
//import { PDFViewer } from "@react-pdf/renderer";
//import ReactDOMServer from "react-dom/server";
//import jsPDF from "jspdf";
//import "jspdf-autotable";

const Orderpages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("orderDate");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetailModal, setShowProductDetailModal] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);
  const [isOfferSubmitted, setIsOfferSubmitted] = useState(false);
  const navigate = useNavigate();

  const calculatePayoutAmount = (orderItems) => {
    let totalAmount = 0;
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      totalAmount += orderItem.quantity * orderItem.product.price;
    }
    return totalAmount;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock?page=${page}&sort=${sort}`
        );
        setData(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, sort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const openModal = async (orderId) => {
    try {
      const response = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${orderId}`
      );
      setSelectedOrder(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleQuantityChange = (orderItemId, newQuantity) => {};

  const handleDeleteOrderItem = (orderItemId) => {};

  const handleAddProduct = () => {
    navigate("/products");
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
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error accepting offer:", error);
      });
  };

  // Function to handle closing the submit modal
  const handleCloseSubmitModal = () => {
    setSubmitModalOpen(false);
  };

  const handleSubmitOrderItem = async () => {
    try {
      // PUT request to update payment using Axios
      const response = await axios.put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/${selectedOrderItem.id}/payment`
      );

      // Handle the response as needed
      // ...

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
      // Handle any errors
      // ...

      // Display an error alert
      alert("Failed to submit payment to the vendor. Please try again.");
    }
  };

  // Function to handle printing the order item to PDF

  // Function to open the submit modal
  const handleOpenSubmitModal = (orderItem) => {
    setSelectedOrderItem(orderItem);
    setSubmitModalOpen(true);
  };

  const handlePrintOrderItem = () => {
    if (selectedOrderItem) {
      const { product, quantity, bidPrice, status, totalAmount } =
        selectedOrderItem;

      const taxRate = 0.11; // 11% tax rate

      const letterHtml = `
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
          max-width: 200px;
        }
      </style>
      <body>
        <h2>Accepted Offer</h2>
        <div>
          <p>Dear ${product.vendor.name},</p>
          <p>We are pleased to inform you that your offer for the following product has been accepted:</p>
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Final Bid</th>
              <th>Quantity</th>
            </tr>
            <tr>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>$${product.price}</td>
              <td>$${bidPrice}</td>
              <td>${quantity}</td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Quantity</th>
              <th>Bid Price</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>${quantity}</td>
              <td>$${bidPrice}</td>
              <td>$${quantity * bidPrice}</td>
            </tr>
          </table>

          <table>
            <tr>
              <th>Total</th>
              <th>11% Tax</th>
              <th>Total Price (incl. Tax)</th>
            </tr>
            <tr>
              <td>$${quantity * bidPrice}</td>
              <td>$${(quantity * bidPrice * taxRate).toFixed(2)}</td>
              <td>$${(
                quantity * bidPrice +
                quantity * bidPrice * taxRate
              ).toFixed(2)}</td>
            </tr>
          </table>

          <p>The payment will be processed accordingly. Please proceed with the necessary arrangements for the delivery of the product.</p>
          <p>Should you have any questions or require further information, please feel free to contact us.</p>
          <p>Thank you for your cooperation.</p>
          <p>Sincerely,</p>
          <br>
          <br>
          <p>Panitia Pengadaan</p>
        </div>
      </body>
    `;

      const element = document.createElement("div");
      element.innerHTML = letterHtml;

      const options = {
        margin: [20, 20, 20, 20], // Specify margins: top, left, bottom, right
      };

      html2pdf().set(options).from(element).save();
    }
  };

  // Rest of your code

  return (
    <div className="container">
      {/* <h2>Order Table</h2> */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-3">
            <label htmlFor="sort">Sort By:</label>
            <select
              id="sort"
              className="form-control"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="orderDate">Order Date</option>
              <option value="orderId">Order ID</option>
            </select>
          </div>
          <table className="table">
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
          </table>

          {selectedOrder && (
            <div
              className="modal modal-background"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Order Details</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={closeModal}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h4>Order Items:</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>OrderId</th>
                          <th>Product UUID</th>
                          <th>Vendor Name</th>
                          <th>Product Name</th>
                          <th>Product Price</th>
                          <th>bidprice</th>
                          <th>STATUS</th>
                          <th>Quantity</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const vendorItemsMap = new Map();

                          selectedOrder.orderItems.forEach((orderItem) => {
                            const vendorName = orderItem.product.vendor.name;

                            if (vendorItemsMap.has(vendorName)) {
                              vendorItemsMap.get(vendorName).push(orderItem);
                            } else {
                              vendorItemsMap.set(vendorName, [orderItem]);
                            }
                          });

                          const allItemsAccepted = [...vendorItemsMap].every(
                            ([vendorName, orderItems]) =>
                              orderItems.every(
                                (orderItem) => orderItem.status === "ACCEPTED"
                              )
                          );

                          return [...vendorItemsMap].map(
                            ([vendorName, orderItems]) => (
                              <React.Fragment key={vendorName}>
                                <tr>
                                  <td colSpan="9">
                                    <strong>{vendorName}</strong>
                                  </td>
                                </tr>
                                {orderItems.map((orderItem) => (
                                  <tr key={orderItem.id}>
                                    <td>{orderItem.id}</td>
                                    <td>{orderItem.product.productuuid}</td>
                                    <td>{vendorName}</td>
                                    <td>{orderItem.product.name}</td>
                                    <td>{orderItem.product.price}</td>
                                    <td>{orderItem.bidPrice}</td>
                                    <td>{orderItem.status}</td>
                                    <td>
                                      <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() =>
                                          handleQuantityChange(
                                            orderItem.id,
                                            orderItem.quantity - 1
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      {orderItem.quantity}
                                      <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() =>
                                          handleQuantityChange(
                                            orderItem.id,
                                            orderItem.quantity + 1
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-sm btn-clear text-danger"
                                        onClick={() =>
                                          handleDeleteOrderItem(orderItem.id)
                                        }
                                      >
                                        <FaTrash />
                                      </button>
                                      <button
                                        className="btn btn-sm btn-clear text-info"
                                        onClick={() =>
                                          handleDetailProduct(
                                            orderItem.product.productuuid
                                          )
                                        }
                                      >
                                        <FaInfoCircle />
                                      </button>
                                      <button
                                        className="btn btn-sm btn-clear text-success"
                                        onClick={() =>
                                          handleOffer(orderItem.id)
                                        }
                                      >
                                        <FaHandshake />
                                      </button>
                                      {orderItem.status === "ACCEPTED" && (
                                        <button
                                          className="btn btn-sm btn-clear text-success"
                                          onClick={() =>
                                            handleOpenSubmitModal(orderItem)
                                          }
                                        >
                                          <FaCheck />
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                                {orderItems.some(
                                  (orderItem) => orderItem.status === "ACCEPTED"
                                ) && (
                                  <tr>
                                    <td colSpan="9">
                                      <button
                                        className="btn btn-sm btn-success"
                                        onClick={() =>
                                          console.log(vendorItemsMap)
                                        }
                                      >
                                        Submit All
                                      </button>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            )
                          );
                        })()}
                      </tbody>
                    </table>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={handleAddProduct}
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handlePayoutDetail}
                    >
                      Payout Detail
                    </button>
                    <button type="button" className="btn btn-secondary">
                      Check Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showProductDetailModal && selectedProduct && (
            <div
              className="modal modal-background"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Product Details</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowProductDetailModal(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Product ID: {selectedProduct.id}</p>
                    <p>Product UUID: {selectedProduct.productuuid}</p>
                    <p>Product Name: {selectedProduct.name}</p>
                    <p>Product Description: {selectedProduct.description}</p>
                    <p>Product Price: {selectedProduct.price}</p>
                    <p>Product Quantity: {selectedProduct.quantity}</p>
                    <p>Vendor ID: {selectedProduct.vendor.id}</p>
                    <p>Vendor UUID: {selectedProduct.vendor.vendoruuid}</p>
                    <p>Vendor Name: {selectedProduct.vendor.name}</p>
                    <p>Vendor Address: {selectedProduct.vendor.address}</p>
                    <p>
                      Vendor Phone Number: {selectedProduct.vendor.phoneNumber}
                    </p>
                    <p>Vendor Owner ID: {selectedProduct.vendor.owner.id}</p>
                    <p>
                      Vendor Owner Username:{" "}
                      {selectedProduct.vendor.owner.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {payoutDetails && (
            <div
              className="modal modal-background"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Payout Details</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setPayoutDetails(null)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h4>Order ID: {payoutDetails.id}</h4>
                    <h4>Order Date: {payoutDetails.orderDate}</h4>
                    <h4>Order Items:</h4>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Amount Per Item</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payoutDetails.orderItems.map((orderItem) => (
                          <tr key={orderItem.id}>
                            <td>{orderItem.product.name}</td>
                            <td>{orderItem.quantity}</td>
                            <td>{orderItem.product.price}</td>
                            <td>
                              {orderItem.quantity * orderItem.product.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h4>
                      Payout Amount:{" "}
                      {calculatePayoutAmount(payoutDetails.orderItems)}
                    </h4>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => setPayoutDetails(null)}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-info">
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showOfferModal && selectedOrderItem && (
            <div
              className="modal modal-background"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Make an Offer</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowOfferModal(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Product: {selectedOrderItem.product.name}</p>
                    <p>Current Price: {selectedOrderItem.product.price}</p>
                    <label htmlFor="bidPrice">Enter Your Offer:</label>
                    <input
                      type="number"
                      step="0.01"
                      id="bidPrice"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleOfferAccepted}
                    >
                      Accepted
                    </button>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={handleOfferSubmit}
                    >
                      Submit Offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isOfferSubmitted && (
            <div
              className="modal modal-background"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Offer Submitted</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setIsOfferSubmitted(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Your offer for the product{" "}
                      {selectedOrderItem.product.name} has been successfully
                      submitted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isOfferAccepted && (
            <div
              className="modal modal-background"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Offer Accepted</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setIsOfferAccepted(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Your offer for the product{" "}
                      {selectedOrderItem.product.name} has been accepted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedOrderItem && (
            <div
              className="modal modal-background"
              style={{ display: submitModalOpen ? "block" : "none" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title">Submit Order</h3>
                    <button
                      type="button"
                      className="close"
                      onClick={handleCloseSubmitModal}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Status: {selectedOrderItem.status}</p>
                    <p>Bid Price: {selectedOrderItem.bidPrice}</p>
                    <p>Order Item: {selectedOrderItem.quantity}</p>
                    <p>
                      Total Price:{" "}
                      {selectedOrderItem.bidPrice * selectedOrderItem.quantity}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSubmitOrderItem}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleCloseSubmitModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={handlePrintOrderItem}
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
