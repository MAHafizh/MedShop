/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
    birthdate: "",
    phone: "",
    role: "user",
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
    userData.append("name", formData.name);
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("confPassword", formData.confPassword);
    userData.append("birthdate", formData.birthdate);
    userData.append("phone", formData.phone);
    userData.append("role", formData.role);

    console.log("formData:");

    for (const pair of Array.from(userData.entries())) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", response.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        confPassword: "",
        birthdate: "",
        phone: "",
        role: "user",
      });

      router.push("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow my-6 mx-4 md:mx-96">
        <div className="m-4 flex justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Register to Exclusive</h2>
            <p className="text-gray-600 mb-8">Enter your details below</p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500
"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500
"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500
"
              />
              <input
                type="password"
                name="confPassword"
                placeholder="Repeat Password"
                value={formData.confPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500
"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500
"
              />
              <input
                type="date"
                name="birthdate"
                placeholder="Date of Birth"
                value={formData.birthdate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500
"
              />
              <div className="flex items-center gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      confPassword: "",
                      birthdate: "",
                      phone: "",
                      role: "user",
                    })
                  }
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
