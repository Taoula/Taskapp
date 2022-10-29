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

  return (
    <>
      <div className="px-4 h-16 items-center flex justify-between">
        <p className="text-3xl font-semibold">Welcome back, {fName}</p>
        <div>account settings</div>
      </div>
    </>
  );
}
