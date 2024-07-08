"use client";

import React, { useState } from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";


export function Credit_Score({ setCreditScore, creditScore }) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Age: "",
    Annual_Income: "",
    Monthly_Inhand_Salary: "",
    Num_Bank_Accounts: "",
    Num_Credit_Card: "",
    Interest_Rate: "",
    Num_of_Loan: "",
    Delay_from_due_date: "5",
    Num_of_Delayed_Payment: "",
    Changed_Credit_Limit: "5000",
    Num_Credit_Inquiries: "",
    Credit_Mix: "",
    Outstanding_Debt: "",
    Credit_Utilization_Ratio: "",
    Credit_History_Age: "",
    Total_EMI_per_month: "",
    Amount_invested_monthly: "",
    Monthly_Balance: "",
    Type_Of_Loan: "",
    Current_Month: "January",
    Occupation: "",
    Payment_of_Min_Amount_Yes: "1",
    Payment_Behaviour: "",
  });

  const credit_mix_mapper: { [key: string]: string } = {
    "Bad": "0",
    "Standard": "1",
    "Good": "2"
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const mappedValue = name === "Credit_Mix" ? credit_mix_mapper[value] || value : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: mappedValue,
    }));

    console.log(formData);
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("submit");

  // Set loading to true
  setIsLoading(true);

  // Mapping the formData to match the expected structure
  const preparedData = {
    ...formData,
    Credit_Mix: parseInt(formData.Credit_Mix),
    Payment_of_Min_Amount_Yes: formData.Payment_of_Min_Amount_Yes === "1" ? 1 : 0,
    Delay_from_due_date: parseInt(formData.Delay_from_due_date),
    Changed_Credit_Limit: parseInt(formData.Changed_Credit_Limit),
    Num_of_Delayed_Payment: parseInt(formData.Num_of_Delayed_Payment),
    Num_Credit_Inquiries: parseInt(formData.Num_Credit_Inquiries),
    Outstanding_Debt: parseFloat(formData.Outstanding_Debt),
    Credit_Utilization_Ratio: parseFloat(formData.Credit_Utilization_Ratio),
    Credit_History_Age: parseFloat(formData.Credit_History_Age),
    Total_EMI_per_month: parseFloat(formData.Total_EMI_per_month),
    Amount_invested_monthly: parseFloat(formData.Amount_invested_monthly),
    Monthly_Balance: parseFloat(formData.Monthly_Balance),
  };

  console.log("Prepared Data:", preparedData);

  try {
    const response = await fetch("http://127.0.0.1:5000/predict-credit-score", {
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
    console.log("Response from server:", data);

    setResult(data);
    setCreditScore(data.value);
    sessionStorage.setItem("credit_score", JSON.stringify(data));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Set loading to false
    setIsLoading(false);
  }
};

  

  return (
    <section className="grid place-items-center p-8">
      <Typography variant="h6" className="mb-2">
        Get a Microloan today!
      </Typography>
      <Typography variant="h1" className="mb-2">
        Check your Loan Eligibility
      </Typography>
      <Typography
        variant="lead"
        color="gray"
        className="max-w-3xl mb-24 text-center text-gray-500"
      >
        We provide a comprehensive analysis to predict your credit score and assess the probability of loan default, as a bank might calculate for you. Additionally, we evaluate your business proposal to determine its likelihood of success. Based on these insights, we inform you about the potential approval of your loan application.
      </Typography>
      <div className="w-full lg:container lg:mx-auto mb-12">
        <Image
          width={1024}
          height={400}
          src="/image/img3.jpg"
          alt="credit cards"
          className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
          priority
          placeholder="blur"
          blurDataURL="/image/img1-blur.jpg" // Use a low-quality placeholder image
        />
      </div>
      <div className="w-full container mx-auto pt-12 text-center">
        <Typography
          color="blue-gray"
          className="mx-auto w-full text-[24px] lg:text-[30px] font-bold leading-[35px] lg:leading-[45px] lg:max-w-2xl"
        >
          Step 1: Predicting your Credit Score
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mx-auto max-w-3xl mb-12 text-center text-gray-500"
        >
          Let's start by predicting your credit score based on certain information. Rest assured, your data is not stored anywhere on our servers. Read our <Link href="/#terms-and-conditions" className="underline text-black-500">Terms and Conditions</Link> for details.
        </Typography>
          <div className="w-full container mx-auto pt-12 pb-0 flex">
            <div className="w-2/3 pr-8">
              <form className="w-full max-w-2xl mb-24" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Age"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Age}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Age</label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Annual_Income"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Annual_Income}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Annual Income</label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Monthly_Inhand_Salary"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Monthly_Inhand_Salary}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Monthly Inhand Salary</label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Num_Bank_Accounts"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Num_Bank_Accounts}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Number of Bank Accounts</label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Num_Credit_Card"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Num_Credit_Card}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Number of Credit Cards</label>
                  </div>
                  <div className="floating-label-group relative">
                    <input
                      type="text"
                      name="Interest_Rate"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Interest_Rate}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">
                      Interest Rate
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                        The amount of interest you might be paying on any outstanding loans or credit card debts.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Num_of_Loan"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Num_of_Loan}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Number of Loans</label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Num_of_Delayed_Payment"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Num_of_Delayed_Payment}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label relative">
                      Number of delayed payments after due date
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                        Specify the number of times you may have delayed payment of dues. If none, please type "0".
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Changed_Credit_Limit"
                      className="floating-label-input"
                      placeholder={formData.Changed_Credit_Limit}
                      value={formData.Changed_Credit_Limit}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Credit Limit changed to</label>
                  </div>
                  <div className="floating-label-group relative">
                    <input
                      type="text"
                      name="Num_Credit_Inquiries"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Num_Credit_Inquiries}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">
                      Number of Credit Inquiries made
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                          Each credit inquiry can lower your credit score by a few points. Frequent inquiries may signal higher credit risk.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group relative">
                    <select
                      name="Credit_Mix"
                      className="floating-label-input"
                      value={formData.Credit_Mix}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Credit Mix</option>
                      <option value="Good">Good</option>
                      <option value="Standard">Standard</option>
                      <option value="Poor">Poor</option>
                    </select>
                    <label className="floating-label">Credit Mix
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext bg-white text-black border border-gray-300 p-2 rounded shadow-lg">
                          <strong>Good Credit Mix</strong><br />
                          Accounts: 5+ types (cards, mortgages, auto loans).<br />
                          Usage Ratio: Below 30%.<br />
                          Payments: 95%+ on-time.<br />
                          Age: 5+ years.<br />
                          Inquiries: ≤2 in 2 years.<br /><br />
                          
                          <strong>Standard Credit Mix</strong><br />
                          Accounts: 3+ types (cards, maybe mortgage/auto loan).<br />
                          Usage Ratio: Below 50%.<br />
                          Payments: 85%+ on-time.<br />
                          Age: 3+ years.<br />
                          Inquiries: ≤4 in 2 years.<br /><br />
                          
                          <strong>Poor Credit Mix</strong><br />
                          Accounts: Less than 3 types.<br />
                          Usage Ratio: Above 50%.<br />
                          Payments: Below 85% on-time.<br />
                          Age: Less than 3 years.<br />
                          Inquiries: > 4 in 2 years.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Outstanding_Debt"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Outstanding_Debt}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Outstanding Debt Amount</label>
                  </div>
                  <div className="floating-label-group relative">
                    <input
                      type="text"
                      name="Credit_Utilization_Ratio"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Credit_Utilization_Ratio}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">
                      Credit Utilization Ratio
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                          The Credit Utilization Ratio is the percentage of your total credit limit that you are using. Calculate it by dividing your total outstanding debt by your total credit limit, then multiply by 100.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group relative">
                    <input
                      type="text"
                      name="Credit_History_Age"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Credit_History_Age}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">
                      Credit History Age
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                          What is the time period for which your credit history has been available (usually the time period begins from when you make your first bank account)?
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group relative">
                    <input
                      type="text"
                      name="Total_EMI_per_month"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Total_EMI_per_month}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">
                      Total EMI per month
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                        Total EMI per Month is the combined monthly payment amount for all your loans. It includes both the principal and interest components of your loan payments.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="Amount_invested_monthly"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Amount_invested_monthly}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">
                      Amount Invested Monthly
                    </label>
                  </div>
                  <div className="floating-label-group relative">
                    <input
                      type="text"
                      name="Monthly_Balance"
                      className="floating-label-input"
                      placeholder=" "
                      value={formData.Monthly_Balance}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">
                      Monthly Balance Remaining
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                        Amount you may have left at the end of payments and expenses every month.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group relative">
                    <select
                      name="Type_Of_Loan"
                      className="floating-label-input"
                      value={formData.Type_Of_Loan}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Loan Type</option>
                      <option value="Credit-Builder Loan">Credit-Builder Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Debt Consolidation Loan">Debt Consolidation Loan</option>
                      <option value="Student Loan">Student Loan</option>
                      <option value="Payday Loan">Payday Loan</option>
                      <option value="Mortgage Loan">Mortgage Loan</option>
                      <option value="Auto Loan">Auto Loan</option>
                      <option value="Home Equity Loan">Home Equity Loan</option>
                      <option value="Personal Loan">Other Loans</option>
                      <option value="">N/A</option>
                    </select>
                    <label className="floating-label">Type of Loan
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                        In the case of multiple loans, select the loan with the largest amount. Select N/A in the event of no outstanding loans.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group relative">
                    <select
                      name="Occupation"
                      className="floating-label-input"
                      value={formData.Occupation}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Occupation</option>
                      <option value="Occupation_Architect">Architect</option>
                      <option value="Occupation_Developer">Developer</option>
                      <option value="Occupation_Doctor">Doctor</option>
                      <option value="Occupation_Engineer">Engineer</option>
                      <option value="Occupation_Entrepreneur">Entrepreneur</option>
                      <option value="Occupation_Journalist">Journalist</option>
                      <option value="Occupation_Lawyer">Lawyer</option>
                      <option value="Occupation_Manager">Manager</option>
                      <option value="Occupation_Mechanic">Mechanic</option>
                      <option value="Occupation_Media_Manager">Media Manager</option>
                      <option value="Occupation_Musician">Musician</option>
                      <option value="Occupation_Scientist">Scientist</option>
                      <option value="Occupation_Teacher">Teacher</option>
                      <option value="Occupation_Writer">Writer</option>
                      <option value="Occupation_Others">Student</option>
                      <option value="Occupation_Others">Others</option>
                    </select>
                    <label className="floating-label">Type of Loan
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                        In the case of multiple loans, select the loan with the largest amount. Select N/A in the event of no outstanding loans.
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="floating-label-group relative">
                    <select
                      name="Payment_Behaviour"
                      className="floating-label-input"
                      value={formData.Payment_Behaviour}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select your usual repayment behaviour</option>
                      <option value="High_spent_Medium_value_payments">High Spend & Medium Value Payements</option>
                      <option value="High_spent_Small_value_payments">High Spend & Small Value Payments</option>
                      <option value="Low_spent_Large_value_payments">Low Spend & Large Value Payments</option>
                      <option value="Low_spent_Medium_value_payments">Low Spend & Medium Value Payments</option>
                      <option value="Low_spent_Small_value_payments">Low Spend & Small Value Payments</option>
                      <option value="Medium_spent_Medium_value_payments">Medium Spend & Medium Value Payments</option>
                      <option value="Medium_spent_Medium_value_payments">Others</option>
                    </select>
                    <label className="floating-label">Payment Behaviour
                      <span className="tooltip">
                        <i className="fas fa-info-circle ml-2"></i>
                        <span className="tooltiptext" style={{padding: "6px"}}>
                        Specify what you think is your usual repayment behavior when it comes to repaying debts on loans and credit card debts.
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <Button size="md" className="w-full mt-6" color="gray" type="submit">
                  Submit
                </Button>
              </form>
            </div>
            <div className="w-1/3 pl-4">
              <Typography
                color="blue-gray"
                className="text-[20px] lg:text-[25px] font-bold leading-[30px] lg:leading-[35px] mb-4 text-right"
              >
                Guidance and Tips
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                Ensure all information is accurate for better predictions.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                Lower credit usage can positively impact your score.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                Make timely payments to avoid negative impacts on your score.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                Diverse credit types (loans, credit cards) can improve your credit mix.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                Regularly check your credit report for errors and rectify them.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                Avoid closing old credit accounts as they contribute to your credit history length.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                Keep your credit inquiries to a minimum to avoid lowering your score.
              </Typography>

              <Typography
                color="blue-gray"
                className="text-[20px] lg:text-[25px] font-bold leading-[30px] lg:leading-[35px] mt-12 mb-4 text-right"
              >
                Our Model
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                We use a machine learning stacking model to predict your credit score.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                This model is trained on 100,000 data points to ensure accuracy and reliability.
              </Typography>
              <Typography color="gray" className="mb-4 text-right">
                The stacking model combines multiple machine learning algorithms to improve prediction performance.
              </Typography>
            </div>
          </div>

          {/* Result Div */}
          <div className="w-full container mx-auto pt-0 pb-6 text-center">
            {isLoading ? (
              <div className="mt-4 p-6 bg-white rounded-lg shadow-lg border-t-4 border-black">
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
              <div className="mt-4 p-6 bg-white rounded-lg shadow-lg border-t-4 border-black">
                <Typography
                  color="blue-gray"
                  className="text-[25px] lg:text-[30px] font-bold leading-[35px] lg:leading-[45px] mb-4"
                >
                  Predicted Credit Score
                </Typography>
                <Typography variant="lead" color="gray" className="text-lg mb-2">
                  Your predicted credit score is:
                </Typography>
                <Typography variant="lead" color="blue-gray" className="text-2xl font-bold">
                  {result.meaning} ({result.value})
                </Typography>
              </div>
            )}
          </div>


      </div>

    </section>
  );
}

export default Credit_Score;
