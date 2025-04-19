/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import QuantitySelector from "../quantitySelector";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import axios from "axios";

interface Iproducts {
  name: string;
  price: number;
  image: string;
  image_link: string;
  description: string;
}

interface IProps {
  uuid: string;
}

const DetailProduct: React.FC<IProps> = ({ uuid }) => {
  const [product, setProduct] = React.useState<Iproducts | null>(null);
  const [qty, setQty] = useState<number>(1);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${baseUrl}/products/${uuid}`);
      const data: Iproducts = await response.json();
      setProduct(data);
      console.log(data);
    };

    fetchProduct();
  }, [uuid]);

  if (!product) return <div>Loading...</div>;

  const totalPrice = qty * product.price;

  const handleToCart = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/cart`,
        {
          productUuid: uuid,
          quantity: qty,
        },
        { withCredentials: true }
      );
      alert(response.data.msg)
    } catch (error) {
      alert(error)
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="mt-4 ml-4 h-96 w-96 flex flex-col justify-between items-center relative">
          <div className="flex justify-center items-center h-full w-full overflow-hidden">
            <img
              src={product.image_link}
              alt="Main Product"
              className="object-contain max-h-full max-w-full"
            />
          </div>
        </div>
        <div className="px-12 py-4 w-10/12">
          <div className="mb-4">
            <h1 className="font-bold text-xl">{product.name}</h1>
            <div className="inline-flex items-center my-2 space-x-2"></div>
            <h1 className="ml-4 font-bold text-xl">$ {product.price}</h1>
          </div>
          <div className="ml-4">{product.description}</div>
          <div className="ml-4 my-4 flex gap-4 items-center">
            <QuantitySelector qty={qty} setQty={setQty} />
            <div>
              <h1 className="font-bold text-xl">$ {totalPrice}</h1>
            </div>
          </div>
          <div className="flex gap-4 ml-4">
            <button onClick={handleToCart} className="text-white rounded-md w-36 h-10 py-2  bg-red-500 hover:bg-red-600">
              Add to Cart
            </button>
          </div>
          <div className="mt-6">
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-lg font-normal">
                Spesification
              </div>
              <div className="collapse-content">
                <p>
                  tabindex={0} attribute is necessary to make the div focusable
                </p>
              </div>
            </div>
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-lg font-normal">
                Shipping Information
              </div>
              <div className="collapse-content">
                <p>
                  tabindex={0} attribute is necessary to make the div focusable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
