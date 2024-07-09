"use client";

import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";

const About_Info = () => {
  return (
    <section className="grid place-items-center p-8" style={{paddingBottom: "0px"}}>
      <Typography variant="h6" className="mb-2">
        About Us
      </Typography>
      <Typography variant="h2" className="mb-8 text-center">
        Empowering Your Financial Journey
      </Typography>
      <div className="flex flex-col lg:flex-row items-center mb-8">
        <div className="lg:w-1/2 lg:pr-8">
          <Typography variant="lead" color="gray" className="mb-8 text-left text-gray-500">
            At Inclusive Capital, our mission is to provide everyone with greater access to financial knowledge, helping you understand your credit scores, loan eligibility, and the steps you can take to become eligible for loans. We believe that by empowering individuals with this information, we can support the creation of new businesses, bolster the job market, enhance the economy, and improve personal finances.
          </Typography>
          <Typography variant="lead" color="gray" className="mb-8 text-left text-gray-500">
            Currently, our team consists of Wasif, a penultimate year student at the University of Hong Kong majoring in Computer Science and Finance with a keen interest in financial computing. Inclusive Capital aims to provide general people with more access to knowledge about their finances, including understanding their loan eligibility, credit scores, and how they can work towards becoming eligible for loans. By empowering individuals with this knowledge, they can start their own businesses, contribute to the job market, boost the economy, and improve their personal finances.
          </Typography>
        </div>
        <div className="lg:w-1/2 lg:pl-28">
          <Image
            src="/image/img6.jpg"
            alt="Empowering Financial Journey"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
            priority
            placeholder="blur"
            blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
          />
        </div>
      </div>
      <Typography variant="h6" className="mb-4 mt-12">
        Our Latest Research Topic
      </Typography>
      <Typography variant="h2" className="mb-2">
        Pump and Dump Schemes in Crypto Markets
      </Typography>
      <Typography variant="lead" color="gray" className="max-w-3xl text-center text-gray-500">
        Stay updated with our latest work as well as the latest trends in web development and financial technology. Subscribe to our blog to receive the most recent updates and insights.
      </Typography>
      <div className="mt-12 flex justify-center">
        <ArrowSmallDownIcon className="h-10 w-10 text-gray-700" />
      </div>

    </section>
  );
};

export default About_Info;
