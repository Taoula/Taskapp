// import { React, useState } from "react";

// export default function Step3({ setStep }) {
//   const [monthlyPlanSelected, setMonthlyPlanSelected] = useState(false);
//   const [annualPlanSelected, setAnnualPlanSelected] = useState(false);

//   return (
//     <>
//       <div className="gap-4 flex">
//         <div
//           className={`w-full rounded-md h-52 flex items-center hover:shadow-lg duration-200 border-2 ${
//             monthlyPlanSelected === true ? "border-red-100" : "border-gray-200"
//           }`}
//           onClick={() => setMonthlyPlanSelected(!monthlyPlanSelected)}
//         >
//           <p className="mx-auto">monthly</p>
//         </div>
//         <div
//           className={`w-full rounded-md h-52 flex items-center hover:shadow-lg duration-200 border-2 ${
//             annualPlanSelected === true ? "border-blue-100" : "border-gray-200"
//           }`}
//           onClick={() => setAnnualPlanSelected(!annualPlanSelected)}
//         >
//           <p className="mx-auto">yearly</p>
//         </div>
//       </div>
//       <div className="flex">
//         <button
//           className="bg-blue-600 py-3.5 max-w-md mx-auto rounded-md w-full text-white text-sm tracking-wider font-normal hover:bg-blue-700 duration-75 mt-8"
//           onClick={() => {
//             setStep((currentStep) => currentStep + 1);
//           }}
//         >
//           Continue
//         </button>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";

export default function Step3({ setStep }) {
  const [selectedBox, setSelectedBox] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleBoxClick = (boxId) => {
    if (boxId === selectedBox) {
      setSelectedBox(null);
      setIsButtonDisabled(true);
    } else {
      setSelectedBox(boxId);
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <div
          className={`box w-full rounded-md flex bg-white border-2 h-72 p-4 ${
            selectedBox === 1
              ? "border-blue-600 bg-slate-50"
              : "border-gray-200"
          }`}
          onClick={() => handleBoxClick(1)}
        >
          <div className="mx-auto space-y-2 text-center my-auto">
            <p className="text-blue-500">Monthly</p>
            <p className="text-3xl font-semibold">$3/mth</p>
          </div>
        </div>
        <div
          className={`box w-full flex rounded-md bg-white border-2 h-72 p-4 ${
            selectedBox === 2
              ? "border-blue-600 bg-slate-50"
              : "border-gray-200"
          }`}
          onClick={() => handleBoxClick(2)}
        >
          <div className="mx-auto space-y-2 text-center my-auto">
            <p className="text-blue-500">Yearly</p>
            <p className="text-3xl font-semibold">$30/yr</p>
            <p className="border border-blue-500 rounded-full px-3 py-1 text-xs text-blue-500">
              17% off
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          disabled={isButtonDisabled}
          className={`${
            isButtonDisabled
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 duration-75"
          } py-3.5 max-w-md mx-auto rounded-md w-full text-sm tracking-wider font-normal mt-8`}
          onClick={() => {
            setStep((currentStep) => currentStep + 1);
          }}
        >
          Continue to payment
        </button>
      </div>
    </>
  );
}
