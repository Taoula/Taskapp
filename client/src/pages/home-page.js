// import React from "react"
// import { useHistory } from "react-router-dom"
// import StylizedButton from "../components/forms/StylizedButton";
// import StylizedHeading from "../components/generic/StylizedHeading";
// import StylizedSubheading from "../components/generic/StylizedSubheading";

// function HomePage(){
//     const history = useHistory();
//     return(
//         <div>
//             <StylizedHeading>TaskApp</StylizedHeading>
//             <StylizedSubheading>A dynamic scheduling app</StylizedSubheading>
//             <StylizedButton onClick={() => history.push("/register")}>Join Now</StylizedButton>
//             <StylizedButton onClick={() => history.push("/login")}>Login</StylizedButton>
//         </div>
//     )
// }

// export default HomePage

import React from "react";
import { useNavigate } from "react-router-dom";
import StylizedButton from "../components/forms/stylized-button";
import StylizedHeading from "../components/generic/stylized-heading";
import StylizedSubheading from "../components/generic/stylized-subheading";

export default function HomePage() {
  const history = useNavigate();
  return (
    <div>
      <header class="shadow-sm">
        <div class="max-w-screen-xl p-4 mx-auto">
          <div class="flex items-center justify-between space-x-4 lg:space-x-10">
            <div class="flex lg:w-0 lg:flex-1">
              <a href="/" className="text-indigo-600 font-semibold text-lg" id="title">Task App</a>
            </div>

            <div class="items-center justify-end flex-1 hidden space-x-4 sm:flex">
              <button
                class="px-5 py-2 text-sm font-medium text-gray-500 border border-gray-200 bg-gray-100 rounded active:text-gray-500 hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring" onClick={() => history("/login")}
              >
                Log in
              </button>

              <button
                class="px-5 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring" onClick={() => history("/register")}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
