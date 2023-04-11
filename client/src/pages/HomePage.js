import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/layout/HeroSection";
import HeroSection2 from "../components/layout/HeroSection2";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
    </>
  );
}
