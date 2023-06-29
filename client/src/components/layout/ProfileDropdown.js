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
      <div className="flex space-x-4">
        {/* profile image */}
        <img
          alt="profile"
          ref={boxRef}
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-10 rounded-md object-cover hover:scale-90 hover:duration-300 duration-300"
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
            className="mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
          >
            <div className="p-2">
              <button
                href="#"
                className="w-full font-medium rounded-md flex gap-2 items-center px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                <Gear size={20} />
                Account settings
              </button>
            </div>

            <div className="p-2">
              <form method="POST" action="#">
                <button
                  type="submit"
                  className="flex w-full font-medium items-center gap-2 rounded-md px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  role="menuitem"
                >
                  <SignOut size={20} />
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex space-x-3">
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
          } absolute z-10 border border-gray-200 divide-y divide-gray-200 shadow rounded-md p-3`}
          ref={tooltipRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <div>
            <div className="flex items-center gap-2">
              <img
                alt="profile"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="rounded-md h-10 w-10 object-cover mb-1"
              />
              <div className="text-xs">
                <p className="font-semibold">Paul Chinnam</p>
                <p className="text-gray-400">paulnchinnam@gmail.com</p>
              </div>
            </div>
          </div>
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
      </div> */}
    </>
  );
}
