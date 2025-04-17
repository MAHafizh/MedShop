import React from "react";
import Link from "next/link";
import Navbar from "../navbar";
import Footer from "../footer";
const Hero = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex flex-grow">
          <aside className="w-1/4 border-r-2">
            <div className="ml-auto justify-end w-1/2 mt-4">
              <ul className="space-y-4">
                <li>
                  <Link href="#">Electronics</Link>
                </li>
                <li>
                  <Link href="#">Electronics</Link>
                </li>
                <li>
                  <Link href="#">Electronics</Link>
                </li>
                <li>
                  <Link href="#">Electronics</Link>
                </li>
              </ul>
            </div>
          </aside>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Hero;
