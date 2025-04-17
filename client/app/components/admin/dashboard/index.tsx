"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

interface Iproducts {
  uuid: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  image_link: string;
}

interface AdminDashboardProps {
  products: Iproducts[];
}

const AdminDashboard = ({ products }: AdminDashboardProps) => {
  const router = useRouter();

  const handleManage = (uuid: string) => {
    router.push(`/account/admin/product/${uuid}`);
  };

  return (
    <div>
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="">Product name</TableHeadCell>
          <TableHeadCell className="">Color</TableHeadCell>
          <TableHeadCell className="">Category</TableHeadCell>
          <TableHeadCell className="">Price</TableHeadCell>
          <TableHeadCell className="">
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {products.map((product) => (
            <TableRow
              key={product.uuid}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product.name}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>Rp {product.price}</TableCell>
              <TableCell>
                <button onClick={() => handleManage(product.uuid)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Manage
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default AdminDashboard;
