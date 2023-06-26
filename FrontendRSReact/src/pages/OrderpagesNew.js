import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdSearch,
  MdShoppingCart,
  MdInventory,
  MdArrowDropDown,
  MdMenu,
  MdInfo,
  MdHandshake,
  MdDelete,
} from "react-icons/md";
import axios from "axios";

const OrderpagesNew = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const res = await axios.get(
        "http://rsudsamrat.site:8080/pengadaan/dev/v1/orders/orders/items/product-stock"
      );
      setAllProducts(res.data);
      console.log("vendors", res.data);
    } catch (err) {
      console.log("Unable to get vendors", err.message);
    }
  }

  // Function to format the date
  const formatDate = (dateString) => {
    const orderDate = new Date(dateString);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return orderDate.toLocaleDateString(undefined, options);
  };

  const productItem = (product) => {
    return (
      <tr>
        <td className="font-bold">1</td>
        <td className="font-medium text-primary-1">
          Masker lorem <span className="text-sm text-black">x100</span>
        </td>
        <td>
          Rp <span>100.000</span>
        </td>
        <td>VALIDATING</td>
        <td>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label
              tabIndex={0}
              className="text-xl text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
            >
              <MdMenu />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => window.infoModal.showModal()}>
                  <MdInfo className="text-xl text-slate-500" />
                  Info
                </a>
              </li>
              <hr />
              <li>
                <a>
                  <MdHandshake className="text-xl text-success" />
                  Negotiation
                </a>
              </li>
              <hr />
              <li>
                <a>
                  <MdDelete className="text-xl text-red-500" />
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    );
  };

  const productPerVendorItem = () => {
    return (
      <div className="flex flex-col gap-2 ">
        <h2 className="font-medium text-xl text-slate-600">Best Vendor</h2>
        <hr />
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Final Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* body */}
            {productItem()}
            {productItem()}
            {productItem()}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {/* Order Details Modal */}
      <dialog id="detailsModal" className="modal">
        <form method="dialog" className="modal-box max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MdInventory className="text-2xl text-primary-1" />
              <h3 className="text-xl font-bold">Order Details</h3>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>

          {/* Item list/vendor Item */}
          {productPerVendorItem()}

          {/* Footer */}
          <div className="modal-action mt-12">
            <button className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
              Payout Details
            </button>
            <button className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
              Check Status
            </button>
          </div>
        </form>
      </dialog>

      {/* Product Info Modal */}
      <dialog id="infoModal" className="modal">
        <form method="dialog" className="modal-box max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MdInfo className="text-2xl text-primary-1" />
              <h3 className="text-xl font-bold">Product info</h3>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2 ">
            <h2 className="text-3xl font-semibold text-slate-600">
              Best Vendor
            </h2>
            <div className="flex gap-3">
              <div className="flex flex-col text-primary-1 w-28">
                Price
                <span className="text-black font-medium">Rp 100.000</span>
              </div>
              <div className="flex flex-col text-primary-1">
                Supply
                <span className="text-black font-medium">2</span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              libero omnis tenetur ut cumque expedita!
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-slate-600">
                Vendor Details
              </h2>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col text-primary-1">
                Owner
                <span className="text-black font-medium w-28">Jordy Doe</span>
              </div>
              <div className="flex flex-col text-primary-1">
                Phone Number
                <span className="text-black font-medium">081234567890</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col text-primary-1">
                Name
                <span className="text-black font-medium w-28">Best Vendor</span>
              </div>
              <div className="flex flex-col text-primary-1">
                Address
                <span className="text-black font-medium">Tareran</span>
              </div>
            </div>
          </div>
        </form>
      </dialog>

      <div className="container flex flex-col px-[6.5rem] mx-auto">
        <h1 className="font-bold text-xl mb-2">
          <span className="text-primary-1">Order</span> Status
        </h1>
        <div className="flex gap-2 mb-2 items-center justify-center">
          <button className="flex-1 text-white btn btn-outline border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
            All
          </button>
          <button className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2">
            Order
          </button>
          <button className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2">
            Validating
          </button>
          <button className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2">
            Negotiation
          </button>
          <button className="flex-1 text-dark btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2">
            Shipping
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-pin-rows">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                allProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="font-bold">{product.orderId}</td>
                    <td className="font-medium text-primary-1">
                      {product.status}
                    </td>
                    <td>{formatDate(product.orderDate)}</td>
                    <td>{new Date(product.orderDate).toLocaleTimeString()}</td>
                    <td>
                      <button
                        onClick={() => window.detailsModal.showModal()}
                        className="btn btn-sm bg-primary-1 text-white hover:bg-primary-2 hover:border-primary-2"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderpagesNew;
