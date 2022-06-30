import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function HomePage() {
  const history = useNavigate();
  return (
    <Navbar />
  );
}
