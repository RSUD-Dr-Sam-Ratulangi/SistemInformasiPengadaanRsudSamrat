import axios from "axios";
import { useState, useEffect } from "react";

const Productpages = () => {
  const [vendor, setVendor] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredPendingProducts, setFilteredPendingProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mengambil data Vendor
  useEffect(() => {
    loadVendors();
  }, []);

  // Mengambil data Product berdasarkan VendorUUID
  useEffect(() => {
    if (selectedVendor) {
      loadProducts();
    }
  }, [selectedVendor]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredPending = products.filter((item) => item.status === "PENDING");
      setFilteredPendingProducts(filteredPending);
    }
  }, [products]);

  // Load Vendors
  const loadVendors = async () => {
    try {
      const response = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25"
      );
      setVendor(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Load Vendor Products berdasarkan yang dipilih
  const loadProducts = async () => {
    try {
      const respone = await axios.get(
        `http://rsudsamrat.site:8080/pengadaan/dev/v1/products/vendor/${selectedVendor}`
      );
      setProducts(respone.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter data produk berdasarkan status "APPROVED"
  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter((item) => item.status === "APPROVED");
      setFilteredData(filteredProducts);
    }
  }, [products]);

  const handlePendingProducts = () => {
    setFilteredData(filteredPendingProducts);
  };

  const handleVendorSelection = (vendorUUID) => {
    setSelectedVendor(vendorUUID);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = filteredData.filter((item) => {
    const { name, description, quantity, price, id, productuuid, vendor } = item;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseQuery) ||
      description.toLowerCase().includes(lowerCaseQuery) ||
      quantity.toString().includes(lowerCaseQuery) ||
      price.toString().includes(lowerCaseQuery) ||
      id.toString().includes(lowerCaseQuery) ||
      productuuid.toLowerCase().includes(lowerCaseQuery) ||
      vendor.name.toLowerCase().includes(lowerCaseQuery) // Menggunakan vendor.name
    );
  });
  

  return (
    <div style={{ display: "flex" }}>
      <div style={{ paddingRight: "5px" }}>
        <h3>Choose Vendor</h3>
        <style>
          {`.list-group {
            font-size: 12px;
            width: 240px;
          }`}
        </style>
        <ol className="list-group">
          {vendor.map((item) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={item.id}
            >
              <div
                className="ms-2 me-auto"
                onClick={() => handleVendorSelection(item.vendoruuid)}
              >
                <div className="fw-bold">{item.name}</div>
                {item.address}
              </div>
              <span className="badge bg-primary rounded-pill">10</span>
            </li>
          ))}
        </ol>
        {selectedVendor && (
                  <button
                  className="btn btn-primary"
                  style={{ marginLeft: "10px", marginTop: "15px" }}
                  onClick={handlePendingProducts}
                >
                  See Pending Product
                </button>
        )}
      </div>

      {selectedVendor && (
        <div style={{ flex: 1 }}>
          <div className="row justify-content-start">
            <div className="col-md-12 mb-4">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{marginTop: "15px"}}
                />
              </div>
            </div>
            {filteredProducts.map((item) => (
              <div className="col-md-3 mb-4" key={item.id}>
                <div className="card h-100" style={{ width: "100%" }}>
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt="Product"
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "12px" }}>
                      {item.name}
                    </h5>
                    <p className="card-text" style={{ fontSize: "10px" }}>
                      Quantity: {item.quantity}
                    </p>
                    <p className="card-text" style={{ fontSize: "10px" }}>
                      Price: {item.price}
                    </p>
                    <p className="card-text" style={{ fontSize: "10px" }}>
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Productpages;
