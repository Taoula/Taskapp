import React, { useState, useEffect } from "react";

const BreakpointLabel = () => {
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 475) {
        setScreenSize("xs");
      } else if (screenWidth < 640) {
        setScreenSize("sm");
      } else if (screenWidth < 768) {
        setScreenSize("md");
      } else if (screenWidth < 1024) {
        setScreenSize("lg");
      } else if (screenWidth < 1280) {
        setScreenSize("xl");
      } else {
        setScreenSize("2xl");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const labelStyle = {
    position: "fixed",
    bottom: 0,
    right: 0,
    backgroundColor: "gray-800",
    color: "green",
    padding: "0.25rem 0.5rem",
    fontSize: "2rem",
    fontFamily: "monospace",
  };

  return <div style={labelStyle}>{screenSize}</div>;
};

export default BreakpointLabel;
