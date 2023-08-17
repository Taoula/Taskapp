import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserCircle,
  CaretDown,
  List,
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
} from "phosphor-react";
import Datepicker from "./DatePicker";
import dayjs from "dayjs";
import { Menu, Transition } from "@headlessui/react";

export default function Header() {
  const [fName, setfName] = useState([]);
  const [lName, setlName] = useState([]);
  const [email, setEmail] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const userReq = await axios.get("http://localhost:8282/auth/");
    console.log(userReq.data);
    setfName(userReq.data.fName);
    setlName(userReq.data.lName);
    setEmail(userReq.data.email);
  }

  // capitalizes user's name
  const capitalizeName = (str) => {
    return str.toString().charAt(0).toUpperCase() + str.slice(1);
  };

  // modify the greeting depending on time of day
  const currentTime = dayjs();
  const currentHour = currentTime.hour();
  let greeting = "";

  if (currentHour >= 6 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <>
      <div className="shadow-b shadow-sm px-10 py-4 items-center flex justify-between bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="sm:hidden">
          <List size={25} />
        </div>
        <div className="flex gap-4 items-center">
          {/* greeting */}
          <p className="text-lg font-normal text-slate-900 invisible sm:visible">
            {greeting}, {capitalizeName(fName)}
          </p>
          {/* profile dropdown */}
          {/* <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center">
              <img
                alt="profile"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="rounded-full object-cover w-8 h-8 cursor-pointer"
              />
            </Menu.Button>
            <Menu.Items className="origin-top-right absolute right-0 mt-3 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                <div className="px-6 pt-4 pb-6 border border-b">
                  <p className="text-xs font-medium text-gray-600">ACCOUNT</p>
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      alt="profile"
                      src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="rounded-full object-cover w-9 h-9 cursor-pointer"
                    />
                    <div>
                      <p className="font-light text-md">
                        {fName} {lName}
                      </p>
                      <p className="text-sm text-gray-500">{email}</p>
                    </div>
                  </div>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/manage-account"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-6 py-4 text-sm`}
                    >
                      Manage Account
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/log-out"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block px-6 py-4 text-sm`}
                    >
                      Log out
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu> */}
        </div>
        <Datepicker />
      </div>
    </>
  );
}
