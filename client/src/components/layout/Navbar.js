import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const history = useNavigate();
  const [navScroll, setNavScroll] = useState(false);

  const changeNavStyles = () => {
    if (window.scrollY >= 88) {
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
            ? "text-gray-900 py-8 bg-white items-center flex justify-between max-w-screen-2xl mx-auto px-6 sticky-top transition ease-in duration-200 shadow-lg"
            : "text-gray-900 py-8 bg-white items-center flex justify-between max-w-screen-2xl mx-auto px-6 sticky-top transition ease-in duration-200"
        }
      >
        <a className="text-3xl" href="/">
          Jigsaw
        </a>
        <div className="space-x-8 text-lg">
          <a className="hover:underline hover:cursor-pointer">About</a>
          <a className="hover:underline hover:cursor-pointer">Features</a>
        </div>
        <div className="space-x-8 text-lg">
          <a className="hover:underline hover:cursor-pointer">Login</a>
          <a className="hover:cursor-pointer border rounded border-gray-900 px-8 py-3 bg-green-500">
            Sign up
          </a>
        </div>
      </nav>
    </>
  );
}
