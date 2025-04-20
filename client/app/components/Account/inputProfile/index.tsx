/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import getUser from "@/hooks/getUser";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const InputProfile = () => {
  const { user, loading, error } = getUser();
  const [isDisabled, setIsDisabled] = useState(true);
  const [uuid, setUuid] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    currPassword: "",
    newPassword: "",
    confPassword: "",
    userImage: null as string | null,
    userFile: null,
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthdate: user.date_of_birth,
        currPassword: "",
        newPassword: "",
        confPassword: "",
        userImage: user.image_link,
        userFile: null,
      });
      setUuid(user.uuid);
    }
  }, [user]);

  const handleEdit = () => {
    setIsDisabled(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
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

    if (!uuid) return alert("uuid tidak ditemukan");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("birthdate", form.birthdate);
    formData.append("currPassword", form.currPassword);
    formData.append("newPassword", form.newPassword);
    formData.append("confPassword", form.confPassword);
    if (form.userFile) {
      formData.append("UserImage", form.userFile);
    }

    setIsDisabled(true);
    console.log(uuid);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h1>Manage Profile</h1>
        <div className="w-1/4 flex flex-col items-center -ml-10 mt-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-300 mb-4">
            <img src={form.userImage || undefined} />
          </div>
          <Label
            htmlFor="profilePic"
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600"
          >
            Change Photo
          </Label>
          <input
            disabled={isDisabled}
            type="file"
            id="profilePic"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex justify-between space-x-4 mt-4 mb-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full"
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className="flex justify-between space-x-4 mt-4">
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              className="w-full"
              disabled={isDisabled}
            />
          </div>
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Phone Number" />
            </div>
            <TextInput
              id="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              className="w-full"
              disabled={isDisabled}
            />
          </div>
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="birthdate" value="Birth Date" />
            </div>
            <TextInput
              id="birthdate"
              type="date"
              value={form.birthdate}
              onChange={handleChange}
              className="w-full"
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1>Manage Password</h1>
        <div className="flex justify-between space-x-4 mt-4 mb-4">
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="currPassword" value="Current Password" />
            </div>
            <TextInput
              id="currPassword"
              type="password"
              className="w-full"
              disabled={isDisabled}
              value={form.currPassword}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="newPassword" value="New Password" />
            </div>
            <TextInput
              id="newPassword"
              type="password"
              className="w-full"
              disabled={isDisabled}
              value={form.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="confPassword" value="Confirm Password" />
            </div>
            <TextInput
              id="confPassword"
              type="password"
              className="w-full"
              disabled={isDisabled}
              value={form.confPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button color="warning" className="mt-4 w-25" onClick={handleEdit}>
          Ubah
        </Button>
        <Button color="success" className="mt-4 w-25" onClick={handleSimpan}>
          Simpan
        </Button>
      </div>
    </>
  );
};

export default InputProfile;
