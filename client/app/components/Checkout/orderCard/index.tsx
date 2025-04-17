import React from "react";

import { Button } from "flowbite-react";

const OrderCard = () => {
  return (
    <div className="bg-gray-100 m-2 rounded-lg shadow-sm p-4">
      <h1 className="text-lg font-medium mb-2">Order Summary</h1>
      <div>
        <div className="flex justify-between border-b-[1px] border-gray-300 py-2">
          <h2>Subtotal</h2>
          <h2>Rp 156.000</h2>
        </div>
        <div className="flex justify-between border-b-[1px] border-gray-300 py-2">
          <h2>Shipping Fee</h2>
          <h2>Rp 156.000</h2>
        </div>
        <div className="flex justify-between border-b-[1px] border-gray-300 py-2">
          <h2>Application Fee</h2>
          <h2>Rp 156.000</h2>
        </div>
        <div className="flex justify-between border-b-[1px] border-gray-300 py-2">
          <h2>Assurance Product</h2>
          <h2>Rp 156.000</h2>
        </div>
        <div className="flex justify-between py-2 mt-2">
          <h2 className="font-medium text-lg">Order Total</h2>
          <h2>Rp 156.000</h2>
        </div>
        <Button className="w-full mt-2" color="success">
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
