"use client";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Exclusive Section */}
          <div>
            <h2 className="text-lg font-bold">Exclusive</h2>
            <p className="mt-2">Subscribe</p>
            <p className="text-sm">Get 10% off your first order.</p>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-l px-3 py-2 bg-black text-white focus:outline-none"
              />
              <button className="bg-blue-500 text-white rounded-r px-4 py-2 hover:bg-blue-600 focus:outline-none">
                →
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-lg font-bold">Support</h2>
            <p className="mt-2">Jl. Merdeka, Indonesia</p>
            <p className="mt-2">exclusive@gmail.com</p>
            <p className="mt-2">+62 123 4567 7890</p>
          </div>

          {/* Account Section */}
          <div>
            <h2 className="text-lg font-bold">Account</h2>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Download App Section */}
          <div>
            <h2 className="text-lg font-bold">Download App</h2>
            <p className="mt-2">Save $3 with App New User Only.</p>
            <div className="flex space-x-4 mt-4">
              <Image
                src=""
                alt="Google Play"
                width={120}
                height={40}
                className="object-contain"
              />
              <Image
                src=""
                alt="App Store"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-4 text-center">
          <p className="text-sm">
            © Copyright Rimel 2022. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
