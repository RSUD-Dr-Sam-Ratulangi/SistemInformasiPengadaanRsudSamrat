import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Container, Form, Button, Table } from 'react-bootstrap';
import { FaTrash, FaArrowCircleUp, FaPlus, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Vendors = () => {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editVendor, setEditVendor] = useState(null); // Track the vendor being edited
  const [newVendor, setNewVendor] = useState({
    name: "",
    address: "",
    phoneNumber: ""
  });

  useEffect(() => {
    fetchData();
  }, [page, showConfirmModal]);

  const fetchData = () => {
    axios
      .get("http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors", {
        params: {
          page,
          size,
          name: searchTerm, // Add the searchTerm as a query parameter
          address: searchTerm, // Add the searchTerm as a query parameter
          phoneNumber: searchTerm // Add the searchTerm as a query parameter
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  

  const handleDelete = (vendoruuid) => {
    axios.delete(`http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/${vendoruuid}`)
      .then(() => {
        console.log("Successfully deleted");
      })
      .catch(err => console.log(err));
  };

  const handleConfirmCreate = () => {
    axios
      .post("http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors", newVendor)
      .then((response) => {
        console.log("New vendor created:", response.data);
        setNewVendor({
          name: "",
          address: "",
          phoneNumber: ""
        });
        setShowModal(false);
        setShowConfirmModal(false);
      })
      .catch((error) => {
        console.log("Error creating new vendor:", error);
      });
  };

  const handleEdit = (vendor) => {
    setEditVendor(vendor);
    setShowModal(true);
  };

  const handleUpdateVendor = () => {
    // Perform API call to update the vendor details
    axios
      .put(`http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/${editVendor.vendoruuid}`, editVendor)
      .then((response) => {
        console.log("Vendor updated:", response.data);
        setShowModal(false);
        setEditVendor(null);
      })
      .catch((error) => {
        console.log("Error updating vendor:", error);
      });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditVendor(null);
  };

  const handleSubmitNewVendor = (event) => {
    event.preventDefault();
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleChangeNewVendor = (event) => {
    const { name, value } = event.target;
    setNewVendor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeEditVendor = (event) => {
    const { name, value } = event.target;
    setEditVendor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  

  return (
    <Container>
      <Button className="btn btn-primary">ProccessReview</Button>
      <Button variant="primary" onClick={handleShowModal} style={{ backgroundColor: '#ccc', border: 'none' }}>
        <FaPlus style={{ fontSize: '15px', color: '#000' }} />
      </Button>

      <div className="my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name, Address, Phone Number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>No. Telp</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (vendor) =>
                vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vendor.phoneNumber.includes(searchTerm)
            )
            .map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.name}</td>
                <td>{vendor.phoneNumber}</td>
                <td>{vendor.address}</td>
                <td>
                  <Button className="button btn-primary"><FaArrowCircleUp /></Button>
                  <Button className="button btn-primary" onClick={() => handleDelete(vendor.vendoruuid)}><FaTrash /></Button>
                  <Button className="button btn-primary" onClick={() => handleEdit(vendor)}><FaEdit /></Button>
                </td>
              </tr>
            ))}
        </tbody>

      </Table>
      <Button
        type="button"
        className="button btn-primary"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Previous Page
      </Button>
      <Button
        type="button"
        className="button btn-primary"
        onClick={() => setPage(page + 1)}
        disabled={data.length === 0}
      >
        Next Page
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} className="modal-background">
        <Modal.Header closeButton>
          <Modal.Title>{editVendor ? "Edit Vendor" : "Create Vendor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editVendor ? handleUpdateVendor : handleSubmitNewVendor}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editVendor ? editVendor.name : newVendor.name}
                onChange={editVendor ? handleChangeEditVendor : handleChangeNewVendor}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editVendor ? editVendor.address : newVendor.address}
                onChange={editVendor ? handleChangeEditVendor : handleChangeNewVendor}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                name="phoneNumber"
                value={editVendor ? editVendor.phoneNumber : newVendor.phoneNumber}
                onChange={editVendor ? handleChangeEditVendor : handleChangeNewVendor}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editVendor ? "Update" : "Create"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Vendor Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to create this vendor?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirmCreate}>Create</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Vendors;