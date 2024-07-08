"use client";

import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "@/components";
import Posts from "../posts";
import Articles from "../articles";
import Credit_Score from "./credit-score";
import Loan_Default from "./loan-default";
import Business_Risk_Score from "./business-risk-score";
import ScoresAndPredict from "./score-and-predict";

export default function LoanEligibility() {
  const [creditScore, setCreditScore] = useState(null);
  const [loanDefault, setLoanDefault] = useState(null);
  const [businessRiskScore, setBusinessRiskScore] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log("Credit Score Updated:", creditScore);
    console.log("Loan Default Updated:", loanDefault);
    console.log("Business Risk Score Updated:", businessRiskScore);
  }, [creditScore, loanDefault, businessRiskScore]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <Credit_Score setCreditScore={setCreditScore} creditScore={creditScore} />
        <Loan_Default loanDefault={loanDefault} setLoanDefault={setLoanDefault} />
        <Business_Risk_Score businessRiskScore={businessRiskScore} setBusinessRiskScore={setBusinessRiskScore} />
        <ScoresAndPredict creditScore={creditScore} loanDefault={loanDefault} businessRiskScore={businessRiskScore} />
      </div>
      <Footer />
    </>
  );
}
