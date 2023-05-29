<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../assets/navigation.css";
import "../assets/dashboard.css"
import { useSelector } from "react-redux";

const Dashboard = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const username = useSelector((state) => state.auth.user?.username);

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
            <Navigation />
            {isLoggedIn && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Total Vendors</h5>
                                    <p className="card-text">{topVendors.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Total Products</h5>
                                    <p className="card-text">{topProducts.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-warning text-dark mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Total Orders</h5>
                                    <p className="card-text">{orderHistory.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Total Order Cancel</h5>
                                    <p className="card-text">0</p>
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
            <Footer />
        </div>
    );
=======
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Pagination, Button, Modal, Form } from 'react-bootstrap';
import "../assets/vendorpages.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [productList, setProductList] = useState([]);
  const username = useSelector((state) => state.auth.user?.username);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
    status: ""
  });

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  useEffect(() => {
    fetchData(); // Fetch data whenever new product is created
  }, [showConfirmModal]);

  const fetchData = () => {
    axios
      .get("http://rsudsamrat.site:8080/pengadaan/dev/v1//product-requests")
      .then((response) => {
        setProductList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when search term changes
  };

  const filteredProducts = productList.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.price.toString().toLowerCase().includes(search) ||
      product.quantity.toString().toLowerCase().includes(search) ||
      product.imageUrl.toLowerCase().includes(search) ||
      product.status.toLowerCase().includes(search)
    );
  });

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); // Defining totalPages

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  // const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleChangeNewProduct = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitNewProduct = (event) => {
    event.preventDefault();
    setShowConfirmModal(true); // Show confirmation modal when submitting the form
  };
  
  const handleConfirmCreate = () => {
    // Perform API call to create the new product request
    axios
      .post("http://rsudsamrat.site:8080/pengadaan/dev/v1//product-requests", newProduct)
      .then((response) => {
        console.log("New product request created:", response.data);
        // Reset the form and close the modal
        setNewProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          imageUrl: "",
          status: ""
        });
        setShowModal(false);
        setShowConfirmModal(false);
      })
      .catch((error) => {
        console.log("Error creating new product request:", error);
      });
  };  

  return (
    <Container>
      
      <h2>Selamat Datang , {username}</h2>
      {/* <h2>Request Product List</h2> */}
      <p>Request Product List</p>
      <Button variant="primary" onClick={handleShowModal}>Add</Button>
      <div className="my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name, Description, Price, Quantity, Image URL, or Status"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image URL</th>
            <th>Status</th>
          </tr>
          </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
              </td>
              <td>{product.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>



      <Modal show={showModal} onHide={handleCloseModal} className="modal-background">
  <Modal.Header closeButton>
    <Modal.Title>Create Request Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmitNewProduct}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={newProduct.name} onChange={handleChangeNewProduct} />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={newProduct.description} onChange={handleChangeNewProduct} />
      </Form.Group>
      <Form.Group controlId="price">
  <Form.Label>Price</Form.Label>
  <Form.Control type="number" name="price" value={newProduct.price} onChange={handleChangeNewProduct} required />
</Form.Group>
<Form.Group controlId="quantity">
  <Form.Label>Quantity</Form.Label>
  <Form.Control type="number" name="quantity" value={newProduct.quantity} onChange={handleChangeNewProduct} required />
</Form.Group>

      <Form.Group controlId="imageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" name="imageUrl" value={newProduct.imageUrl} onChange={handleChangeNewProduct} />
      </Form.Group>
      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control as="select" name="status" value={newProduct.status} onChange={handleChangeNewProduct}>
          <option value="">Select Status</option>
          <option value="OPEN">OPEN</option>
          <option value="CLOSED">CLOSED</option>
          <option value="FULFILLED">FULFILLED</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">Create</Button>
    </Form>
  </Modal.Body>
</Modal>
  {/* Confirmation Modal */}
  <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Create Request Product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to create this product request?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirmCreate}>Create</Button>
    </Modal.Footer>
  </Modal>
</Container>

  );
>>>>>>> ef4e595ce892a3820c8737b89af6967c7dd005b8
};

export default Dashboard;