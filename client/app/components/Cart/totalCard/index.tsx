"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type CartItem = {
  uuid: number;
  quantity: number;
  subtotal: number;
  product: {
    name: string;
    price: number;
    image: string;
    image_link: string;
  };
};

type CartTotalProps = {
  total: number;
  content: CartItem[];
  cartLength: number;
};

const TotalCard = ({ total, content, cartLength }: CartTotalProps) => {
  const router = useRouter();

  const handleOrder = async () => {
    if (cartLength === 0) {
      alert("Tidak Dapat Checkout");
      return;
    }
    try {
      console.log(content);
      await axios.post(
        `${baseUrl}/checkout`,
        {
          carts: content,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/cart/checkout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 m-2 rounded-lg shadow-sm p-4 sticky top-2">
      <div>
        <div className="flex justify-between border-b-[1px] border-gray-300 py-2">
          <h2>Subtotal</h2>
          <h2>Rp {total}</h2>
        </div>
        <Button className="w-full mt-2" color="success" onClick={handleOrder}>
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default TotalCard;
