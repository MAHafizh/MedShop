/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import GetUser from "@/hooks/getUser";
import { HiOutlineArrowRight } from "react-icons/hi";
import { usePathname } from "next/navigation";

const MenuAccount = () => {
  const pathname = usePathname();
  const isAccountPage = pathname === "/account";
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
    <div className="flex flex-col h-full">
      <div className="gap-2 w-full flex flex-col justify-center items-center mt-2">
        {user?.role === "admin" && !isAccountPage && (
          <>
            <Button
              color="dark"
              onClick={() => router.push("/account/admin/product")}
              className="w-full h-10"
            >
              Add Product
            </Button>
            <Button
              color="dark"
              onClick={() => router.push("/account/admin/order")}
              className="w-full h-10"
            >
              Manage Order
            </Button>
          </>
        )}
      </div>
      <div className="mt-auto gap-2 w-full flex flex-col justify-center items-center">
        {user?.role === "admin" && (
          <Button
            color="dark"
            onClick={() => router.push("/account/admin")}
            className="w-full h-10"
          >
            Admin Dashboard
          </Button>
        )}
        <Button color="failure" className="w-full h-10" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default MenuAccount;
