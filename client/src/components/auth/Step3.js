import React from "react";

export default function Step3({ setStep }) {
  return (
    <>
      <div className="space-y-4">
        <div className="bg-blue-100 w-full rounded-md h-52 flex items-center hover:shadow-lg duration-200">
          <p className="mx-auto">monthly</p>
        </div>
        <div className="bg-red-100 w-full rounded-md h-52 flex items-center hover:shadow-lg duration-200">
          <p className="mx-auto">yearly</p>
        </div>
      </div>
      <button
        className="bg-blue-600 py-3.5 rounded-md w-full text-white text-sm tracking-wider font-normal hover:bg-blue-700 duration-75 mt-8"
        onClick={() => {
          setStep((currentStep) => currentStep + 1);
        }}
      >
        Continue
      </button>
    </>
  );
}
