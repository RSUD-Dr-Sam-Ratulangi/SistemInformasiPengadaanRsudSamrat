import axios from "axios";
import React, { useState, useEffect } from "react";
import { Toast, Dropdown } from "react-bootstrap";

import '../assets/css/pages/products.css';



const Productpages = () => {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredPendingProducts, setFilteredPendingProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [filteredJasaProducts, setFilteredJasaProducts] = useState([]);
  const [filteredBMProducts, setFilteredBMProducts] = useState([]);
  const [filteredBHPProducts, setFilteredBHPProducts] = useState([]);

  //order
  const [orderedItems, setOrderedItems] = useState([]);
  const [showModalOrderedProduct, setShowModalOrderedProduct] = useState(false);

  //notif
  const [showToast, setShowToast] = useState(false);



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
      const filteredPending = products.filter(
        (item) => item.status === "PENDING"
      );
      setFilteredPendingProducts(filteredPending);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredJasa = products.filter(
        (item) =>
          item.categories &&
          item.categories[0] &&
          item.categories[0].name === "JASA"
      );
      setFilteredJasaProducts(filteredJasa);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredBM = products.filter(
        (item) =>
          item.categories &&
          item.categories[0] &&
          item.categories[0].name === "BM"
      );
      setFilteredBMProducts(filteredBM);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredBHP = products.filter(
        (item) =>
          item.categories &&
          item.categories[0] &&
          item.categories[0].name === "BPH"
      );
      setFilteredBHPProducts(filteredBHP);
    }
  }, [products]);

  //order
  const addToCart = (item) => {
    setOrderedItems([...orderedItems, item]);
    setShowToast(true);
    console.log(orderedItems);
  };



  const CategoryButton = ({ value }) => {
    return (
      // <button className={`list-group-item d-flex justify-content-between align items-start ${(selectedCategory === value) ? 'active' : ''}`} onClick={() => handleCategorySelection(value)}>
      <button type='button' className={`btn btn-secondary ${(selectedCategory === value) ? 'active' : ''}`} onClick={() => handleCategorySelection(value)}>
        <div className='ms-2 me-auto'>
          <div className='fw-bold'>{value}</div>
          Select {value} category
        </div>
        {/* <span className="badge bg-primary rounded-pill">10</span> */}
      </button>
    );
  };

  const CategorySubItemButton = ({ onClick, values }) => {
    return (
      <ul className='list-group mt-2'>
        {values.map((item, index) => (
          <li key={index} className='list-group-item'>
            <button className={`list-group-item d-flex justify-content-between align-items-start ${(selectedSubCategory === item) ? 'active' : ''}`} onClick={() => onClick(item)}>
              <div className='ms-2 me-auto'>{item}</div>
            </button>
          </li>
        ))}
      </ul>
    );
  };



  const placeOrder = () => {
    axios.post("http://rsudsamrat.site:8080/pengadaan/dev/v1/orders", {})
    .then((res) => {
      console.log(res.data.id);
      const orderItem = orderedItems.map((items) => {
        return { productId: items.id, quantity: 1 }
      })
      axios.post(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${res.data.id}/items`,
        orderItem
      ).then(console.log("Berhasil")).catch((err) => console.log(err));

    }).catch(err => console.log(err));
  };

  useEffect(() => {
    console.log(orderedItems);
  }, [orderedItems]);
  const showModalOrder = () => {
    setShowModalOrderedProduct(true);
  };

  // Load Vendors
  const loadVendors = async () => {
    try {
      const response = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25"
      );
      setVendors(response.data);
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
      const filteredProducts = products.filter(
        (item) => item.status === "APPROVED"
      );
      setFilteredData(filteredProducts);
    }
  }, [products]);

  const handlePendingProducts = () => {
    setFilteredData(filteredPendingProducts);
  };

  const handleJasaProducts = () => {
    setFilteredData(filteredJasaProducts);
  };

  const handleBMProducts = (value) => {
    setSelectedSubCategory(value);
    setFilteredData(filteredBMProducts);
  };

  const handleBHPProducts = (value) => {
    setSelectedSubCategory(value);
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
    const { name, description, quantity, price, id, productuuid, vendor } =
      item;
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
    <div id='products-page' style={{ display: "flex" }}>
      <div style={{ paddingRight: "5px" }}>
        <h3>Choose Vendor</h3>
        
        <ol className="list-group">
          {vendors.map((item) => (
            <li
              className={`list-group-item d-flex justify-content-between align-items-start ${
                selectedVendor === item.vendoruuid
                  ? "selected-vendor"
                  : "vendor-item"
              }`}
              key={item.id}
              onClick={() => handleVendorSelection(item.vendoruuid)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.name}</div>
                {item.address}
              </div>
              {/* <span className="badge bg-primary rounded-pill">10</span> */}
            </li>
          ))}
        </ol>
        {selectedVendor && (
          <button
          className="btn btn-light shadow"
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
                  placeholder="Search Product..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{ marginTop: "40px" }}
                />
              </div>
            </div>
            <div className="col-md-12 mb-4">
              <div className='list-group list-group-horizontal' style={{width: '100%'}}>
                <button className={`list-group-item d-flex justify-content-between align-items-start ${(selectedCategory === "Jasa") ? "active" : "light"} category-button`} onClick={() => handleCategorySelection("Jasa")}>
                  <div className="ms-2 me-auto category-button-text">
                    <div className="fw-bold category-button-text">Jasa</div>
                    Jasa category
                  </div>
                  {/* <span className="badge bg-primary rounded-pill">10</span> */}
                </button>
                <Dropdown className='category-button' onClick={() => handleCategorySelection('BM')}>
                  <Dropdown.Toggle variant={(selectedCategory === 'BM' ? 'primary' : 'light')} style={{width: '100%'}}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">BM</div>
                      Select BM category
                    </div>
                    {/* <span className="badge bg-primary rounded-pill">10</span> */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Alkes</Dropdown.Item>
                    <Dropdown.Item>Alkon</Dropdown.Item>
                    <Dropdown.Item>Peralatan Lainnya</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='category-button' onClick={() => handleCategorySelection('BHP')}>
                  <Dropdown.Toggle variant={(selectedCategory === 'BHP' ? 'primary' : 'light')} style={{width: '100%'}}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">BHP</div>
                      Select BHP category
                    </div>
                    {/* <span className="badge bg-primary rounded-pill">10</span> */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>BHP Non Medis</Dropdown.Item>
                    <Dropdown.Item>BHP Medis</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            {filteredProducts.map((item) => (
              <div className="col-md-3 mb-4" key={item.id}>
                <div className="card h-100 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
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
                      ID: {item.id}
                    </p>
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
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      addToCart(item);
                      setShowToast(true);
                    }}
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="btn btn-light shadow"
            style={{ marginLeft: "10px", marginTop: "15px" }}
            onClick={placeOrder}
          >
            Show all orders
          </button>
          <button
            className="btn btn-light shadow"
            style={{ marginLeft: "10px", marginTop: "15px" }}
            onClick={showModalOrder}
          >
            See modal
          </button>
        </div>
      )}

      {showModalOrderedProduct && (
        <div className="modal modal-background" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Product Details</h3>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModalOrderedProduct(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {orderedItems.map((item) => (
                  <div key={item.id}>
                    <p>Name: {item.name}</p>
                    <p>Description: {item.description}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                    <hr />
                  </div>
                ))}
                <button
                  className="btn btn-dark"
                  style={{ marginLeft: "10px", marginTop: "15px" }}
                  onClick={placeOrder}
                >
                  Place Order
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}
        <Toast show={showToast} className="toast-container fixed-top" bg="primary" autohide delay={2000} onClose={() => setShowToast(false)}>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>
          Berhasil di tambahkan ke order Details.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Productpages;