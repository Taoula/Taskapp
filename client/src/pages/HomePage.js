import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/layout/HeroSection";
import Features from "../components/layout/Features";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Features />
      {/* <Testimonials /> */}
      <Footer />
    </>
  );
}
