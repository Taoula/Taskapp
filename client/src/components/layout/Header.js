import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserCircle,
  CaretDown,
  List,
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
} from "phosphor-react";
import Datepicker from "./DatePicker";

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
      <div className="pl-6 pt-4 pr-6 pb-4 items-center flex justify-between bg-white/30 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
        <div className="sm:hidden">
          <List size={25} />
        </div>
        <p className="text-2xl font-medium text-slate-900 invisible sm:visible">
          Welcome back, {capitalizeName(fName)}
        </p>
        <Datepicker />
      </div>
    </>
  );
}
