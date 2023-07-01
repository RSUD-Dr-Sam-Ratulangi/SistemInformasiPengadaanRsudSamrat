import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Chart from 'chart.js/auto';

import '../assets/css/dashboardnew.css'



const Gap = ({ h=0, w=0 }) => {
  return <div style={{height: h, width: w}} />
};

const Card = ({ title, data, bgColor='#F7F7F7' }) => {
  return (
    <div className='card' style={{backgroundColor: bgColor}}>
      <p className='title'>{title}</p>
      {data
        ? <p className='body'>{data}</p>
        : <p className='body'>Loading data ...</p>
      }
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
  const topFiveOrderedProductsChartRef =  useRef(null);
  const topFiveOrderedProductsChartInstance = useRef(null);



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
    if(topFiveVendors?.length > 0) {
      if(topFiveVendorsChartRef.current) {
        if(topFiveVendorsChartInstance.current) {
          topFiveVendorsChartInstance.current.destroy();
        }

        const ctx = topFiveVendorsChartRef.current.getContext('2d');

        topFiveVendorsChartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: topFiveVendors.map(vendor => vendor.vendorName),
            datasets: [
              {
                label: 'Top Five Vendors',
                data: topFiveVendors.map(vendor => vendor.totalPurchase),
                backgroundColor: [
                  '#DC3545',
                  '#FFC106',
                  '#198754',
                  '#0DCAF0',
                  '#0D63FD'
                ]
              }
            ]
          }
        })
      }
    }
  }, [topFiveVendors]);

  useEffect(() => {
    if(topFiveOrderedProducts?.length > 0) {
      if(topFiveOrderedProductsChartRef.current) {
        if(topFiveOrderedProductsChartInstance.current) {
          topFiveOrderedProductsChartInstance.current.destroy();
        }

        const ctx = topFiveOrderedProductsChartRef.current.getContext('2d');

        topFiveOrderedProductsChartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: topFiveOrderedProducts.map(orderedProduct => orderedProduct.productName),
            datasets: [
              {
                label: 'Top Five Vendors',
                data: topFiveOrderedProducts.map(orderedProduct => orderedProduct.totalPurchase),
                backgroundColor: [
                  '#DC3545',
                  '#FFC106',
                  '#198754',
                  '#0DCAF0',
                  '#0D63FD'
                ]
              }
            ]
          }
        })
      }
    }
  }, [topFiveOrderedProducts]);



  async function getTotalVendor() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25');
      setTotalVendors(res.data);
      // console.log('getTotalVendor', res.data);
    }
    catch(err) {
      console.log('Unable to get total vendor.', err.message);
    }
  }
  
  async function getTotalProduct() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/products/2/50');
      setTotalProducts(res.data.content);
      // console.log('getTotalProduct', res.data.content);
    }
    catch(err) {
      console.log('Unable to get total prodcut.', err.message);
    }
  }

  async function getTotalOrderedProducts() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock');
      setTotalOrderedProducts(res.data);
      // console.log('getTotalOrderedProducts', res.data);
    }
    catch(err) {
      console.log('Unable to get ordered products.', err.message);
    }
  }

  async function getDailyExpenses() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/daily');
      setDailyExpenses(res.data);
      // console.log('getDailyExpenses', res.data);
    }
    catch(err) {
      console.log('Unable to get daily expenses.', err.message);
    }
  }

  async function getWeeklyExpenses() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/weekly');
      setWeeklyExpenses(res.data);
      // console.log('getWeeklyExpenses', res.data);
    }
    catch(err) {
      console.log('Unable to get weekly expenses.', err.message);
    }
  }

  async function getMonthlyExpenses() {
    try {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString().padStart(2, '0');
      
      const res = await axios.get(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/monthly?date=${year}-${month}`);
      setMonthlyExpenses(res.data);
      // console.log('getMonthlyExpenses', res.data);
    }
    catch(err) {
      console.log('Unable to get montly expenses.', err.message);
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
      console.log('Unable to set total cancelled order.', err.message);
    }
  }

  async function getTopFiveVendors() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/top-vendor?limit=5');
      setTopFiveVendors(res.data.sort((a, b) => b.totalPurchase - a.totalPurchase));
      // console.log('getTopFiveVendors', res.data.sort((a, b) => b.totalPurchase - a.totalPurchase));
    }
    catch(err) {
      console.log('Unable to get top vendors.', err.message);
    }
  }

  async function getTopFiveOrderedProducts() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/top-product?limit=5');
      setTopFiveOrderedProducts(res.data);
      // console.log('getTopFiveOrderedProducts', res.data);
    }
    catch(err) {
      console.log('Unable to set top five products.', err.message);
    }
  }



  function formatToRp(value) {
    return 'Rp. ' + value.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }



  return (
    <div id='dashboard-page'>
      <h2 className='welcome-title'>Selamat Datang , {username} ({role})</h2>

      <Gap h={40} />

      {!isLoggedIn
        ? (
          <div>
            <p>Please login first</p>
          </div>
        )
        : (
          <main>
            {/* Cards */}
            <div className='cards-wrapper cards-wrapper-top'>
              <Card
                title='Total Vendors'
                data={totalVendors ? totalVendors.length : null}
                bgColor='#FFC106'
              />
              <Card
                title='Total Products'
                data={totalProducts ? totalProducts.length : null}
                bgColor='#0DCAF0'
              />
              <Card
                title='Total Ordered Products'
                data={totalOrderedProducts ? totalOrderedProducts.length : null}
                bgColor='#0DCAF0'
              />
              <Card
                title='Total Cancelled Products'
                data={totalCancelledOrders ? totalCancelledOrders.length : null}
                bgColor='#0DCAF0'
              />
            </div>

            <Gap h={16} />

            <div className='cards-wrapper' style={{color: 'white'}}>
              <Card
                title='Daily Expenses'
                data={dailyExpenses ? formatToRp(dailyExpenses.totalExpense) : null}
                bgColor='#DC3545'
              />
              <Card
                title='Weekly Expenses'
                data={weeklyExpenses ? formatToRp(weeklyExpenses.totalExpense) : null}
                bgColor='#198754'
              />
              <Card
                title='Monthly Expenses'
                data={monthlyExpenses ? formatToRp(monthlyExpenses.totalExpense) : null}
                bgColor='#0D63FD'
              />
            </div>

            <Gap h={80} />

            <div className='top-contents-wrapper'>
              {/* Top Vendors */}
              <div className='top-content'>
                <div className='detail'>
                  <p className='title'>Top 5 Vendors by Highest Purchase Value</p>
                  {topFiveVendors
                    ? (
                      <ol>
                        {topFiveVendors.map((vendor, index) => (
                          <li key={index}>
                            <p className='body'><b>{vendor.vendorName}</b></p>
                            <p className='body'>Total purchase value: {formatToRp(vendor.totalPurchase)}</p>
                          </li>
                        ))}
                      </ol>
                    )
                    : <p className='body'>Loading data ...</p>
                  }
                </div>
                <div className='chart'>
                  {topFiveVendors
                    ? <canvas ref={topFiveVendorsChartRef} />
                    : <p className='body'>Loading data ...</p>
                  }
                </div>
              </div>

              {/* Top Products */}
              <div className='top-content'>
                <div className='detail'>
                  <p className='title'>Top 5 Products by Total Purchase Value</p>
                  {topFiveOrderedProducts
                    ? (
                      <ol>
                        {topFiveOrderedProducts.map((orderedProduct, index) => (
                          <li key={index}>
                            <p className='body'><b>{orderedProduct.productName}</b></p>
                            <p className='body'>Total Purchase Value: {formatToRp(orderedProduct.totalPurchase)}</p>
                          </li>
                        ))}
                      </ol>
                    )
                    : <p className='body'>Loading data ...</p>
                  }
                </div>
                <div className='chart'>
                  {topFiveOrderedProducts
                    ? <canvas ref={topFiveOrderedProductsChartRef} />
                    : <p className='body'>Loading data ...</p>
                  }
                </div>
              </div>
            </div>
          </main>
        )
      }
    </div>
  );
};

export default Dashboard;
