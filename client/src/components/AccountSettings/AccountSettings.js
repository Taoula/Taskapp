import {
  UserCircle,
  CheckSquare,
  Square,
  Envelope,
  Lock,
  EyeClosed,
  Eye,
  CheckCircle,
  Circle,
  PaintBrush,
  Money,
  CreditCard,
  BellRinging,
  X,
} from "phosphor-react";
import React, { useState, useEffect } from "react";
import "tw-elements";
import axios from "axios";
import useSettingStore from "../../context/useSettingStore";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import UpdatePlan from "./UpdatePlan";
import UpdateBilling from "./UpdateBilling";
import { faN } from "@fortawesome/free-solid-svg-icons";

export default function AccountSettings() {
  const [settingsTabsToggle, setSettingsTabToggle] = useState(1);
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [settingsPage, setSettingsPage] = useState(1);
  const [bannerClosed, setBannerClosed] = useState(false);

  const [editPersonalInfo, setEditPersonalInfo] = useState(true);

  const gTheme = useSettingStore((state) => state.theme);
  const refreshSettings = useSettingStore((state) => state.refreshSettings);

  async function loadData() {
    const user = await axios.get(`http://localhost:8282/auth/`);
    const {
      fName: loadFirstName,
      lName: loadLastName,
      email: loadEmail,
      userRole: loadUserRole,
      password: loadPassword,
    } = user.data;
    console.log(user.data);
    setFirstName(loadFirstName);
    setLastName(loadLastName);
    setEmail(loadEmail);
    setPassword(loadPassword);
    setUserRole(loadUserRole);
  }

  async function toggleDarkMode() {
    const settingsReq = await axios.get("http://localhost:8282/settings/");
    let { theme, freeTimeProportions, freeTimeMethod, showPopUps } =
      settingsReq.data;

    if (theme == "light") {
      theme = "dark";
    } else {
      theme = "light";
    }
    console.log(settingsReq.data);
    await axios
      .patch("http://localhost:8282/settings/", {
        theme,
        freeTimeMethod,
        freeTimeProportions,
        showPopUps,
      })
      .then((res) => res.data)
      .then(async (res) => {
        refreshSettings();
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  const toggleSettingsTab = (index) => {
    setSettingsTabToggle(index);
  };

  const settingsTabs = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Password" },
    { id: 3, label: "Plan" },
    { id: 4, label: "Billing" },
  ];

  // pass
  const [passwordShown, setPasswordShown] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);

  // verify pass
  const [passwordVerify, setPasswordVerify] = useState("");
  const [verifyTypingStarted, setVerifyTypingStarted] = useState(false);

  // password regex
  const passRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters length" },
    // { regex: /[0-9]/, text: "At least 1 number (0...9)" },
    // { regex: /[a-z]/, text: "At least 1 lowercase letter (a...z)" },
    { regex: /[^A-Za-z0-9]/, text: "At least 1 special symbol (!...$)" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter (A...Z)" },
  ];

  const isPasswordRegexMet = (regex) => regex.test(password);

  // checks if verify pass matches
  const isPasswordMatching = (password, passwordVerify) => {
    if (password === "" || passwordVerify === "") {
      return false;
    }
    return password === passwordVerify;
  };

  // password visibility toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <div>
        <ul className="flex gap-4 py-4 px-10 border-b cursor-pointer bg-white text-gray-500">
          <li
            onClick={(e) => setSettingsPage(1)}
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 duration-200 rounded-md items-center ${
              settingsPage === 1
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2"
                : ""
            }`}
          >
            <UserCircle size={20} />
            <p>Account</p>
          </li>
          <li
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 duration-200 rounded-md items-center ${
              settingsPage === 2
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2"
                : ""
            }`}
          >
            <BellRinging size={20} />
            <p>Notifications & Security</p>
          </li>
          <li
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 duration-200 rounded-md items-center ${
              settingsPage === 3
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2"
                : ""
            }`}
          >
            <CreditCard size={20} />
            <p>Billing</p>
          </li>
          <li
            onClick={(e) => setSettingsPage(4)}
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 duration-200 rounded-md items-center ${
              settingsPage === 4
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2"
                : ""
            }`}
          >
            <PaintBrush size={20} />
            <p>Appearance</p>
          </li>
        </ul>
      </div>

      {settingsPage === 1 && (
        <>
          {/* personal information section */}
          <section className="flex px-10 gap-20 py-20 border-b">
            <div className="w-1/3">
              <h1 className="text-md font-medium tracking-wide pb-2">
                Personal Information
              </h1>
              <p className="font-light text-gray-500">
                Personal information will not be publicly displayed.
              </p>
            </div>
            <div className="w-2/3">
              <div className="max-w-xl space-y-6">
                <div className="flex gap-6 pb-4 items-center">
                  <img
                    alt="profile"
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="rounded-md h-28 w-28 object-cover"
                  />
                  <div className="space-y-3">
                    <button
                      disabled={editPersonalInfo}
                      className={`rounded-md px-4 py-3 text-md font-medium tracking-wide bg-gray-200 text-gray-900 duration-200 ${
                        editPersonalInfo === true
                          ? "cursor-not-allowed"
                          : "hover:bg-gray-300"
                      }`}
                    >
                      Change avatar
                    </button>
                    <p className="text-xs">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    disabled={editPersonalInfo}
                    value={fName}
                    className={`block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm ${
                      editPersonalInfo === true ? "cursor-not-allowed" : ""
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    disabled={editPersonalInfo}
                    value={lName}
                    className={`block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm ${
                      editPersonalInfo === true ? "cursor-not-allowed" : ""
                    }`}
                  />
                </div>
                <div className="relative rounded-md">
                  <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                    <Envelope size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    disabled={editPersonalInfo}
                    id="email"
                    className={`block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm ${
                      editPersonalInfo === true ? "cursor-not-allowed" : ""
                    }`}
                  />
                </div>
                <div className="rounded-md mt-4">
                  <select
                    id="userRole"
                    value={userRole}
                    disabled={editPersonalInfo}
                    className={`w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm ${
                      editPersonalInfo === true ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="default" disabled>
                      Select your role
                    </option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Manager">Manager</option>
                    <option value="Business Owner">Business Owner</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={(e) => setEditPersonalInfo(!editPersonalInfo)}
                    className="px-6 py-2 font-normal bg-blue-500 hover:bg-blue-600 duration-200 rounded-md text-md text-white"
                  >
                    Edit
                  </button>
                  <button
                    className={`px-6 py-2 font-normal rounded-md duration-200 ${
                      editPersonalInfo === true
                        ? "cursor-not-allowed bg-gray-200 text-gray-900 "
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* change password section */}
          <section className="flex px-10 gap-20 py-20 border-b">
            <div className="w-1/3">
              <h1 className="text-md font-medium tracking-wide pb-2">
                Change password
              </h1>
              <p className="font-light text-gray-500">
                Update the password associated with your account.
              </p>
            </div>
            <div className="w-2/3">
              <div className="max-w-xl space-y-6">
                <input
                  type="password"
                  placeholder="Current password"
                  className="block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm"
                />
                {/* password */}
                <div className={`relative rounded-md mt-4`}>
                  <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock size={20} />
                  </div>
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => {
                      setTypingStarted(true);
                    }}
                    id="password"
                    className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {passwordShown ? (
                      <EyeClosed
                        size={20}
                        className="text-gray-400"
                        onClick={togglePassword}
                        type="button"
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="text-gray-400"
                        onClick={togglePassword}
                        type="button"
                      />
                    )}
                  </div>
                </div>

                {/* password validation */}
                {typingStarted && (
                  <ul className="mt-4 list-inside list-none space-y-2">
                    {passRequirements.map((requirement, index) => (
                      <li
                        key={index}
                        className={`text-sm flex items-center ${
                          isPasswordRegexMet(requirement.regex)
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {isPasswordRegexMet(requirement.regex) ? (
                          <CheckCircle
                            size={16}
                            weight="bold"
                            color="#34D399"
                            className="mr-2"
                          />
                        ) : (
                          <Circle
                            size={16}
                            weight="bold"
                            className="mr-2 text-red-400"
                          />
                        )}
                        {requirement.text}
                      </li>
                    ))}
                  </ul>
                )}

                {/* verify password */}
                <div className="relative rounded-md mt-4">
                  <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock size={20} />
                  </div>
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="Confirm password"
                    value={passwordVerify}
                    onChange={(e) => {
                      setVerifyTypingStarted(true);
                    }}
                    id="password"
                    className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm"
                  />

                  {/* password visibility */}
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {passwordShown ? (
                      <EyeClosed
                        size={20}
                        className="text-gray-400"
                        onClick={togglePassword}
                        type="button"
                      />
                    ) : (
                      <Eye
                        size={20}
                        className="text-gray-400"
                        onClick={togglePassword}
                        type="button"
                      />
                    )}
                  </div>
                </div>

                {/* verify password validation */}
                {verifyTypingStarted && (
                  <ul className="mt-4 list-none list-inside">
                    <li
                      className={`text-sm flex items-center ${
                        isPasswordMatching(password, passwordVerify)
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {isPasswordMatching(password, passwordVerify) ? (
                        <CheckCircle
                          size={16}
                          weight="bold"
                          color="#34D399"
                          className="mr-2 text-red-400"
                        />
                      ) : (
                        <Circle size={16} weight="bold" className="mr-2" />
                      )}
                      Passwords must match
                    </li>
                  </ul>
                )}
                <button className="px-6 py-2 font-normal text-gray-900 rounded-md bg-gray-200 hover:bg-gray-300 duration-200">
                  Change password
                </button>
              </div>
            </div>
          </section>

          {/* delete account section */}
          <section className="flex px-10 gap-20 py-20 border-b">
            <div className="w-1/3">
              <h1 className="text-md font-medium tracking-wide pb-2">
                Delete account
              </h1>
              <p className="font-light text-gray-500">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently and your subscription
                will be canceled.
              </p>
            </div>
            <div className="w-2/3">
              <button className="rounded-md bg-red-500 text-white font-normal text-md hover:bg-red-600 duration-200 px-4 py-2">
                Yes, delete my account
              </button>
            </div>
          </section>
        </>
      )}

      {settingsPage === 4 && (
        <>
          {/* more themes annoucement */}
          {bannerClosed === false && (
            <div className="relative flex items-center justify-between gap-4 bg-blue-500 px-10 py-3 text-white">
              <p className="text-lg font-normal">More themes on the way!</p>
              <button
                onClick={(e) => setBannerClosed(true)}
                className="shrink-0 rounded-lg bg-black/10 p-2 transition hover:bg-black/20"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* theme selection */}
          <section className="flex px-10 gap-20 py-20">
            <div className="w-1/4">
              <h1 className="text-md font-medium tracking-wide pb-2">
                Interface theme
              </h1>
              <p className="font-light text-gray-500">
                Select or customize your UI theme.
              </p>
            </div>
            <div className="w-3/4">
              <div className="flex gap-6">
                <div className="space-y-2">
                  <button className="px-6 rounded-md bg-gray-200 pt-6 overflow-hidden border-2 border-solid border-transparent hover:border-blue-500 duration-200">
                    <img
                      src="https://github.githubassets.com/images/modules/settings/color_modes/light_high_contrast_preview.svg"
                      alt="system with system"
                      className="rounded-md scale-110"
                    />
                  </button>
                  <p className="text-gray-700 text-md font-medium">
                    System theme
                  </p>
                </div>
                <div className="space-y-2">
                  <button className="px-6 rounded-md bg-gray-200 pt-6 overflow-hidden border-2 border-solid border-transparent hover:border-blue-500 duration-200">
                    <img
                      src="https://github.githubassets.com/images/modules/settings/color_modes/light_colorblind_preview.svg"
                      alt="system theme"
                      className="rounded-md scale-110"
                    />
                  </button>
                  <p className="text-gray-700 text-md font-medium">
                    Light theme
                  </p>
                </div>
                <div className="space-y-2">
                  <button className="px-6 rounded-md bg-gray-200 pt-6 overflow-hidden border-2 border-solid border-transparent hover:border-blue-500 duration-200">
                    <img
                      src="https://github.githubassets.com/images/modules/settings/color_modes/dark_tritanopia_preview.svg"
                      alt="system theme"
                      className="rounded-md scale-110"
                    />
                  </button>
                  <p className="text-gray-700 text-md font-medium">
                    Dark theme
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
    // <>
    //   <h1 className="text-3xl font-medium mb-8">Settings</h1>

    //   <div>
    //     <div className="text-md mb-5 text-center text-gray-500 border-b border-slate-300">
    //       <ul className="flex flex-wrap -mb-px">
    //         {settingsTabs.map((tab) => (
    //           <li key={tab.id}>
    //             <span
    //               className={`inline-block p-4 rounded-t-lg border-b-2 font-medium ${
    //                 settingsTabsToggle === tab.id
    //                   ? "text-slate-900 border-slate-900 active"
    //                   : "border-transparent hover:text-slate-900 hover:border-slate-900"
    //               }`}
    //               onClick={() => toggleSettingsTab(tab.id)}
    //             >
    //               {tab.label}
    //             </span>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>

    //     <div
    //       className={
    //         settingsTabsToggle === 1 ? "active-content content" : "content"
    //       }
    //     >
    //       <UpdateProfile />
    //       {/* <div className="pl-5 pr-5">
    //         <form className="space-y-8 text-gray-500">
    //           <div>
    //             <p>Dark Mode</p>
    //             {gTheme == "dark" ? (
    //               <CheckSquare
    //                 size={20}
    //                 onClick={toggleDarkMode}
    //                 className="text-gray-500"
    //               />
    //             ) : (
    //               <Square
    //                 size={20}
    //                 onClick={toggleDarkMode}
    //                 className="text-gray-500"
    //               />
    //             )}
    //           </div>
    //           <div className="border-b border-gray-200 w-full pb-8">
    //             <span className="flex items-center w-3/4 justify-between">
    //               <label className="font-normal text-sm">Name</label>
    //               <input
    //                 type="text"
    //                 placeholder="name"
    //                 className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
    //                 value={fName}
    //                 onChange={(e) => setFirstName(e.target.value)}
    //               ></input>
    //             </span>
    //           </div>
    //           <div className="border-b border-gray-200 w-full pb-8">
    //             <span className="flex items-center w-3/4 justify-between">
    //               <label className="font-normal text-sm">Email</label>
    //               <input
    //                 type="text"
    //                 placeholder="email"
    //                 className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //               ></input>
    //             </span>
    //           </div>
    //           <div className="border-b border-gray-200 w-full pb-8">
    //             <span className="flex items-center w-3/4 justify-between">
    //               <label className="font-normal text-sm">Profile Picture</label>
    //               <span className="w-96">
    //                 <UserCircle size={45} weight="light" className="" />
    //               </span>
    //             </span>
    //           </div>
    //           <span className="flex items-center w-3/4 justify-between">
    //             <label className="font-normal text-sm">Role</label>
    //             <select
    //               type="text"
    //               placeholder="role"
    //               className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
    //               value={userRole}
    //               onChange={(e) => setUserRole(e.target.value)}
    //             >
    //               <option defaultValue>{userRole}</option>
    //               <option value="student">Student</option>
    //               <option value="teacher">Teacher</option>
    //               <option value="manager">Manager</option>
    //               <option value="business owner">Business Owner</option>
    //               <option value="developer">Developer</option>
    //               <option value="designer">Designer</option>
    //             </select>
    //           </span>
    //           <div className="space-x-2 flex justify-end">
    //             <button
    //               type="button"
    //               className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
    //             >
    //               Reset
    //             </button>
    //             <button
    //               type="submit"
    //               className="border px-4 py-2 rounded-md text-xs font-normal border-indigo-500 bg-indigo-500 hover:bg-indigo-900 text-white"
    //             >
    //               Update
    //             </button>
    //           </div>
    //         </form>
    //       </div> */}
    //     </div>

    //     <div
    //       className={
    //         settingsTabsToggle === 2 ? "active-content content" : "content"
    //       }
    //     >
    //       <UpdatePassword />
    //       {/* <div className="pl-5 pr-5">
    //         <div className="mb-8">
    //           <h1 className="text-lg pb-1 font-normal">Password</h1>
    //           <h1 className="text-gray-500 text-sm font-light">
    //             Enter your current password and new password to reset your
    //             password
    //           </h1>
    //         </div>
    //         <form className="space-y-8 text-gray-500">
    //           <div className="border-b border-gray-200 w-full pb-8">
    //             <span className="flex items-center w-3/4 justify-between">
    //               <label className="font-normal text-sm">
    //                 Current password
    //               </label>
    //               <input
    //                 type="text"
    //                 placeholder="Old password"
    //                 className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
    //               ></input>
    //             </span>
    //           </div>
    //           <div className="border-b border-gray-200 w-full pb-8">
    //             <span className="flex items-center w-3/4 justify-between">
    //               <label className="font-normal text-sm">New password</label>
    //               <input
    //                 type="text"
    //                 placeholder="New password"
    //                 className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
    //               ></input>
    //             </span>
    //           </div>
    //           <div className="w-full">
    //             <span className="flex items-center w-3/4 justify-between">
    //               <label className="font-normal text-sm">
    //                 Confirm password
    //               </label>
    //               <input
    //                 type="text"
    //                 placeholder="Confirm password"
    //                 className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
    //               ></input>
    //             </span>
    //           </div>
    //           <div className="space-x-2 flex justify-end">
    //             <button
    //               type="button"
    //               className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
    //             >
    //               Reset
    //             </button>
    //             <button
    //               type="submit"
    //               className="border px-4 py-2 rounded-md text-xs font-normal border-indigo-500 bg-indigo-500 hover:bg-indigo-900 text-white"
    //             >
    //               Update Password
    //             </button>
    //           </div>
    //         </form>
    //       </div> */}
    //     </div>

    //     <div
    //       className={
    //         settingsTabsToggle === 3 ? "active-content content" : "content"
    //       }
    //     >
    //       <UpdatePlan />
    //     </div>

    //     <div
    //       className={
    //         settingsTabsToggle === 4 ? "active-content content" : "content"
    //       }
    //     >
    //       <UpdateBilling />
    //     </div>
    //   </div>
    // </>
  );
}
