import React from "react";
import {
  MdSearch,
  MdShoppingCart,
  MdInventory,
  MdArrowDropDown,
} from "react-icons/md";

export default function ProductPagesNew() {
  function productItem() {
    return (
      <div>
        <img
          src="https://dummyimage.com/256x256/68B2A0/fff"
          alt="product-img"
          width={256}
          height={256}
          className="rounded-xl mb-2"
        />
        <div className="mb-2">
          <span className="font-bold ">Product name</span>
          <div className="flex items-center font-semibold">
            <span className="w-6">Rp</span>
            <span className="font-medium text-primary-1">12.000.000</span>
          </div>
          <div className="flex items-center">
            <span className="w-6">
              <MdInventory />
            </span>
            <span className="text-primary-1">200</span>
          </div>
          <span className="font-medium">Vendor name</span>
        </div>
        <button
          onClick={() => window.quantityModal.showModal()}
          className="w-full text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
        >
          Order
        </button>
      </div>
    );
  }

  function vendorItem(active) {
    return (
      <div
        className={`flex flex-col cursor-pointer ${
          active && "text-primary-1 pl-4 border-l-2 border-primary-1"
        }`}
      >
        <h3 className="font-semibold ">Vendor Name</h3>
        <span className="text-sm">City</span>
      </div>
    );
  }

  function cartItem() {
    return (
      <div className="relative flex gap-2">
        <button className="absolute top-0 right-0 text-red-500 btn btn-sm btn-ghost">
          ✕
        </button>

        <img
          src="https://dummyimage.com/128x128/68B2A0/fff"
          alt=""
          width={128}
          className="rounded-xl"
        />

        <div className="flex flex-col w-full">
          <h3 className="font-semibold">Product name Lorem, ipsum</h3>
          <span className="text-primary-1">Vendor name</span>
          <div className="flex items-center gap-2">
            <MdInventory className="text-2xl text-primary-1" />
            <span className="font-medium">2</span>
          </div>
          <div className="flex items-end justify-end w-full h-full gap-1">
            <span className="font-semibold ">Rp </span>
            <span className="text-primary-1">2.000.000</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Cart Modal */}
      <dialog id="ordersModal" className="modal">
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
                Vendor Name
                <MdArrowDropDown className="absolute text-2xl right-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Vendor Tomohon</a>
                </li>
                <li>
                  <a>Vendor Tondano</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Cart Item */}
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, i) => cartItem())}
          </div>

          {/* Footer */}
          <div className="modal-action">
            <button className="text-primary-1 btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2">
              Close
            </button>
            <button className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
              Create
            </button>
          </div>
        </form>
      </dialog>

      {/* Quantity Modal */}
      <dialog id="quantityModal" className="modal">
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
              defaultValue={1}
              min={1}
              placeholder="1"
              className="w-full input border-primary-1 focus:outline-primary-1 "
            />
          </div>

          {/* Footer */}
          <div className="modal-action">
            <button className="text-primary-1 btn btn-outline border-primary-1 hover:bg-primary-2 hover:border-primary-2">
              Close
            </button>
            <button className="text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
              Order
            </button>
          </div>
        </form>
      </dialog>

      <div className="container flex lg:px-[14rem] xl:px-[15rem] 2xl:px-[15rem] mx-auto flex-col md:flex-row ">
        <div className="bg-red w-[256px] pr-3 mb-3">
          <h2 className="flex items-center gap-1 mb-3 text-xl font-bold">
            Choose Vendor
          </h2>

          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, i) => vendorItem())}
          </div>
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
              />
            </div>
            <button
              className="text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2 btn-wide"
              onClick={() => window.ordersModal.showModal()}
            >
              <MdShoppingCart className="text-2xl" />
              Cart
            </button>
          </div>

          {/* Categories */}
          <div className="flex items-center justify-center gap-2 mb-3 w-full">
            <span className="font-semibold hidden xl:block">Categories</span>
            <button className="flex-1 text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
              All
            </button>
            <button className="flex-1 text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
              Jasa
            </button>
            <button className="flex-1 text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
              BM
            </button>
            <div className="flex-1 dropdown dropdown-end">
              <label
                tabIndex={0}
                className="relative w-full text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
              >
                BM
                <MdArrowDropDown className="absolute text-2xl right-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Alkes</a>
                </li>
                <li>
                  <a>Alken</a>
                </li>
              </ul>
            </div>
            <div className="flex-1 dropdown dropdown-end">
              <label
                tabIndex={0}
                className="relative w-full text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2"
              >
                BPH
                <MdArrowDropDown className="absolute text-2xl right-4" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>BHP Non medis</a>
                </li>
                <li>
                  <a>BHP Medis</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-3 gap-4">
            {[...Array(20)].map((_, i) => productItem())}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div>
      </div>
    </>
  );
}
