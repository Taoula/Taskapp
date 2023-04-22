import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const history = useNavigate();
  const [navScroll, setNavScroll] = useState(false);

  const changeNavStyles = () => {
    if (window.scrollY >= 50) {
      setNavScroll(true);
    } else {
      setNavScroll(false);
    }
  };

  window.addEventListener("scroll", changeNavStyles);

  return (
    <>
      <nav
        className={
          navScroll
            ? "text-gray-900 bg-white py-8 min-w-screen sticky-top transition ease-in duration-200 shadow-lg"
            : "text-gray-900 bg-heroBackgroundColor py-8 min-w-screen sticky-top transition ease-in duration-200"
        }
      >
        <div className="flex items-center justify-between max-w-screen-2xl px-12 mx-auto">
          <div className="space-x-20">
            <a className="text-3xl font-medium" href="/">
              jigsaw
            </a>
            <span className="space-x-8 text-lg invisible lg:visible">
              <a className="hover:underline hover:cursor-pointer">About</a>
              <a className="hover:underline hover:cursor-pointer">Features</a>
            </span>
          </div>
          <FontAwesomeIcon
            icon={faBars}
            className="lg:hidden text-gray-900 hover:text-green-600"
            size="xl"
          />
          {/* <div className="hidden lg:block space-x-8 text-lg"></div> */}
          <div className="hidden lg:block space-x-8 text-lg">
            <a
              className="hover:underline hover:cursor-pointer"
              onClick={() => history("/login")}
            >
              Login
            </a>
            <a
              className="hover:bg-green-600 hover:cursor-pointer border rounded border-gray-900 px-8 py-3 bg-green-500"
              onClick={() => history("/register")}
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
