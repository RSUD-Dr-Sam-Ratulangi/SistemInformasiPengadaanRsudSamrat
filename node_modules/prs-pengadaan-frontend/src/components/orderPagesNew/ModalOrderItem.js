import React from 'react';
import Modal from '../Modal';
import printOrderItem from './printOrderItem';

const ModalOrderItem = ({ onClose, onSubmit, selectedOrderItem }) => {
  console.log(onSubmit);
  return (
    <Modal title='Submit Order' onClose={onClose}>
      <div className='modal-body'>
        <p>Status: {selectedOrderItem.status}</p>
        <p>Bid Price: {selectedOrderItem.bidPrice}</p>
        <p>Order Item: {selectedOrderItem.quantity}</p>
        <p>
          Total Price: {selectedOrderItem.bidPrice * selectedOrderItem.quantity}
        </p>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-success' onClick={onSubmit}>
          Submit
        </button>
        <button type='button' className='btn btn-danger' onClick={onClose}>
          Cancel
        </button>
        <button
          type='button'
          className='btn btn-info'
          onClick={() => printOrderItem(selectedOrderItem)}>
          Print
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrderItem;
