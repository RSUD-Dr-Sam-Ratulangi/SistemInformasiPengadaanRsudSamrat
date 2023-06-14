import React from 'react';
import Modal from '../Modal';

const ModalAcceptedOffer = ({ onClose, product }) => {
  return (
    <Modal title='Offer Accepted' onClose={onClose}>
      <div className='modal-body'>
        <p>
          Your offer for the product <b>{product}</b> has been accepted.
        </p>
      </div>
    </Modal>
  );
};

export default ModalAcceptedOffer;
