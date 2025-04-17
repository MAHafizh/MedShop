/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    console.log("formData:");
    for (const pair of Array.from(userData.entries())) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      setFormData({
        email: "",
        password: "",
      });
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
            <div className="my-16 w-80">
              <h2 className="text-2xl font-bold mb-2">Log in to Exclusive</h2>
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
                <div className="flex flex-col">
                  <Link
                    href="/forgot-password"
                    className="text-red-500 text-sm hover:underline"
                  >
                    Forget Password?
                  </Link>
                </div>
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
