"use client";

import React from "react";
import { Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";

export function Business_Proposal_Info() {
  return (
    <section className="grid place-items-center p-8">
      <Typography variant="h6" className="mb-2">
        Learn about Business Proposals!
      </Typography>
      <Typography variant="h2" className="mb-8 text-center">
        Importance of a Strong Business Proposal
      </Typography>
      <Typography variant="lead" color="gray" className="max-w-3xl mb-8 text-center text-gray-500">
        A well-crafted business proposal is crucial for securing loans and ensuring your business's success. Here we explain why your business idea matters and the key components to focus on.
      </Typography>
      <Tabs value="credit-factors" className="mx-auto max-w-7xl w-full mb-4">
        <div className="w-full flex mb-8 flex-col items-center">
          <TabsHeader className="h-10 !w-12/12 md:w-[50rem] border border-white/25 bg-opacity-90">
            <Tab value="credit-factors">Loan Default Probability Factors</Tab>
          </TabsHeader>
        </div>
      </Tabs>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
          <Image
            width={100}
            height={100}
            src="/image/icons/bi2.jpg" // Replace with the path to your icon
            alt="Business Idea"
            className="w-36 h-24 mb-4"
            priority
            placeholder="blur"
            blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
          />
          <Typography variant="h6" className="mb-2">
            Business Idea
          </Typography>
          <Typography variant="lead" color="gray" className="text-center" style={{ fontSize: "16px" }}>
            A solid business idea is the foundation of your proposal. It should address a market need, offer unique value, and be feasible to execute.
          </Typography>
        </div>
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
          <Image
            width={100}
            height={100}
            src="/image/icons/pros.jpg" // Replace with the path to your icon
            alt="Pros and Cons"
            className="w-36 h-24 mb-4"
            priority
            placeholder="blur"
            blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
          />
          <Typography variant="h6" className="mb-2">
            Pros and Cons
          </Typography>
          <Typography variant="lead" color="gray" className="text-center" style={{ fontSize: "16px" }}>
            Analyze the strengths and weaknesses of your business idea. Understanding these can help you mitigate risks and leverage your advantages.
          </Typography>
        </div>
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
          <Image
            width={100}
            height={100}
            src="/image/icons/pros2.jpg" // Replace with the path to your icon
            alt="Success Potential"
            className="w-36 h-24 mb-4"
            priority
            placeholder="blur"
            blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
          />
          <Typography variant="h6" className="mb-2">
            Success Potential
          </Typography>
          <Typography variant="lead" color="gray" className="text-center" style={{ fontSize: "16px" }}>
            Assessing the potential for success involves market research, financial projections, and a clear execution plan. A high potential for success increases your chances of securing a loan.
          </Typography>
        </div>
      </div>
      <div className="mt-24 flex justify-center">
        <ArrowSmallDownIcon className="h-10 w-10 text-gray-700" />
      </div>
    </section>
  );
}

export default Business_Proposal_Info;
