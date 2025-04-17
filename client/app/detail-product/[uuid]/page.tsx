/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Navbar, Footer, DetailProduct } from "../../components";
import { useParams } from "next/navigation";

const Detail = () => {

  const params = useParams<{uuid: string}>()
  const {uuid} = params;
  console.log(uuid);
  
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="mt-12 w-[1200px] mx-auto">
          <DetailProduct uuid={uuid} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Detail;
