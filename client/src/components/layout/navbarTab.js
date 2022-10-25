import React from "react";

export default function NavbarTab({ tabIcon, tabName }) {

  return (
    <li class="navbarTab">
      <a
        href="/"
        class="flex items-center rounded-md p-2 text-base font-normal text-white hover:bg-tabHoverColor"
      >

        {/* Tab icon is passed from Navbar.js as a prop */}
        {tabIcon}

        <span class="ml-3 flex-1 whitespace-nowrap">{tabName}</span>
      </a>
    </li>
  );
}
