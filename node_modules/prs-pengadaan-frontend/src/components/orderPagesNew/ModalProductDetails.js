import React, { useEffect } from "react";
import { MdInfo } from "react-icons/md";

const ModalProductDetails = ({ selectedProduct }) => {
  useEffect(() => {
    console.log("modal info", window.infoModal.open);
    if (!window.infoModal.open) {
      window.infoModal.showModal();
    }
  }, [selectedProduct]);

  return (
    <dialog id="infoModal" className="modal">
      <form method="dialog" className="modal-box max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MdInfo className="text-2xl text-primary-1" />
            <h3 className="text-xl font-bold">Product info</h3>
          </div>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2 ">
          <h2 className="text-3xl font-semibold text-slate-600">
            {selectedProduct.name}
          </h2>
          <div className="flex gap-3">
            <div className="flex flex-col text-primary-1 w-40">
              Price
              <span className="text-black font-medium">
                {selectedProduct.price}
              </span>
            </div>
            <div className="flex flex-col text-primary-1">
              Supply
              <span className="text-black font-medium">
                {selectedProduct.quantity}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-primary-1 w-40">
            Description
            <span className="text-black font-medium">
              {selectedProduct.description}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-600">
              Vendor Details
            </h2>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col text-primary-1">
              Owner
              <span className="text-black font-medium w-40">
                {selectedProduct.vendor.owner.username}
              </span>
            </div>
            <div className="flex flex-col text-primary-1">
              Phone Number
              <span className="text-black font-medium">
                {selectedProduct.vendor.phoneNumber}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col text-primary-1">
              Name
              <span className="text-black font-medium w-40">
                {selectedProduct.vendor.name}
              </span>
            </div>
            <div className="flex flex-col text-primary-1">
              Address
              <span className="text-black font-medium">
                {selectedProduct.vendor.address}
              </span>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default ModalProductDetails;
