"use client";

import { Label, Modal, TextInput, Select, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  province_id: string;
  name: string;
}

interface District {
  id: string;
  regency_id: string;
  name: string;
}

interface Subdistrict {
  id: string;
  district_id: string;
  name: string;
}

interface ModalAddressProps {
  show: boolean;
  onClose: () => void;
  onSave: (address: {
    receiver: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    detailaddress: string;
  }) => void;
}

const ModalAddress = ({ show, onClose, onSave }: ModalAddressProps) => {
  const [receiver, setReceiver] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [selectedSubdistrict, setSelectedSubdistrict] =
    useState<Subdistrict | null>(null);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await fetch(
          "https://mahafizh.github.io/api-wilayah-indonesia/api/provinces.json"
        );
        const data: Province[] = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvince();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `https://mahafizh.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince.id}.json`
          );
          const data: City[] = await response.json();
          setCities(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCities();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `https://mahafizh.github.io/api-wilayah-indonesia/api/districts/${selectedCity.id}.json`
          );
          const data: District[] = await response.json();
          setDistricts(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchDistricts();
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchSubDistricts = async () => {
        try {
          const response = await fetch(
            `https://mahafizh.github.io/api-wilayah-indonesia/api/villages/${selectedDistrict.id}.json`
          );
          const data: Subdistrict[] = await response.json();
          setSubdistricts(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSubDistricts();
    }
  }, [selectedDistrict]);

  const handleSave = () => {
    onSave({
      receiver: receiver,
      phone: phone,
      province: selectedProvince ? selectedProvince.name : "",
      city: selectedCity ? selectedCity.name : "",
      district: selectedDistrict ? selectedDistrict.name : "",
      subdistrict: selectedSubdistrict ? selectedSubdistrict.name : "",
      detailaddress: address,
    });
    onClose();
  };

  return (
    <Modal show={show} size="lg" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex">
            <div className="w-1/2 mr-2">
              <div className="mb-2 block">
                <Label htmlFor="receiver" value="Receiver" />
              </div>
              <TextInput
                id="name"
                placeholder="Jhon Doe"
                onChange={(e) => setReceiver(e.target.value)}
              />
            </div>
            <div className="w-1/2 ml-2">
              <div className="mb-2 block">
                <Label htmlFor="phone number" value="Phone Number" />
              </div>
              <TextInput
                id="phone"
                placeholder="6281234567890"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="Province" value="Select Province" />
            </div>
            <Select
              id="province"
              required
              onChange={(e) => {
                const selectedId = e.target.value;
                const province = provinces.find((p) => p.id === selectedId) || null;
                setSelectedProvince(province);
              }}
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="City" value="Select City" />
            </div>
            <Select
              id="city"
              required
              disabled={!selectedProvince}
              onChange={(e) => {
                const selectedId = e.target.value;
                const city = cities.find((c) => c.id === selectedId) || null;
                setSelectedCity(city);
              }}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="District" value="Select District" />
            </div>
            <Select
              id="district"
              required
              disabled={!selectedCity}
              onChange={(e) => {
                const selectedId = e.target.value;
                const district = districts.find((d) => d.id === selectedId) || null;
                setSelectedDistrict(district);
              }}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="Sub-District" value="Select Sub-District" />
            </div>
            <Select
              id="subdistrict"
              required
              disabled={!selectedDistrict}
              onChange={(e) => {
                const selectedId = e.target.value;
                const subdistrict = subdistricts.find((s) => s.id === selectedId) || null;
                setSelectedSubdistrict(subdistrict);
              }}
            >
              <option value="">Select Sub-District</option>
              {subdistricts.map((subdistrict) => (
                <option key={subdistrict.id} value={subdistrict.id}>
                  {subdistrict.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex">
            <div className="w-full mr-2">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput
                required
                id="address"
                placeholder="Enter your address including path"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full" color="success" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddress;
