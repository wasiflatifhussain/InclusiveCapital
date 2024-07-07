"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Typography, Input } from "@material-tailwind/react";

function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <header className="mt-5 bg-white p-8">
      <div className="w-full container mx-auto pt-12 pb-24 text-center">
        <Typography
          color="blue-gray"
          className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
        >
          InclusiveCapital:
          <Typography
            color="blue-gray"
            className="mx-auto w-full text-[20px] lg:text-[28px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
          >
            Empowering dreams with accessible microloans.
          </Typography>
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto mt-8 mb-4 w-full px-8 !text-gray-700 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
        >
          At InclusiveCapital, we empower individuals often overlooked by traditional lenders—such as small farmers and women entrepreneurs—who face challenges securing loans for their business ventures. Discover your loan eligibility with us and receive personalized guidance to enhance your path to entrepreneurial success.
        </Typography>

        <div className="flex flex-col items-center mt-8 gap-2">
          <Button size="md" className="w-max" fullWidth color="gray">
            get started
          </Button>
          <Typography variant="small" className="font-normal text-gray-700">
            See our{" "}
            <a
              href="#"
              className="hover:text-gray-900 transition-colors underline"
            >
              Terms and Conditions
            </a>
          </Typography>
        </div>
      </div>
      <div className="w-full lg:container lg:mx-auto">
        <Image
          width={1024}
          height={400}
          src="/image/img1.jpg"
          alt="credit cards"
          className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
        />
      </div>
    </header>
  );
}

export default Hero;
