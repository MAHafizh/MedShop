/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { CartCard, CartTotalPrice, Footer, Navbar } from "../components";
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

const Cart = () => {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cart`, {
          withCredentials: true,
        });
        setCarts(response.data);
        setTotalPrice(
          response.data.reduce((acc: any, item: any) => acc + item.subtotal, 0)
        );
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };
    getCart();
  }, []);

  const handleQtyChange = (uuid: number, newQty: number) => {
    const cartUpdated = carts.map((cart) =>
      cart.uuid === uuid
        ? {
            ...cart,
            quantity: newQty,
            subtotal: newQty * cart.product.price,
          }
        : cart
    );
    setCarts(cartUpdated);

    setTotalPrice(
      cartUpdated.reduce((acc: any, item: any) => acc + item.product.price, 0)
    );
  };

  const handleDeleteCart = (uuid: number) => {
    const cartUpdated = carts.filter((cart) => cart.uuid !== uuid);
    setCarts(cartUpdated);
    setTotalPrice(
      cartUpdated.reduce((acc: any, item: any) => acc + item.product.price, 0)
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-[1200px] mx-auto mb-4">
        <div className="border-b-2 py-8">
          <h1 className="mx-2 font-bold text-2xl">Cart</h1>
        </div>
        <div className="flex">
          <aside className="w-2/3 space-y-4">
            {carts.length === 0 ? (
              <p>Your Cart Is Empty</p>
            ) : (
              carts.map((cart: any) => (
                <CartCard
                  key={cart.uuid}
                  content={cart}
                  onQtyChange={handleQtyChange}
                  onDelete={() => handleDeleteCart(cart.uuid)}
                />
              ))
            )}
          </aside>
          <aside className="w-1/3">
            <CartTotalPrice total={totalPrice} content={carts} />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
