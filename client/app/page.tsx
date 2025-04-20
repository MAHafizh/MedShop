"use client";

import React from "react";
import Image from "next/image";

import { Navbar, Footer, Products } from "./components";

import banner1 from "./assets/banned_alkes.jpg";
import banner2 from "./assets/Frame 560.png";

import { Carousel } from "flowbite-react";

const Home = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-grow w-[1200px] h-[450px] mx-auto">
          <aside className="relative flex-grow h-96 mt-4">
            <Carousel indicators={false}>
              <div className="flex justify-center items-center">
                <Image
                  src={banner1}
                  alt="Banner Image"
                  className="object-cover rounded-xl"
                  width={900}
                  height={400}
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src={banner2}
                  alt="Banner Image"
                  className="object-cover rounded-xl"
                  width={900}
                  height={400}
                />
              </div>
            </Carousel>
          </aside>
        </div>
        <main className="flex w-[1200px] mx-auto">
          <div>
            <Products />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
