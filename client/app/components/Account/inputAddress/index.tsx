/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import { HiOutlinePlus } from "react-icons/hi";
import CardAddress from "../cardAddress";
import ModalAddress from "../ModalAddress";

interface Address {
  receiver: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  detailaddress: string;
}

const InputAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveAddress = (newAddress: Address) => {
    setAddresses((prevAddress):any => [...prevAddress, newAddress]);
    closeModal();
  };

  return (
    <>
      <div className="">
        <div className="mr-16 flex justify-between">
          <h1>Your Addresses</h1>
          <Button size="xs" onClick={openModal}>
            <HiOutlinePlus className="h-3 w-3" />
          </Button>
        </div>
        <div className="my-4 mr-16 space-y-2">
          {addresses.map((address, index) => (
            <CardAddress key={index} address={address} />
          ))}
        </div>
      </div>
      <ModalAddress
        show={isModalOpen}
        onSave={handleSaveAddress}
        onClose={closeModal}
      />
    </>
  );
};

export default InputAddress;
