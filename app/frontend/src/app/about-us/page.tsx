"use client";

import React, { useEffect } from "react";
import { Footer, Navbar } from "@/components";
import About_Info from "./about-us-info";

export default function LearnLoans() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <About_Info />
      </div>
      <Footer />
    </>
  );
}
