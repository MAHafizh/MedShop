/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import GetUser from "@/hooks/getUser";

const AdminAccount = () => {
  const router = useRouter();
  const { user, loading, error } = GetUser();

  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:5000/Logout", {
        withCredentials: true,
      });
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {user?.role === "admin" && (
        <Button color="dark" onClick={() => router.push("/account/admin")} className="w-full h-10 mt-auto">
          Admin Dashboard
        </Button>
      )}
      <Button
        color="failure"
        className="w-full h-10 mt-2"
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </div>
  );
};

export default AdminAccount;
