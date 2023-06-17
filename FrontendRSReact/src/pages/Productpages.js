import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Toast,
  Dropdown,
  Modal,
  Button
} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import '../assets/css/pages/products.css';

import ProductPlaceholderImage from '../assets/images/product-placeholder.png';



export default function Productpages() {
  const navigate = useNavigate();

  // vendor
  const [vendors, setVendors] = useState([]);
  const [selectedVendorUUID, setSelectedVendorUUID] = useState(null);
  
  // product
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // query
  const [searchQuery, setSearchQuery] = useState('');

  // category
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // seletedProduct
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSelectedProductModal, setShowSelectedProductModal] = useState(false);
  const [selectedProductOrderQuantity, setSelectedProductOrderQuantity] = useState(0);
  const [selectedProductModalErrorMessage, setSelectedProductModalErrorMessage] = useState('Quantity is not valid');

  // carts
  const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('carts')));
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartSelectedProductDetail, setCartSelectedProductDetail] = useState(null);
  const [showCartSelectedProductDetailModal, setShowCartSelectedProductDetailModal] = useState(false);
  const [itemAddedToCartToast, setItemAddedToCartToast] = useState(false);



  useEffect(() => {
    getVendors();
  }, []);

  useEffect(() => {
    if(selectedVendorUUID) {
      setProducts([]);
      setFilteredProducts([]);
      setSearchQuery('');
      setSelectedCategory('ALL');
      setSelectedSubCategory(null);
      setSelectedProduct(null);
      setSelectedProductOrderQuantity(0);
      setSelectedProductModalErrorMessage('Quantity is not valid');
      getProducts();
    }
  }, [selectedVendorUUID]);

  useEffect(() => {
    setFilteredProducts(filterProducts({}));
    console.log('products', products);
  }, [products]);

  useEffect(() => {
    if(selectedCategory) setFilteredProducts(filterProducts({categoryName: selectedCategory}));
  }, [selectedCategory]);

  useEffect(() => {
    if(selectedSubCategory) setFilteredProducts(filterProducts({subCategoryName: selectedSubCategory}));
  }, [selectedSubCategory]);

  useEffect(() => {
    if(carts) {
      localStorage.setItem('carts', JSON.stringify(carts));
    }
    else if(vendors.length > 0) {
      setCarts(cartsInitialValues());
      localStorage.setItem('carts', JSON.stringify(cartsInitialValues()));
    }
  }, [carts, vendors]);



  function handleSeePendingProducts(e) {
    e.preventDefault();

    setSelectedCategory(null);
    setFilteredProducts(filterProducts({statusList: ['PENDING']}));
  }

  function handleSearchQuery(e) {
    setSelectedCategory('ALL');
    setSelectedSubCategory(null);
    if(e.target.value.length === 0) {
      setFilteredProducts(filterProducts({}));
    }
    else {
      setFilteredProducts(filterProducts({
        minimumQuantity: null,
        statusList: 0,
        categoryName: 'ALL',
        subCategoryName: null,
        searchQueryNamePrice: e.target.value
      }));
    }
    setSearchQuery(e.target.value);
  }
  
  function handleProductSelection(product) {
    setSelectedProduct(product);
    setShowSelectedProductModal(true);
  }

  function handleSelectedProductModalClose() {
    setSelectedProduct(null);
    setShowSelectedProductModal(false);
    setSelectedProductOrderQuantity(0);
    setSelectedProductModalErrorMessage('Quantity is not valid');
  }

  function handleSelectedProductOrderQuantity(e) {
    let existingProductOrderQuantity = 0;

    // cek jika item sudah ada di keranjang
    carts.forEach(cart => {
      if(selectedVendorUUID === cart.vendorUUID) {
        cart.products.forEach(product => {
          if(selectedProduct.id === product.id) existingProductOrderQuantity = product.orderQuantity;
        });
      }
    });

    if(parseInt(e.target.value) > 0 && parseInt(e.target.value) <= selectedProduct.quantity - existingProductOrderQuantity) setSelectedProductModalErrorMessage('');
    else setSelectedProductModalErrorMessage('Quantity is not valid');

    setSelectedProductOrderQuantity(e.target.value);
  }

  function handleSelectedProductModalAddToCart() {
    let isProductExistInCart = false;

    carts.forEach(cart => {
      if(cart.vendorUUID === selectedVendorUUID) {
        cart.products.forEach(product => {
          if(selectedProduct.id === product.id) isProductExistInCart = true;
        });
      }
    });

    let newCarts = [];
    newCarts = carts.map(cart => {
      if(selectedVendorUUID === cart.vendorUUID) {
        return {
          vendorUUID: cart.vendorUUID,
          products: (isProductExistInCart)
            ? cart.products.map(product => {
              if(selectedProduct.id === product.id) return {...product, orderQuantity: product.orderQuantity + parseInt(selectedProductOrderQuantity)};
              else return product;
            })
            : [...cart.products, {...selectedProduct, orderQuantity: parseInt(selectedProductOrderQuantity)}]
        };
      }
      else return cart;
    });

    setCarts(newCarts);
    setSelectedProduct(null);
    setSelectedProductOrderQuantity(0);
    setSelectedProductModalErrorMessage('Quantity is not valid');
    setShowSelectedProductModal(false);
    setItemAddedToCartToast(true);
  }

  function handleShowAllOrders() {
    console.log('handleShowAllOrders');
  }

  function handleCartProductDelete(productId) {
    const newCarts = carts.map(cart => {
      if(selectedVendorUUID === cart.vendorUUID) {
        return {
          vendorUUID: cart.vendorUUID,
          products: cart.products.filter(product => product.id !== productId)
        }
      }
      else return cart;
    });

    setCarts(newCarts);
  }

  function handleCartProductSeeDetails(productId) {
    let newCartSelectedProductDetail = null;
    carts.forEach(cart => {
      if(selectedVendorUUID === cart.vendorUUID) {
        cart.products.forEach(product => {
          if(productId === product.id) newCartSelectedProductDetail = product;
        });
      }
    });

    setCartSelectedProductDetail(newCartSelectedProductDetail);
    setShowCartSelectedProductDetailModal(true);
  }

  function handleCartProductSeeDetailsClose() {
    setCartSelectedProductDetail(null);
    setShowCartSelectedProductDetailModal(false);
  }

  function handleCartModalCancel(e) {
    e.preventDefault();

    const newCarts = carts.map(cart => {
      if(selectedVendorUUID === cart.vendorUUID) return {vendorUUID: cart.vendorUUID, products: []};
      else return cart;
    });
    setCarts(newCarts);

    setShowCartModal(false);
  }
  


  async function getVendors() {
    try {
      const res = await axios.get('http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25');
      setVendors(res.data);
    }
    catch(err) {
      console.log('Unable to get vendors', err);
    }
  }

  function cartsInitialValues() {
    const newCarts = vendors.map(vendor => {
      return {vendorUUID: vendor.vendoruuid, products: []};
    });

    return newCarts;
  }

  async function getProducts() {
    try {
      const res = await axios.get(`http://rsudsamrat.site:8080/pengadaan/dev/v1/products/vendor/${selectedVendorUUID}`);
      setProducts(res.data);
    }
    catch(err) {
      console.log('Unable to get products', err);
    }
  }

  function filterProducts(properties) {
    const {
      minimumQuantity = 0, // must be number
      statusList = ['APPROVED'], // must be array of string
      // statusList = null, // must be array of string
      categoryName = null, // must be string
      subCategoryName = null, // must be string
      searchQueryNamePrice = '' // must be string
    } = properties;

    let newFilteredProducts = products;

    if(products.length > 0) {
      // filter using quantity
      if(minimumQuantity) {
        newFilteredProducts = newFilteredProducts.filter(product => product.quantity > minimumQuantity);
      }

      // filter using status
      if(statusList) {
        statusList.forEach(status => {
          newFilteredProducts = newFilteredProducts.filter(product => status === product.status);
        });
      }

      // filter using categories
      if(categoryName !== null && categoryName !== 'ALL') {
        newFilteredProducts = newFilteredProducts.filter(product => product.categories.length > 0 && product.categories.some(category => category.name === categoryName));
      }

      // filter using subcategories
      if(subCategoryName) {
        newFilteredProducts = newFilteredProducts.filter(product => product.subcategories.length > 0 && product.subcategories.some(subCategory => subCategory.name === subCategoryName));
      }

      // filter using both name or price
      if(searchQueryNamePrice.length !== 0) {
        // newFilteredProducts = newFilteredProducts.filter(product => searchQueryNamePrice === product.name || searchQueryNamePrice === product.price.toString());
        newFilteredProducts = newFilteredProducts.filter(product => product.name.toLowerCase().includes(searchQueryNamePrice.toLowerCase()) || product.price.toString().includes(searchQueryNamePrice));
      }
    }

    // console.log(`minimumQuantity (${minimumQuantity}) | statusList (${statusList.map(status => status)}) | categoryName (${categoryName}) | subCategoryName (${subCategoryName}) | searchQueryNamePrice (${searchQueryNamePrice})`);

    return newFilteredProducts;
  }

  function orderProducts() {
    axios.post('http://rsudsamrat.site:8080/pengadaan/dev/v1/orders', {})
      .then(res => {
        let orders = [];
        carts.forEach(cart => {
          if(selectedVendorUUID === cart.vendorUUID) {
            cart.products.forEach(product => {
              orders.push({productId: product.id, quantity: product.orderQuantity});
            });
          }
        });

        axios.post(`http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${res.data.id}/items`, orders)
          .then(() => {
            setCarts(cartsInitialValues());
            setTimeout(() => {
              navigate('/orders');
            }, 150);
          })
          .catch(err => console.log('unable to order products', err));
      })
      .catch(err => console.log('unable to order products', err));
  }



  return (
    <div id='products-page' style={{display: 'flex'}}>
      <div style={{paddingRight: '5px'}}>
        <h3>Choose Vendor</h3>

        <ol className='list-group'>
          {(vendors.length > 0) && vendors.map(vendor => (
            <li
              key={vendor.id}
              className={`list-group-item d-flex justify-content-between align-items-start ${(selectedVendorUUID === vendor.vendoruuid) ? 'selected-vendor' : 'vendor-item'}`}
              onClick={() => setSelectedVendorUUID(vendor.vendoruuid)}
            >
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>{vendor.name}</div>
                {vendor.address}
              </div>
              {/* <span className='badge bg-primary rounded-pill'>10</span> */}
            </li>
          ))}
        </ol>

        {selectedVendorUUID && (
          <button
            className='btn btn-light shadow'
            style={{marginLeft: '10px', marginTop: '15px'}}
            onClick={handleSeePendingProducts}
          >
            See Pending Products
          </button>
        )}
      </div>

      {selectedVendorUUID && (
        <div style={{flex: 1}}>
          <div className='row justify-content-start'>
            <div className='col-md-12 mb-4'>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search...'
                  aria-label='Search'
                  value={searchQuery}
                  onChange={handleSearchQuery}
                  style={{marginTop: '40px'}}
                />
              </div>
              <h6>Result: {filteredProducts.length}</h6>
            </div>
            <div className='col-md-12 mb-4'>
              <div className='list-group list-group-horizontal' style={{width: '100%'}}>
                <button className={`list-group-item justify-content-between align-items-start ${(selectedCategory === 'ALL') ? 'active' : 'light'} category-button`} onClick={() => setSelectedCategory('ALL')}>
                  <div className='category-button-text-wrapper'>
                    <div className='category-button-text'><b>All</b></div>
                    <div className='category-button-text'>All Category</div>
                  </div>
                </button>

                <button className={`list-group-item justify-content-between align-items-start ${(selectedCategory === 'JASA') ? 'active' : 'light'} category-button`} onClick={() => setSelectedCategory('JASA')}>
                <div className='category-button-text-wrapper'>
                    <div className='category-button-text'><b>Jasa</b></div>
                    <div className='category-button-text'>Jasa Category</div>
                  </div>
                </button>

                <Dropdown className='category-button'>
                  <Dropdown.Toggle
                    className='list-group-item'
                    variant={(selectedCategory === 'BM') ? 'primary' : 'light'}
                    style={{width: '100%'}}
                  >
                    <div className='ms-2 me-auto' onClick={() => setSelectedCategory('BM')}>
                      <div className='fw-bold'>BM</div>
                      Select BM Category
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedSubCategory('ALKES')}>Alkes</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedSubCategory('ALKON')}>Alkon</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown className='category-button'>
                <Dropdown.Toggle
                    className='list-group-item'
                    variant={(selectedCategory === 'BPH') ? 'primary' : 'light'}
                    style={{width: '100%'}}
                  >
                    <div className='ms-2 me-auto' onClick={() => setSelectedCategory('BPH')}>
                      <div className='fw-bold'>BPH</div>
                      Select BPH Category
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedSubCategory('BHPNONMEDIS')}>BHP Non Medis</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedSubCategory('BHPMEDIS')}>BHP Medis</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className='col-md-12 mb-4'>
              <button
                className='btn btn-light shadow'
                style={{marginLeft: '10px', marginTop: '15px'}}
                onClick={handleShowAllOrders}
              >
                Show All Orders
              </button>
              <button
                className='btn btn-light shadow'
                style={{marginLeft: '10px', marginTop: '15px'}}
                onClick={() => setShowCartModal(true)}
              >
                Show Cart
                <FontAwesomeIcon icon={faCartShopping} style={{marginLeft: '10px'}} />
              </button>
            </div>

            {(filteredProducts.length > 0) && filteredProducts.map(product => (
              <div key={product.id} className='col-md-3 mb-4'>
                <div className='card h-100 w-ful md:w-3/4 lg:w-1/2 xl:w-1/3'>
                  <img
                    src={(product.imageUrl) ? product.imageUrl : ProductPlaceholderImage}
                    alt='product'
                    className='card-img-top product-image'
                  />
                  <div className='card-body'>
                    <h5 className='card-title' style={{fontSize: '12px'}}>{product.name}</h5>
                    <p className='card-title' style={{fontSize: '12px'}}>ID: {product.id}</p>
                    <p className='card-title' style={{fontSize: '12px'}}>Description: {product.description}</p>
                    <p className='card-title' style={{fontSize: '12px'}}>Quantity: {product.quantity}</p>
                    <p className='card-title' style={{fontSize: '12px'}}>Price: {product.price}</p>
                    <p className='card-title' style={{fontSize: '12px'}}>Status: {product.status}</p>
                  </div>
                  <button className='btn btn-dark' onClick={() => handleProductSelection(product)}>Order</button>

                  <Modal show={showSelectedProductModal} onHide={handleSelectedProductModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Quantity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <label>Quantity: </label>
                        <input
                          type='number'
                          value={selectedProductOrderQuantity}
                          onChange={handleSelectedProductOrderQuantity}
                          min={0}
                        />
                      </div>
                      <label>{selectedProductModalErrorMessage}</label>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant='secondary' onClick={handleSelectedProductModalClose}>Close</Button>
                      <Button
                        variant='primary'
                        onClick={handleSelectedProductModalAddToCart}
                        disabled={(selectedProductModalErrorMessage.length !== 0)}
                      >
                        Add
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showCartModal && (
        <div className='modal modal-background' style={{display: 'block'}}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h3 className='modal-title'>Product Details</h3>
                <button
                  type='button'
                  className='close'
                  onClick={() => setShowCartModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                {(carts.length > 0) && carts.map(cart => (
                  (selectedVendorUUID === cart.vendorUUID) && cart.products.map(product => (
                    <div key={product.id}>
                      <p>Name: {product.name}</p>
                      <p>Description: {product.description}</p>
                      <p>Quantity: {product.orderQuantity}</p>
                      <p>Price: Rp. {product.price * product.orderQuantity}</p>
                      <div>
                        <button
                          className='btn btn-danger'
                          style={{marginRight: '10px'}}
                          onClick={() => handleCartProductDelete(product.id)}
                        >
                          Delete
                        </button>
                        <button
                          className='btn btn-secondary'
                          style={{marginRight: '10px'}}
                          onClick={() => handleCartProductSeeDetails(product.id)}
                        >
                          See Details
                        </button>

                        {cartSelectedProductDetail && (
                          <Modal show={showCartSelectedProductDetailModal} onHide={handleCartProductSeeDetailsClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Product Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div>
                                <p>Name: {cartSelectedProductDetail.name}</p>
                                <p>Description: {cartSelectedProductDetail.description}</p>
                                <p>Quantity: {cartSelectedProductDetail.quantity}</p>
                                <p>Order Quantity: {cartSelectedProductDetail.orderQuantity}</p>
                                <p>Price: Rp. {cartSelectedProductDetail.price}</p>
                                <p>Status: {cartSelectedProductDetail.status}</p>
                                <p>Category: {cartSelectedProductDetail.categories?.map(category => category.name)}</p>
                                <p>Sub Category: {cartSelectedProductDetail.subcategories?.map(subCategory => subCategory.name)}</p>
                                <p>Vendor Name: {cartSelectedProductDetail.vendor.name}</p>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <button
                                className='btn btn-secondary'
                                style={{marginRight: '10px'}}
                                onClick={handleCartProductSeeDetailsClose}
                              >
                                Close
                              </button>
                            </Modal.Footer>
                          </Modal>
                        )}
                      </div>
                      <hr />
                    </div>
                  ))
                ))}

                <button
                  className='btn btn-dark'
                  style={{marginLeft: '10px', marginTop: '15px'}}
                  onClick={orderProducts}
                >
                  Place Order
                </button>
                <button
                  className='btn btn-dark'
                  style={{marginLeft: '10px', marginTop: '15px'}}
                  onClick={handleCartModalCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast
        show={itemAddedToCartToast}
        className='toast-container fixed-top'
        bg='primary'
        autohide
        delay={2000}
        onClose={() => setItemAddedToCartToast(false)}
      >
        <Toast.Header>
          <strong className='me-auto'>Notification</strong>
        </Toast.Header>
        <Toast.Body>Berhasil ditambahkan ke See Modal</Toast.Body>
      </Toast>
    </div>
  );
};
