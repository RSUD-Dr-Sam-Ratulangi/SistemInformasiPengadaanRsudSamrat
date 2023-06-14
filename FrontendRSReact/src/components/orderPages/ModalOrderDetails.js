import React from 'react';
import Modal from '../Modal';
import { FaTrash, FaInfoCircle, FaHandshake, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ModalOrderDetails = ({
  onClose,
  selectedOrder,
  handleHistory,
  handleDetailProduct,
  handleOffer,
  handleOpenSubmitModal,
  handlePayoutDetail
}) => {
  const navigate = useNavigate();

  const handleQuantityChange = (orderItemId, newQuantity) => {
    console.log('quantity changed', orderItemId, newQuantity);
  };

  const handleDeleteOrderItem = (orderItemId) => {
    const confirmed = window.confirm(
      'Apakah Anda yakin ingin menghapus produk ini?'
    );

    if (confirmed) {
      fetch(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orderitems/${orderItemId}`,
        {
          method: 'DELETE'
        }
      )
        .then((response) => {
          if (response.ok) {
            // Data berhasil dihapus, lakukan tindakan tambahan jika diperlukan
            console.log('Data berhasil dihapus');
          } else {
            // Gagal menghapus data, tangani kesalahan jika diperlukan
            console.error('Gagal menghapus data');
          }
        })
        .catch((error) => {
          // Tangani kesalahan dalam permintaan
          console.error('Terjadi kesalahan:', error);
        });
    }
  };

  return (
    <Modal title='SubOrder Details' onClose={onClose} modalSize='xl'>
      <div className='modal-body'>
        <h4>Order Items:</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Product UUID</th>
              <th>Vendor Name</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>bidprice</th>
              <th>STATUS</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const vendorItemsMap = new Map();

              selectedOrder.orderItems.forEach((orderItem) => {
                const vendorName = orderItem.product.vendor.name;

                if (vendorItemsMap.has(vendorName)) {
                  vendorItemsMap.get(vendorName).push(orderItem);
                } else {
                  vendorItemsMap.set(vendorName, [orderItem]);
                }
              });

              const allItemsAccepted = [...vendorItemsMap].every(
                ([vendorName, orderItems]) =>
                  orderItems.every(
                    (orderItem) => orderItem.status === 'ACCEPTED'
                  )
              );

              return [...vendorItemsMap].map(([vendorName, orderItems]) => (
                <React.Fragment key={vendorName}>
                  <tr>
                    <td colSpan='9'>
                      <strong>{vendorName}</strong>
                    </td>
                  </tr>
                  {orderItems.map((orderItem) => (
                    <tr key={orderItem.id}>
                      <td>{orderItem.id}</td>
                      <td>{orderItem.product.productuuid}</td>
                      <td>{vendorName}</td>
                      <td>{orderItem.product.name}</td>
                      <td>{orderItem.product.price}</td>
                      <td>{orderItem.bidPrice}</td>
                      <td
                        onClick={() => handleHistory(orderItem.id)}
                        className='history-click'>
                        {orderItem.status}
                      </td>
                      <td>
                        <button
                          className='btn btn-sm btn-secondary'
                          onClick={() =>
                            handleQuantityChange(
                              orderItem.id,
                              orderItem.quantity - 1
                            )
                          }>
                          -
                        </button>
                        {orderItem.quantity}
                        <button
                          className='btn btn-sm btn-secondary'
                          onClick={() =>
                            handleQuantityChange(
                              orderItem.id,
                              orderItem.quantity + 1
                            )
                          }>
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          className='btn btn-sm btn-clear text-danger'
                          onClick={() => handleDeleteOrderItem(orderItem.id)}>
                          <FaTrash />
                        </button>
                        <button
                          className='btn btn-sm btn-clear text-info'
                          onClick={() =>
                            handleDetailProduct(orderItem.product.productuuid)
                          }>
                          <FaInfoCircle />
                        </button>
                        <button
                          className='btn btn-sm btn-clear text-success'
                          onClick={() => handleOffer(orderItem.id)}>
                          <FaHandshake />
                        </button>
                        {orderItem.status === 'ACCEPTED' && (
                          <button
                            className='btn btn-sm btn-clear text-success'
                            onClick={() => handleOpenSubmitModal(orderItem)}>
                            <FaCheck />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orderItems.some(
                    (orderItem) => orderItem.status === 'ACCEPTED'
                  ) && (
                    <tr>
                      <td colSpan='9'>
                        <button
                          className='btn btn-sm btn-success'
                          onClick={() => console.log(vendorItemsMap)}>
                          Submit All
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ));
            })()}
          </tbody>
        </table>
        <div>
          <button
            className='btn btn-primary'
            onClick={() => navigate('/products')}>
            Add Product
          </button>
        </div>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={handlePayoutDetail}>
          Payout Detail
        </button>
        <button type='button' className='btn btn-secondary'>
          Check Status
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrderDetails;
