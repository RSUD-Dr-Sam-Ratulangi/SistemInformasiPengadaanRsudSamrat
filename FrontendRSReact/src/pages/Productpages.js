import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdShoppingCart,
  MdInventory,
  MdArrowDropDown,
} from "react-icons/md";
import axios from "axios";

import "../assets/css/pages/products.css";

export default function ProductPages() {
  const navigate = useNavigate();

  // vendor
  const [vendors, setVendors] = useState([]);
  const [selectedVendorUUID, setSelectedVendorUUID] = useState(null);

  // products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // products filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // carts
  const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts")));

  // selected product modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSelectedProductModal, setShowSelectedProductModal] =
    useState(false);
  const [
    selectedProductModalOrderQuantity,
    setSelectedProductModalOrderQuantity,
  ] = useState(0);
  const [
    isSelectedProductModalOrderQuantityValueValid,
    setIsSelectedProductModalOrderQuantityValueValid,
  ] = useState(false);

  // carts modal
  const [showCartsModal, setShowCartsModal] = useState(false);
  const [cartsModalSelectedVendor, setCartsModalSelectedVendor] =
    useState(null);

  useEffect(() => {
    getVendors();
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(filterProducts({}));
  }, [products, selectedVendorUUID]);

  useEffect(() => {
    setSelectedVendorUUID(null);
    setFilteredProducts(filterProducts({ searchQuery: searchQuery }));
  }, [searchQuery]);

  useEffect(() => {
    setFilteredProducts(
      filterProducts({
        categoryName: selectedCategory,
        subCategoryName: selectedSubCategory,
      })
    );
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (carts) {
      localStorage.setItem("carts", JSON.stringify(carts));
    } else if (vendors.length > 0) {
      setCarts(cartsInitialValues());
      localStorage.setItem("carts", JSON.stringify(cartsInitialValues()));
    }
  }, [vendors, carts]);

  async function getVendors() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/vendors?page=2&size=25"
      );
      setVendors(res.data);
      // console.log("vendors", res.data);
    } catch (err) {
      console.log("Unable to get vendors", err.message);
    }
  }

  async function getProducts() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/products/2/50"
      );
      setProducts(res.data.content);
      // console.log("products", res.data.content);
    } catch (err) {
      console.log("Unable to get vendors", err.message);
    }
  }

  function filterProducts(properties) {
    const {
      minimumQuantity = 0, // must be number
      statusList = ["APPROVED"], // must be array of string
      searchQuery = "", // must be string
      categoryName = "ALL", // must be string
      subCategoryName = null, // must be string
    } = properties;

    let newFilteredProducts = products;
    if (products.length > 0) {
      // filter using vendor
      if (selectedVendorUUID) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => selectedVendorUUID === product.vendor.vendoruuid
        );
      }

      // filter using quantity
      if (minimumQuantity !== null) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) => product.quantity > minimumQuantity
        );
      }

      // filter using status
      if (statusList) {
        statusList.forEach((status) => {
          newFilteredProducts = newFilteredProducts.filter(
            (product) => status === product.status
          );
        });
      }

      // filter using both name or price
      if (searchQuery.length !== 0) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.price.toString().includes(searchQuery)
        );
      }

      // filter using category
      if (categoryName !== "ALL") {
        newFilteredProducts = newFilteredProducts.filter(
          (product) =>
            product.categories.length > 0 &&
            product.categories.some(
              (category) => category.name === categoryName
            )
        );
      }

      // filter using sub category
      if (subCategoryName) {
        newFilteredProducts = newFilteredProducts.filter(
          (product) =>
            product.subcategories.length > 0 &&
            product.subcategories.some(
              (subCategory) => subCategory.name === subCategoryName
            )
        );
      }
    }

    // console.log(`selectedVendorUUID (${selectedVendorUUID}) | minimumQuantity (${minimumQuantity}) | statusList (${statusList.map(status => status)}) | searchQuery (${searchQuery}) | categoryName (${categoryName}) | subCategoryName (${subCategoryName})`);
    return newFilteredProducts;
  }

  function cartsInitialValues() {
    if (vendors.length > 0) {
      const newCarts = vendors.map((vendor) => {
        return {
          vendorUUID: vendor.vendoruuid,
          vendorName: vendor.name,
          products: [],
        };
      });

      return newCarts;
    } else return [];
  }

  function handleSeePendingProductsOnClick() {
    console.log("handleSeePendingProductsOnClick");
    setFilteredProducts(
      filterProducts({
        statusList: ["PENDING"]
      })
    )
  }

  function handleSelectedCategoriesAndSelectedSubCategoryChange(
    newCategory,
    newSubCategory = null
  ) {
    setSelectedCategory(newCategory);
    setSelectedSubCategory(newSubCategory);
  }

  function handleProductOrderOnClick(newSelectedProduct = null) {
    if (showSelectedProductModal) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(newSelectedProduct);
    }

    setShowSelectedProductModal(!showSelectedProductModal);
    setSelectedProductModalOrderQuantity(0);
    setIsSelectedProductModalOrderQuantityValueValid(false);
  }

  function handleSelectedProductModalOrderQuantityChange(newOrderQuantity) {
    // if product already exist in carts, save the productQuantity in existingProductOrderQuantity
    let existingProductOrderQuantity = 0;
    carts.forEach((cart) => {
      if (selectedVendorUUID === cart.vendorUUID) {
        cart.products.forEach((product) => {
          if (selectedProduct.id === product.id)
            existingProductOrderQuantity = product.orderQuantity;
        });
      }
    });

    if (
      parseInt(newOrderQuantity) > 0 &&
      parseInt(newOrderQuantity) <=
        selectedProduct.quantity - existingProductOrderQuantity
    ) {
      setIsSelectedProductModalOrderQuantityValueValid(true);
    } else setIsSelectedProductModalOrderQuantityValueValid(false);

    setSelectedProductModalOrderQuantity(newOrderQuantity);
  }

  function handleSelectedProductModalAddToCart() {
    // check if product already exist in carts
    let isProductExistInCart = false;
    carts.forEach((cart) => {
      if (selectedProduct.vendor.vendoruuid === cart.vendorUUID) {
        cart.products.forEach((product) => {
          if (selectedProduct.id === product.id) isProductExistInCart = true;
        });
      }
    });

    let newCarts = [];
    newCarts = carts.map((cart) => {
      if (selectedProduct.vendor.vendoruuid === cart.vendorUUID) {
        return {
          vendorUUID: cart.vendorUUID,
          vendorName: cart.vendorName,
          products: isProductExistInCart
            ? cart.products.map((product) => {
                if (selectedProduct.id === product.id)
                  return {
                    ...product,
                    orderQuantity:
                      product.orderQuantity +
                      parseInt(selectedProductModalOrderQuantity),
                  };
                else return product;
              })
            : [
                ...cart.products,
                {
                  ...selectedProduct,
                  orderQuantity: parseInt(selectedProductModalOrderQuantity),
                },
              ],
        };
      } else return cart;
    });

    setSelectedProduct(null);
    setShowSelectedProductModal(false);
    setSelectedProductModalOrderQuantity(0);
    setIsSelectedProductModalOrderQuantityValueValid(false);
    setCarts(newCarts);
  }

  function handleCartsOnClick() {
    if (showCartsModal) {
      setCartsModalSelectedVendor(null);
    }

    setShowCartsModal(!showCartsModal);
  }

  function handleCartsModalVendorSelection(newCartsModalSelectedVendor) {
    setCartsModalSelectedVendor(newCartsModalSelectedVendor);
  }

  function handleCartsModalProductDelete(productId) {
    const newCarts = carts.map((cart) => {
      if (cartsModalSelectedVendor.vendorUUID === cart.vendorUUID) {
        return {
          vendorUUID: cart.vendorUUID,
          vendorName: cart.vendorName,
          products: cart.products.filter((product) => productId !== product.id),
        };
      } else return cart;
    });

    setCarts(newCarts);
  }

  function handleCartsModalCreate() {
    axios
      .post("http://rsudsamrat.site:8080/pengadaan/dev/v1/orders", {})
      .then((res) => {
        const orders = [];
        const newCarts = [];

        carts.forEach((cart) => {
          if (cartsModalSelectedVendor.vendorUUID === cart.vendorUUID) {
            cart.products.forEach((product) => {
              orders.push({
                productId: product.id,
                quantity: product.orderQuantity,
              });
            });

            newCarts.push({
              ...cart,
              products: [],
            });
          } else {
            newCarts.push(cart);
          }
        });

        axios
          .post(
            `http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/${res.data.id}/items`,
            orders
          )
          .then(() => {
            setCarts(newCarts);
            setTimeout(() => {
              navigate("/orders");
            }, 150);
          })
          .catch((err) => console.log("unable to order products", err.message));
      })
      .catch((err) => console.log("unable to order products", err.message));
  }

  function productItem(product) {
    return (
      <div key={product.id}>
        <img
          src={
            product.imageUrl
              ? product.imageUrl
              : "https://dummyimage.com/256x256/68B2A0/fff"
          }
          alt="product-img"
          width={256}
          height={256}
          className="rounded-xl mb-2 bg-primary-1 min-h-[256px] min-w-[256px] object-cover"
        />
        <div className="mb-2">
          <span className="font-bold ">{product.name}</span>
          <div className="flex items-center font-semibold">
            <span className="w-6">Rp</span>
            <span className="font-medium text-primary-1">
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-6">
              <MdInventory />
            </span>
            <span className="text-primary-1">{product.quantity}</span>
          </div>
          <span className="font-medium">{product.vendor.name}</span>
        </div>
        <button
          className="w-full text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
          onClick={() => handleProductOrderOnClick(product)}
        >
          Order
        </button>
      </div>
    );
  }

  function vendorItem(vendor) {
    return (
      <div
        key={vendor.id}
        className={`flex flex-col cursor-pointer ${
          selectedVendorUUID === vendor.vendoruuid &&
          "text-primary-1 pl-4 border-l-2 border-primary-1"
        }`}
        onClick={() => setSelectedVendorUUID(vendor.vendoruuid)}
      >
        <h3 className="font-semibold ">{vendor.name}</h3>
        {/* <h3 className="font-semibold ">{vendor.name} - {vendor.vendoruuid.match(/.{1,4}/g).join(' ')}</h3> */}
        <span className="text-sm">{vendor.address}</span>
      </div>
    );
  }

  function cartItem(product) {
    return (
      <div key={product.id} className="relative flex gap-2">
        <button
          className="absolute top-0 right-0 text-red-500 btn btn-sm btn-ghost"
          onClick={() => handleCartsModalProductDelete(product.id)}
        >
          ✕
        </button>

        <img
          src="https://dummyimage.com/128x128/68B2A0/fff"
          alt=""
          width={128}
          className="rounded-xl"
        />

        <div className="flex flex-col w-full">
          <h3 className="font-semibold">{product.name}</h3>
          <span className="text-primary-1">{product.vendor.name}</span>
          <div className="flex items-center gap-2">
            <MdInventory className="text-2xl text-primary-1" />
            <span className="font-medium">{product.orderQuantity}</span>
          </div>
          <div className="flex items-end justify-end w-full h-full gap-1">
            <span className="font-semibold ">Rp </span>
            <span className="text-primary-1">
              {(parseInt(product.orderQuantity) * parseInt(product.price))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Cart Modal */}
      <div className={showCartsModal ? "overlay" : ""}>
        {showCartsModal && (
          <dialog className="modal" open>
            <form method="dialog" className="modal-box">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MdShoppingCart className="text-2xl text-primary-1" />
                  <h3 className="text-xl font-bold">Cart</h3>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="relative w-full pr-12 text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                  >
                    Select Vendor
                    <MdArrowDropDown className="absolute text-2xl right-4" />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {showCartsModal &&
                      carts.map(
                        (cart) =>
                          cart.products.length > 0 && (
                            <li
                              key={cart.vendorUUID}
                              onClick={() => handleCartsModalVendorSelection(cart)}
                            >
                              <a>{cart.vendorName}</a>
                            </li>
                          )
                      )}
                  </ul>
                </div>
              </div>

              {/* Cart Item */}
              <div className="flex flex-col gap-2">
                {!cartsModalSelectedVendor ? (
                  <div>Select a vendor first</div>
                ) : (
                  carts.map(
                    (cart) =>
                      cartsModalSelectedVendor.vendorUUID === cart.vendorUUID &&
                      cart.products.map((product) => cartItem(product))
                  )
                )}
              </div>

              {/* Footer */}
              <div className="modal-action">
                <button
                  className="text-primary-1 btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
                  onClick={() => handleCartsOnClick()}
                >
                  Close
                </button>
                <button
                  className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                  onClick={() => handleCartsModalCreate()}
                >
                  Create
                </button>
              </div>
            </form>
          </dialog>
        )}
      </div>

      {/* Quantity Modal */}
      <div className={showSelectedProductModal ? "overlay" : ""}>
        {showSelectedProductModal && (
          <dialog className="modal" open>
            <form method="dialog" className="modal-box">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <MdInventory className="text-2xl text-primary-1" />
                <h3 className="text-xl font-bold">Quantity</h3>
              </div>

              {/* Cart Item */}
              <div>
                <input
                  id="search-input"
                  type="number"
                  value={selectedProductModalOrderQuantity}
                  onChange={(e) =>
                    handleSelectedProductModalOrderQuantityChange(e.target.value)
                  }
                  className="w-full input border-primary-1 focus:outline-primary-1 "
                />
                {!isSelectedProductModalOrderQuantityValueValid && (
                  <div>Quantity is not valid</div>
                )}
              </div>

              {/* Footer */}
              <div className="modal-action">
                <button
                  className="text-primary-1 btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2"
                  onClick={handleProductOrderOnClick}
                >
                  Close
                </button>
                <button
                  className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                  onClick={handleSelectedProductModalAddToCart}
                  disabled={!isSelectedProductModalOrderQuantityValueValid}
                >
                  Order
                </button>
              </div>
            </form>
          </dialog>
        )}
      </div>

      <div className="container flex px-[6.5rem] mx-auto flex-col md:flex-row">
        <div className="bg-red w-[256px] pr-3">
          <h2 className="flex items-center gap-1 mb-3 text-xl font-bold">
            Choose Vendor
          </h2>

          <div className="flex flex-col gap-2">
            {vendors.length === 0 ? (
              <div>Loading vendors</div>
            ) : (
              vendors.map((vendor) => vendorItem(vendor))
            )}
          </div>

          <button
            className="flex-1 text-md text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
            onClick={handleSeePendingProductsOnClick}
            style={{marginTop: "28px"}}
          >
            See Pending Products
          </button>
        </div>
        <div className="flex flex-col flex-1">
          {/* Search */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="relative flex items-center justify-center w-full">
              <label
                htmlFor="search-input"
                className="absolute text-2xl -translate-y-1/2 top-1/2 left-4"
              >
                <MdSearch />
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Search by item name or vendor name"
                className="w-full input border-primary-1 focus:outline-primary-1 ps-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2 btn-wide"
              onClick={() => handleCartsOnClick()}
              disabled={
                carts ? carts.every((cart) => cart.products.length === 0) : true
              }
            >
              <MdShoppingCart className="text-2xl" />
              Cart
            </button>
          </div>

          {/* Categories */}
          <div className="flex items-center justify-center gap-2 mb-3 w-full">
            <span className="font-semibold hidden xl:block">Categories</span>
            <button
              className="flex-1 text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
              onClick={() =>
                handleSelectedCategoriesAndSelectedSubCategoryChange("ALL")
              }
            >
              All
            </button>
            <button
              className="flex-1 text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
              onClick={() =>
                handleSelectedCategoriesAndSelectedSubCategoryChange("JASA")
              }
            >
              Jasa
            </button>
            <div className="flex-1 dropdown dropdown-end">
              <label
                tabIndex={0}
                className="relative w-full text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                onClick={() =>
                  handleSelectedCategoriesAndSelectedSubCategoryChange("BM")
                }
              >
                BM
                <MdArrowDropDown className="absolute text-2xl right-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li
                  onClick={() =>
                    handleSelectedCategoriesAndSelectedSubCategoryChange(
                      "BM",
                      "ALKES"
                    )
                  }
                >
                  <a>Alkes</a>
                </li>
                <li
                  onClick={() =>
                    handleSelectedCategoriesAndSelectedSubCategoryChange(
                      "BM",
                      "ALKEN"
                    )
                  }
                >
                  <a>Alken</a>
                </li>
              </ul>
            </div>
            <div className="flex-1 dropdown dropdown-end">
              <label
                tabIndex={0}
                className="relative w-full text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
                onClick={() =>
                  handleSelectedCategoriesAndSelectedSubCategoryChange("BPH")
                }
              >
                BPH
                <MdArrowDropDown className="absolute text-2xl right-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li
                  onClick={() =>
                    handleSelectedCategoriesAndSelectedSubCategoryChange(
                      "BPH",
                      "BHPNONMEDIS"
                    )
                  }
                >
                  <a>BHP Non medis</a>
                </li>
                <li
                  onClick={() =>
                    handleSelectedCategoriesAndSelectedSubCategoryChange(
                      "BPH",
                      "BHPMEDIS"
                    )
                  }
                >
                  <a>BHP Medis</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Product List */}
          {products.length > 0
            ? (
              <>
                <div>Result: {filteredProducts.length}</div>
                <div className="flex flex-wrap gap-4 mb-3">
                  {filteredProducts.map((product) => productItem(product))}
                </div>
              </>
            )
            : <div>Loading products ...</div>
          }

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-center join">
              <button className="join-item btn">1</button>
              <button className="join-item btn btn-active">2</button>
              <button className="join-item btn">3</button>
              <button className="join-item btn">4</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
