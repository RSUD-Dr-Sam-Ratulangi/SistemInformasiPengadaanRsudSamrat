import React, { useState, useRef } from "react";
import {
  MdInventory,
  MdMenu,
  MdInfo,
  MdHandshake,
  MdDelete,
  MdSettingsBackupRestore,
  MdCheck,
} from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import printOrderItem from "./printOrderItem";
import { useEffect } from "react";
import PrintBeritaAcara from "./PrintBeritaAcara";

const ModalOrderDetails = ({
  onClose,
  selectedOrder,
  handleHistory,
  handleDetailProduct,
  handleOffer,
  handleOfferAccepted,
  handleRefund,
  handleConfirm,
  handleOpenSubmitModal,
  handlePayoutDetail,
  setShowActionToast,
  setActionToastHeader,
  setActionToastBody,
  fetchData,
}) => {
  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth.id);
  const [negotiable, setNegotiable] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const allItemsAccepted = selectedOrder.orderItems.every(
    (orderItem) => orderItem.status === "ACCEPTED"
  );

  const allItemsChecked = selectedOrder.orderItems.every(
    (orderItem) => orderItem.status === "CHECKED"
  );

  useEffect(() => {
    console.log("modal order details", window.detailsModal.open);
    if (!window.detailsModal.open) {
      window.detailsModal.showModal();
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (
      selectedOrder.orderItems.every((order) => order.status === "OFFER") ||
      selectedOrder.orderItems.every((order) => order.status === "ACCEPTED") ||
      selectedOrder.orderItems.every((order) => order.status === "REFUND") ||
      selectedOrder.orderItems.every((order) => order.status === "CHECKED")
    ) {
      setNegotiable(false);
    }
    if (
      selectedOrder.status === "ORDER" ||
      selectedOrder.status === "NEGOTIATION"
    ) {
      setNegotiable(true);
    }
  }, [selectedOrder]);

  console.log("selected order", selectedOrder.orderItems);

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
    window.location.reload();
  };

  const handlePrintBeritaAcara = () => {
    axios
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${selectedOrder.id}/status`,
        {
          status: "PAYMENT",
        }
      )
      .then((response) => {
        axios
          .get(`http://rsudsamrat.site:8080/employee`)
          .then((response) => {
            // map the response.data and get the id of each employee and push it to employeeList
            let employeeList = [];
            let employeeNameList = [];
            response.data.map((employee) => {
              employeeList.push(employee.id);
              employeeNameList.push(employee.name);
            });
            console.log(employeeList);
            axios
              .post(`http://rsudsamrat.site:8990/api/v1/notifikasi`, {
                sender: role,
                senderId: id,
                receiver: employeeNameList,
                receiverId: employeeList,
                message: `THIS ORDER IS PAYMENT, BY ${role}`,
              })
              .then((response) => {
                console.log("berhasil mengirim notifikasi ke KEUANGAN");
              })
              .catch((err) => console.log(err));
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

    setShowActionToast(true);
    setActionToastHeader("Berhasil");
    setActionToastBody("File siap untuk diupload.");
    setTimeout(() => {
      setShowActionToast(false);
      setActionToastHeader("");
      setActionToastBody("");
    }, 3000);

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

  const ProductItem = ({ orderItem }) => {
    console.log("--productItem--", orderItem);

    const calculateTotalPrice = () => {
      // get total price by multiplying quantity with price
      const totalPrice = orderItem.quantity * orderItem.product.price;
      return totalPrice;
    };

    return (
      <tr>
        <td className="font-bold">{orderItem.id}</td>
        <td className="font-medium text-primary-1">
          {orderItem.product.name}{" "}
          <span className="text-sm text-black">x{orderItem.quantity}</span>
        </td>
        <td>
          Rp{" "}
          <span>
            {orderItem.totalAmount === 0
              ? calculateTotalPrice()
              : orderItem.totalAmount}
          </span>
        </td>
        <td
          className="cursor-pointer hover:text-primary-1 transition-all duration-300 ease-in-out font-semibold"
          onClick={() => handleHistory(orderItem.id)}
        >
          {orderItem.status}
        </td>
        <td>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label
              tabIndex={0}
              className="text-xl text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
            >
              <MdMenu />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {selectedOrder.status === "ORDER" ||
                (selectedOrder.status === "NEGOTIATION" && (
                  <li>
                    <a onClick={() => handleOfferAccepted(orderItem.id)}>
                      <MdCheck className="text-xl text-success" />
                      Accept Order
                    </a>
                  </li>
                ))}
              {(orderItem.status === "ACCEPTED" ||
                orderItem.status === "RESEND") &&
                (selectedOrder.status === "SHIPPING" ||
                  selectedOrder.status === "CHECKING") && (
                  <>
                    <li>
                      <a onClick={() => handleConfirm(orderItem.id)}>
                        <MdCheck className="text-xl text-success" />
                        Confirm
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a onClick={() => handleRefund(orderItem.id)}>
                        <MdSettingsBackupRestore className="text-xl text-slate-500" />
                        Refund
                      </a>
                    </li>
                  </>
                )}
              <hr />
              <li>
                <a
                  onClick={() =>
                    handleDetailProduct(orderItem.product.productuuid)
                  }
                >
                  <MdInfo className="text-xl text-slate-500" />
                  Info
                </a>
              </li>
              <hr />
              {negotiable && (
                <li>
                  <a onClick={() => handleOffer(orderItem.id)}>
                    <MdHandshake className="text-xl text-success" />
                    Negotiation
                  </a>
                </li>
              )}
              <hr />
              <li>
                <a onClick={() => handleDeleteOrderItem(orderItem.id)}>
                  <MdDelete className="text-xl text-red-500" />
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    );
  };

  const productPerVendorItem = () => {
    const vendorItemsMap = new Map();

    selectedOrder.orderItems.forEach((orderItem) => {
      const vendorName = orderItem.product.vendor.name;

      if (vendorItemsMap.has(vendorName)) {
        vendorItemsMap.get(vendorName).push(orderItem);
      } else {
        vendorItemsMap.set(vendorName, [orderItem]);
      }
    });

    return [...vendorItemsMap].map(([vendorName, orderItems], index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col gap-2 ">
          <h2 className="font-medium text-xl text-slate-600">Best Vendor</h2>
          <hr />
          <table className="table table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Final Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* body */}
              {orderItems.map((orderItem, index) => (
                <ProductItem orderItem={orderItem} key={index} />
              ))}
              {/* {productItem()} */}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 my-2">
          {orderItems.every((orderItem) => orderItem.status === "ACCEPTED") &&
            selectedOrder.status === "NEGOTIATION" && (
              <button
                className="text-white btn btn-sm border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                onClick={() => handleSetStatusValidating("VALIDATING")}
              >
                Change Status
              </button>
            )}
          {role === "PPKOM" && selectedOrder.status === "VALIDATING" && (
            <>
              <button
                className="text-white btn btn-sm border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                onClick={() => handleSetStatusNego("NEGOTIATION")}
              >
                Cancel Negotiation
              </button>
              <button
                className="text-white btn btn-sm border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                onClick={() => handleSetStatusCancel("CANCEL")}
              >
                Cancel Order
              </button>
            </>
          )}
        </div>
        <hr />
      </React.Fragment>
    ));
  };

  return (
    <dialog id="detailsModal" className="modal">
      <div className="modal-box max-w-4xl">
        <form method="dialog">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MdInventory className="text-2xl text-primary-1" />
              <h3 className="text-xl font-bold">Order Details</h3>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>

          {/* Item list/vendor Item */}
          {productPerVendorItem()}
        </form>

        {/* Footer */}
        <div className="modal-action mt-12">
          {selectedFiles && (
            <div>
              {selectedFiles.map((file, index) => (
                <div style={{ display: "flex" }} key={index}>
                  <p key={index}>{file.name}</p>
                  <button
                    className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </button>
                </div>
              ))}
            </div>
          )}
          {allItemsChecked && (
            <div>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                onClick={() => {
                  handleUploadClick();
                  handlePrintBeritaAcara();
                }}
                className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                disabled={selectedFiles.length === 1}
              >
                Upload Surat
              </button>
            </div>
          )}
          <button
            onClick={handlePayoutDetail}
            className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
          >
            Payout Details
          </button>
          <button className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
            Check Status
          </button>
          {allItemsAccepted && (
            <button
              type="button"
              className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
              onClick={() => printOrderItem(selectedOrder.orderItems)}
            >
              Print
            </button>
          )}
          {/* display if all the items status is CHECKED */}
          {allItemsChecked && (
            <button
              type="button"
              className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
              onClick={() => {
                PrintBeritaAcara(selectedOrder);
              }}
            >
              Print Berita Acara
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ModalOrderDetails;
