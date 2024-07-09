"use client";

import React, { useEffect } from "react";
import { Footer, Navbar } from "@/components";
import Credit_Score_Info from "./credit-score-info";
import Loan_Default_Info from "./loan-default-info";
import Business_Proposal_Info from "./business-proposal-info";

export default function LearnLoans() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <Credit_Score_Info />
        <Loan_Default_Info />
        <Business_Proposal_Info />
      </div>
      <Footer />
    </>
  );
}
