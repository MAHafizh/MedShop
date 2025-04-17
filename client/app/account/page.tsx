/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Footer, MenuAccount, InputProfile } from "../components";
import getUser from "@/hooks/getUser";

const Account = () => {
  return (
    <>
      <div>
        <Navbar />
        <main className="min-h-screen flex flex-col w-[1200px] mx-auto">
          <div className="flex justify-between">
          </div>
          <div className="flex gap-8">
            <aside className="flex-col w-1/6 mt-6 rounded-3xl shadow-lg bg-white p-4 min-h-screen[500px]">
              <MenuAccount />
            </aside>
            <aside className="mt-6 w-5/6">
              <InputProfile />
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Account;
