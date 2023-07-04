import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdLocalShipping } from "react-icons/md";

const ModalShipping = ({ shipping, onClose }) => {
  const [shippingData, setShippingData] = useState([]);
  const [vendorData, setVendorData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("modal shipping", window.shippingModal.open);
    if (!window.shippingModal.open) {
      window.shippingModal.showModal();
    }
  }, [shipping]);

  useEffect(() => {
    // fetch data here using "shipping props"
    axios
      .get(`http://rsudsamrat.site:8990/order-status/status-entry/${shipping}`)
      .then((res) => {
        console.log(res.data);
        // reverse the array

        setShippingData(res.data.statusList.reverse());
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${shipping}`)
      .then((res) => {
        console.log(res.data);
        setVendorData(res.data.orderItems[0]);
        setProductData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shipping]);

  console.log("vendor data", vendorData);
  const timeAgo = (time) => {
    const now = new Date();
    const then = new Date(time);
    const seconds = Math.round((now - then) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (weeks < 4) {
      return `${weeks} weeks ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };

  const formatDateTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const getCurrentStatus = (status) => {
    if (shippingData.some((data) => data.status === "CANCEL")) {
      return "error";
    }

    return shippingData.some((data) => data.status === status) ? "success" : "";
  };

  const getCurrentStatus2 = (status, i) => {
    if (status !== "CANCEL" && i === 0) {
      return "success";
    }

    if (status === "CANCEL") {
      return "error";
    }
  };

  const calculateTotalPrice = (orderItem) => {
    // get total price by multiplying quantity with price
    const totalPrice = orderItem.quantity * orderItem.product.price;
    return totalPrice;
  };

  return (
    <dialog id="shippingModal" className="modal">
      <div className="max-w-6xl modal-box ">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MdLocalShipping className="text-2xl text-primary-1" />
            <h3 className="text-xl font-bold">Shipping</h3>
          </div>
          <button
            onClick={onClose}
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div>
            <ul className="w-full steps">
              <li
                data-content="●"
                className={`step step-${getCurrentStatus("ORDER")}`}
              >
                ORDER
              </li>
              <li
                data-content="●"
                className={`step step-${getCurrentStatus("NEGOTIATION")}`}
              >
                NEGOTIATION
              </li>
              <li
                data-content="●"
                className={`step step-${getCurrentStatus("VALIDATING")}`}
              >
                VALIDATING
              </li>
              <li
                data-content="●"
                className={`step step-${getCurrentStatus("SHIPPING")}`}
              >
                SHIPPING
              </li>
              <li
                data-content="●"
                className={`step step-${getCurrentStatus("CHECKING")}`}
              >
                CHECKING
              </li>
              <li
                data-content="●"
                className={`step step-${getCurrentStatus("PAYMENT")}`}
              >
                PAYMENT
              </li>
              {shippingData.some((data) => data.status === "CANCEL") ? (
                <li
                  data-content="●"
                  className={`step step-${getCurrentStatus("CANCEL")}`}
                >
                  CANCEL
                </li>
              ) : (
                <li
                  data-content="✓"
                  className={`step step-${getCurrentStatus("COMPLETE")}`}
                >
                  COMPLETE
                </li>
              )}
            </ul>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">
              <ul className="w-full steps steps-vertical">
                {shippingData.map((data, i) => (
                  <li
                    key={i}
                    data-content={
                      i === 0 ? (data.status === "CANCEL" ? "X" : "✓") : "●"
                    }
                    className={`w-full step step-${getCurrentStatus2(
                      data.status,
                      i
                    )}`}
                  >
                    <div className="flex justify-star items-center w-full">
                      <span className="font-semibold w-40 text-start">
                        {timeAgo(data.timestamp)}
                      </span>
                      <span className="text-sm w-48 text-start">
                        {formatDateTime(data.timestamp)}
                      </span>
                      {data.status}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-slate-600">
                  Shipping Details
                </h2>
              </div>
              {loading || !vendorData || !productData ? (
                <div>Loading</div>
              ) : (
                <>
                  <div className="flex gap-3">
                    <div className="flex flex-col text-primary-1">
                      Owner
                      <span className="text-black font-medium w-40">
                        {vendorData?.product?.vendor?.owner.username}
                      </span>
                    </div>
                    <div className="flex flex-col text-primary-1">
                      Phone Number
                      <span className="text-black font-medium">
                        {vendorData?.product?.vendor?.phoneNumber}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col text-primary-1">
                      Name
                      <span className="text-black font-medium w-40">
                        {vendorData?.product?.vendor?.name}
                      </span>
                    </div>
                    <div className="flex flex-col text-primary-1">
                      Address
                      <span className="text-black font-medium">
                        {vendorData?.product?.vendor?.address}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col text-primary-1">
                      Bid Price
                      <span className="text-black font-medium w-40">
                        {vendorData?.bidPrice}
                      </span>
                    </div>
                    <div className="flex flex-col text-primary-1">
                      Total Amount
                      <span className="text-black font-medium">
                        {vendorData?.totalAmount}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col text-primary-1">
                    Quantity
                    <span className="text-black font-medium">
                      {vendorData?.quantity}
                    </span>
                  </div>
                  <div>
                    <table className="table table-pin-rows">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Img URL</th>
                          <th>Product Name</th>
                          <th>Final Price</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* body */}
                        {productData.orderItems.map((orderItem, index) => (
                          <tr>
                            <td className="font-bold">{orderItem.id}</td>
                            <td className="font-bold">
                              <img
                                src={orderItem.product.imageUrl}
                                alt="product-img"
                                width={64}
                              />
                            </td>
                            <td className="font-medium text-primary-1">
                              {orderItem.product.name}{" "}
                              <span className="text-sm text-black">
                                x{orderItem.quantity}
                              </span>
                            </td>
                            <td>
                              Rp{" "}
                              <span>
                                {orderItem.totalAmount === 0
                                  ? calculateTotalPrice(orderItem)
                                  : orderItem.totalAmount}
                              </span>
                            </td>
                            <td className="font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:text-primary-1">
                              {orderItem.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="modal-action">
          <button className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
            Contact Vendor
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalShipping;
