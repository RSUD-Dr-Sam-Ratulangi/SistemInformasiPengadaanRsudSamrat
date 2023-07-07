import React, { useEffect } from 'react';
import { MdMoney } from 'react-icons/md';

const ModalPayoutDetails = ({ payoutDetails }) => {
  useEffect(() => {
    console.log('modal payout', window.payoutModal.open);
    if (!window.payoutModal.open) {
      window.payoutModal.showModal();
    }
  }, [payoutDetails]);

  const calculatePayoutAmount = (orderItems) => {
    let totalAmount = 0;
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      totalAmount += orderItem.quantity * orderItem.bidPrice;
    }
    return totalAmount;
  };

  // split payoutDetails.orderDate into date and time
  const date = payoutDetails.orderDate.split('T')[0];

  const time = payoutDetails.orderDate.split('T')[1].split('.')[0];

  console.log('payoutDetails', payoutDetails);

  return (
    <dialog id='payoutModal' className='modal'>
      <form method='dialog' className='modal-box max-w-3xl'>
        {/* Header */}
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <MdMoney className='text-2xl text-primary-1' />
            <h3 className='text-xl font-bold'>Payout {payoutDetails.id}</h3>
          </div>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </div>

        <div className='flex flex-col gap-2 '>
          <div className='flex gap-3'>
            <div className='flex flex-col text-primary-1 w-28'>
              Date
              <span className='text-black font-medium'>{date}</span>
            </div>
            <div className='flex flex-col text-primary-1'>
              Time
              <span className='text-black font-medium'>{time}</span>
            </div>
          </div>
          <div>
            <table className='table table-pin-rows'>
              {/* head */}
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {payoutDetails.orderItems.map((orderItem) => (
                  <tr key={orderItem.id}>
                    <td className='font-medium text-primary-1'>
                      {orderItem.product.name}
                    </td>
                    <td>{orderItem.quantity}</td>
                    <td>Rp {orderItem.bidPrice}</td>
                    <td>Rp {orderItem.quantity * orderItem.bidPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex justify-between'>
            <span className='text-primary-1 font-semibold'>Total</span>
            <span className='text-primary-1'>
              Rp
              <span className='text-black ms-2'>
                {calculatePayoutAmount(payoutDetails.orderItems)}
              </span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className='modal-action'>
          <button className='text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2'>
            Print
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ModalPayoutDetails;
