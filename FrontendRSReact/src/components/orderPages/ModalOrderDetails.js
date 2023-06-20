import React, { useState, useRef } from "react";
import Modal from "../Modal";
import { FaTrash, FaInfoCircle, FaHandshake, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios, { all } from "axios";
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
  setShowActionToast,
  setActionToastHeader,
  setActionToastBody,
  fetchData,
}) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth.id);
  const [negotiable, setNegotiable] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const allItemsAccepted = selectedOrder.orderItems.every(
    (orderItem) => orderItem.status === "ACCEPTED"
  );

  useEffect(() => {
    if (
      selectedOrder.orderItems.every((order) => order.status === "OFFER") ||
      selectedOrder.orderItems.every((order) => order.status === "ACCEPTED")
    ) {
      setNegotiable(false);
    }
  }, [selectedOrder]);

  console.log("selected order", selectedOrder.orderItems);

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
          setShowActionToast(true);

          if (response.ok) {
            // Data berhasil dihapus, lakukan tindakan tambahan jika diperlukan
            console.log("Data berhasil dihapus");
            setActionToastHeader("Berhasil");
            setActionToastBody("Data berhasil dihapus");
            fetchData();
          } else {
            // Gagal menghapus data, tangani kesalahan jika diperlukan
            console.error("Gagal menghapus data");
            setActionToastHeader("Gagal");
            setActionToastBody("Gagal menghapus data");
          }

          onClose();
        })
        .catch((error) => {
          setShowActionToast(true);
          // Tangani kesalahan dalam permintaan
          console.error("Terjadi kesalahan:", error);
          setActionToastHeader("Gagal");
          setActionToastBody("Terjadi Kesalahan");
          onClose();
        });
    }
  };

  const handleSetStatusNego = (status) => {
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/status`,
        {
          status: status,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    onClose();
  };

  const handleSetStatusCancel = (status) => {
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/status`,
        {
          status: status,
        }
      )
      .then((response) => {
        axios
          .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
            sender: role,
            senderId: id,
            receiver: selectedOrder.vendor.name,
            receiverId: selectedOrder.vendor.id,
            message: `THIS ORDER IS CANCELED, BY ${role}`,
          })
          .catch((err) => console.log(err));
        console.log(response);
      })
      .catch((err) => console.log(err));
    onClose();
  };

  const handleSetStatusValidating = (status) => {
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/status`,
        {
          status: status,
        }
      )
      .then((response) => {
        axios
          .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
            sender: role,
            senderId: id,
            receiver: selectedOrder.orderItems.product.vendor.name,
            receiverId: selectedOrder.orderItems.product.vendor.id,
            message: `ALL PRODUCT IN THIS ORDER IS ACCEPTED BY ${role}`,
          })
          .catch((err) => console.log(err));
        console.log(response);
      })
      .catch((err) => console.log(err));
    onClose();
  };
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Save the selected file to array
    setSelectedFiles([...selectedFiles, selectedFile]);

    // Reset the input value to allow selecting the same file again
    event.target.value = null;
  };

  const handleUploadFile = () => {
    axios
      .post("http://rsudsamrat.site:8990/api/v1/notifikasi", {
        sender: role,
        senderId: id,
        receiver: selectedOrder.orderItems[0].product.vendor.name,
        receiverId: selectedOrder.orderItems[0].product.vendor.id,
        message: `Semua produk dalam order id ${selectedOrder.id} telah diterima. Berkas Telah dikirim.`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
                      <td>{orderItem.product.price * orderItem.quantity}</td>
                      <td>{orderItem.bidPrice}</td>
                      <td
                        onClick={() => handleHistory(orderItem.id)}
                        className="history-click"
                      >
                        {orderItem.status}
                      </td>
                      <td>{orderItem.quantity}</td>
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
                        {negotiable && (
                          <button
                            className="btn btn-sm btn-clear text-success"
                            onClick={() => handleOffer(orderItem.id)}
                          >
                            <FaHandshake />
                          </button>
                        )}
                        {/* {orderItem.status === "ACCEPTED" && (
                          <button
                            className="btn btn-sm btn-clear text-success"
                            onClick={() => handleOpenSubmitModal(orderItem)}
                          >
                            <FaCheck />
                          </button>
                        )} */}
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
                          onClick={() =>
                            handleSetStatusValidating("VALIDATING")
                          }
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
          {role === "PP" && (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => handleSetStatusNego("NEGOTIATION")}
              >
                Cancel Negotiation
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleSetStatusCancel("CANCEL")}
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
        {allItemsAccepted && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => printOrderItem(selectedOrder.orderItems)}
          >
            Print
          </button>
        )}
        {allItemsAccepted && (
          <div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              onClick={handleUploadClick}
              className="btn btn-secondary"
              disabled={selectedFiles.length === 1}
            >
              Upload Surat
            </button>
          </div>
        )}
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
      {selectedFiles && (
        <div>
          {selectedFiles.map((file, index) => (
            <div style={{ display: "flex" }}>
              <p key={index}>{file.name}</p>
              <button className="btn btn-secondary" onClick={handleUploadFile}>
                Upload
              </button>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ModalOrderDetails;
