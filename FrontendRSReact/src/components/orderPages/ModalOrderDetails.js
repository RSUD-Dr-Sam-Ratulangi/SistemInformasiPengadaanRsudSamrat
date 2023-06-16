import React from "react";
import Modal from "../Modal";
import { FaTrash, FaInfoCircle, FaHandshake, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import printOrderItem from "./printOrderItem";
import { useEffect } from "react";

const ModalOrderDetails = ({
  onClose,
  selectedOrder,
  handleHistory,
  handleDetailProduct,
  handleOffer,
  handleOpenSubmitModal,
  handlePayoutDetail,
}) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  console.log("selected order", selectedOrder);

  const handleQuantityChange = (orderItemId, newQuantity) => {
    console.log("quantity changed", orderItemId, newQuantity);
  };

  const handleDeleteOrderItem = (orderItemId) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );

    if (confirmed) {
      fetch(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orderitems/${orderItemId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (response.ok) {
            // Data berhasil dihapus, lakukan tindakan tambahan jika diperlukan
            console.log("Data berhasil dihapus");
          } else {
            // Gagal menghapus data, tangani kesalahan jika diperlukan
            console.error("Gagal menghapus data");
          }
        })
        .catch((error) => {
          // Tangani kesalahan dalam permintaan
          console.error("Terjadi kesalahan:", error);
        });
    }
  };

  const handleSetStatus = (status) => {
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/status`,
        {
          status: status,
        }
      )
      .then((response) => {
        console.log(response);
      }).catch(err => console.log(err));
      onClose();
  };

  // STATUS BERUBAH IF ALL ORDER ITEM "ACCEPTED" without button
  // useEffect((orderItems) => {
  //   const orderItem = 
  //   if(selectedOrder.orderItems.every((orderItem) => orderItem.status === "ACCEPTED")){
  //     handleSetStatus("VALIDATING");
  //   }
  // }, [selectedOrder.Order])

  return (
    <Modal title="SubOrder Details" onClose={onClose} modalSize="xl">
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

              return [...vendorItemsMap].map(([vendorName, orderItems]) => (
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
                      <td
                        onClick={() => handleHistory(orderItem.id)}
                        className="history-click"
                      >
                        {orderItem.status}
                      </td>
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
                          onClick={() => handleDeleteOrderItem(orderItem.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className="btn btn-sm btn-clear text-info"
                          onClick={() =>
                            handleDetailProduct(orderItem.product.productuuid)
                          }
                        >
                          <FaInfoCircle />
                        </button>
                        <button
                          className="btn btn-sm btn-clear text-success"
                          onClick={() => handleOffer(orderItem.id)}
                        >
                          <FaHandshake />
                        </button>
                        {orderItem.status === "ACCEPTED" && (
                          <button
                            className="btn btn-sm btn-clear text-success"
                            onClick={() => handleOpenSubmitModal(orderItem)}
                          >
                            <FaCheck />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orderItems.every(
                    (orderItem) => orderItem.status === "ACCEPTED"
                  ) && (
                    <tr>
                      <td colSpan="9">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleSetStatus("VALIDATING")}
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ));
            })()}
          </tbody>
        </table>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Add Product
          </button>
          {role === "PP" && (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => handleSetStatus("NEGOTIATION")}
              >
                Cancel Negotiation
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleSetStatus("CANCEL")}
              >
                Cancel Order
              </button>
            </>
          )}
        </div>
      </div>
      <div className="modal-footer">
        {/* Remove Comment to only enable Print button on 'PP' Role */}
        {/* {role === "PP" ? ( */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => printOrderItem(selectedOrder.orderItems)}
        >
          Print
        </button>
        {/* ) : (
          <> */}
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
        {/* </>
        )} */}
      </div>
    </Modal>
  );
};

export default ModalOrderDetails;
