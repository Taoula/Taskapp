import React, { useState, useEffect } from "react";
import "tw-elements";

export default function AccountSettings() {
  const [settingsTabsToggle, setSettingsTabToggle] = useState(1);

  const toggleSettingsTab = (index) => {
    setSettingsTabToggle(index);
  };
  return (
    <>
      <h1 className="text-2xl font-normal mb-5">Settings</h1>

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
          <div className="space-y-3">
          general
          </div>
        </div>

        <div
          className={
            settingsTabsToggle === 2 ? "active-content content" : "content"
          }
        >
          <div className="space-y-3">
          password
          </div>
        </div>
      </div>
    </>
  );
}
