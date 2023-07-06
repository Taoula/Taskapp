// import { UserCircle, CheckSquare, Square } from "phosphor-react";
// import React, { useState, useEffect } from "react";
// import "tw-elements";
// import axios from "axios";
// import useSettingStore from "../../context/useSettingStore";
// import UpdateProfile from "./UpdateProfile";
// import UpdatePassword from "./UpdatePassword";
// import UpdatePlan from "./UpdatePlan";
// import UpdateBilling from "./UpdateBilling";

// export default function AccountSettings() {
//   const [settingsTabsToggle, setSettingsTabToggle] = useState(1);
//   const [fName, setFirstName] = useState("");
//   const [email, setEmail] = useState("");
//   const [userRole, setUserRole] = useState("");

//   const gTheme = useSettingStore((state) => state.theme);
//   const refreshSettings = useSettingStore((state) => state.refreshSettings);

//   async function loadData() {
//     const user = await axios.get(`http://localhost:8282/auth/`);
//     const {
//       fName: loadFirstName,
//       email: loadEmail,
//       userRole: loadUserRole,
//     } = user.data;
//     console.log(user.data);
//     setFirstName(loadFirstName);
//     setEmail(loadEmail);
//     setUserRole(loadUserRole);
//   }

//   async function toggleDarkMode() {
//     const settingsReq = await axios.get("http://localhost:8282/settings/");
//     let { theme, freeTimeProportions, freeTimeMethod, showPopUps } =
//       settingsReq.data;

//     if (theme == "light") {
//       theme = "dark";
//     } else {
//       theme = "light";
//     }
//     console.log(settingsReq.data);
//     await axios
//       .patch("http://localhost:8282/settings/", {
//         theme,
//         freeTimeMethod,
//         freeTimeProportions,
//         showPopUps,
//       })
//       .then((res) => res.data)
//       .then(async (res) => {
//         refreshSettings();
//       });
//   }

//   useEffect(() => {
//     loadData();
//   }, []);

//   const toggleSettingsTab = (index) => {
//     setSettingsTabToggle(index);
//   };

//   const settingsTabs = [
//     { id: 1, label: "Profile" },
//     { id: 2, label: "Password" },
//     { id: 3, label: "Plan" },
//     { id: 4, label: "Billing" },
//   ];

//   return (
//     <>
//       <h1 className="text-3xl font-medium mb-8">Settings</h1>

//       <div>
//         <div className="text-md mb-5 text-center text-gray-500 border-b border-slate-300">
//           <ul className="flex flex-wrap -mb-px">
//             {settingsTabs.map((tab) => (
//               <li key={tab.id}>
//                 <span
//                   className={`inline-block p-4 rounded-t-lg border-b-2 font-medium ${
//                     settingsTabsToggle === tab.id
//                       ? "text-slate-900 border-slate-900 active"
//                       : "border-transparent hover:text-slate-900 hover:border-slate-900"
//                   }`}
//                   onClick={() => toggleSettingsTab(tab.id)}
//                 >
//                   {tab.label}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div
//           className={
//             settingsTabsToggle === 1 ? "active-content content" : "content"
//           }
//         >
//           <UpdateProfile />
//         </div>

//         <div
//           className={
//             settingsTabsToggle === 2 ? "active-content content" : "content"
//           }
//         >
//           <UpdatePassword />
//         </div>

//         <div
//           className={
//             settingsTabsToggle === 3 ? "active-content content" : "content"
//           }
//         >
//           <UpdatePlan />
//         </div>

//         <div
//           className={
//             settingsTabsToggle === 4 ? "active-content content" : "content"
//           }
//         >
//           <UpdateBilling />
//         </div>
//       </div>
//     </>
//   );
// }

import { UserCircle, CheckSquare, Square } from "phosphor-react";
import React, { useState, useEffect, useMemo } from "react";
import "tw-elements";
import axios from "axios";
import useSettingStore from "../../context/useSettingStore";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import UpdatePlan from "./UpdatePlan";
import UpdateBilling from "./UpdateBilling";

export default function AccountSettings() {
  const [settingsTabsToggle, setSettingsTabToggle] = useState(1);
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const gTheme = useSettingStore((state) => state.theme);
  const refreshSettings = useSettingStore((state) => state.refreshSettings);

  async function loadData() {
    const { data } = await axios.get("http://localhost:8282/auth/");
    const {
      fName: loadFirstName,
      lName: loadLastName,
      email: loadEmail,
      userRole: loadUserRole,
    } = data;
    setFirstName(loadFirstName);
    setLastName(loadLastName);
    setEmail(loadEmail);
    setUserRole(loadUserRole);
  }

  // async function toggleDarkMode() {
  //   const updatedTheme = gTheme === "light" ? "dark" : "light";
  //   await axios.patch("http://localhost:8282/settings/", {
  //     theme: updatedTheme,
  //     freeTimeMethod,
  //     freeTimeProportions,
  //     showPopUps,
  //   });
  //   refreshSettings();
  // }

  useEffect(() => {
    loadData();
  }, []);

  // tab data for mapping
  const settingsTabs = useMemo(
    () => [
      { id: 1, label: "Profile" },
      { id: 2, label: "Password" },
      { id: 3, label: "Plan" },
      { id: 4, label: "Billing" },
    ],
    []
  );

  const toggleSettingsTab = (index) => {
    setSettingsTabToggle(index);
  };

  // handle which content component to render
  function renderComponent(tabId) {
    switch (tabId) {
      case 1:
        return (
          <UpdateProfile
            fName={fName}
            lName={lName}
            email={email}
            userRole={userRole}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setUserRole={setUserRole}
          />
        );
      case 2:
        return <UpdatePassword />;
      case 3:
        return <UpdatePlan />;
      case 4:
        return <UpdateBilling />;
      default:
        return null;
    }
  }

  return (
    <>
      {/* title */}
      <h1 className="text-3xl font-medium mb-8">My account</h1>

      {/* tabs */}
      <div className="text-md mb-12 text-center text-gray-500 border-b border-slate-200">
        <ul className="flex flex-wrap -mb-px">
          {settingsTabs.map((tab) => (
            <li key={tab.id}>
              <span
                className={`inline-block p-4 rounded-t-lg border-b-2 font-medium ${
                  settingsTabsToggle === tab.id
                    ? "text-slate-900 border-slate-900 active"
                    : "border-transparent hover:text-slate-900 hover:border-slate-900"
                }`}
                onClick={() => toggleSettingsTab(tab.id)}
              >
                {tab.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* content */}
      <div>
        {settingsTabs.map((tab) => (
          <div
            key={tab.id}
            className={
              settingsTabsToggle === tab.id
                ? "active-content content"
                : "content"
            }
          >
            {renderComponent(tab.id)}
          </div>
        ))}
      </div>
    </>
  );
}
