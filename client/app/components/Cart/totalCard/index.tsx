"use client"
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "flowbite-react";

const TotalCard = () => {
    const router = useRouter();
  return (
    <div className="bg-gray-100 m-2 rounded-lg shadow-sm p-4 sticky top-2">
      <div>
        <div className="flex justify-between border-b-[1px] border-gray-300 py-2">
          <h2>Subtotal</h2>
          <h2>Rp 156.000</h2>
        </div>
        <Button className="w-full mt-2" color="success" onClick={()=>router.push('/checkout')}>
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default TotalCard;
