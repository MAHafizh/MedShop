import React from "react";
import { Button, Card } from "flowbite-react";

interface Address {
  receiver: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  subdistrict: string;
  detailaddress: string;
}

const CardAddress: React.FC<{ address: Address }> = ({ address }) => {
  return (
    <Card className="w-full h-30">
      <div className="mr-32">
        <h1 className="text-base font-semibold tracking-normal leading-none mb-4">
          {address.receiver}
        </h1>
        <p className="font-normal text-base leading-none mb-2">
          {address.phone}
        </p>
        <p className="font-normal text-base leading-none">
          {address.detailaddress}, Kec. {address.district}, Kota {address.city},
          Provinsi {address.province}
        </p>
        <div className="flex gap-2 mt-4">
          <a className="font-normal text-xs leading-none underline" href="">
            Set as default
          </a>
          <a className="font-normal text-xs leading-none underline" href="">
            Ubah
          </a>
          <a className="font-normal text-xs leading-none underline" href="">
            Hapus
          </a>
        </div>
      </div>
    </Card>
  );
};

export default CardAddress;
