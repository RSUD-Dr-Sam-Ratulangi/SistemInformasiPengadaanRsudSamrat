import React from 'react';
import Modal from '../Modal';

const ModalPayoutDetails = ({ onClose, payoutDetails }) => {
  const calculatePayoutAmount = (orderItems) => {
    let totalAmount = 0;
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      totalAmount += orderItem.quantity * orderItem.product.price;
    }
    return totalAmount;
  };

  return (
    <Modal title='Submit Offer' onClose={onClose}>
      <div className='modal-body'>
        <h4>Order ID: {payoutDetails.id}</h4>
        <h4>Order Date: {payoutDetails.orderDate}</h4>
        <h4>Order Items:</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount Per Item</th>
            </tr>
          </thead>
          <tbody>
            {payoutDetails.orderItems.map((orderItem) => (
              <tr key={orderItem.id}>
                <td>{orderItem.product.name}</td>
                <td>{orderItem.quantity}</td>
                <td>{orderItem.product.price}</td>
                <td>{orderItem.quantity * orderItem.product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>
          Payout Amount: {calculatePayoutAmount(payoutDetails.orderItems)}
        </h4>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-danger' onClick={onClose}>
          Close
        </button>
        <button type='button' className='btn btn-info'>
          Print
        </button>
      </div>
    </Modal>
  );
};

export default ModalPayoutDetails;
