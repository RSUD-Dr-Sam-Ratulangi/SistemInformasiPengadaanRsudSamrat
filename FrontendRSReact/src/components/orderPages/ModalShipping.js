import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdLocalShipping } from "react-icons/md";

const ModalShipping = ({ shipping, onClose }) => {
  const [shippingData, setShippingData] = useState([]);
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
  }, []);

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

  const getCurrentStatus = (status) => {
    // Compare the current status with the status in the shippingData object
    return shippingData.some((data) => data.status === status) ? "success" : "";
  };

  return (
    <dialog id="shippingModal" className="modal">
      <div className="max-w-5xl modal-box">
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
                className={`step step-${getCurrentStatus("CHECKING")}`}
              >
                CHECKING
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
                className={`step step-${getCurrentStatus("PAYMENT")}`}
              >
                PAYMENT
              </li>
              <li
                data-content="●"
                className={`step step-${getCurrentStatus("CANCEL")}`}
              >
                CANCEL
              </li>
              <li
                data-content="✓"
                className={`step step-${getCurrentStatus("COMPLETE")}`}
              >
                COMPLETE
              </li>
            </ul>
          </div>
          <div>
            <ul className="w-full steps steps-vertical">
              {shippingData.map((data, i) => (
                <li
                  key={i}
                  data-content="✓"
                  className={`w-full step ${
                    i === 0 ? "step-success" : "step-neutral"
                  }`}
                >
                  <div className="flex justify-start w-full">
                    <span className="font-semibold w-44 text-start">
                      {timeAgo(data.timestamp)}
                    </span>
                    {data.status}
                  </div>
                </li>
              ))}
            </ul>
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
