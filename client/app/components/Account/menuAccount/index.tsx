/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import axios from "axios";
import { Label, TextInput, Button } from "flowbite-react";

const MenuAccount = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/Logout", {
        withCredentials: true,
      });
      console.log(response.data);
      // Redirect setelah logout berhasil (optional)
      window.location.href = "/login"; // arahkan ke halaman login atau homepage
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-2 h-32">

      </div>
      <Button
        color="failure"
        className="w-full h-10 mt-auto"
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </div>
  );
};

export default MenuAccount;
