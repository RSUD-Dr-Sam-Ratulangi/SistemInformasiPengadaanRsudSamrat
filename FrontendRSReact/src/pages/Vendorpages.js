import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Pagination, Button, Modal, Form } from 'react-bootstrap';
import "../assets/vendorpages.css";

const Vendorpages = () => {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
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
      <h2>Request Product List</h2>
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
};

export default Vendorpages;
