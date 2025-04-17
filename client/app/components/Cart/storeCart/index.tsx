import React from 'react'
import { Checkbox } from "flowbite-react";
import { CartProductCard } from "../..";

const StoreCart = () => {
  return (
    <div className="m-2 rounded-lg shadow-lg p-4 bg-slate-50">
    <div className="border-b flex items-center space-x-2">
      <Checkbox
        id="accept"
        className="text-gray-800 focus:ring-gray-800  dark:focus:ring-gray-800"
      />
      <h1 className="">Store Name</h1>
    </div>
    <CartProductCard />
    <CartProductCard />
    <CartProductCard />
    <CartProductCard />
  </div>
  )
}

export default StoreCart