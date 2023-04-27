import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserCircle,
  CaretDown,
  List,
  ArrowLeft,
  ArrowRight,
} from "phosphor-react";

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
    // <>
    //   <div className="pl-8 pt-5 pr-8 pb-5 items-center flex justify-between bg-white border-b border-gray-200 sticky top-0 z-20">
    //     <div className="sm:hidden">
    //       <List size={25} />
    //     </div>
    //     {/* <p className="text-xl font-normal text-slate-900 invisible sm:visible">
    //       Welcome back, {capitalizeName(fName)}
    //     </p> */}
    //     <p className="text-xl font-semibold">04/23/23</p>
    //     <div className="flex items-center space-x-1">
    //       <UserCircle size={28} weight="light" />
    //       <CaretDown size={15} />
    //     </div>
    //   </div>
    // </>
    <>
      <div className="pl-12 pt-6 pr-12 pb-6 items-center flex justify-between bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="sm:hidden">
          <List size={25} />
        </div>
        <p className="text-xl font-normal text-slate-900 invisible sm:visible">
          Welcome back, {capitalizeName(fName)}
        </p>
        <div className="flex items-center space-x-4">
          <span className="bg-white border p-1 rounded">
            <ArrowLeft size={20} className="text-gray-500" />
          </span>
          <p className="font-semibold text-xl">04/23/23</p>
          <span className="bg-white border p-1 rounded">
            <ArrowRight size={20} className="text-gray-500" />
          </span>
        </div>
      </div>
    </>
  );
}
