import React from "react";

export default function Footer() {
  return (
    <>
      {/* footer */}
      <footer className="bg-gray-50 py-6 flex">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex gap-4">
            <p className="text-gray-500 text-xs">@ 2023 Velocity</p>
            <a href="/" className="text-gray-500 text-xs hover:underline">
              Terms
            </a>
            <a href="/" className="text-gray-500 text-xs hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
