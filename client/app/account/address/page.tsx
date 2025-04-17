import React from "react";
import { Navbar, Footer, MenuAccount, InputAddress } from "../../components";

const Address = () => {
  return (
    <>
      <div>
        <Navbar />
        <main className="min-h-screen flex flex-col w-[1200px] mx-auto">
          <div className="flex justify-between">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Account</li>
                <li>Address</li>
              </ul>
            </div>
            <div className="flex items-center mr-16">Welcome Back Hafizh</div>
          </div>
          <div className="flex">
            <aside className="w-2/6 mt-2">
              <MenuAccount />
            </aside>
            <aside className="w-4/6 mt-6">
              <InputAddress />
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Address;
