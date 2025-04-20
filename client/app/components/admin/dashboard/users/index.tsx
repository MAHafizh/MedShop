"use client";
import React from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

interface Iusers {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  image_link: string;
}

interface AdminDashboardProps {
  users: Iusers[];
}

const AdminDashboard = ({ users }: AdminDashboardProps) => {
  const router = useRouter();

  const handleManage = (uuid: string) => {
    router.push(`/account/admin/user/${uuid}`);
  };

  return (
    <div>
      <Table hoverable className="">
        <TableHead>
          <TableHeadCell className="">Name</TableHeadCell>
          <TableHeadCell className="">Email</TableHeadCell>
          <TableHeadCell className="">Phone</TableHeadCell>
          <TableHeadCell className="">Role</TableHeadCell>
          <TableHeadCell className="">
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y w-[1000px]">
          {users.map((user) => (
            <TableRow
              key={user.uuid}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleManage(user.uuid)}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
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