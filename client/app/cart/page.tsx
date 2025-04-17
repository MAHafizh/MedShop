import React from "react";
import { CartCard, CartTotalPrice, Footer, Navbar } from "../components";

const Cart = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-[1200px] mx-auto mb-4">
        <div className="border-b-2 py-8">
          <h1 className="mx-2 font-bold text-2xl">Cart</h1>
        </div>
        <div className="flex">
          <aside className="w-2/3 space-y-4">
            <CartCard />
          </aside>
          <aside className="w-1/3">
            <CartTotalPrice />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
