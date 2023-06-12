import axios from "axios";
import { useState, useEffect } from "react";

const Productpages = () => {
  const [vendor, setVendor] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredPendingProducts, setFilteredPendingProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredJasaProducts, setFilteredJasaProducts] = useState([]);
  const [filteredBMProducts, setFilteredBMProducts] = useState([]);
  const [filteredBHPProducts, setFilteredBHPProducts] = useState([]);


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

  useEffect(() => { 
    if (products.length > 0) { 
      const filteredJasa = products.filter((item) => item.categories && item.categories[0] && item.categories[0].name === "JASA"); 
      setFilteredJasaProducts(filteredJasa); 
    } 
  }, [products]);

  useEffect(() => { 
    if (products.length > 0) { 
      const filteredBM = products.filter((item) => item.categories && item.categories[0] && item.categories[0].name === "BM"); 
      setFilteredBMProducts(filteredBM); 
    } 
  }, [products]);

  useEffect(() => { 
    if (products.length > 0) { 
      const filteredBHP = products.filter((item) => item.categories && item.categories[0] && item.categories[0].name === "BPH"); 
      setFilteredBHPProducts(filteredBHP); 
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

  const handleJasaProducts = () => {
    setFilteredData(filteredJasaProducts);
  };

  const handleBMProducts = () => {
    setFilteredData(filteredBMProducts);
  };

  const handleBHPProducts = () => {
    setFilteredData(filteredBHPProducts);
  };

  const handleVendorSelection = (vendorUUID) => {
    setSelectedVendor(vendorUUID);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSubcategorySelection = (subcategory) => {
    // Lakukan tindakan yang sesuai dengan pemilihan subkategori
    console.log("Selected Subcategory:", subcategory);
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
          }

          .vendor-item {
            cursor: pointer;
          }

          // .vendor-item:hover {
          //   background-color: #f2f2f2;
          // }

          .selected-vendor {
            background-color: #EDEBEB;
          }
          
          // .selected-vendor:hover {
          //   background-color: #ffa800;
          // }`}
        </style>
        <ol className="list-group">
          {vendor.map((item) => (
            <li
              className={`list-group-item d-flex justify-content-between align-items-start ${selectedVendor === item.vendoruuid ? 'selected-vendor' : 'vendor-item'}`}
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
                        style={{ marginTop: "40px" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-4">
              <div className="list-group">
                <button
                  className={`list-group-item d-flex justify-content-between align-items-start ${
                    selectedCategory === "Jasa" ? "active" : ""
                  }`}
                  onClick={() => handleJasaProducts("Jasa")}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Jasa</div>
                    Select Jasa category
                  </div>
                  {/* <span className="badge bg-primary rounded-pill">10</span> */}
                </button>
                <button
                  className={`list-group-item d-flex justify-content-between align-items-start ${
                    selectedCategory === "BM" ? "active" : ""
                  }`}
                  onClick={() => handleBMProducts("BM")}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">BM</div>
                    Select BM category
                  </div>
                  {/* <span className="badge bg-primary rounded-pill">10</span> */}
                </button>
                {selectedCategory === "BM" && (
                  <ul className="list-group mt-2">
                    <li className="list-group-item">
                      <button
                        className="list-group-item d-flex justify-content-between align-items-start"
                        onClick={() => handleSubcategorySelection("Alkes")}
                      >
                        <div className="ms-2 me-auto">Alkes</div>
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="list-group-item d-flex justify-content-between align-items-start"
                        onClick={() => handleSubcategorySelection("Alkon")}
                      >
                        <div className="ms-2 me-auto">Alkon</div>
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="list-group-item d-flex justify-content-between align-items-start"
                        onClick={() => handleSubcategorySelection("Peralatan Lainnya")}
                      >
                        <div className="ms-2 me-auto">Peralatan Lainnya</div>
                      </button>
                    </li>
                  </ul>
                )}
                <button
                  className={`list-group-item d-flex justify-content-between align-items-start ${
                    selectedCategory === "BHP" ? "active" : ""
                  }`}
                  onClick={() => handleBHPProducts("BHP")}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">BHP</div>
                    Select BHP category
                  </div>
                  {/* <span className="badge bg-primary rounded-pill">10</span> */}
                </button>
                {selectedCategory === "BHP" && (
                  <ul className="list-group mt-2">
                    <li className="list-group-item">
                      <button
                        className="list-group-item d-flex justify-content-between align-items-start"
                        onClick={() => handleSubcategorySelection("BHP Non Medis")}
                      >
                        <div className="ms-2 me-auto">BHP Non Medis</div>
                      </button>
                    </li>
                    <li className="list-group-item">
                      <button
                        className="list-group-item d-flex justify-content-between align-items-start"
                        onClick={() => handleSubcategorySelection("BHP Medis")}
                      >
                        <div className="ms-2 me-auto">BHP Medis</div>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

              {filteredProducts.map((item) => (
                <div className="col-md-3 mb-4" key={item.id}>
                  <div className="card h-100" style={{ width: "100%" }}>
                    <img src={item.imageUrl} className="card-img-top" alt="Product" />
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: "12px" }}>
                        {item.name}
                      </h5>
                      <p className="card-text" style={{ fontSize: "10px" }}>
                        Description: {item.description}
                      </p>
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
