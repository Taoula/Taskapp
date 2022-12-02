import { UserCircle } from "phosphor-react";
import React, { useState, useEffect } from "react";
import "tw-elements";

export default function AccountSettings() {
  const [settingsTabsToggle, setSettingsTabToggle] = useState(1);

  const toggleSettingsTab = (index) => {
    setSettingsTabToggle(index);
  };
  return (
    <>
      <h1 className="text-2xl font-normal mb-5">Account Settings</h1>

      <div>
        <div class="text-sm mb-5 text-center text-gray-500 border-b border-gray-500">
          <ul class="flex flex-wrap -mb-px">
            <li>
              <span
                className={
                  settingsTabsToggle === 1
                    ? "inline-block p-4 text-gray-900 rounded-t-lg border-b-2 border-gray-900 active"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 font-normal"
                }
                onClick={() => toggleSettingsTab(1)}
              >
                Profile
              </span>
            </li>
            <li>
              <span
                className={
                  settingsTabsToggle === 2
                    ? "inline-block p-4 text-gray-900 rounded-t-lg border-b-2 border-gray-900 active"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-900 hover:border-gray-900 font-normal"
                }
                onClick={() => toggleSettingsTab(2)}
              >
                Password
              </span>
            </li>
          </ul>
        </div>

        <div
          className={
            settingsTabsToggle === 1 ? "active-content content" : "content"
          }
        >
          <div className="pl-5 pr-5">
            <div className="mb-8">
                <h1 className="text-lg pb-1 font-normal">General</h1>
            </div>
            <form className="space-y-8 text-gray-500">
              <div className="border-b border-gray-200 w-full pb-8">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">Name</label>
                  <input
                    type="text"
                    placeholder="name"
                    className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
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
                >
                  <option defaultValue>Your role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="manager">Manager</option>
                  <option value="business owner">Business Owner</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </span>
            </form>
          </div>
        </div>

        <div
          className={
            settingsTabsToggle === 2 ? "active-content content" : "content"
          }
        >
          <div className="pl-5 pr-5">
            <div className="mb-8">
                <h1 className="text-lg pb-1 font-normal">Password</h1>
                <h1 className="text-gray-500 text-sm font-light">
                  Enter your current password and new password to reset your password
                </h1>
            </div>
            <form className="space-y-8 text-gray-500">
              <div className="border-b border-gray-200 w-full pb-8">
                <span className="flex items-center w-3/4 justify-between">
                  <label className="font-normal text-sm">Name</label>
                  <input
                    type="text"
                    placeholder="name"
                    className="border rounded-sm px-4 py-3 text-sm font-light text-gray-500 w-96"
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
                >
                  <option defaultValue>Your role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="manager">Manager</option>
                  <option value="business owner">Business Owner</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </span>
            </form>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
