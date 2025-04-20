/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import {
  CartCard,
  CartTotalPrice,
  Footer,
  InputProfile,
  MenuAccount,
  Navbar,
  ProtectedRoute,
} from "../../components";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useRouter } from "next/navigation";
import { Button, ButtonGroup } from "flowbite-react/components/Button";
import { blob } from "stream/consumers";

const Order = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const getOrder = async () => {
    try {
      const response = await axios.get(`${baseUrl}/order/me`, {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleInvoice = async (uuid: string) => {
    try {
      const response = await axios.get(`${baseUrl}/order/invoice/${uuid}`, {
        withCredentials: true,
      });
      if (!response.data) return console.error("failed to create invoice");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/order/${uuid}`, {
        withCredentials: true,
      });
      await getOrder();
      alert(response.data.msg);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="min-h-screen flex flex-col w-[1200px] mx-auto">
        <div className="flex justify-between"></div>
        <div className="flex gap-8">
          <aside className="flex-col w-1/6 mt-6 rounded-3xl shadow-lg bg-white p-4 h-96">
            <MenuAccount />
          </aside>
          <aside className="mt-6 w-5/6">
            <div className="">
              <div className=" py-4">
                <h1 className="font-bold text-2xl">Order Page</h1>
              </div>
              <div className="">
                {orders.map((order) => (
                  <div
                    key={order.uuid}
                    className={`shadow-md p-4 my-4 rounded-lg ${
                      order.status === "Paid"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    <div className="m-2 flex gap-2 rounded-lg shadow-lg p-2 bg-slate-50">
                      <div className="flex flex-col">
                        <h1 className="w-full max-w-sm overflow-hidden">
                          Nama: {order.user.name}
                        </h1>
                        <h1 className="w-full max-w-sm overflow-hidden">
                          Phone: {order.user.phone}
                        </h1>
                        <h1 className="w-full max-w-sm overflow-hidden">
                          Alamat: {order.address}
                        </h1>
                        <h1 className="w-full max-w-sm overflow-hidden">
                          Status: {order.status}
                        </h1>
                      </div>
                    </div>
                    {order.orderItems.map((item: any) => (
                      <div className="m-2 flex gap-2 rounded-lg shadow-lg p-2 bg-slate-50">
                        <div className="flex items-center justify-center rounded-lg">
                          <img
                            className="object-contain w-24 h-24"
                            src={item.product.image_link}
                            alt={item.product.image}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="w-full max-w-sm overflow-hidden">
                            {item.product.name}
                          </h1>
                          <h1 className="w-full max-w-sm overflow-hidden">
                            x{item.quantity}
                          </h1>
                          <h1 className="w-full max-w-sm overflow-hidden">
                            Subtotal: {item.subtotal}
                          </h1>
                        </div>
                        <div className="ml-8">
                          <div className="flex my-auto"></div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end gap-2 p-2">
                      <ButtonGroup className="">
                        <Button
                          onClick={() => handleDelete(order.uuid)}
                          color="red"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => handleInvoice(order.uuid)}
                          color="green"
                        >
                          Invoice
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default Order;
