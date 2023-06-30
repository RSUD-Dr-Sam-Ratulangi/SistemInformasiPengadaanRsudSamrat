import React from "react";
import Modal from "../Modal";

const ModalOffer = ({
  onClose,
  onAccept,
  onSubmit,
  bidPrice,
  setBidPrice,
  message,
  setMessage,
  selectedOrderItem,
}) => {
  return (
    <Modal title="Submit Offer" onClose={onClose}>
      <div className="modal-body">
        <p>Product: {selectedOrderItem.product.name}</p>
        <p>Current Price: {selectedOrderItem.product.price}</p>
        <div style={{ display: "grid" }}>
          <label htmlFor="bidPrice">Enter Your Offer: </label>
          <input
            type="number"
            step="0.01"
            id="bidPrice"
            value={bidPrice}
            onChange={(e) => setBidPrice(e.target.value)}
          />
          <label htmlFor="messages">Enter Your Messages:</label>
          <input
            type="text"
            id="messages"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" onClick={onAccept}>
          Accepted
        </button>
        <button type="button" className="btn btn-info" onClick={onSubmit}>
          Submit Offer
        </button>
      </div>
    </Modal>
  );
};

export default ModalOffer;
