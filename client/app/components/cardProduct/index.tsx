/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductsProps {
  uuid: number;
  name: string;
  image: string;
  price: number;
  image_link: string;
}

const CardProduct = ({
  uuid,
  name,
  price,
  image,
  image_link,
}: ProductsProps) => {

  const router = useRouter();
  const handleClick = () => {
    router.push(`/detail-product/${uuid}`);
  };
  return (
    <>
      <div
        className="w-60 h-60 max-w-sm bg-white border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
        onClick={handleClick}
      >
        <div className="flex justify-center m-2">
          <img src={image_link} alt={image} className="w-auto h-36 object-cover" />
        </div>
        <div className="flex flex-col px-5 h-22">
          <a href="#">
            <h5 className="line-clamp-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          <div className="mt-auto mb-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-1 rtl:space-x-reverse"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-md font-bold text-gray-900 dark:text-white">
                Rp {price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
