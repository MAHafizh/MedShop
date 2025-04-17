import React from "react";

const ProductCard = () => {
  return (
    <div className="m-2 flex gap-2 rounded-lg shadow-lg p-2 bg-slate-50">
      <div className="border-2 w-24 h-24 flex items-center justify-center rounded-lg bg-gray-100">
        <span className="text-sm text-gray-500">Photo Product</span>
      </div>

      <div className="flex flex-col my-auto">
        <h1 className="w-full max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
          Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
          dsadasddhjaldjnasdndaskldkljdajs
        </h1>
        <h1 className="">Jenis Produk</h1>
        <h1 className="">Harga Produk</h1>
      </div>
      <div className="ml-8">
        <div className="flex my-auto">
          <div className="max-w-lg mr-2">
            <label
              htmlFor="variasi"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Variant
            </label>
            <select
              id="quantity"
              required
              className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              <option value="1">Choose Variant</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="max-w-md ml-auto mr-2">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <select
              id="quantity"
              required
              className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div className="max-w-md mb-2 mt-1">
          <label
            htmlFor="quantity"
            className="mb-2 text-sm font-light text-gray-700 flex"
          >
            Total Price
            <h1 className="ml-2 font-medium">Rp xxxxxx</h1>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
