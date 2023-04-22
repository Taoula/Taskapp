import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import axios from "axios";
import {
  Calendar,
  ListNumbers,
  Question,
  GearSix,
  SignOut,
  House,
  PuzzlePiece,
  ChartLine,
  ChartLineUp,
  List,
} from "phosphor-react";
import LogoutDialogue from "./LogoutDialogue";

export default function Sidebar() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  const [logoutDialogue, setLogoutDialogue] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fName, setfName] = useState([]);
  const [lName, setlName] = useState([]);
  const [email, setEmail] = useState([]);

  const handleClick = () => setIsCollapsed(!isCollapsed);

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

  return (
    // <>
    //   <LogoutDialogue
    //     logoutDialogue={logoutDialogue}
    //     setLogoutDialogue={setLogoutDialogue}
    //   ></LogoutDialogue>
    //   {/* collapsed navbar */}
    //   <aside className="text-gray-500 bg-sidebarColor border-r border-gray-200 hidden sm:flex flex-col justify-between pr-4 pl-4">
    //     <div className="mt-5">
    //       {/* Logo */}
    //       <Link
    //         to="/dashboard/overview"
    //         class="flex items-center p-2 rounded-md text-base font-normal border-2 border-sidebarColor"
    //       >
    //         {/* Header Title */}
    //         <PuzzlePiece size={25} weight="duotone" />
    //       </Link>
    //     </div>

    //     <div>
    //       {/* Navbar Tabs */}
    //       <ul class="space-y-2">
    //         {/* Overview Tab */}
    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/overview"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <House size={25} weight="light" />
    //           </NavLink>
    //         </li>

    //         {/* Schedule Tab */}
    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/schedule"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <Calendar size={25} weight="light" />
    //           </NavLink>
    //         </li>

    //         {/* Tasks Tab */}
    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/tasks"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <ListNumbers size={25} weight="light" />
    //           </NavLink>
    //         </li>
    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/accountSettings"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <GearSix size={25} weight="light" />
    //           </NavLink>
    //         </li>

    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/help"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <Question size={25} weight="light" />
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Tabs separated by a divider */}
    //     {/* <div>
    //       <ul class="pt-5 space-y-2 border-t border-gray-200">
    //         <li class="navbarTab">
    //           <Link
    //             to="/dashboard/accountSettings"
    //             className={
    //               toggleState === 4
    //               ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //             onClick={() => toggleTab(4)}
    //           >
    //             <GearSix size={25} />
    //           </Link>
    //         </li>

    //         <li class="navbarTab">
    //           <Link
    //             to="/dashboard/help"
    //             className={
    //               toggleState === 5
    //               ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //             onClick={() => toggleTab(5)}
    //           >
    //             <Question size={25} />
    //           </Link>
    //         </li>

    //         <li class="navbarTab">
    //           <span
    //             class="flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-rose-100 hover:border-2 hover:border-rose-100 hover:text-red-500"
    //             onClick={verifyLogout}
    //           >
    //             <SignOut size={25} />
    //           </span>
    //         </li>
    //       </ul>
    //     </div>
    //     */}
    //     <div className="mb-5">
    //       <ul>
    //         <li class="navbarTab">
    //           <span
    //             class="flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-red-100 hover:border-2 hover:border-red-100 hover:text-red-600"
    //             // onClick={verifyLogout}
    //             onClick={() => setLogoutDialogue(true)}
    //           >
    //             <SignOut size={25} weight="light" />
    //           </span>
    //         </li>
    //       </ul>
    //     </div>
    //   </aside>
    // </>

    // <>
    //   <LogoutDialogue
    //     logoutDialogue={logoutDialogue}
    //     setLogoutDialogue={setLogoutDialogue}
    //   ></LogoutDialogue>
    //   {/* collapsed navbar */}
    //   <aside className="text-gray-500 bg-sidebarColor hidden sm:flex flex-col pr-4 pl-4">
    //     <div className="mt-5 mb-10">
    //       {/* Logo */}
    //       <Link
    //         to="/dashboard/overview"
    //         class="flex items-center p-2 rounded-md text-base font-normal border-2 border-sidebarColor"
    //       >
    //         {/* Header Title */}
    //         <PuzzlePiece size={25} weight="duotone" />
    //       </Link>
    //     </div>

    //     <div>
    //       {/* Navbar Tabs */}
    //       <ul class="space-y-2">
    //         {/* Tasks Tab */}
    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/tasks"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-lg px-3 py-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-lg px-3 py-2 text-base font-light border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <span className="flex space-x-4 items-center">
    //               <ListNumbers size={20} weight="fill" />
    //               <p className="font-sans">Tasks</p>
    //             </span>
    //           </NavLink>
    //         </li>

    //         {/* Schedule Tab */}
    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/schedule"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-lg px-3 py-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-lg px-3 py-2 text-base font-light border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <span className="flex space-x-4 items-center">
    //               <Calendar size={20} weight="fill" />
    //               <p className="font-sans pr-40">Calendar</p>
    //             </span>
    //           </NavLink>
    //         </li>

    //         {/* Performance Tab */}
    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/overview"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-lg px-3 py-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-lg px-3 py-2 text-base font-light border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <span className="flex space-x-4 items-center">
    //               {/* <House size={25} weight="light" /> */}
    //               <ChartLineUp size={20} weight="fill" />
    //               <p className="font-sans">Metrics</p>
    //             </span>
    //           </NavLink>
    //         </li>

    //         {/* <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/accountSettings"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <GearSix size={25} weight="light" />
    //           </NavLink>
    //         </li>

    //         <li class="navbarTab">
    //           <NavLink
    //             to="/dashboard/help"
    //             className={({ isActive }) =>
    //               isActive
    //                 ? "flex items-center rounded-md p-2 text-base font-normal text-gray-900 bg-gray-300 border-2 border-gray-300 hover:bg-gray-300 hover:border-gray-300 hover:border-2"
    //                 : "flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-gray-300 hover:border-gray-300 hover:text-gray-900 hover:border-2"
    //             }
    //           >
    //             <Question size={25} weight="light" />
    //           </NavLink>
    //         </li> */}
    //       </ul>
    //     </div>

    //     {/* <div className="mb-5">
    //       <ul>
    //         <li class="navbarTab">
    //           <span
    //             class="flex items-center rounded-md p-2 text-base font-normal border-2 border-sidebarColor hover:bg-red-100 hover:border-2 hover:border-red-100 hover:text-red-600"
    //             // onClick={verifyLogout}
    //             onClick={() => setLogoutDialogue(true)}
    //           >
    //             <SignOut size={25} weight="light" />
    //           </span>
    //         </li>
    //       </ul>
    //     </div> */}
    //   </aside>
    // </>
    <>
      {isCollapsed === false ? (
        <div className="flex max-h-screen flex-col justify-between bg-sidebarColor mt-3.5 ml-3.5 mb-3.5 rounded-xl">
          <div className="px-4 pt-4 pb-6">
            {/* <span className="px-6 py-4 mr-40 rounded-lg bg-tabHighlightColor text-xs text-gray-600 flex items-center gap-4">
            <PuzzlePiece size={25} weight="duotone" />
            <p className="text-lg">Jigsaw</p>
          </span> */}

            <span className="text-xs text-gray-600 flex items-center justify-between">
              <p className="text-2xl font-semibold">Jigsaw</p>
              <List size={30} weight="fill" onClick={handleClick} />
            </span>

            <nav
              aria-label="dashboard sidebar"
              className="mt-10 flex flex-col space-y-1"
            >
              {/* Tasks tab */}
              <NavLink
                to="/dashboard/tasks"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-4 font-semibold rounded-lg bg-tabHighlightColor px-4 py-2 text-gray-700"
                    : "flex items-center gap-4 font-medium rounded-lg px-4 py-2 text-gray-500 hover:bg-tabHighlightColor hover:text-gray-700"
                }
              >
                <ListNumbers size={25} weight="fill" />

                <span className="text-md">Tasks</span>
              </NavLink>

              {/* Calendar tab */}
              <NavLink
                to="/dashboard/schedule"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-4 font-semibold rounded-lg bg-tabHighlightColor px-4 py-2 text-gray-700"
                    : "flex items-center gap-4 font-medium rounded-lg px-4 py-2 text-gray-500 hover:bg-tabHighlightColor hover:text-gray-700"
                }
              >
                <Calendar size={25} weight="fill" />

                <span className="text-md pr-40"> Calendar </span>
              </NavLink>

              {/* Performance tab */}
              <NavLink
                to="/dashboard/overview"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-4 font-semibold rounded-lg bg-tabHighlightColor px-4 py-2 text-gray-700"
                    : "flex items-center gap-4 font-medium rounded-lg px-4 py-2 text-gray-500 hover:bg-tabHighlightColor hover:text-gray-700"
                }
              >
                <ChartLineUp size={25} weight="fill" />

                <span className="text-md"> Performance </span>
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-2 font-medium rounded-lg text-gray-500 px-4 pb-6">
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <p className="text-sm">
              <strong className="block font-medium">
                {capitalizeName(fName)} {capitalizeName(lName)}
              </strong>

              <span>{email}</span>
            </p>
          </div>

          {/* User profile section */}
          {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a href="#" className="flex items-center gap-4 bg-navbarColor p-4">
              <img
                alt="Man"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-10 w-10 rounded-full object-cover"
              />

              <div>
                <p className="text-sm">
                  <strong className="block font-medium">
                    {capitalizeName(fName)} {capitalizeName(lName)}
                  </strong>

                  <span>{email}</span>
                </p>
              </div>
            </a>
          </div> */}
        </div>
      ) : (
        <div className="flex max-h-screen flex-col justify-between bg-white mt-3.5 ml-3.5 mb-3.5 mr-10 rounded-xl">
          <div className="px-4 pt-4 pb-6">
            <span className="text-xs text-gray-600 flex items-center justify-between">
              <List size={30} weight="fill" onClick={handleClick} />
            </span>
          </div>
        </div>
      )}
    </>
  );
}
