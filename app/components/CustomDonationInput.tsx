"use client";
/* eslint-disable no-unused-vars */
import React from "react";

type Props = {
  name: string;
  value: number;
  min: number;
  max: number;
  currency: string;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const CustomDonationInput = ({
  name,
  value,
  min,
  max,
  currency,
  step,
  onChange,
  className,
}: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const formatter = new Intl.NumberFormat("be-NL", {
    style: "decimal",
  });

  return (
    <span className={className}>
      <span className="bg-black text-white font-sunflower left-0 top-0 w-[5rem] h-full flex pl-8 items-center">
        {currency === "eur" ? "€" : "$"}
      </span>
      <input
        type={isFocused ? "number" : "text"}
        name={name}
        value={isFocused ? value : formatter.format(value)}
        min={min}
        max={max}
        step={step}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        className="w-full font-george focus:outline-none focus:border-2 transition-all duration-500 border-black h-full text-center"
        onChange={onChange}
      />
    </span>
  );
};

export default CustomDonationInput;
