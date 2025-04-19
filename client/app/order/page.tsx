/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { CartCard, CartTotalPrice, Footer, Navbar } from "../components";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Cart = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-[1200px] mx-auto mb-4">test</main>
      <Footer />
    </>
  );
};

export default Cart;
