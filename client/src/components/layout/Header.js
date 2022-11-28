import React, { useEffect, useState } from "react";
import axios from "axios";

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
  // const capitalizeName = str => {

  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  return (
    <>
      <div className="h-16 items-center flex justify-start">
        <p className="text-4xl font-semibold text-slate-900">Welcome back, {fName}</p>
      </div>
    </>
  );
}
