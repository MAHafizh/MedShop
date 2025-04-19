"use client"
import React, { useState } from "react";
import { Button, Label, Select } from "flowbite-react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useRouter } from "next/navigation";

type Address = {
  name: string;
  phone: string;
  address: string;
};

type CartTotalProps = {
  total: number;
  address: Address;
};

const OrderCard = ({ total, address }: CartTotalProps) => {
  const [payment, setPayment] = useState<string>("Cash On Delivery");
  console.log(payment);
  console.log(address.address)
  const handlePlaceOrder = async () => {
    try {
      await axios.post(
        `${baseUrl}/order`,
        {
          method: payment,
          address: address.address,
          total: total
        },
        { withCredentials: true }
      );
      alert("Order Created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 m-2 rounded-lg shadow-sm p-4">
      <h1 className="text-lg font-medium mb-2">Order Summary</h1>
      <div>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label className="text-md" htmlFor="payment">
              Select Payment Method
            </Label>
          </div>
          <Select
            id="payment"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            required
          >
            <option>Cash On Delivery</option>
            <option>Credit Or Debit Card</option>
          </Select>
        </div>
        <div className="flex justify-between py-2 mt-2">
          <h2 className="font-medium text-lg">Order Total</h2>
          <h2>Rp {total}</h2>
        </div>
        <Button
          onClick={handlePlaceOrder}
          className="w-full mt-2"
          color="success"
        >
          Place Order Now
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
