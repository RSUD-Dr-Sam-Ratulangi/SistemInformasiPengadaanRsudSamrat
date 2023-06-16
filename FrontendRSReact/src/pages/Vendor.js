import axios from "axios";
import { FaTrash, FaArrowCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

const Vendors = () => {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(0);
  const [name, setName] = useState([]);
  const [address, setAddress] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddVendor = async () => {
    try {
      const response = await axios.post(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/vendors",
        {
          name,
          address,
          phoneNumber,
        }
      );
      console.log("Vendor created successfully:", response.data);
      // Optional: You can update the page or fetch the data again to show the newly created vendor
      fetchData();
    } catch (error) {
      console.log("Error creating vendor:", error);
    }
    setShowModal(false);
  };
  

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors",
        {
          params: {
            page,
            size,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (vendorUuid) => {
    try {
      await axios.delete(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/${vendorUuid}`
      );
      console.log("Vendor deleted successfully");
      // Optional: You can update the page or fetch the data again to remove the deleted vendor from the list
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className="btn btn-primary">ProccessReview</button>
      <button className="btn btn-primary" onClick={handleAddVendor}>
        Create Vendor
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form fields */}
          <form>
            <div className="mb-3">
              <label htmlFor="vendorName" className="form-label">
                Vendor Name
              </label>
              <input
                type="text"
                className="form-control"
                id="vendorName"
                name="vendorName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type="button" onClick={handleAddVendor}>
            Submit
          </button>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Vendor Name</th>
            <th scope="col">No telp</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.name}</td>
              <td>{vendor.phoneNumber}</td>
              <td>{vendor.address}</td>
              <td>
                <button className="button btn-primary">
                  <FaArrowCircleUp />
                </button>
                <button
                  className="button btn-primary"
                  onClick={() => handleDelete(vendor.vendoruuid)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="button btn-primary"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        type="button"
        className="button btn-primary"
        onClick={() => setPage(page + 1)}
        disabled={data.length === 0}
      >
        Next Page
      </button>
    </div>
  );
};

export default Vendors;
