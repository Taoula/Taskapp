import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import Footer from "../components/layout/Footer";
import Pricing from "../components/layout/Pricing";

export default function Landing() {
  const [scrollToFeatures, setScrollToFeatures] = useState(false);
  const featuresRef = useRef(null);

  const handleScrollToFeatures = () => {
    setScrollToFeatures(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset === 0) {
        setScrollToFeatures(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Hero onScrollToFeatures={handleScrollToFeatures}></Hero>
      <Features scrollToFeatures={scrollToFeatures} featuresRef={featuresRef} />
      {/* <Testimonials /> */}
      <Pricing />
      <Footer />
    </>
  );
}
