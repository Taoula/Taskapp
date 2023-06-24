import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import Footer from "../components/layout/Footer";
import Pricing from "../components/layout/Pricing";

export default function Landing() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Features />
      {/* <Testimonials /> */}
      <Pricing />
      <Footer />
    </>
  );
}
