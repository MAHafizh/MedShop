"use client";
import React, { useState } from "react";
import {
  Modal,
  Card,
} from "flowbite-react";

const AddressCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h1>Hafizh</h1>
          <h1>081234567890</h1>
          <h1>Jl. Medokan Asri Barat VII J No. 22</h1>
        </div>
      </div>
      {isModalOpen && (
        <Modal show={isModalOpen} size="lg" onClose={closeModal} popup>
          <Modal.Header />
          <Modal.Body className="space-y-4">
            <Card className="w-full h-30">
              <div className="mr-32">
                <h1 className="text-base font-semibold tracking-normal leading-none mb-4">
                  Hafizh
                </h1>
                <p className="font-normal text-base leading-none mb-2">
                  081234567890
                </p>
                <p className="font-normal text-base leading-none">
                  Jl. Medokan Asri Barat VII
                </p>
              </div>
            </Card>

            <Card className="w-full h-30">
              <div className="mr-32">
                <h1 className="text-base font-semibold tracking-normal leading-none mb-4">
                  Hafizh
                </h1>
                <p className="font-normal text-base leading-none mb-2">
                  081234567890
                </p>
                <p className="font-normal text-base leading-none">
                  Jl. Medokan Asri Barat VII
                </p>
              </div>
            </Card>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AddressCard;
