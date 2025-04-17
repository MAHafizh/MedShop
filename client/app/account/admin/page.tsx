/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Footer,
  MenuAccount,
  InputProfile,
  AdminDashboard,
  ProtectedRoute
} from "../../components";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from 'axios'

const Admin = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <main className="min-h-screen flex flex-col w-[1200px] mx-auto">
          <div className="flex justify-between"></div>
          <div className="flex gap-8">
            <aside className="flex-col w-1/6 mt-6 rounded-3xl shadow-lg bg-white p-4 h-[500px]">
              <MenuAccount />
            </aside>
            <aside className="w-5/6 mt-6">
              <AdminDashboard products={products}/>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
