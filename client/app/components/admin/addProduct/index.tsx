"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import { Label, TextInput, Button, FileInput, Select } from "flowbite-react";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { useRouter } from "next/navigation";

const AddProduct: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Alat",
    description: "",
    productImage: null as string | null,
    productFile: null,
  });

  const fileRef = useRef(null);

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
        console.log(imageUrl);
        setForm({
          ...form,
          productFile: file,
          productImage: imageUrl as string | null,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimpan = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("description", form.description);
    if (form.productFile) {
      formData.append("ProductImage", form.productFile);
    }

    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    try {
      const response = await axios.post(`${baseUrl}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      router.push("/account/admin");
      alert(response.data.msg);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <div>
        <div className="mt-4">
          <h1>Add New Product</h1>
          <div className="flex flex-col justify-between mt-4 mb-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="image" value="Image" />
                <div className="w-32 h-32 my-2">
                  <img
                    className="w-full h-full object-contain"
                    src={form.productImage || undefined}
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
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput
                  value={form.price}
                  onChange={handleChange}
                  id="price"
                  type="text"
                  className="w-full"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="category">Select Category</Label>
              </div>
              <Select
                id="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="Alat">Alat</option>
                <option value="Obat">Obat</option>
              </Select>
            </div>

            <div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <TextInput
                  value={form.description}
                  onChange={handleChange}
                  id="description"
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
        </div>
      </div>
    </>
  );
};
export default AddProduct;
