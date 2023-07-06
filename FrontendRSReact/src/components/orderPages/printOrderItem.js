import html2pdf from "html2pdf.js";
import logo from "../../assets/images/logo.jpg";

export default function printOrderItems(selectedOrderItems, history) {
  console.log("from print", selectedOrderItems);
  if (selectedOrderItems && selectedOrderItems.length > 0) {
    const taxRate = 0.11; // 11% tax rate

    let tableRows = "";

    selectedOrderItems.forEach((selectedOrderItem) => {
      const { product, quantity, bidPrice } = selectedOrderItem;
      const row = `
        <tr>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td>Rp.${product.price}</td>
          <td>Rp.${bidPrice}</td>
          <td>${quantity}</td>
        </tr>
      `;
      tableRows += row;
    });

    let secondTableRows = "";

    selectedOrderItems.forEach((selectedOrderItem) => {
      const { quantity, bidPrice } = selectedOrderItem;
      const row = `
        <tr>
        <td>${quantity}</td>
          <td>Rp.${bidPrice}</td>
        </tr>
        `;
      secondTableRows += row;
    });

    const timeAgo = (time) => {
      const now = new Date();
      const then = new Date(time);
      const seconds = Math.round((now - then) / 1000);
      const minutes = Math.round(seconds / 60);
      const hours = Math.round(minutes / 60);
      const days = Math.round(hours / 24);
      const weeks = Math.round(days / 7);
      const months = Math.round(days / 30);
      const years = Math.round(days / 365);

      if (seconds < 60) {
        return "Just now";
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 7) {
        return `${days} days ago`;
      } else if (weeks < 4) {
        return `${weeks} weeks ago`;
      } else if (months < 12) {
        return `${months} months ago`;
      } else {
        return `${years} years ago`;
      }
    };

    console.log("history", history);

    let thirdTableRows = "";

    const newHistory = [];
    history.forEach(item => {
      item.bidItems.forEach(bidItem => {
        newHistory.push({
          ...bidItem,
          status: item.status,
          orderDate: item.orderDate
        });
      });
    });
    newHistory.forEach((e, i) => {
      const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${e.productName}</td>
        <td>${e.bidPrice}</td>
        <td>${e.bidPriceChange}</td>
        <td>${e.status}</td>
        <td>${(e.message) ? e.message : ''}</td>
        <td>${timeAgo(e.orderDate)}</td>
      </tr>`;
      thirdTableRows += row;
    });

    function calculateTotal(selectedOrderItems) {
      let total = 0;
      selectedOrderItems.forEach((selectedOrderItem) => {
        const { quantity, bidPrice } = selectedOrderItem;
        total += quantity * bidPrice;
      });
      return total;
    }

    const letterHtml = `
      <style>
        @page {
          size: letter;
          margin: 1in;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
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

      <h2 style="font-size: 20px;"><b>Menyetujui Tawaran</b></h2>
      <div>
        <p>Kepada ${selectedOrderItems[0].product.vendor.name},</p>
        <p>Kami dengan senang hati memberitahukan bahwa penawaran Anda untuk produk berikut telah diterima:</p>
        <table>
          <tr>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Penawaran Akhir</th>
            <th>Jumlah Barang</th>
          </tr>
          ${tableRows}
        </table>

        <table>
          <tr>
            <th>Jumlah Barang</th>
            <th>Harga Penawaran</th>
          </tr>
          ${secondTableRows}
        </table>

        <table>
          <tr>
            <th>Total</th>
            <th>11% Pajak</th>
            <th>Total Harga (termasuk Pajak)</th>
          </tr>
          <tr>
            <td>Rp.${calculateTotal(selectedOrderItems)}</td>
            <td>Rp.${(calculateTotal(selectedOrderItems) * taxRate).toFixed(
              2
            )}</td>
            <td>Rp.${(
              calculateTotal(selectedOrderItems) +
              calculateTotal(selectedOrderItems) * taxRate
            ).toFixed(2)}</td>
          </tr>
        </table>

        <p>Pembayaran akan diproses sesuai dengan yang disepakati. Harap lanjutkan dengan pengaturan yang diperlukan untuk pengiriman produk.</p>
        <p>Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut, jangan ragu untuk menghubungi kami.</p>
        <p>Terima kasih atas kerjasamanya.</p>
        <br>
        <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Bid Price</th>
                <th>Price Change</th>
                <th>Status</th>
                <th>Messages</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              ${thirdTableRows}
            </tbody>
          </table>
        <br>
        <div style="text-align: right;">
          <p>Hormat kami,</p>
          <p>Penjabat Pengadaan</p>
          <br>
          <br>
          <p style="text-align: right;"><b><span style="font-size: 12px;">VICTOR R MAUKAR</span></b></p>
          <p style="text-align: right;"><b><span style="font-size: 12px;">NIP 197504302007011009</span></b></p>
        </div>
      </div>
    </body>
    `;

    const element = document.createElement("div");
    element.innerHTML = letterHtml;

    const options = {
      margin: [20, 20, 20, 20], // Specify margins: top, left, bottom, right
    };

    html2pdf().set(options).from(element).save();
  }
}
