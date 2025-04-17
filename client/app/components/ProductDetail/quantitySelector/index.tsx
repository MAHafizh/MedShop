/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface qtyProps {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector: React.FC<qtyProps> = ({qty, setQty}) => {

  const handleDecrease = () => {
    setQty((prev)=> Math.max(prev - 1, 1 ));
  }

  const handleIncrease = () => {
    setQty((incr)=> Math.min(incr + 1, 1000 ));
  }

  const handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(1000, parseInt(e.target.value)));
    setQty(isNaN(value) ? 1 : value); 
    console.log(qty)
  }

  return (
    <>
      <div className="flex rounded-md overflow-hidden w-36 h-10">
        <button onClick={handleDecrease} className="w-1/4 bg-gray-400 hover:bg-gray-500 text-white flex justify-center items-center text-xl font-bold">
          -
        </button>
        <input
          type="number"
          value={qty}
          onChange={handleChange}
          className="w-2/4 text-center text-lg font-medium outline-none"
          min="1"
          max="1000"
        />
        <button onClick={handleIncrease} className="w-1/4 bg-red-500 hover:bg-red-600 text-white flex justify-center items-center text-xl font-bold">
          +
        </button>
      </div>
    </>
  );
};

export default QuantitySelector;
