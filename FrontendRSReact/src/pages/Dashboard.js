import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Chart from "chart.js/auto";
import html2pdf from "html2pdf.js";
import ModalShipping from "../components/orderPages/ModalShipping";

import "../assets/css/dashboardnew.css";
import logo from "../assets/images/logo.jpg";

const Card = ({ title, data, bgColor = "#F7F7F7" }) => {
  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <p className="title">{title}</p>
      {data ? (
        <p className="body">{data}</p>
      ) : (
        <p className="body">Loading data ...</p>
      )}
    </div>
  );
};

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.user?.username);
  const role = useSelector((state) => state.auth.role);

  const [totalVendors, setTotalVendors] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalOrderedProducts, setTotalOrderedProducts] = useState(null);
  const [totalCancelledOrders, setTotalCancelledOrders] = useState(null);

  const [dailyExpenses, setDailyExpenses] = useState(null);
  const [weeklyExpenses, setWeeklyExpenses] = useState(null);
  const [monthlyExpenses, setMonthlyExpenses] = useState(null);

  const [topFiveVendors, setTopFiveVendors] = useState(null);
  const [topFiveOrderedProducts, setTopFiveOrderedProducts] = useState(null);

  const topFiveVendorsChartRef = useRef(null);
  const topFiveVendorsChartInstance = useRef(null);
  const topFiveOrderedProductsChartRef = useRef(null);
  const topFiveOrderedProductsChartInstance = useRef(null);

  const [modalShipping, setModalShipping] = useState(false);
  const [shipping, setShipping] = useState(null);

  useEffect(() => {
    getTotalVendor();
    getTotalProduct();
    getDailyExpenses();
    getWeeklyExpenses();
    getMonthlyExpenses();
    getTotalOrderedProducts();
    getWeeklyExpenses();
    getTopFiveVendors();
  }, []);

  useEffect(() => {
    getTotalCancelledOrder();
    getTopFiveOrderedProducts();
  }, [totalOrderedProducts]);

  useEffect(() => {
    if (topFiveVendors?.length > 0) {
      if (topFiveVendorsChartRef.current) {
        if (topFiveVendorsChartInstance.current) {
          topFiveVendorsChartInstance.current.destroy();
        }

        const ctx = topFiveVendorsChartRef.current.getContext("2d");

        topFiveVendorsChartInstance.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: topFiveVendors.map((vendor) => vendor.vendorName),
            datasets: [
              {
                label: "Top Five Vendors",
                data: topFiveVendors.map((vendor) => vendor.totalPurchase),
                backgroundColor: [
                  "#DC3545",
                  "#FFC106",
                  "#198754",
                  "#0DCAF0",
                  "#0D63FD",
                ],
              },
            ],
          },
        });
      }
    }
  }, [topFiveVendors]);

  useEffect(() => {
    if (topFiveOrderedProducts?.length > 0) {
      if (topFiveOrderedProductsChartRef.current) {
        if (topFiveOrderedProductsChartInstance.current) {
          topFiveOrderedProductsChartInstance.current.destroy();
        }

        const ctx = topFiveOrderedProductsChartRef.current.getContext("2d");

        topFiveOrderedProductsChartInstance.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: topFiveOrderedProducts.map(
              (orderedProduct) => orderedProduct.productName
            ),
            datasets: [
              {
                label: "Top Five Vendors",
                data: topFiveOrderedProducts.map(
                  (orderedProduct) => orderedProduct.totalPurchase
                ),
                backgroundColor: [
                  "#DC3545",
                  "#FFC106",
                  "#198754",
                  "#0DCAF0",
                  "#0D63FD",
                ],
              },
            ],
          },
        });
      }
    }
  }, [topFiveOrderedProducts]);

  function handleCetakPDFTopFiveVendorsOnClick() {
    const head = "<tr><th>No.</th><th>Vendor Name</th><th>Total Purchase Value</th></tr>"

    let rows = "";
    topFiveVendors.forEach((item, index) => {
      const row = `
        <tr>
          <th>${index + 1}</th>
          <th>${item.vendorName}</th>
          <th>${formatToRp(item.totalPurchase)}</th>
        </tr>
      `;
      rows += row;
    });

    createPDF('Top Five Vendors by Purchase Value', head, rows);
  }

  function handleCetakPDFTopFiveOrderedProductsOnClick() {
    const head = "<tr><th>No.</th><th>Product Name</th><th>Total Purchase Value</th></tr>"

    let rows = "";
    topFiveOrderedProducts.forEach((item, index) => {
      const row = `
        <tr>
          <th>${index + 1}</th>
          <th>${item.productName}</th>
          <th>${formatToRp(item.totalPurchase)}</th>
        </tr>
      `;
      rows += row;
    });

    createPDF('Top Five Products by Purchase Value', head, rows);
  }

  

  async function getTotalVendor() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25"
      );
      setTotalVendors(res.data);
      // console.log("getTotalVendor", res.data);
    } catch (err) {
      console.log("Unable to get total vendor.", err.message);
    }
  }

  async function getTotalProduct() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/products/2/50"
      );
      setTotalProducts(res.data.content);
      // console.log("getTotalProduct", res.data.content);
    } catch (err) {
      console.log("Unable to get total prodcut.", err.message);
    }
  }

  async function getTotalOrderedProducts() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock"
      );
      setTotalOrderedProducts(res.data);
      // console.log("getTotalOrderedProducts", res.data);
    } catch (err) {
      console.log("Unable to get ordered products.", err.message);
    }
  }

  async function getDailyExpenses() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/daily"
      );
      setDailyExpenses(res.data);
      // console.log("getDailyExpenses", res.data);
    } catch (err) {
      console.log("Unable to get daily expenses.", err.message);
    }
  }

  async function getWeeklyExpenses() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/weekly"
      );
      setWeeklyExpenses(res.data);
      // console.log("getWeeklyExpenses", res.data);
    } catch (err) {
      console.log("Unable to get weekly expenses.", err.message);
    }
  }

  async function getMonthlyExpenses() {
    try {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString().padStart(2, "0");

      const res = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/monthly?date=${year}-${month}`
      );
      setMonthlyExpenses(res.data);
      // console.log("getMonthlyExpenses", res.data);
    } catch (err) {
      console.log("Unable to get montly expenses.", err.message);
    }
  }

  async function getTotalCancelledOrder() {
    try {
      // get orderId, status
      let filteredOrderedProducts = totalOrderedProducts.map(
        (orderedProduct) => {
          if (orderedProduct.status === "CANCEL") {
            return {
              orderId: orderedProduct.orderId,
              status: orderedProduct.status,
            };
          }
        }
      );

      // remove undefined values
      filteredOrderedProducts = filteredOrderedProducts.filter(
        (orderedProduct) => orderedProduct !== undefined
      );

      // remove duplicates
      const newTotalCancelledOrder = [];
      const orderIdSet = new Set();
      filteredOrderedProducts.forEach((orderedProduct) => {
        if (!orderIdSet.has(orderedProduct.orderId)) {
          orderIdSet.add(orderedProduct.orderId);
          newTotalCancelledOrder.push(orderedProduct);
        }
      });

      // console.log("filteredOrderedProducts", filteredOrderedProducts, "newTnewTotalCancelledOrder", newTotalCancelledOrder);
      setTotalCancelledOrders(newTotalCancelledOrder);
    } catch (err) {
      console.log("Unable to set total cancelled order.", err.message);
    }
  }

  async function getTopFiveVendors() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/top-vendor?limit=5"
      );
      setTopFiveVendors(
        res.data.sort((a, b) => b.totalPurchase - a.totalPurchase)
      );
      // console.log("getTopFiveVendors", res.data.sort((a, b) => b.totalPurchase - a.totalPurchase));
    } catch (err) {
      console.log("Unable to get top vendors.", err.message);
    }
  }

  async function getTopFiveOrderedProducts() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/top-product?limit=5"
      );
      setTopFiveOrderedProducts(res.data);
      // console.log("getTopFiveOrderedProducts", res.data);
    } catch (err) {
      console.log("Unable to set top five products.", err.message);
    }
  }

  function formatToRp(value) {
    if (!value) return "Rp. 0";
    return (
      "Rp. " +
      value
        .toString()
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    );
  }

  function createPDF(title, head, rows) {
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

        <h2 style="text-align: center;"><b>${title}</b></h2>
        <table>
          ${head}
          ${rows}
        </table>
      </body>
    `;

    const element = document.createElement("div");
    element.innerHTML = HTMLToBeConvertedToPDF;
    const options = {
      margin: [20, 20, 20, 20]
    };

    html2pdf().set(options).from(element).save();
  }

  return (
    <div id="dashboard-page">
      <h2 className="mb-12 welcome-title">
        Selamat Datang , {username} ({role})
      </h2>

      {!isLoggedIn ? (
        <div>
          <p>Please login first</p>
        </div>
      ) : (
        <main>
          {/* Cards */}
          <div className="cards-wrapper cards-wrapper-top">
            <Card
              title="Total Vendors"
              data={totalVendors ? totalVendors.length : null}
              bgColor="#FFC106"
            />
            <Card
              title="Total Products"
              data={totalProducts ? totalProducts.length : null}
              bgColor="#0DCAF0"
            />
            <Card
              title="Total Ordered Products"
              data={totalOrderedProducts ? totalOrderedProducts.length : null}
              bgColor="#0DCAF0"
            />
            <Card
              title="Total Cancelled Products"
              data={totalCancelledOrders ? totalCancelledOrders.length : null}
              bgColor="#0DCAF0"
            />
          </div>

          <div className="mt-4 cards-wrapper" style={{ color: "white" }}>
            <Card
              title="Daily Expenses"
              data={
                dailyExpenses ? formatToRp(dailyExpenses.totalExpense) : null
              }
              bgColor="#DC3545"
            />
            <Card
              title="Weekly Expenses"
              data={
                weeklyExpenses ? formatToRp(weeklyExpenses.totalExpense) : null
              }
              bgColor="#198754"
            />
            <Card
              title="Monthly Expenses"
              data={
                monthlyExpenses
                  ? formatToRp(monthlyExpenses.totalExpense)
                  : null
              }
              bgColor="#0D63FD"
            />
          </div>

          <div className="max-w-xl mx-auto mt-5">
            <h2 className="mb-2 text-xl font-semibold">Shipping</h2>
            <input
              className="w-full input input-bordered"
              type="text"
              placeholder="Search Order ID"
              onChange={(e) => setShipping(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setModalShipping(true);
                }
              }}
            />
            {modalShipping && (
              <ModalShipping
                shipping={shipping}
                onClose={() => setModalShipping(false)}
              />
            )}
          </div>

          <div className="mt-12 top-contents-wrapper">
            {/* Top Vendors */}
            {topFiveVendors
              ? (
                <div className="top-content">
                  <div className="top-content-detail-chart-wrapper">
                    <div className="detail">
                      <p className="title">Top 5 Vendors by Highest Purchase Value</p>
                      <ol>
                        {topFiveVendors.map((vendor, index) => (
                          <li key={index}>
                            <p className="body">
                              <b>{vendor.vendorName}</b>
                            </p>
                            <p className="body">
                              Total purchase value:{" "}
                              {formatToRp(vendor.totalPurchase)}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="chart">
                      <canvas ref={topFiveVendorsChartRef} />
                    </div>
                  </div>
                  <button
                    className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
                    onClick={handleCetakPDFTopFiveVendorsOnClick}
                  >
                    Cetak PDF (Top 5 Vendors)</button>
                </div>
              )
              : <p className="body">Loading data ...</p>
            }

            {/* Top Products */}
            {topFiveOrderedProducts
              ? (
                <div className="top-content">
                  <div className="top-content-detail-chart-wrapper">
                    <div className="detail">
                      <p className="title">Top 5 Products by Total Purchase Value</p>
                      <ol>
                        {topFiveOrderedProducts.map((orderedProduct, index) => (
                          <li key={index}>
                            <p className="body">
                              <b>{orderedProduct.productName}</b>
                            </p>
                            <p className="body">
                              Total Purchase Value:{" "}
                              {formatToRp(orderedProduct.totalPurchase)}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="chart">
                      <canvas ref={topFiveOrderedProductsChartRef} />
                    </div>
                  </div>
                  <button
                    className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
                    onClick={handleCetakPDFTopFiveOrderedProductsOnClick}
                  >
                    Cetak PDF (Top 5 Products)
                  </button>
                </div>
              )
              : <p className="body">Loading data ...</p>
            }
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
