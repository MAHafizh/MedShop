import React from "react";
import CardProduct from "../../cardProduct";
const URL = process.env.BASE_URL || "http://localhost:5000/products";

interface Iproducts {
  uuid: number;
  name: string;
  price: number;
  image: string;
  image_link: string;
}

const Products = async () => {
  const response = await fetch(URL, {
    cache: "no-store",
  });
  const items: Iproducts[] = await response.json();
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
          {items.length > 0 ? (
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
          ) : (
            <p>No Product Available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
