import axios from "axios";
import { useState, useEffect } from "react";

const Productpages = () => {
  const [vendor, setVendor] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  //Mengambil data Vendor
  useEffect(() => {
    loadVendors();
  }, []);
//   Mengambil data Product berdasarkan VendorUUID
  useEffect(() => {
    if(selectedVendor){
        loadProducts();
    }
  }, [selectedVendor]);
  
  //Load Vendors :)
  const loadVendors = async () => {
    try {
      const response = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25"
      );
      setVendor(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Load Vendor Product berdasarkan yang dipilih
  const loadProducts = async () => {
    try {
        const respone = await axios.get(`http://rsudsamrat.site:8080/pengadaan/dev/v1/products/vendor/${selectedVendor}`)
        setProducts(respone.data);
        console.log(respone.data);
    } catch (err) {
        console.log(err);
    }
  }

  const handleVendorSelection = (vendorUUID) => {
    setSelectedVendor(vendorUUID);
    setIsOpen(!isOpen);
  };


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "15px" }}>
      <div class="dropdown" style={{ position: "relative" }}>
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={toggleDropdown}
        >
          Choose Vendor
        </button>

        <div
          className={`dropdown-menu${isOpen ? " show" : ""}`}
          aria-labelledby="dropdownMenuButton"
          style={{ position: "absolute", top: "100%", left: "44%" }}
        >
          <ol class="list-group">
            {vendor.map((item) => (
              <li
                class="list-group-item d-flex justify-content-between align-items-start"
                key={item.id}
              >
                <div class="ms-2 me-auto" onClick={() => handleVendorSelection(item.vendoruuid)}>
                  <div class="fw-bold">{item.name}</div>
                  {item.address}
                </div>
                <span class="badge bg-primary rounded-pill">10</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {selectedVendor && (
        <div>
            <p>Ok Bro {selectedVendor}</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product name:</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default Productpages;
