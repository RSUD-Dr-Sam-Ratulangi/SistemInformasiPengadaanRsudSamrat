import React, { useEffect } from "react";
import { MdHandshake } from "react-icons/md";

const ModalOffer = ({
  onAccept,
  onSubmit,
  bidPrice,
  setBidPrice,
  message,
  setMessage,
  selectedOrderItem,
}) => {
  useEffect(() => {
    console.log("modal negotiation", window.negotiationModal.open);
    if (!window.negotiationModal.open) {
      window.negotiationModal.showModal();
    }
  }, [selectedOrderItem]);

  return (
    <dialog id="negotiationModal" className="modal">
      <form method="dialog" className="modal-box max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MdHandshake className="text-2xl text-primary-1" />
            <h3 className="text-xl font-bold">Negotation</h3>
          </div>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2 ">
          <h2 className="text-3xl font-semibold text-slate-600">
            {selectedOrderItem.product.name}
          </h2>
          <div className="flex gap-3">
            <div className="flex flex-col text-primary-1 w-28">
              Price
              <span className="text-black font-medium">
                Rp {selectedOrderItem.product.price}
              </span>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label
                htmlFor="negotiation-input"
                className="font-semibold text-xl mb-2"
              >
                Your Offer
              </label>
              <input
                id="negotation-input"
                type="number"
                placeholder={`${bidPrice}`}
                value={`${bidPrice}`}
                onChange={(e) => setBidPrice(e.target.value)}
                className="w-full input border-primary-1 focus:outline-primary-1 "
              />
            </div>
            <div>
              <label
                htmlFor="negotiation-input"
                className="font-semibold text-xl mb-2"
              >
                Message
              </label>
              <textarea
                id="negotation-input"
                type="number"
                placeholder="Message..."
                className="w-full textarea border-primary-1 focus:outline-primary-1 "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action">
          {/* <button
            onClick={onAccept}
            className="btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
          >
            Accept
          </button> */}
          <button
            onClick={onSubmit}
            className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
          >
            Submit Offer
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ModalOffer;
