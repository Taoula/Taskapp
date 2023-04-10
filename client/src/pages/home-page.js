import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/layout/Navbar";
import Navbar from "../components/layout/Navbar";
import HeroSection from "./hero-section";
import BetaHeroSection from "./BetaHeroSection";
import HeroSection2 from "./HeroSection2";

export default function HomePage() {
  const history = useNavigate();

  return (
    <>
      <HeroSection2></HeroSection2>
    </>
  );
}
