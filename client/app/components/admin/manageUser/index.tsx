"use client"
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { Label, TextInput, Button, FileInput } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/navigation";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ManageUser = ({ uuid }: { uuid: string }) => {
  const router = useRouter();
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    userImage: null as string | null,
    userFile: null,
  });

  useEffect(() => {
    if (uuid) {
      const fetchData = async () => {
        const response = await axios.get(`${baseUrl}/users/${uuid}`, {
          withCredentials: true,
        });
        setForm({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role,
          address: response.data.address,
          userImage: response.data.image_link,
          userFile: null,
        });
      };
      fetchData();
    }
  }, [uuid]);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result;
          setForm({
            ...form,
            userFile: file,
            userImage: imageUrl as string | null,
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimpan = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("role", form.role);
    formData.append("address", form.address);
    if (form.userFile) {
      formData.append("UserImage", form.userFile);
    }

    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });

    try {
      const response = await axios.patch(`${baseUrl}/users/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert(response.data.msg);
      router.push("/account/admin/user");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleHapus = async (e: any) => {
    alert("Apakah anda yakin ingin menghapus produk ini?");
    e.preventDefault();
    try {
      const response = await axios.delete(`${baseUrl}/products/${uuid}`, {
        withCredentials: true,
      });
      alert(response.data.msg);
      router.push("/account/admin");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div>
        <div className="mt-4">
          <h1>Manage Product</h1>
          <div className="flex flex-col justify-between mt-4 mb-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="image" value="Image" />
                <div className="w-32 h-32 my-2">
                  <img
                    className="w-full h-full object-contain"
                    src={form.userImage || undefined}
                    alt=""
                  />
                </div>
                <FileInput
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileRef}
                />
              </div>
            </div>

            <div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput
                  value={form.name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  value={form.email}
                  onChange={handleChange}
                  id="email"
                  type="text"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Phone" />
                </div>
                <TextInput
                  value={form.phone}
                  onChange={handleChange}
                  id="phone"
                  type="text"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="address" value="Address" />
                </div>
                <TextInput
                  value={form.address}
                  onChange={handleChange}
                  id="address"
                  type="text"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="role" value="Role" />
                </div>
                <TextInput
                  value={form.role}
                  onChange={handleChange}
                  id="role"
                  type="text"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleSimpan} color="success" className="mt-4 w-25">
            Simpan
          </Button>
          <Button onClick={handleHapus} color="failure" className="mt-4 w-25">
            Hapus
          </Button>
        </div>
      </div>
    </>
  );
};
export default ManageUser;