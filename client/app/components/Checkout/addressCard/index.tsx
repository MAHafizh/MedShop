"use client";
import React, { useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";

type Address = {
  name: string;
  phone: string;
  address: string;
};

type AddressProps = {
  onAddressChange: (Address: Address) => void;
};

const AddressCard = ({ onAddressChange }: AddressProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Address>({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onAddressChange(form);
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
          <h1>{form.name}</h1>
          <h1>{form.phone}</h1>
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
                value={form.name}
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
                value={form.phone}
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
