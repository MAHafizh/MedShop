"use client";
import React, { useEffect, useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import getUser from "@/hooks/getUser";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type Address = {
  address: string;
};

const AddressCard = () => {
  const { user, loading, error } = getUser();
  console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Address>({
    address: "",
  });

  useEffect(() => {
    if (user?.address) {
      setForm({
        address: user.address,
      });
    } else {
      setIsModalOpen(true);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/users/${user?.uuid}`,
        {
          address: form.address,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
    closeModal();
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-100 m-2 rounded-lg shadow-sm p-4">
        <h1 className="text-lg font-medium mb-2">Address Detail</h1>
        <div
          onClick={handleClick}
          className="bg-slate-50 rounded-lg cursor-pointer p-2 hover:bg-slate-100"
        >
          <h1>{user?.name}</h1>
          <h1>{user?.phone}</h1>
          <h1>{form.address}</h1>
        </div>
      </div>
      {isModalOpen && (
        <Modal show={isModalOpen} size="lg" onClose={closeModal} popup>
          <Modal.Header />
          <Modal.Body className="">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small">Receiver Name</Label>
              </div>
              <TextInput
                name="name"
                value={user?.name}
                onChange={handleChange}
                type="text"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small">Receiver Phone</Label>
              </div>
              <TextInput
                name="phone"
                value={user?.phone}
                onChange={handleChange}
                type="text"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small">Receiver Address</Label>
              </div>
              <TextInput
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                sizing="sm"
              />
            </div>
            <Button
              className="w-full mt-4"
              color="success"
              onClick={handleSubmit}
            >
              Save Address
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AddressCard;
