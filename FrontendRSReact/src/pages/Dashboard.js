import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
// import Footer from "../components/Footer";
import "../assets/navigation.css";
import "../assets/dashboard.css"
import { useSelector } from "react-redux";


const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.user?.username);
  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth.id)


  // Mock procurement data
  const topVendors = [
      { id: 1, name: "Vendor A", avgPurchase: 2500 },
      { id: 2, name: "Vendor B", avgPurchase: 1800 },
      { id: 3, name: "Vendor C", avgPurchase: 3200 },
      { id: 4, name: "Vendor D", avgPurchase: 1500 },
      { id: 5, name: "Vendor E", avgPurchase: 2800 },
  ];

  const topProducts = [
      { id: 1, name: "Product A", avgPurchase: 3500 },
      { id: 2, name: "Product B", avgPurchase: 2900 },
      { id: 3, name: "Product C", avgPurchase: 1800 },
      { id: 4, name: "Product D", avgPurchase: 2100 },
      { id: 5, name: "Product E", avgPurchase: 3200 },
  ];

  const weeklyExpenses = {
      Monday: 1200,
      Tuesday: 800,
      Wednesday: 1500,
      Thursday: 1000,
      Friday: 2000,
      Saturday: 1800,
      Sunday: 1300,
  };

  const orderStatusRoadmap = [
      { id: 1, status: "ORDER", completed: true },
      { id: 2, status: "NEGOTIATING", completed: true },
      { id: 3, status: "CHECKING", completed: false },
      { id: 4, status: "VALIDATING", completed: false },
      { id: 5, status: "PAYMENT", completed: false },
  ];

  const orderHistory = [
      { id: 1, orderNumber: "PO12345", status: "COMPLETED" },
      { id: 2, orderNumber: "PO12346", status: "COMPLETED" },
      { id: 3, orderNumber: "PO12347", status: "IN_PROGRESS" },
      { id: 4, orderNumber: "PO12348", status: "IN_PROGRESS" },
      { id: 5, orderNumber: "PO12349", status: "IN_PROGRESS" },
  ];

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    

      if (chartInstanceRef.current) {
          // Destroy previous chart instance
          chartInstanceRef.current.destroy();
      }

      // Generate random data for the chart
      const data = Object.values(weeklyExpenses);


      const ctx = chartRef.current.getContext("2d");
      const newChartInstance = new Chart(ctx, {
          type: "pie",
          data: {
              labels: Object.keys(weeklyExpenses),
              datasets: [
                  {
                      label: "Weekly Expenses",
                      data: data,
                      backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#8ED1FC",
                          "#C9DE55",
                          "#B37ACC",
                          "#FF9933",
                      ],
                  },
              ],
          },
      });

      chartInstanceRef.current = newChartInstance;
  }, [weeklyExpenses]);


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendors, setFilteredVendors] = useState(topVendors);
  const [filteredProducts, setFilteredProducts] = useState(topProducts);

  useEffect(() => {
      // Filter vendors based on search query
      const filteredVendors = topVendors.filter((vendor) =>
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVendors(filteredVendors);

      // Filter products based on search query
      const filteredProducts = topProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filteredProducts);
  },

      [searchQuery]);



  return (
      <div className="dashboard">
        <h2>Selamat Datang , {username}<br/> role: {role} id: {id}</h2>
        <div>
        </div>
          {isLoggedIn && (
              <div className="container">
                  <div className="row">
                      <div className="col-md-3">
                          <div className="card bg-primary text-white mb-4">
                              <div className="card-body">
                                  <h5 className="card-title">Total Vendors</h5>
                                  <p className="card-text text-black">{topVendors.length}</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card bg-success text-white mb-4">
                              <div className="card-body">
                                  <h5 className="card-title">Total Products</h5>
                                  <p className="card-text text-black">{topProducts.length}</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card bg-secondary text-white mb-4">
                              <div className="card-body">
                                  <h5 className="card-title">Total Orders</h5>
                                  <p className="card-text text-black">{orderHistory.length}</p>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="card bg-danger text-white mb-4">
                              <div className="card-body">
                                  <h5 className="card-title">Total Order Cancel</h5>
                                  <p className="card-text text-black">0</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <h1>Welcome, {username}</h1>


                          <div className="card">
                              <div className="card-body">
                                  <h5 className="card-title">Top 5 Vendors by Average Purchase</h5>
                                  {filteredVendors.map((vendor) => (
                                      <div key={vendor.id} className="mb-3">
                                          <h6 className="card-subtitle mb-2">{vendor.name}</h6>
                                          <p className="card-text">Average Purchase: ${vendor.avgPurchase}</p>
                                      </div>
                                  ))}
                              </div>
                          </div>
                          <div className="card mt-4">
                              <div className="card-body">
                                  <h5 className="card-title">Top 5 Products by Average Purchase</h5>
                                  {filteredProducts.map((product) => (
                                      <div key={product.id} className="mb-3">
                                          <h6 className="card-subtitle mb-2">{product.name}</h6>
                                          <p className="card-text">Average Purchase: ${product.avgPurchase}</p>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="card">
                              <div className="card-body">
                                  <h5 className="card-title">Weekly Expenses</h5>
                                  <canvas ref={chartRef}></canvas>
                              </div>
                          </div>
                          <div className="card mt-4">
                              <div className="card-body">
                                  <h5 className="card-title">Order Status Roadmap</h5>
                                  <div className="roadmap">
                                      {orderStatusRoadmap.map((status, index) => (
                                          <div
                                              key={status.id}
                                              className={`step ${status.completed ? "completed" : ""}`}
                                          >
                                              {status.status}
                                              {index === orderStatusRoadmap.length - 1 && (
                                                  <span> (Last Order)</span>
                                              )}
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                          <div className="card mt-4">
                              <div className="card-body">
                                  <h5 className="card-title">Last Order</h5>
                                  <p className="card-text">Order Number: {orderHistory[0]?.orderNumber}</p>
                                  <p className="card-text">Status: {orderHistory[0]?.status}</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="search-bar">
                      <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                  </div>
                  <div className="mt-4">
                      <h5>Order History</h5>
                      <table className="table">
                          <thead>
                          <tr>
                              <th>Order Number</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          {orderHistory.map((order) => (
                              <tr key={order.id}>
                                  <td>{order.orderNumber}</td>
                                  <td>{order.status}</td>
                                  <td>
                                      <button className="btn btn-primary">View Details</button>
                                  </td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          )}
          {!isLoggedIn && (
              <div>
                  <p>Please Login</p>
              </div>
          )}
          
        </div>
    );
};

export default Dashboard;