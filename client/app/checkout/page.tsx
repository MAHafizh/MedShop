/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from "react";

import { Navbar, Footer, ProductCard, ShippingCard, OrderCard, AddressCard } from "../components";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCLick = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex">
        <div className="w-[1200px] mx-auto">
          <div className="border-b-2 py-8">
            <h1 className="mx-2 font-bold text-2xl">Check Out</h1>
          </div>
          <div className="flex">
            <aside className="w-2/3 space-y-4">
              <ProductCard />
            </aside>

            <aside className="w-1/3">
              <div className="space-y-4">
                <AddressCard/>
                <ShippingCard />
                <OrderCard/>
              </div>
            </aside>
          </div>
        </div>
        <div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
