import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const Vendorpages = () => {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
    status: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
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
    setCurrentPage(1);
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      [name]: value,
    }));
  };

  const handleSubmitNewProduct = (event) => {
    event.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmCreate = () => {
    axios
      .post(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1//product-requests",
        newProduct
      )
      .then((response) => {
        console.log("New product request created:", response.data);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          quantity: "",
          imageUrl: "",
          status: "",
        });
        setShowModal(false);
        setShowConfirmModal(false);
      })
      .catch((error) => {
        console.log("Error creating new product request:", error);
      });
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by Name, Description, Price, Quantity, Image URL, or Status"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            className="flex items-center justify-center px-4 py-2 ml-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleShowModal}
          >
            <FaPlus className="mr-2" />
            Create
          </button>
        </div>
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border">
                Name
              </th>
              <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border">
                Description
              </th>
              <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border">
                Price
              </th>
              <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border">
                Quantity
              </th>
              <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border">
                Image URL
              </th>
              <th className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.description}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">{product.quantity}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20"
                  />
                </td>
                <td className="px-4 py-2 border">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1}>
                  <button
                    className={`px-3 py-1 mx-1 text-sm font-medium ${
                      index + 1 === currentPage
                        ? "text-blue-500 underline"
                        : "text-gray-700"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="container max-w-lg p-6 bg-white rounded-md">
            <h2 className="text-lg font-medium mb-4">Create Request Product</h2>
            <form onSubmit={handleSubmitNewProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChangeNewProduct}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChangeNewProduct}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChangeNewProduct}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleChangeNewProduct}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={handleChangeNewProduct}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleChangeNewProduct}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="FULFILLED">FULFILLED</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="container max-w-md p-6 bg-white rounded-md">
            <h2 className="text-lg font-medium mb-4">
              Confirm Create Request Product
            </h2>
            <p className="mb-4">
              Are you sure you want to create this product request?
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                onClick={handleCloseConfirmModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleConfirmCreate}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendorpages;
