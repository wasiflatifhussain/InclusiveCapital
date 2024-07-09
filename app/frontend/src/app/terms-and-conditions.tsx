"use client";

import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <section className="bg-white">
      <div className="w-full container mx-auto pt-12 pb-12 mb-6 flex flex-col lg:flex-row items-start lg:items-center">
        <div className="lg:w-2/3">
          <Typography
            color="blue-gray"
            className="w-full text-left text-[30px] lg:text-[45px] font-bold leading-[45px] lg:leading-[60px] mb-8"
          >
            Terms and Conditions
          </Typography>
          <div className="lg:max-w-2xl">
            <Typography className="mb-4 text-left text-gray-700">
              At InclusiveCapital, we prioritize your privacy. Here are our key principles:
            </Typography>
            <Typography className="mb-4 text-left text-gray-700">
              1. Your data is used exclusively for AI model predictions and is not stored, as our platform does not utilize any databases or storage systems.
            </Typography>
            <Typography className="mb-4 text-left text-gray-700">
              2. All data is erased upon page refresh, ensuring that no information is retained.
            </Typography>
            <Typography className="mb-4 text-left text-gray-700">
              3. We strictly adhere to government privacy laws to protect your information.
            </Typography>
            <Typography className="mb-4 text-left text-gray-700">
              4. Customer data is never used for further training of AI models.
            </Typography>
            <Typography className="mb-4 text-left text-gray-700">
              5. We avoid using user system resources to prevent any concerns about data storage.
            </Typography>
          </div>
          <div className="mt-8 flex">
            <Link href="/loan-eligibility">
              <Button size="md" className="w-max mr-4" color="gray">
                Get A Microloan
              </Button>
            </Link>
            <Link href="/learn-loans">
              <Button size="md" className="w-max" color="gray">
                Learn About Loans
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/3 lg:h-full flex justify-center mt-8 lg:mt-14">
          <Image
            src="/image/img4.jpg"
            alt="Related image"
            width={600}
            height={800}
            className="rounded-lg object-cover"
            priority
            placeholder="blur"
            blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
          />
        </div>
      </div>
    </section>
  );
}
