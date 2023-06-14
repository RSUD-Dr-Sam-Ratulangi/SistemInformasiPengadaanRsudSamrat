import React from 'react';
import Modal from '../Modal';

const ModalProductDetails = ({ onClose, selectedProduct }) => {
  return (
    <Modal title='Product Details' onClose={onClose}>
      <div className='modal-body'>
        <p>Product ID: {selectedProduct.id}</p>
        <p>Product UUID: {selectedProduct.productuuid}</p>
        <p>Product Name: {selectedProduct.name}</p>
        <p>Product Description: {selectedProduct.description}</p>
        <p>Product Price: {selectedProduct.price}</p>
        <p>Product Quantity: {selectedProduct.quantity}</p>
        <p>Vendor ID: {selectedProduct.vendor.id}</p>
        <p>Vendor UUID: {selectedProduct.vendor.vendoruuid}</p>
        <p>Vendor Name: {selectedProduct.vendor.name}</p>
        <p>Vendor Address: {selectedProduct.vendor.address}</p>
        <p>Vendor Phone Number: {selectedProduct.vendor.phoneNumber}</p>
        <p>Vendor Owner ID: {selectedProduct.vendor.owner.id}</p>
        <p>Vendor Owner Username: {selectedProduct.vendor.owner.username}</p>
      </div>
    </Modal>
  );
};

export default ModalProductDetails;
