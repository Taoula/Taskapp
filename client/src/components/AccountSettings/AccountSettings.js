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
import firebase from "../../firebase";

export default function AccountSettings() {
  const [settingsTabsToggle, setSettingsTabToggle] = useState(1);
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [settingsPage, setSettingsPage] = useState(1);
  const [bannerClosed, setBannerClosed] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const [editPersonalInfo, setEditPersonalInfo] = useState(true);

  const gTheme = useSettingStore((state) => state.theme);
  const refreshSettings = useSettingStore((state) => state.refreshSettings);

  // useEffect(() => {
  //   if (gTheme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [gTheme]);

  async function loadData() {
    const user = await axios.get(`http://localhost:8282/auth/`);
    const {
      fName: loadFirstName,
      lName: loadLastName,
      email: loadEmail,
      userRole: loadUserRole,
      password: loadPassword,
      profilePicture: loadProfilePicture,
    } = user.data;
    console.log(user.data);
    setFirstName(loadFirstName);
    setLastName(loadLastName);
    setEmail(loadEmail);
    setPassword(loadPassword);
    setUserRole(loadUserRole);
    setProfilePicture(loadProfilePicture);
  }

  async function toggleDarkMode() {
    const settingsReq = await axios.get("http://localhost:8282/settings/");
    let { theme, freeTimeProportions, freeTimeMethod, showPopUps } =
      settingsReq.data;

    if (theme === "light") {
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
        <ul className="flex gap-2 py-3 px-10 border-b cursor-pointer bg-white text-gray-500 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <li
            onClick={(e) => setSettingsPage(1)}
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm duration-200 rounded-md items-center ${
              settingsPage === 1
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2 dark:bg-gray-800 dark:text-gray-200"
                : ""
            }`}
          >
            <UserCircle size={20} />
            <p>Account</p>
          </li>
          <li
            onClick={(e) => setSettingsPage(2)}
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 text-sm dark:hover:bg-gray-800 duration-200 rounded-md items-center ${
              settingsPage === 2
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2 dark:bg-gray-800 dark:text-gray-200"
                : ""
            }`}
          >
            <BellRinging size={20} />
            <p>Notifications & Security</p>
          </li>
          <li
            onClick={(e) => setSettingsPage(3)}
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 text-sm dark:hover:bg-gray-800 duration-200 rounded-md items-center ${
              settingsPage === 3
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2 dark:bg-gray-800 dark:text-gray-200"
                : ""
            }`}
          >
            <CreditCard size={20} />
            <p>Billing</p>
          </li>

          {/* remove cursor not allowed and uncomment onclick function after beta testing */}
          <li
            onClick={(e) => setSettingsPage(4)}
            className={`flex gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm duration-200 rounded-md items-center ${
              settingsPage === 4
                ? "text-gray-900 bg-gray-200 rounded-md px-4 py-2 dark:bg-gray-800 dark:text-gray-200"
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
          <section className="flex px-10 gap-20 py-20 border-b dark:border-gray-700">
            <div className="w-1/3">
              <h1 className="text-lg font-normal tracking-wide pb-1 dark:text-gray-200">
                Personal Information
              </h1>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Personal information will not be publicly displayed.
              </p>
            </div>
            <div className="w-2/3">
              <div className="max-w-xl space-y-4">
                <div className="flex gap-8 pb-4 items-center">
                  <img
                    alt="profile"
                    // src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    src={profilePicture}
                    className="rounded-md h-28 w-28 object-cover bg-black/40"
                  />
                  <button onClick={toggleDarkMode}>toggle dark</button>

                  <div className="space-y-3">
                    <button
                      disabled={editPersonalInfo}
                      className={`rounded-md px-4 py-2 text-sm font-medium tracking-wide bg-gray-200 text-gray-900 duration-200 ${
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
                    className={`block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200 ${
                      editPersonalInfo === true ? "cursor-not-allowed" : ""
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    disabled={editPersonalInfo}
                    value={lName}
                    className={`block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200 ${
                      editPersonalInfo === true ? "cursor-not-allowed" : ""
                    }`}
                  />
                </div>
                <div className="relative rounded-md">
                  <div className="pointer-events-none text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4 dark:text-gray-200">
                    <Envelope size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    disabled={editPersonalInfo}
                    id="email"
                    className={`block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200 ${
                      editPersonalInfo === true ? "cursor-not-allowed" : ""
                    }`}
                  />
                </div>
                <div className="rounded-md mt-4">
                  <select
                    id="userRole"
                    value={userRole}
                    disabled={editPersonalInfo}
                    className={`w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200 ${
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
              </div>
              <div className="flex gap-2 mt-8">
                <button
                  onClick={(e) => setEditPersonalInfo(!editPersonalInfo)}
                  className={`${
                    editPersonalInfo === true
                      ? "bg-blue-500/10 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                      : "bg-red-500/10 hover:bg-red-500 text-red-500 border-red-500 hover:text-white"
                  } px-4 py-2 font-normal border border-solid duration-200 rounded-md text-sm`}
                >
                  {editPersonalInfo === true ? "Edit" : "Cancel"}
                </button>
                <button
                  className={`px-4 py-2 font-normal border border-solid rounded-md text-sm duration-200 ${
                    editPersonalInfo === true
                      ? "cursor-not-allowed bg-gray-500/10 border-gray-300 text-gray-400"
                      : "bg-green-600/10 hover:bg-green-600 hover:text-white border-green-600 text-green-600"
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </section>

          {/* change password section */}
          <section className="flex px-10 gap-20 py-20 border-b dark:border-gray-700">
            <div className="w-1/3">
              <h1 className="text-lg font-normal tracking-wide pb-1 dark:text-gray-200">
                Change password
              </h1>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Update the password associated with your account.
              </p>
            </div>
            <div className="w-2/3">
              <div className="max-w-xl space-y-4">
                <input
                  type="password"
                  placeholder="Current password"
                  className="block w-full rounded-md py-3 pl-4 bg-gray-50 border border-gray-200 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-gray-600 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
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
                    className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
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
                    className="block w-full rounded-md py-3 pl-11 bg-gray-50 border border-gray-200 pr-11 text-gray-600 placeholder:text-gray-400 focus:bg-white focus-within:placeholder:text-gray-600 text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-500 dark:focus:bg-gray-800 dark:focus-within:placeholder:text-gray-500 dark:text-gray-200"
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
              </div>
              <button className="px-4 py-2 mt-8 font-normal rounded-md text-sm bg-gray-500/10 border border-solid border-gray-300 text-gray-400 duration-200">
                Change password
              </button>
            </div>
          </section>

          {/* delete account section */}
          <section className="flex px-10 gap-20 py-20 border-b dark:border-gray-700">
            <div className="w-1/3">
              <h1 className="text-lg font-normal tracking-wide pb-1 dark:text-gray-200">
                Delete account
              </h1>
              <p className="font-light text-gray-500 dark:text-gray-400">
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently and your subscription
                will be canceled.
              </p>
            </div>
            <div className="w-2/3">
              <button className="rounded-md bg-red-500/10 border border-solid border-red-500 text-red-500 hover:text-white font-normal text-sm hover:bg-red-500 duration-200 px-4 py-2">
                Yes, delete my account
              </button>
            </div>
          </section>
        </>
      )}

      {settingsPage === 2 && (
        <>
          <p>Notifications</p>
        </>
      )}

      {settingsPage === 3 && (
        <>
          <p>Billing</p>
        </>
      )}

      {/* appearance */}
      {settingsPage === 4 && (
        <>
          {/* more themes annoucement */}
          {bannerClosed === false && (
            <div className="relative flex items-center justify-between gap-4 bg-blue-500/10 border border-blue-500 px-10 py-3 text-white">
              <p className="text-lg font-light text-blue-500">
                More themes on the way!
              </p>
              <button
                onClick={(e) => setBannerClosed(true)}
                className="shrink-0"
              >
                <X size={20} className="text-blue-500" />
              </button>
            </div>
          )}

          {/* theme selection */}
          <section className="flex px-10 gap-20 py-20">
            <div className="w-1/4">
              <h1 className="text-lg font-normal tracking-wide pb-1">
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
  );
}
