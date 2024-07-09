"use client";

import React from "react";
import { Typography, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import Image from "next/image";

export function Credit_Score_Info() {
  return (
    <section className="grid place-items-center p-8">
      <Typography variant="h6" className="mb-2">
        Learn about Loans!
      </Typography>
      <Typography variant="h2" className="mb-8 text-center">
        Understanding Credit Scores
      </Typography>
      <Typography variant="lead" color="gray" className="max-w-3xl mb-8 text-center text-gray-500">
        Credit scores are essential in determining your loan eligibility. Here, we explain the factors we use to calculate your credit score and why they are important.
      </Typography>
      <Tabs value="credit-factors" className="mx-auto max-w-7xl w-full mb-4">
        <div className="w-full flex mb-8 flex-col items-center">
          <TabsHeader className="h-10 !w-12/12 md:w-[50rem] border border-white/25 bg-opacity-90">
            <Tab value="credit-factors">Credit Score Factors</Tab>
          </TabsHeader>
        </div>
      </Tabs>
      <Typography variant="h6" className="mb-4">
        Factors Affecting Your Credit Score
      </Typography>
      <Typography variant="h3" className="mb-2">
        Key Components
      </Typography>
      <Typography variant="lead" color="gray" className="max-w-2xl mb-8 text-center text-gray-500">
        Understanding the key components that influence your credit score can help you manage your finances better and improve your chances of loan approval.
      </Typography>
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {[
        {
          title: "Annual Income",
          description: "Your annual income reflects your ability to repay loans. Higher income often leads to better creditworthiness.",
        },
        {
          title: "Monthly Inhand Salary",
          description: "Your monthly in-hand salary shows your monthly earning capacity, which is critical for managing loan repayments.",
        },
        {
          title: "Number of Bank Accounts",
          description: "Having multiple bank accounts can indicate financial stability and better management of finances.",
        },
        {
          title: "Number of Credit Cards",
          description: "The number of credit cards you own and manage responsibly can positively impact your credit score.",
        },
        {
          title: "Number of Loans",
          description: "The number of loans you have taken can impact your credit score. More loans might indicate higher risk.",
        },
        {
          title: "Number of Delayed Payments",
          description: "The number of times you have delayed payments reflects your reliability in repaying credit.",
        },
        {
          title: "Credit Mix",
          description: "Having a variety of credit types (credit cards, mortgage, auto loans) can benefit your credit score.",
        },
        {
          title: "Outstanding Debt",
          description: "The total amount of debt you owe. High levels of debt can negatively affect your credit score.",
        },
        {
          title: "Credit Utilization Ratio",
          description: "The amount of credit you're using compared to your total credit limit. Lower ratios are better for your score.",
        },
        {
          title: "Total EMI per Month",
          description: "The total Equated Monthly Installments you pay each month. Lower EMIs are easier to manage.",
        },
        {
          title: "Monthly Balance",
          description: "Your monthly balance indicates your ability to manage your income and expenses.",
        },
        {
          title: "Payment of Minimum Amount",
          description: "Whether you pay only the minimum amount due or the full balance each month affects your score.",
        },

        ].map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-lg border-t-4 border-gray-500 flex flex-col justify-between min-h-full"
          >
            <Typography variant="h6" className="mb-2">
              {item.title}
            </Typography>
            <Typography variant="lead" color="gray" className="text-left" style={{ fontSize: "16px" }}>
              {item.description}
            </Typography>
          </div>
        ))}
      </div>
      <div className="w-full lg:container lg:mx-auto mb-0 mt-12">
        <Image
          width={1024}
          height={400}
          src="/image/img7.jpg"
          alt="credit cards"
          className="h-72 w-full rounded-lg object-cover lg:h-60"
          priority
          placeholder="blur"
          blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
        />
      </div>
    </section>
  );
}

export default Credit_Score_Info;
