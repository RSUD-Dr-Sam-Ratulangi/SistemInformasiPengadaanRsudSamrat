import React from 'react';
import Modal from '../Modal';

const ModalSubmittedOffer = ({ onClose, product }) => {
  return (
    <Modal title='Offer Submitted' onClose={onClose}>
      <div className='modal-body'>
        <p>
          Your offer for the product <b>{product}</b> has been successfully
          submitted.
        </p>
      </div>
    </Modal>
  );
};

export default ModalSubmittedOffer;
