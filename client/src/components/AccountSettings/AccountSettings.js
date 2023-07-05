import { UserCircle, CheckSquare, Square } from "phosphor-react";
import React, { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const gTheme = useSettingStore((state) => state.theme);
  const refreshSettings = useSettingStore((state) => state.refreshSettings);

  async function loadData() {
    const user = await axios.get(`http://localhost:8282/auth/`);
    const {
      fName: loadFirstName,
      email: loadEmail,
      userRole: loadUserRole,
    } = user.data;
    console.log(user.data);
    setFirstName(loadFirstName);
    setEmail(loadEmail);
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

  return (
    <>
      <h1 className="text-3xl font-medium mb-8">Settings</h1>

      <div>
        <div className="text-md mb-5 text-center text-gray-500 border-b border-slate-300">
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

        <div
          className={
            settingsTabsToggle === 1 ? "active-content content" : "content"
          }
        >
          <UpdateProfile />
          {/* <div className="pl-5 pr-5">
            <form className="space-y-8 text-gray-500">
              <div>
                <p>Dark Mode</p>
                {gTheme == "dark" ? (
                  <CheckSquare
                    size={20}
                    onClick={toggleDarkMode}
                    className="text-gray-500"
                  />
                ) : (
                  <Square
                    size={20}
                    onClick={toggleDarkMode}
                    className="text-gray-500"
                  />
                )}
              </div>
              <div className="border-b border-gray-200 w-full pb-8">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">Name</label>
                  <input
                    type="text"
                    placeholder="name"
                    className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
                    value={fName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="border-b border-gray-200 w-full pb-8">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">Email</label>
                  <input
                    type="text"
                    placeholder="email"
                    className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="border-b border-gray-200 w-full pb-8">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">Profile Picture</label>
                  <span className="w-96">
                    <UserCircle size={45} weight="light" className="" />
                  </span>
                </span>
              </div>
              <span className="flex items-center w-3/4 justify-between">
                <label className="font-normal text-sm">Role</label>
                <select
                  type="text"
                  placeholder="role"
                  className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option defaultValue>{userRole}</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="manager">Manager</option>
                  <option value="business owner">Business Owner</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </span>
              <div className="space-x-2 flex justify-end">
                <button
                  type="button"
                  className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="border px-4 py-2 rounded-md text-xs font-normal border-indigo-500 bg-indigo-500 hover:bg-indigo-900 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div> */}
        </div>

        <div
          className={
            settingsTabsToggle === 2 ? "active-content content" : "content"
          }
        >
          <UpdatePassword />
          {/* <div className="pl-5 pr-5">
            <div className="mb-8">
              <h1 className="text-lg pb-1 font-normal">Password</h1>
              <h1 className="text-gray-500 text-sm font-light">
                Enter your current password and new password to reset your
                password
              </h1>
            </div>
            <form className="space-y-8 text-gray-500">
              <div className="border-b border-gray-200 w-full pb-8">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">
                    Current password
                  </label>
                  <input
                    type="text"
                    placeholder="Old password"
                    className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
                  ></input>
                </span>
              </div>
              <div className="border-b border-gray-200 w-full pb-8">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">New password</label>
                  <input
                    type="text"
                    placeholder="New password"
                    className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
                  ></input>
                </span>
              </div>
              <div className="w-full">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">
                    Confirm password
                  </label>
                  <input
                    type="text"
                    placeholder="Confirm password"
                    className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
                  ></input>
                </span>
              </div>
              <div className="space-x-2 flex justify-end">
                <button
                  type="button"
                  className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="border px-4 py-2 rounded-md text-xs font-normal border-indigo-500 bg-indigo-500 hover:bg-indigo-900 text-white"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div> */}
        </div>

        <div
          className={
            settingsTabsToggle === 3 ? "active-content content" : "content"
          }
        >
          <UpdatePlan />
        </div>

        <div
          className={
            settingsTabsToggle === 4 ? "active-content content" : "content"
          }
        >
          <UpdateBilling />
        </div>
      </div>
    </>
  );
}
