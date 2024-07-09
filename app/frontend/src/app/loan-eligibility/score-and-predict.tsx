import { Typography, Button } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";

interface ScoresAndPredictProps {
  creditScore: number | null;
  loanDefault: number | null;
  businessRiskScore: number | null;
}

const ScoresAndPredict: React.FC<ScoresAndPredictProps> = ({ creditScore, loanDefault, businessRiskScore }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loanApprovalProbability, setLoanApprovalProbability] = useState<number | null>(null);

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setLoanApprovalProbability(null);

    const preparedData = {
      credit_score: creditScore,
      default_probability: loanDefault,
      business_proposal_risk_score: businessRiskScore,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/calculate-loan-approval-probability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLoanApprovalProbability(data.loan_approval_probability*100);
    } catch (error) {
      console.error("Error:", error);
    } finally {
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
          Final Step: Probability of your loan getting approved
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mx-auto max-w-3xl text-center text-gray-500"
        >
          We are at the last step! Now that we have all the data, let's check the probability of your loan getting approved and get some advice! Your data is not stored anywhere on our servers. Read our <Link href="/#terms-and-conditions" className="underline text-black-500">Terms and Conditions</Link> for details.
        </Typography>
        <div className="mt-12 p-6 bg-white rounded-lg shadow-lg border-t-4 border-black text-left">
          <Typography color="blue-gray" className="text-[20px] lg:text-[25px] font-bold leading-[35px] lg:leading-[45px] mb-4">
            Overall Scores
          </Typography>
          <Typography variant="lead" color="gray" className="text-lg">
            Credit Score:
          </Typography>
          <Typography variant="lead" color="blue-gray" className="text-lg font-bold">
            {creditScore !== null ? creditScore : "Not Available"}
          </Typography>
          <Typography variant="lead" color="gray" className="text-lg mt-2">
            Loan Default Probability:
          </Typography>
          <Typography variant="lead" color="blue-gray" className="text-lg font-bold">
            {loanDefault !== null ? loanDefault : "Not Available"}
          </Typography>
          <Typography variant="lead" color="gray" className="text-lg mt-2">
            Business Risk Score:
          </Typography>
          <Typography variant="lead" color="blue-gray" className="text-lg font-bold">
            {businessRiskScore !== null ? businessRiskScore : "Not Available"}
          </Typography>
        </div>
        <Button size="md" className="w-full mt-6" color="gray" onClick={handleFinalSubmit} disabled={isLoading}>
          Submit
        </Button>
        <div className="mt-4 w-full flex flex-col items-center">
        {isLoading ? (
            <div className="w-full p-12 bg-gray-100 rounded-lg shadow-lg border-t-4 border-gray-500">
            <Typography color="blue-gray" className="text-lg font-bold text-center">
                Loading...
            </Typography>
            </div>
        ) : loanApprovalProbability !== null ? (
            <div className="w-full p-12 bg-white rounded-lg shadow-lg border-t-4 border-green-500">
            <Typography className="text-gray-500 text-lg font-bold text-center mb-4">
                Based on the data you provided, this is your loan approval probability:
            </Typography>
            <Typography color="blue-gray" className="text-2xl font-bold text-center">
                Loan Approval Probability: {loanApprovalProbability}%
            </Typography>
            <Typography color="gray" className="text-lg text-center mt-4">
                If it seems that the loan might not get approved, visit the <Link href="/learn-loans" className="underline text-black-500">Learn Loans</Link> page to learn about how you can work towards getting your loans approved. Alternatively, contact us at <a href="mailto:wasiflh@connect.hku.hk" className="underline text-black-500">wasiflh@connect.hku.hk</a>.
            </Typography>
            </div>
        ) : null}
        </div>

      </div>
    </section>
  );
};

export default ScoresAndPredict;
