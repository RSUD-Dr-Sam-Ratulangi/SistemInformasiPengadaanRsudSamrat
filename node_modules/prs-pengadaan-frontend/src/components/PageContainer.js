import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function PageContainer({ children }) {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen">
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
