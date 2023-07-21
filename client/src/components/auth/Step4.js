import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

/*async function registerUser(fName, lName, email, password, passwordVerify, userRole){
  let userToAdd = {
    fName, lName, email, password, passwordVerify, userRole
  }
  console.log(userToAdd)
  axios.post("http://localhost:8282/auth/", userToAdd)
}*/
export default function Step4({ setStep, history, fName, lName, email, password, passwordVerify, userRole, registerUser }) {
  return (
    <>
      <div className="px-6 py-6 border rounded-lg border-gray-200">
        <p>Your subscription</p>
        <div className="flex justify-between border-b border-gray-200 text-gray-500 font-light pb-2 pt-4">
          <p>Monthly plan</p>
          <p>$3.00 billed monthly</p>
        </div>
        <div className="flex justify-between pt-4">
          <p>Total</p>
          <p>$3.00</p>
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={() => {
            setStep((currentStep) => currentStep - 1);
          }}
          className="py-3.5 font-medium tracking-wide text-sm rounded-md bg-slate-900 hover:shadow-2xl hover:duration-300 duration-300 text-white w-full"
        >
          Back
        </button>
        <button className="py-3.5 font-medium tracking-wide text-sm rounded-md bg-slate-900 hover:shadow-2xl hover:duration-300 duration-300 text-white w-full"
                onClick={()=>{history("/dashboard/schedule")}}
        >
          Register
        </button>
      </div>
    </>
  );
}
