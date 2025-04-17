/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  IoAddCircle,
  IoClipboard,
  IoRemoveCircle,
  IoTrash,
} from "react-icons/io5";
import { Checkbox } from "flowbite-react";

const productCard = () => {
  return (
    <>
      <div className="flex space-x-2 pt-2">
        <Checkbox
          id="accept"
          className="text-gray-800 focus:ring-gray-800 dark:ring-offset-gray-800 dark:focus:ring-gray-800"
        />
        <img
          src="https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
          alt="Product Image"
          className="rounded-lg w-32 h-32"
        />
        <div className="flex-col">
          <div className="flex-col my-auto border-b w-full mb-1 pb-1">
            <h1 className="max-w-xl overflow-hidden text-ellipsis whitespace-nowrap">
              Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
              dsadasddhjaldjnasdndaskldkljdajs
            </h1>
            <h1 className="">Harga Produk</h1>
            <h1 className="mb-4">Type</h1>
          </div>
          <div className="flex w-full items-center space-x-2 justify-end">
            <button className="text-blue-500 hover:text-blue-700">
              <IoClipboard size={18} />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <IoTrash size={18} />
            </button>

            <div className="flex items-center border rounded-md bg-white overflow-hidden">
              <button className="px-2 py-1">
                <IoRemoveCircle size={18} />
              </button>
              <div className="px-3 py-1 text-gray-700 text-sm">1</div>
              <button className="px-2 py-1">
                <IoAddCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default productCard;
