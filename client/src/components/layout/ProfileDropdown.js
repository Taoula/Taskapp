import { Fragment, useState, useRef, useEffect, useContext } from "react";
import { Menu, Transition, Popover } from "@headlessui/react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { ArrowRight, Gear, SignOut } from "phosphor-react";
import { usePopper } from "react-popper";
import { placements } from "@popperjs/core";
import axios from "axios";

export default function ProfileDropdown() {
  const history = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef();
  const tooltipRef = useRef();

  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  const { styles, attributes } = usePopper(boxRef.current, tooltipRef.current, {
    placement: "right-end",
  });

  return (
    <>
      <div className="flex space-x-2">
        <img
          alt="profile"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-10 w-10 rounded-md object-cover"
          ref={boxRef}
          onClick={() => setIsOpen(!isOpen)}
        />

        <div
          className={`bg-white ${
            isOpen ? "block" : "hidden"
          } absolute z-10 w-56 border border-gray-200 divide-y divide-gray-200 shadow rounded-md p-1`}
          ref={tooltipRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="flex hover:bg-gray-200 px-2 py-2 rounded items-center gap-2">
            <Gear size={25} />
            <p className="w-full items-center rounded-md text-sm">
              Account settings
            </p>
          </div>

          <div
            className="flex hover:bg-red-100 hover:text-red-600 px-2 py-2 rounded items-center gap-2"
            onClick={logOut}
          >
            <SignOut size={25} />
            <p className="w-full items-center rounded-md text-sm">Sign out</p>
          </div>
        </div>
      </div>
    </>
  );
}
