import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete, MdCircle, MdPlusOne, MdModeEdit } from "react-icons/md";
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
    phoneNumber: "",
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
          phoneNumber: searchTerm, // Add the searchTerm as a query parameter
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (vendoruuid) => {
    axios
      .delete(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/${vendoruuid}`
      )
      .then(() => {
        console.log("Successfully deleted");
      })
      .catch((err) => console.log(err));
  };

  const handleConfirmCreate = () => {
    axios
      .post("http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors", newVendor)
      .then((response) => {
        console.log("New vendor created:", response.data);
        setNewVendor({
          name: "",
          address: "",
          phoneNumber: "",
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
      .put(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors/${editVendor.vendoruuid}`,
        editVendor
      )
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
      [name]: value,
    }));
  };

  const handleChangeEditVendor = (event) => {
    const { name, value } = event.target;
    setEditVendor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-2 mt-12">
        <button className="btn btn-primary">Proccess Review</button>
        <button className="btn btn-info" onClick={handleShowModal}>
          +
        </button>
      </div>

      <div className="my-4">
        <input
          type="text"
          className="form-control w-full input input-primary"
          placeholder="Search by Name, Address, Phone Number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table-auto w-full">
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
                vendor.address
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                vendor.phoneNumber.includes(searchTerm)
            )
            .map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.id}</td>
                <td>{vendor.name}</td>
                <td>{vendor.phoneNumber}</td>
                <td>{vendor.address}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(vendor.vendoruuid)}
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(vendor)}
                  >
                    <MdModeEdit className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-5">
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
          disabled={data.length === 0}
        >
          Next Page
        </button>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form
                  onSubmit={
                    editVendor ? handleUpdateVendor : handleSubmitNewVendor
                  }
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editVendor ? editVendor.name : newVendor.name}
                      onChange={
                        editVendor
                          ? handleChangeEditVendor
                          : handleChangeNewVendor
                      }
                      className="form-control input input-primary w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={
                        editVendor ? editVendor.address : newVendor.address
                      }
                      onChange={
                        editVendor
                          ? handleChangeEditVendor
                          : handleChangeNewVendor
                      }
                      className="form-control input input-primary w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={
                        editVendor
                          ? editVendor.phoneNumber
                          : newVendor.phoneNumber
                      }
                      onChange={
                        editVendor
                          ? handleChangeEditVendor
                          : handleChangeNewVendor
                      }
                      className="form-control input input-primary w-full"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">
                    {editVendor ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p>Are you sure you want to create this vendor?</p>
              </div>
              <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmCreate}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseConfirmModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;
