"use client";

import React from "react";
import { Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";
import Image from "next/image";

export function Loan_Default_Info() {
    const factors = [
        {
          title: "Annual Income",
          description: "The annual income of the individual. Higher income usually indicates a better ability to repay loans, lowering the risk of default.",
        },
        {
          title: "Loan Amount",
          description: "The total amount of the loan requested. Larger loans pose a higher risk to lenders.",
        },
        {
          title: "Loan as a Percentage of Income",
          description: "The loan amount as a percentage of the individual's annual income. Higher percentages can indicate over-leverage.",
        },
        {
          title: "Credit History Length",
          description: "The number of years the individual's credit history has been available. Longer credit history can show more experience in handling credit.",
        },
        {
          title: "Home Ownership",
          description: "The type of home ownership (e.g., mortgage, rent, own). Home ownership status can impact financial stability.",
        },
        {
          title: "Loan Intent",
          description: "The purpose of the loan (e.g., business, personal). Different intents can carry different levels of risk.",
        },
        {
          title: "Default on File",
          description: "Whether the individual has a prior default on file. Past defaults are a strong indicator of future default risk.",
        },
        {
          title: "Loan Grade",
          description: "The grade assigned to the loan based on the individual's creditworthiness. Higher grades indicate lower risk.",
        },
      ];

  return (
    <section className="grid place-items-center p-8">
      <Typography variant="h6" className="mb-2">
        Learn about Loans!
      </Typography>
      <Typography variant="h2" className="mb-8 text-center">
        Understanding Loan Default Probability
      </Typography>
      <Typography variant="lead" color="gray" className="max-w-3xl mb-8 text-center text-gray-500">
        Knowing the factors that influence the probability of loan default can help you manage your finances better and avoid potential pitfalls.
      </Typography>
      <Tabs value="credit-factors" className="mx-auto max-w-7xl w-full mb-4">
        <div className="w-full flex mb-8 flex-col items-center">
          <TabsHeader className="h-10 !w-12/12 md:w-[50rem] border border-white/25 bg-opacity-90">
            <Tab value="credit-factors">Loan Default Probability Factors</Tab>
          </TabsHeader>
        </div>
      </Tabs>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                width={50}
                height={50}
                src={`/image/icons/${index+1}.png`} // Replace with the path to your placeholder icon
                alt={factor.title}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <Typography variant="h6" className="mb-1">
                {factor.title}
              </Typography>
              <Typography variant="lead" color="gray" className="text-left" style={{ fontSize: "16px" }}>
                {factor.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="w-full lg:container lg:mx-auto mb-0 mt-12">
        <Image
          width={1024}
          height={400}
          src="/image/img8.jpg"
          alt="loan default risk"
          className="h-72 w-full rounded-lg object-cover lg:h-60"
          priority
          placeholder="blur"
          blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
        />
      </div> */}
    </section>
  );
}

export default Loan_Default_Info;
