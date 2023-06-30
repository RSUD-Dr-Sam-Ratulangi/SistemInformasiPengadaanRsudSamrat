import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Chart from 'chart.js/auto';

import '../assets/css/dashboard.css'



// dummy data
const dummyTopFiveVendors = [
  { id: 62, name: 'ITRTEST', totalOrders: 104, totalPurchase: 1641530384 },
  { id: 63, name: 'VENDOR DARKZILL', totalOrders: 34, totalPurchase: 1062 },
  { id: 7, name: 'Vendor 1', totalOrders: 33, totalPurchase: 889.1100000000004 },
  { id: 6, name: 'Vendor 1', totalOrders: 24, totalPurchase: 429.57000000000005 },
  { id: 21, name: 'Vendor 1', totalOrders: 10, totalPurchase: 342 },
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



const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.user?.username);
  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth.id);

  const [totalVendors, setTotalVendors] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalOrderedProducts, setTotalOrderedProducts] = useState(null);
  const [totalCancelledOrders, setTotalCancelledOrders] = useState(null);
  const [topFiveVendors, setTopFiveVendors] = useState(null);
  const [topFiveOrderedProducts, setTopFiveOrderedProducts] = useState(null);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);



  useEffect(() => {
    getTotalVendor();
    getTotalProduct();
    getOrderedProducts();
    getTopFiveVendors();
  }, []);

  useEffect(() => {
    getTotalCancelledOrder();
    getTopFiveOrderedProducts();
  }, [totalOrderedProducts]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      // Destroy previous chart instance
      chartInstanceRef.current.destroy();
    }

    // Generate random data for the chart
    const data = Object.values(weeklyExpenses);

    const ctx = chartRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(weeklyExpenses),
        datasets: [
          {
            label: 'Weekly Expenses',
            data: data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#8ED1FC',
              '#C9DE55',
              '#B37ACC',
              '#FF9933',
            ],
          },
        ],
      },
    });

    chartInstanceRef.current = newChartInstance;
  }, [weeklyExpenses]);



  async function getTotalVendor() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25');
      setTotalVendors(res.data);
      // console.log('getTotalVendor', res.data);
    }
    catch(err) {
      console.log('Unable to get total vendor. ', err.message);
    }
  }
  
  async function getTotalProduct() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/products/2/50');
      setTotalProducts(res.data.content);
      // console.log('getTotalProduct', res.data.content);
    }
    catch(err) {
      console.log('Unable to get total prodcut. ', err.message);
    }
  }

  async function getOrderedProducts() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock');
      setTotalOrderedProducts(res.data);
      // console.log('getOrderedProducts', res.data);
    }
    catch(err) {
      console.log('Unable to get ordered products. ', err.message);
    }
  }

  async function getTotalCancelledOrder() {
    try {
      // get orderId, status
      let filteredOrderedProducts = totalOrderedProducts.map(orderedProduct => {
        if(orderedProduct.status === 'CANCEL') {
          return {
            orderId: orderedProduct.orderId,
            status: orderedProduct.status
          };
        }
      });

      // remove undefined values
      filteredOrderedProducts = filteredOrderedProducts.filter(orderedProduct => orderedProduct !== undefined);

      // remove duplicates
      const newTotalCancelledOrder = [];
      const orderIdSet = new Set();
      filteredOrderedProducts.forEach(orderedProduct => {
        if(!orderIdSet.has(orderedProduct.orderId)) {
          orderIdSet.add(orderedProduct.orderId);
          newTotalCancelledOrder.push(orderedProduct);
        }
      })

      // console.log('filteredOrderedProducts', filteredOrderedProducts, 'newTnewTotalCancelledOrder', newTotalCancelledOrder);
      setTotalCancelledOrders(newTotalCancelledOrder);
    }
    catch(err) {
      console.log('Unable to set total cancelled order. ', err.message);
    }
  }

  async function getTopFiveVendors() {
    try {
      // const res = await axios.get('');
      // setTopFiveVendors(res);
      setTopFiveVendors(dummyTopFiveVendors);
      // console.log('res', res);
    }
    catch(err) {
      console.log('Unable to get top vendors. ', err.message);
    }
  }

  async function getTopFiveOrderedProducts() {
    try {
      // get productId, productName, orderQuantity
      const filteredOrderedProducts = totalOrderedProducts.map(orderedProduct => ({
        productId: orderedProduct.product.id,
        productName: orderedProduct.product.name,
        orderedQuantity: orderedProduct.orderItemQuantity
      }));

      // filter duplicates
      for (let i = 0; i < filteredOrderedProducts.length; i++) {
        const currentItem = filteredOrderedProducts[i];
        for (let j = i + 1; j < filteredOrderedProducts.length; j++) {
          const comparingItem = filteredOrderedProducts[j];
          if (currentItem.productId === comparingItem.productId) {
            currentItem.orderedQuantity += comparingItem.orderedQuantity;
            filteredOrderedProducts.splice(j, 1);
            j--;
          }
        }
      }

      // sort from highest to lowest
      filteredOrderedProducts.sort((a, b) => b.orderedQuantity - a.orderedQuantity);

      // take the highest five
      const newTopFiveOrderedProducts = filteredOrderedProducts.slice(0, 5);

      // console.log('totalProductWithOrderQuantity', filteredOrderedProducts, 'newTopFiveOrderedProducts', newTopFiveOrderedProducts);
      setTopFiveOrderedProducts(newTopFiveOrderedProducts);
    }
    catch(err) {
      console.log('Unable to set top five products. ', err.message);
    }
  }



  return (
    <div className='dashboard'>
      <h2>Selamat Datang , {username}<br/> role: {role} id: {id}</h2>

      {!isLoggedIn
        ? (
          <div>
            <p>Please Login</p>
          </div>
        )
        : (
          <div className='container'>
            <div className='row'>
              <div className='col-md-3'>
                <div className='card bg-secondary text-white mb-4'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Vendors</h5>
                    {totalVendors
                      ? <p className='card-text text-black'>{totalVendors.length}</p>
                      : <p className='card-text text-black'>Loading data ...</p>
                    }
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card bg-success text-white mb-4'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Products</h5>
                    {totalProducts
                      ? <p className='card-text text-black'>{totalProducts.length}</p>
                      : <p className='card-text text-black'>Loading data ...</p>
                    }
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card bg-success text-white mb-4'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Ordered Products</h5>
                    {totalOrderedProducts
                      ? <p className='card-text text-black'>{totalOrderedProducts.length}</p>
                      : <p className='card-text text-black'>Loading data ...</p>
                    }
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card bg-success text-white mb-4'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Cancelled Orders</h5>
                    {totalCancelledOrders
                      ? <p className='card-text text-black'>{totalCancelledOrders.length}</p>
                      : <p className='card-text text-black'>Loading data ...</p>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Top 5 Vendors by Highest Purchase Value</h5>
                    {topFiveVendors
                      ? (
                        <>
                          {topFiveVendors.map((vendor) => (
                            <div key={vendor.id} className='mb-3'>
                              <h6 className='card-subtitle mb-2'>{vendor.name}</h6>
                              <p className='card-text'>Total Purchase Value: Rp. {vendor.totalPurchase.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                            </div>
                          ))}
                        </>
                      )
                      : <h6>Loading data ...</h6>
                    }
                  </div>
                </div>
                <div className='card mt-4'>
                  <div className='card-body'>
                    <h5 className='card-title'>Top 5 Products by Highest Order</h5>
                    {topFiveOrderedProducts
                      ? (
                        <>
                          {topFiveOrderedProducts.map((orderedProduct) => (
                            <div key={orderedProduct.id} className='mb-3'>
                              <h6 className='card-subtitle mb-2'>{orderedProduct.productName}</h6>
                              <p className='card-text'>Total Orders: {orderedProduct.orderedQuantity}</p>
                            </div>
                          ))}
                        </>
                      )
                      : <h6>Loading data ...</h6>
                    }
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>Weekly Expenses</h5>
                      <canvas ref={chartRef}></canvas>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Dashboard;
