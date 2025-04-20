/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import getUser from "@/hooks/getUser";

const Navbar = () => {
  const { user, loading, error } = getUser();

  return (
    <nav className="bg-slate-50 py-4 px-4 mt-6 w-[1200px] mx-auto rounded-lg shadow-lg sticky top-6 z-10">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="font-bold text-xl">
            MedShop.
          </a>
        </div>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="What are you looking?"
            className="w-full border rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 px-4 py-2 pr-10 focus:outline-none text-base"
          />
          <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="flex items-center space-x-2 s">
          <div>
            <Link href="/cart" className="px-4 py-2">
              Cart
            </Link>
            <Link href="/account" className="px-4 py-2">
              {user ? user?.name : "Account"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
