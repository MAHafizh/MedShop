/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Footer, OrderCard, AddressCard } from "../../components";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Product = {
  name: string;
  price: number;
  image: string;
  image_link: string;
};

type OrderItem = {
  uuid: string;
  quantity: number;
  subtotal: number;
  product: Product;
};

const Cart = () => {
  const [orderitems, setOrderItems] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const getOrderItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
          {
            withCredentials: true,
          }
        );
        setOrderItems(response.data);
        setTotalPrice(
          response.data.reduce((acc: any, item: any) => acc + item.subtotal, 0)
        );
      } catch (error) {
        console.error(error);
      }
    };
    getOrderItems();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col w-[1200px] mx-auto">
        <div className="border-b-2 py-8">
          <h1 className="mx-2 font-bold text-2xl">Order Page</h1>
        </div>
        <div className="flex">
          <aside className="w-2/3 space-y-4">
            {orderitems.map((item) => (
              <div
                key={item.uuid}
                className="m-2 flex gap-2 rounded-lg shadow-lg p-2 bg-slate-50"
              >
                <div className="flex items-center justify-center rounded-lg">
                  <img
                    className="object-contain w-24 h-24"
                    src={item.product.image_link}
                    alt={item.product.image}
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="w-full max-w-sm overflow-hidden">
                    {item.product.name}
                  </h1>
                  <h1 className="w-full max-w-sm overflow-hidden">
                    x{item.quantity}
                  </h1>
                  <h1 className="w-full max-w-sm overflow-hidden">
                    Subtotal: {item.subtotal}
                  </h1>
                </div>
                <div className="ml-8">
                  <div className="flex my-auto"></div>
                </div>
              </div>
            ))}
          </aside>

          <aside className="w-1/3">
            <div className="space-y-4">
              <AddressCard onAddressChange={setAddress} />
              <OrderCard total={totalPrice} address={address} />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
