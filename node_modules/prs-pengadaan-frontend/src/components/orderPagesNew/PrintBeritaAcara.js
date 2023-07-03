import html2pdf from "html2pdf.js";
import logo from "../../assets/images/logo.jpg";

export default function PrintBeritaAcara(selectedOrder) {
  const selectedOrderItems = selectedOrder.orderItems;
  console.log("from print", selectedOrderItems);
  if (selectedOrderItems && selectedOrderItems.length > 0) {
    const taxRate = 0.11; // 11% tax rate

    let tableRows = "";

    selectedOrderItems.forEach((selectedOrderItem, index) => {
      const { product, quantity, bidPrice } = selectedOrderItem;
      const row = `
        <tr>
          <td>${index}</td>
          <td>${product.name}</td>
          <td>${quantity}</td>
          <td>${product.description}</td>
          <td>Rp.${product.price}</td>
          <td>Rp.${bidPrice}</td>
        </tr>
      `;
      tableRows += row;
    });

    // let secondTableRows = "";

    // selectedOrderItems.forEach((selectedOrderItem) => {
    //   const { quantity, bidPrice } = selectedOrderItem;
    //   const row = `
    //     <tr>
    //     <td>${quantity}</td>
    //       <td>Rp.${bidPrice}</td>
    //     </tr>
    //     `;
    //   secondTableRows += row;
    // });

    function calculateTotal(selectedOrderItems) {
      let total = 0;
      selectedOrderItems.forEach((selectedOrderItem) => {
        const { quantity, bidPrice } = selectedOrderItem;
        total += quantity * bidPrice;
      });
      return total;
    }

    function getCurrentDate() {
      // List of Indonesian month names
      const indonesianMonths = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      // List of Indonesian day names
      const indonesianDays = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];

      // Get current date
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      // Get the corresponding month name
      const monthName = indonesianMonths[month - 1];

      // Get the corresponding day name
      const dayName = indonesianDays[day % 7];

      // Convert day value to Indonesian text
      const units = [
        "nol",
        "satu",
        "dua",
        "tiga",
        "empat",
        "lima",
        "enam",
        "tujuh",
        "delapan",
        "sembilan",
        "sepuluh",
        "sebelas",
      ];
      let dayText = "";
      if (day <= 11) {
        dayText = units[day];
      } else if (day <= 19) {
        dayText = units[day % 10] + " belas";
      } else if (day <= 99) {
        dayText = units[Math.floor(day / 10)] + " puluh " + units[day % 10];
      } else {
        dayText = day.toString(); // Fallback for unsupported values
      }

      // Convert year value to Indonesian text
      let yearText = "";
      for (let i = 0; i < year.toString().length; i++) {
        const digit = parseInt(year.toString()[i]);
        yearText += units[digit] + " ";
      }

      // Create the custom date string
      const dateString = `Pada ${dayName} tanggal ${dayText} ${monthName} tahun ${yearText}`;

      return dateString;
    }

    console.log("print vendor name", selectedOrderItems[0].product.vendor.name);

    const getCurrentDateNumber = () => {
      // get date in 20 Januray 2023 format
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      return `${day} ${month} ${year}`;
    };

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

      <h2 style="font-size: 20px;"><b>BERITA ACARA PEMERIKSAAN HASIL PEKERJAAN</b></h2>
      <br />
      <div>
        <p>${getCurrentDate()} bertempat di RSUD DR. Sam Ratulangi Tondano berdasarkan Surat Keputusan Direktur RSUD Dr. Sam Ratulangi Tondano No. Tahun 2023, atas Nama:</p>
        <div style="display: flex; flex-direction: column; justify-content: flex-start">
          <div style="display: flex">
            <span style="width: 50px">1</span>
            <span style="width: 300px">Dr. Novita Roring, M.Kes</span>
            <span style="width: 200px">Sebagai Ketua</span>
          </div>
          <div style="display: flex">
            <span style="width: 50px">2</span>
            <span style="width: 300px">Frisky Tandaju, SE</span>
            <span style="width: 200px">Sebagai Sekretaris</span>
          </div>
          <div style="display: flex">
            <span style="width: 50px">3</span>
            <span style="width: 300px">Jufri Charlse Weku</span>
            <span style="width: 200px">Sebagai Anggota</span>
          </div>
        </div>
        <br />
        <p>Adalah Panitia Pemeriksa Hasil Pekerjaan, masing - masing karena jabatannya, dengan ini menyatakan dengan sebenarnya telah melaksanakan pemeriksaan terhadap penyerahan barang/jasa yang dipesan dari:</p>
        <br />
        <div style="display: flex; flex-direction: column; justify-content: flex-start">
          <div style="display: flex">
            <span style="width: 300px">Nama Perusahaan</span>
            <span style="width: 200px">: ${
              selectedOrderItems[0].product.vendor.name
            }</span>
          </div>
          <div style="display: flex">
            <span style="width: 300px">Nama Perusahaan</span>
            <span style="width: 200px">: ${
              selectedOrderItems[0].product.vendor.address
            }</span>
          </div>
        </div>
        <p>Sebagai realisasi SPK/SP : temporary(108SPK-PPK/RS/I/203 Tgl. ${getCurrentDateNumber()} dengan jumlah/jenis barang: </p>
        <p>Pengadaan Bahan Habis Pakai Laboratorium</p>
        <table>
          <tr>
            <th>No. </th>
            <th>Nama/Jenis Barang</th>
            <th>Jumlah Barang</th>
            <th>Ket.</th>
            <th>Harga Satuan</th>
            <th>Jumlah (Rp.)</th>
          </tr>
          ${tableRows}
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

        <p>Yang selanjutnya akan diserahkan pada Bendaharan Barang.</p>
        <p>Demikian Berita Acara ini dibuat dalam rangkap2(2) untuk dipergunakan sebagaimana mestinya.</p>
        <br>
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <div style="flex: 1; width: 500px; white-space: nowrap">
            <span>PENYEDIA BARANG / JASA</span>
          </div>
          <div style="margin-left: 100px">
          <span>PANITIA PEMERIKSA HASIL PEKERJAAN</span>
          <div style="display: flex; flex-direction: column; justify-content: flex-start; height: 500px; float: right">
            <div style="display: flex">
                <span style="width: 50px">1</span>
                <span style="width: 300px">Dr. Novita Roring, M.Kes</span>
              </div>
              <div style="display: flex">
                <span style="width: 50px">2</span>
                <span style="width: 300px">Frisky Tandaju, SE</span>
              </div>
              <div style="display: flex">
              <span style="width: 50px">3</span>
                <span style="width: 400px">Jufri Charlse Weku</span>
              </div>
            </div>
          </div>
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
