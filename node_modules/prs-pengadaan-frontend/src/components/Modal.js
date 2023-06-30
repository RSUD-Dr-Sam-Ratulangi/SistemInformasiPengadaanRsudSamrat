import React from 'react';

const Modal = ({ title, onClose, children, modalSize }) => {
  return (
    <div className='modal modal-background' style={{ display: 'block' }}>
      <div className={`modal-dialog modal-dialog-centered modal-${modalSize}`}>
        <div className='modal-content'>
          <div className='modal-header'>
            <h3 className='modal-title'>{title}</h3>
            <button type='button' className='close btn' onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
