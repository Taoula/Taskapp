import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import AuthContext from "../../../../context/auth-context";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import {
  Calendar,
  ListNumbers,
  ChartLineUp,
  List,
  Gear,
  SignOut,
  ArrowSquareLeft,
  ArrowSquareRight,
  ArrowLeft,
  ArrowRight,
  CaretDown,
  ArrowDown,
  CaretRight,
  PuzzlePiece,
} from "phosphor-react";
import LogoutDialogue from "../../LogoutDialogue";
import { faN } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./ProfileDropdown";
import Fab from "./Fab";

export default function Sidebar() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  const [logoutDialogue, setLogoutDialogue] = useState(false);
  const [open, setOpen] = useState(true);
  const [fName, setfName] = useState([]);
  const [lName, setlName] = useState([]);
  const [email, setEmail] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const userReq = await axios.get("http://localhost:8282/auth/");
    console.log(userReq.data);
    setfName(userReq.data.fName);
    setlName(userReq.data.lName);
    setEmail(userReq.data.email);
    setProfilePicture(userReq.data.profilePicture);
  }

  // capitalizes user's name
  const capitalizeName = (str) => {
    return str.toString().charAt(0).toUpperCase() + str.slice(1);
  };

  // verify logout function launches an alert if user wants to log out
  function verifyLogout() {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("logging out...");
      logOut();
    } else {
      console.log("Canceled log out.");
    }
  }

  // logout function is called if user confirms they want to logout
  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  const tabs = [
    { name: "Tasks", link: "/dashboard/tasks", icon: ListNumbers },
    { name: "Schedule", link: "/dashboard/schedule", icon: Calendar },
    { name: "Performance", link: "/dashboard/overview", icon: ChartLineUp },
  ];

  const actions = [
    {
      label: "Manage account",
      icon: (
        <NavLink to="/dashboard/accountsettings">
          <Gear size={25} weight="light" />
        </NavLink>
      ),
      onClick: console.log,
    },
    {
      label: "Log out",
      icon: <SignOut size={25} weight="light" onClick={logOut} />,
      onClick: console.log,
    },
  ];

  return (
    <>
      <div className="max-h-screen shadow-inner bg-slate-50 border-r border-slate-200 w-20 justify-between flex flex-col pt-6 pb-6 dark:bg-gray-700 dark:border-gray-600">
        <h1 className="italic font-semibold text-xl mx-auto cursor-default dark:text-gray-200">
          V
        </h1>
        <div className="flex flex-col space-y-3 mx-auto">
          {tabs.map((tab, i) => (
            <NavLink
              to={tab?.link}
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-200 rounded-md p-2 text-slate-900 dark:text-gray-200 dark:bg-gray-600"
                  : "hover:bg-slate-200 rounded-md p-2 text-slate-900 dark:text-gray-200 dark:hover:bg-gray-600"
              }
            >
              {React.createElement(tab?.icon, {
                size: "25",
                weight: "light",
              })}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col items-center space-y-3 mx-auto">
          <Fab actions={actions} />
        </div>
      </div>
    </>
  );
}
