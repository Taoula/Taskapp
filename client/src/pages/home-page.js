import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";
import Navbar from "../components/layout/Navbar";
import HeroSection from "./hero-section";

export default function HomePage() {
  const history = useNavigate();

  return (
    <>
      <HeroSection />
    </>
  );
}
