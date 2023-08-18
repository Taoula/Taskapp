import { RadioButton, Check, Circle } from "phosphor-react";
import axios from "axios"
import React, { useState } from "react";
import Stripe from "stripe"

export default function Step3({ setStep }) {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const STRIPE_SECRET_KEY = "sk_test_51NUGgYB6OZ4o5CX1z1o0IIpN2vjGxMQ9TxChlo5iT6o4ctimbyNIVFOu4VauIpyYfuo7z7Vne1kfmun6JZSEGHiP00uLp9fxQq"
  const stripe = Stripe(STRIPE_SECRET_KEY)


  const handlePlanSelection = (boxId) => {
    if (boxId === selectedPlan) {
      setSelectedPlan(null);
      setIsButtonDisabled(true);
    } else {
      setSelectedPlan(boxId);
      setIsButtonDisabled(false);
    }
  };

  async function redirectToCheckout(e){
    e.preventDefault()
    await axios.post("http://localhost:8282/auth/checkout", {product: selectedPlan})
      .then ((res) => res.data)
      .then (({ id }) => {
        console.log(id)
        Stripe.redirectToCheckout({sessionId: id})
      })
  }

  return (
    <>
      <div className="flex gap-4">
        {/* monthly subscription plan */}
        <div
          className={`box w-full rounded-md bg-white border-2 p-6 ${
            selectedPlan === "monthly"
              ? "border-blue-600 bg-slate-50"
              : "border-gray-200"
          }`}
          onClick={() => handlePlanSelection("monthly")}
        >
          <div className="flex gap-2 items-center">
            {selectedPlan === "monthly" ? (
              <RadioButton size={20} weight="fill" className="text-blue-600" />
            ) : (
              <Circle size={20} />
            )}{" "}
            <h1 className="text-xl font-medium">Monthly</h1>
          </div>
          <div className="inline-flex items-center pt-4 gap-x-1">
            <p className="text-4xl font-semibold">$3</p>
            <p className="text-2xl text-gray-400">/month</p>
          </div>
          <ul className="space-y-2 mt-6 text-lg">
            <li className="flex gap-x-3">
              <Check size={20} className="text-green-600" weight="bold" />
              Todo list & tasking
            </li>
            <li className="flex gap-x-3">
              <Check size={20} className="text-green-600" weight="bold" />
              AI-powered scheduling
            </li>
            <li className="flex gap-x-3">
              <Check size={20} className="text-green-600" weight="bold" />
              Synchronized calendars
            </li>
          </ul>
        </div>
        {/* yearly subscription plan */}
        <div
          className={`box w-full rounded-md bg-white border-2 p-6 ${
            selectedPlan === "yearly"
              ? "border-blue-600 bg-slate-50"
              : "border-gray-200"
          }`}
          onClick={() => handlePlanSelection("yearly")}
        >
          <div className="flex gap-2 items-center">
            {selectedPlan === "yearly" ? (
              <RadioButton size={20} weight="fill" className="text-blue-600" />
            ) : (
              <Circle size={20} />
            )}
            <h1 className="text-xl font-medium">Yearly</h1>
            <p className="font-light text-blue-600 pl-1">2 months free!</p>
          </div>
          <div className="inline-flex items-center pt-4 gap-x-1">
            <p className="text-4xl font-semibold">$30</p>
            <p className="text-2xl text-gray-400">/year</p>
          </div>
          <ul className="space-y-2 mt-6 text-lg">
            <li className="flex gap-x-3">
              <Check size={20} className="text-green-600" weight="bold" />
              Todo list & tasking
            </li>
            <li className="flex gap-x-3">
              <Check size={20} className="text-green-600" weight="bold" />
              AI-powered scheduling
            </li>
            <li className="flex gap-x-3">
              <Check size={20} className="text-green-600" weight="bold" />
              Synchronized calendars
            </li>
          </ul>
        </div>
      </div>

      {/* buttons */}
      <div className="flex gap-4">
        {/* back button */}
        <button
          disabled
          type="button"
          onClick={() => {
            setStep((currentStep) => currentStep - 1);
          }}
          className="bg-slate-900 duration-300 hover:duration-300 hover:shadow-2xl text-white mt-8 text-sm font-medium w-full py-3.5 rounded-md tracking-wide"
        >
          Back
        </button>
        {/* next button */}
        <button
          disabled={isButtonDisabled}
          className={`${
            isButtonDisabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-slate-900 duration-300 hover:duration-300 hover:shadow-2xl text-white"
          } py-3.5 max-w-md mx-auto rounded-md w-full text-sm tracking-wide font-medium mt-8`}
          onClick={(e) => {
            redirectToCheckout(e)
          }}
        >
          Continue to payment
        </button>
      </div>
    </>
  );
}
