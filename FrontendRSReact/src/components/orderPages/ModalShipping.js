import React, { useEffect } from "react";
import { MdLocalShipping } from "react-icons/md";

const ModalShipping = ({ shipping, onClose }) => {
  useEffect(() => {
    console.log("modal shipping", window.shippingModal.open);
    if (!window.shippingModal.open) {
      window.shippingModal.showModal();
    }
  }, [shipping]);

  useEffect(() => {
    // fetch data here using "shipping props"
  }, []);

  return (
    <dialog id="shippingModal" className="modal">
      <div className="modal-box max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MdLocalShipping className="text-2xl text-primary-1" />
            <h3 className="text-xl font-bold">Shipping</h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div>
            <ul className="steps w-full">
              <li data-content="●" className="step step-neutral">
                Ordered
              </li>
              <li data-content="●" className="step step-neutral">
                Shipping
              </li>
              <li data-content="✓" className="step step-neutral">
                Received
              </li>
            </ul>
          </div>
          <div>
            <ul className="steps steps-vertical w-full">
              <li className="step step-primary w-full">
                <div className="flex w-full justify-start">
                  <span className="font-semibold w-44 text-start">
                    6 Jul 2023 | 15:07
                  </span>
                  On Courier
                </div>
              </li>
              <li className="step">
                <div className="flex w-full justify-start">
                  <span className="font-semibold w-44 text-start">
                    5 Jul 2023 | 05:07
                  </span>
                  Arrived in Tondano
                </div>
              </li>
              <li className="step">
                <div className="flex w-full justify-start">
                  <span className="font-semibold w-44 text-start">
                    4 Jul 2023 | 01:07
                  </span>
                  Arrived in Minahasa
                </div>
              </li>
              <li className="step">
                <div className="flex w-full justify-start">
                  <span className="font-semibold w-44 text-start">
                    3 Jul 2023 | 21:07
                  </span>
                  Shipped
                </div>
              </li>
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
