import { Fragment, useState, useRef, useEffect, useContext } from "react";
import { Menu, Transition, Popover } from "@headlessui/react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { ArrowRight, Gear, SignOut, UserGear } from "phosphor-react";
import { usePopper } from "react-popper";
import { placements } from "@popperjs/core";
import axios from "axios";

export default function ProfileDropdown() {
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef();
  const tooltipRef = useRef();
  const [fName, setfName] = useState([]);
  const [lName, setlName] = useState([]);
  const [email, setEmail] = useState([]);

  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  const { styles, attributes } = usePopper(boxRef.current, tooltipRef.current, {
    placement: "right-end",
  });

  useEffect(() => {
    getUserData();
    // Add event listener to handle clicking on whitespace
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  async function getUserData() {
    const userReq = await axios.get("http://localhost:8282/auth/");
    console.log(userReq.data);
    setfName(userReq.data.fName);
    setlName(userReq.data.lName);
    setEmail(userReq.data.email);
  }

  return (
    <>
    
      <div className="flex space-x-2">
        {/* profile image */}
        <img
          alt="profile"
          ref={boxRef}
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10 rounded-md object-cover hover:scale-90 hover:duration-300 duration-300 hover:cursor-pointer"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        />

        {/* popup */}
        <div
          ref={tooltipRef}
          style={styles.popper}
          {...attributes.popper}
          className={`${isOpen ? "block" : "hidden"} absolute z-20 end-0`}
        >
          <div
            className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-lg"
            role="menu"
          >
            {/* user */}
            <div className="px-4 py-3 text-sm text-slate-900 flex gap-3 items-center">
              <img
                alt="profile"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-12 w-12 rounded-md object-cover"
              />
              <div>
                <p>
                  {fName} {lName}
                </p>
                <p>{email}</p>
              </div>
            </div>

            {/* account settings button */}
            <div className="p-2">
              <button
                href="#"
                className="w-full font-medium text-slate-900 rounded-md flex gap-2 items-center py-3 px-4 text-sm hover:bg-gray-200"
                role="menuitem"
                onClick={()=> {history("/dashboard/accountSettings")}}
              >
                <UserGear size={20} weight="fill" />
                Account settings
              </button>
            </div>

            {/* sign out button */}
            <div className="p-2">
              <button
                href="#"
                className="w-full font-medium text-slate-900 rounded-md flex gap-2 items-center py-3 px-4 text-sm hover:bg-rose-50 hover:text-red-600"
                role="menuitem"
                onClick={logOut}
              >
                <SignOut size={20} weight="fill" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
