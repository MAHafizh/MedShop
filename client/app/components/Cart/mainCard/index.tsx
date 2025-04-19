/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { IoAddCircle, IoRemoveCircle, IoTrash } from "react-icons/io5";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type CartCardProps = {
  content: {
    product: {
      name: string;
      price: number;
      image: string;
      image_link: string;
    };
    uuid: number;
    quantity: number;
    subtotal: number;
    productUuid: string;
  };
  onQtyChange: (uuid: number, newQty: number) => void;
  onDelete: () => void;
};

const CartCard = ({ content, onQtyChange, onDelete }: CartCardProps) => {
  const [quantity, setQuantity] = useState(content.quantity);

  const updateQty = async (newQty: number) => {
    try {
      console.log("Sending:", {
        uuid: content.uuid,
        quantity: newQty,
      });
      await axios.patch(
        `${baseUrl}/cart`,
        {
          uuid: content.uuid,
          quantity: newQty,
        },
        {
          withCredentials: true,
        }
      );
      setQuantity(newQty);
      onQtyChange(content.uuid, newQty);
    } catch (error) {
      console.error("Failed To Update Qty", error);
    }
  };

  const handleInc = () => {
    const newQty = quantity + 1;

    updateQty(newQty);
  };

  const handleDec = () => {
    const newQty = quantity - 1;
    updateQty(newQty);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/cart`, {
        withCredentials: true,
        data: { uuid: content.uuid },
      });
      onDelete()
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="m-2 rounded-lg shadow-lg p-4 bg-slate-50">
        <div className="flex space-x-2 pt-2">
          <img
            src={content.product.image_link}
            alt="Product Image"
            className="rounded-lg w-32 h-32"
          />
          <div className="flex flex-col justify-between w-full p-4">
            <div className="flex-col w-full">
              <h1 className="max-w-xl overflow-hidden text-ellipsis whitespace-nowrap">
                {content.product.name}
              </h1>
              <h1 className="">{content.product.price}</h1>
            </div>
            <div className="flex w-full items-center space-x-2 justify-end mt-auto">
              <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
                <IoTrash size={18} />
              </button>
              <div className="flex items-center border rounded-md bg-white overflow-hidden w-26">
                <button className="px-2 py-1" onClick={handleDec}>
                  <IoRemoveCircle size={18}/>
                </button>
                <div className="px-3 py-1 text-gray-700 text-sm">
                  {quantity}
                </div>
                <button className="px-2 py-1" onClick={handleInc}>
                  <IoAddCircle size={18} />
                </button>
              </div>
              <div>Subtotal: {quantity * content.product.price}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
