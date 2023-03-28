import React, { useState } from "react";

import CustomDonationInput from "../components/CustomDonationInput";

import * as config from "../config/config";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripejs";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    await fetchPostJSON("/api/donate", {
      amount: input.customDonation,
    })
      .then((response) => {
        stripe!.redirectToCheckout({
          sessionId: response.id,
        });
      })
      .catch((error) => {
        console.warn(error.message);
      });

    setLoading(false);
  };

  return (
    <form className="flex mt-auto text-xl w-full pr-10" onSubmit={handleSubmit}>
      <CustomDonationInput
        className="border-2 border-black relative overflow-hidden w-full flex justify-center items-center text-center rounded-l-xl"
        name={"customDonation"}
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        currency={config.CURRENCY}
        onChange={handleInputChange}
      />
      <button
        className="w-full font-sunflower bg-black rounded-r-xl h-[5rem] text-white"
        type="submit"
        disabled={loading}
      >
        <span>
          Buy me {Math.round(input.customDonation / 3.5)}
          &nbsp;coffees
        </span>
      </button>
    </form>
  );
};

export default CheckoutForm;
