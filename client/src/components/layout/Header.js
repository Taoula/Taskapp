import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle, CaretDown } from "phosphor-react";

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

  return (
    <>
      <div className="pl-8 pt-5 pr-8 pb-5 items-center flex justify-between bg-white border-b border-gray-200 sticky-top">
        <p className="text-xl font-normal text-slate-900">
          Welcome back, {capitalizeName(fName)}
        </p>
        <div className="flex items-center space-x-1">
          <UserCircle size={28} weight="light" />
          <CaretDown size={15} />
        </div>
      </div>
    </>
  );
}
