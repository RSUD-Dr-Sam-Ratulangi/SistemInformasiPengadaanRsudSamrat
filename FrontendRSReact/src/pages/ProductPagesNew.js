import React from "react";
import {
  MdSearch,
  MdShoppingCart,
  MdInventory,
  MdFilterAlt,
  MdArrowDropDown,
} from "react-icons/md";

export default function ProductPagesNew() {
  function productItem() {
    return (
      <div>
        <div className="mb-2 overflow-hidden rounded-xl">
          <img
            src="https://dummyimage.com/256x256/68B2A0/fff"
            alt="product-img"
            width={256}
            height={256}
          />
        </div>
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
        <button className="w-full text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2">
          Order
        </button>
      </div>
    );
  }

  function FilterCheckbox(active) {
    return (
      <div
        className={`flex flex-col ${
          active && "text-primary-1 pl-4 border-l-2 border-primary-1"
        }`}
      >
        <h3 className="font-semibold ">Vendor Name</h3>
        <span className="text-sm">City</span>
      </div>
    );
  }

  return (
    <div className="container flex px-[6.5rem] mx-auto">
      <div className="bg-red w-[256px] pr-3">
        <h2 className="flex items-center gap-1 mb-3 text-xl font-bold">
          Choose Vendor
        </h2>

        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => FilterCheckbox())}
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
          <button className="text-lg text-white btn border-primary-1 bg-primary-1 hover:bg-primary-2 hover:border-primary-2 btn-wide">
            <MdShoppingCart className="text-2xl" />
            Orders
          </button>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="font-semibold ">Categories</span>
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
        <div className="flex flex-wrap gap-4 mb-3">
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
  );
}
