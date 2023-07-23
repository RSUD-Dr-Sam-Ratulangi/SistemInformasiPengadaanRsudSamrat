import React, { useEffect } from 'react';
import { MdMoney } from 'react-icons/md';
import html2pdf from 'html2pdf.js';
import logo from '../../assets/images/logo.jpg';

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

  function handlePrintOnClick(e) {
    e.preventDefault();

    console.log('handlePrintOnClick', payoutDetails);

    let tableBody = '';
    payoutDetails.orderItems.forEach(item => {
      tableBody += `
        <tr>
          <td>${item.product.name}</td>
          <td>${item.quantity}</td>
          <td>${item.bidPrice}</td>
          <td>${item.totalAmount}</td>
        </tr>
      `;
    });

    const HTMLToBeConvertedToPDF = `
      <style>
        @page {
          size: letter;
          margin: 1in;
        }
        body {
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
        }
        table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }
        table td,
        table th {
          padding: 8px;
          border: 1px solid #000;
        }
        table th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        img {
          max-width: 50px;
        }
      </style>
      <body>
        <p style="text-align: center; line-height: 1; margin-bottom: 5px;">
          <img src=${logo} alt="Logo" className="logo" style="float: left; margin-right: 10px; height: 50px;">
          <strong style="font-size: 16px;">PEMERINTAH KABUPATEN MINAHASA</strong>
        </p>
        <p style="text-align: center; line-height: 1; margin-bottom: 5px;">
          <strong style="font-size: 14px;">RUMAH SAKIT UMUM DAERAH DR. SAM RATULANGI TONDANO</strong>
        </p>
        <p style="text-align: center; font-size: 12px; line-height: 1;">
          Jl. Suprapto Luaan Kecamatan Tondano Timur Telp. (0431) 321171 Fax. (0431) 321172
        </p>
        <hr style="border: none; height: 1px; background-color: #444444; opacity: 0.5; margin: 10px 0;">

        <h2 style="text-align: center;"><b>Payout Details (${payoutDetails.id})</b></h2>
          <h3>Date: ${payoutDetails.orderDate.split('T')[0]}</h3>
          <h3>Time: ${payoutDetails.orderDate.split('T')[1]}</h3>
          <table>
            <tr>
              <th>Product name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            ${tableBody}
            <tr>
              <th>Total</th>
              <th></th>
              <th></th>
              <th>Rp ${payoutDetails.payment.amount}</th>
            </tr>
          </table>
      </body>
    `;

    const element = document.createElement("div");
    element.innerHTML = HTMLToBeConvertedToPDF;
    const options = {
      margin: [20, 20, 20, 20],
    };

    html2pdf().set(options).from(element).save();
  }

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
          <button
            className='text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2'
            onClick={e => handlePrintOnClick(e)}
          >
            Print
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ModalPayoutDetails;
