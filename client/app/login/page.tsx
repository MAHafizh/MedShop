/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Checkbox, Label } from "flowbite-react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("remember", formData.remember ? "on" : "");
    console.log("formData:");

    for (const pair of Array.from(userData.entries())) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(`${baseUrl}/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Registration successful:", response.data);
      setTimeout(() => {
        alert("Login successful");
        router.push("/");
      }, 1000);
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow my-6 mx-96">
          <div className="m-4 flex justify-around">
            <div className="my-4 w-80">
              <h2 className="text-2xl font-bold mb-2">Log in to MedShop</h2>
              <p className="text-gray-600 mb-8">Enter your details below</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
                />
                <div className="flex items-center gap-2">
                  <Checkbox
                    name="remember"
                    value={formData.remember}
                    onChange={handleChange}
                  />
                  <Label htmlFor="age">Remember Me!</Label>
                </div>
                <div className=" mt-4 flex justify-between items-center mb-6">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div>
                <div className="flex flex-row items-center gap-1">
                  <p>Dont have an account ?</p>
                  <Link
                    href="/register"
                    className="text-red-500 text-sm hover:underline"
                  >
                    Register Now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Login;
