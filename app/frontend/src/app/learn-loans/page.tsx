"use client";

import React, { useEffect } from "react";
import { Footer, Navbar } from "@/components";
import Credit_Score_Info from "./credit-score-info";

export default function LearnLoans() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <Credit_Score_Info />
      </div>
      <Footer />
    </>
  );
}
