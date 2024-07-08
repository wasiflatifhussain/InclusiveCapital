"use client";

import React, { useState } from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";


export function Business_Risk_Score({ businessRiskScore, setBusinessRiskScore }) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_idea: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
  
    // Set loading to true
    setIsLoading(true);
  
    // Mapping the formData to match the expected structure
  
    console.log("Prepared Data:", formData);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/check-loan-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      setResult(data);
      setBusinessRiskScore(data.business_proposal_risk_score)
      sessionStorage.setItem("business_proposal_risk_score", JSON.stringify(data.business_proposal_risk_score));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set loading to false
      setIsLoading(false);
    }
  };
  
  

  return (
    <section className="grid place-items-center p-8">
      <div className="w-full container mx-auto pt-0 text-center">
        <Typography
          color="blue-gray"
          className="mx-auto w-full text-[24px] lg:text-[30px] font-bold leading-[35px] lg:leading-[45px] lg:max-w-2xl"
        >
          Step 3: Analyze your Business Idea
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mx-auto max-w-3xl text-center text-gray-500"
        >
          We are almost done! In this step, we want to briefly know about your business idea to analyze it's strengths and get an idea of it's chances of being a success. Banks will usually take your business plan into consideration, so we want to analyze yours to give you the most fair judgement about your loan approval chances. Again, rest assured, your data is not stored anywhere on our servers. Read our <Link href="/#terms-and-conditions" className="underline text-black-500">Terms and Conditions</Link> for details.
        </Typography>
        <div className="w-full container mx-auto pb-0 flex flex-col items-center">
            <div className="w-full flex justify-center items-center mb-6">
                <div className="w-2/3">
                    <Typography
                    color="blue-gray"
                    className="text-[20px] lg:text-[25px] font-bold leading-[30px] lg:leading-[35px] mt-12 mb-4 text-center"
                    >
                    Our Model
                    </Typography>
                    <Typography color="gray" className="mb-4 text-center">
                    We use the Llama3-8b-8192 model to analyze business ideas. This advanced AI model evaluates the strengths and weaknesses of a business proposal and provides a risk score out of 10, indicating the potential risks involved in pursuing the idea.
                    </Typography>
                    <Typography color="gray" className="mb-4 text-center">
                    The Llama3-8b-8192 model is known for its high accuracy and reliability, having been trained on a vast dataset to ensure precise and insightful evaluations and leverages state-of-the-art natural language processing techniques to deliver comprehensive analyses, making it an excellent choice for assessing business ideas.
                    </Typography>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <form className="w-full max-w-3xl" onSubmit={handleSubmit}>
                <div className="floating-label-group relative">
                    <textarea
                    name="business_idea"
                    className="floating-label-input w-full h-40 p-4 border rounded"
                    placeholder="Please write a brief of your business idea. About 50-60 words is enough but you are free to write in more details. The longer the better!"
                    value={formData.business_idea}
                    onChange={handleChange}
                    required
                    />
                    <label className="floating-label">
                        Describe your Business Idea. 
                        <span className="tooltip">
                            <i className="fas fa-info-circle ml-2"></i>
                            <span className="tooltiptext" style={{padding: "6px"}}>
                            Please write a brief of your business idea. About 50-60 words is enough but you are free to write in more details. The longer the better!
                            </span>
                        </span>
                    </label>
                </div>
                <Button size="md" className="w-full mt-6" color="gray" type="submit">
                    Submit
                </Button>
                </form>
            </div>
        </div>


          {/* Result Div */}
          <div className="w-full container mx-auto pt-12 pb-0 text-center">
            {isLoading ? (
                <div className="mt-4 pt-12 p-6 bg-white rounded-lg shadow-lg border-t-4 border-black">
                    <Typography
                    color="blue-gray"
                    className="text-[25px] lg:text-[30px] font-bold leading-[35px] lg:leading-[45px] mb-4"
                    >
                    Loading...
                    </Typography>
                    <Typography variant="lead" color="gray" className="text-lg">
                    Please wait while we process your request.
                    </Typography>
                </div>
                ) : result && (
                <div className="mt-8 pt-24 p-6 bg-white rounded-lg shadow-lg border-t-4 border-black">
                    <Typography
                    color="blue-gray"
                    className="text-[25px] lg:text-[30px] font-bold leading-[35px] lg:leading-[45px] mb-4"
                    >
                    Predicted Business Proposal Risk:
                    </Typography>
                    <Typography variant="lead" color="gray" className="text-lg mb-2">
                    The model predicted a risk score of:
                    </Typography>
                    <Typography variant="lead" color="blue-gray" className="text-2xl font-bold">
                    {result.business_proposal_risk_score}/10
                    </Typography>
                </div>
            )}
          </div>


      </div>

    </section>
  );
}

export default Business_Risk_Score;
