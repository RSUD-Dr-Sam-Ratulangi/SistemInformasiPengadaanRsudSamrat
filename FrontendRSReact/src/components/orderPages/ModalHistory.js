import React from 'react';
import Modal from '../Modal';

const ModalHistory = ({ onClose, history }) => {
  return (
    <Modal title='History' onClose={onClose}>
      <div className='modal-body'>
        <p>See your History</p>
        <table className='table'>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Bid Price</th>
              <th>Price Change</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((e) => (
              <tr key={e.id}>
                <td>{e.productName}</td>
                <td>{e.bidPrice}</td>
                <td>{e.bidPriceChange}</td>
                <td>{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='modal-footer'>
        <p>See Your history Order</p>
      </div>
    </Modal>
  );
};

export default ModalHistory;
