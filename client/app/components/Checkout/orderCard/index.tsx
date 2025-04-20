"use client";
import React, { useState } from "react";
import { Button, Label, Select } from "flowbite-react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useRouter } from "next/navigation";
import useGetUser from "@/hooks/getUser";

type CartTotalProps = {
  total: number;
  orderLength: number;
};

const OrderCard = ({ total, orderLength }: CartTotalProps) => {
  const {user, error, loading}= useGetUser()
  const router = useRouter();
  const [payment, setPayment] = useState<string>("Cash On Delivery");

  const handlePlaceOrder = async () => {
    if (orderLength === 0) {
      alert("Tidak Dapat Melakukan Order");
      return;
    }
    try {
      const response = await axios.post(
        `${baseUrl}/order`,
        {
          method: payment,
          total: total,
          address: user?.address
        },
        { withCredentials: true }
      );
      router.push("/account/order");
      const { uuid } = response.data;
      await axios.post(
        `${baseUrl}/order/invoice`,
        {
          uuid: uuid,
        },
        {
          withCredentials: true,
        }
      );
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
