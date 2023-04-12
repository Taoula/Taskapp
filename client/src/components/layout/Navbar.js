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
            ? "text-gray-900 bg-white py-8 min-w-screen px-6 sticky-top transition ease-in duration-200 shadow-lg"
            : "text-gray-900 bg-white py-8 min-w-screen px-6 sticky-top transition ease-in duration-200"
        }
      >
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <a className="text-3xl" href="/">
            jigsaw
          </a>
          <FontAwesomeIcon
            icon={faBars}
            className="lg:hidden text-gray-900"
            size="2xl"
          />
          <div className="hidden lg:block space-x-8 text-lg">
            <a className="hover:underline hover:cursor-pointer">About</a>
            <a className="hover:underline hover:cursor-pointer">Features</a>
          </div>
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
