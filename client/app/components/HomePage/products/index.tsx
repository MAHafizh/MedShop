"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "../../cardProduct";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Iproducts {
  uuid: number;
  name: string;
  price: number;
  image: string;
  image_link: string;
}

type productProp = {
  search: string;
};

const Products = ({ search }: productProp) => {
  const [items, setItems] = useState<Iproducts[]>([]);
  console.log(items);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/products?search=${search}`
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [search]);
  return (
    <>
      <div className="flex items-center space-x-4">
        <div className="bg-red-600 w-5 h-10 rounded-md"></div>
        <h1 className="text-red-600 text-xl tracking-wider font-bold">
          Products
        </h1>
      </div>
      <div className="mt-4 mb-4 flex justify-center">
        <div className="gap-6 flex flex-wrap justify-center items-center">
          {items.length === 0 ? (
            <p>No Items</p>
          ) : (
            items.map((item) => (
              <CardProduct
                key={item.uuid}
                uuid={item.uuid}
                name={item.name}
                price={item.price}
                image={item.image}
                image_link={item.image_link}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
