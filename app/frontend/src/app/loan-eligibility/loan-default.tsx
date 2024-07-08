"use client";

import React, { useState } from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";


export function Loan_Default({ loanDefault, setLoanDefault }) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    person_age: "",
    person_income: "",
    person_emp_length: "",
    loan_amnt: "",
    loan_int_rate: "",
    loan_percent_income: "",
    cb_person_cred_hist_length: "",
    person_home_ownership: "",
    loan_intent: "",
    cb_person_default_on_file: "",
    loan_grade: "",
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
    const preparedData = {
      ...formData,
      person_age: parseInt(formData.person_age),
      person_income: parseInt(formData.person_income),
      person_emp_length: parseInt(formData.person_emp_length),
      loan_amnt: parseFloat(formData.loan_amnt),
      loan_int_rate: parseFloat(formData.loan_int_rate),
      loan_percent_income: parseFloat(formData.loan_percent_income),
      cb_person_cred_hist_length: parseFloat(formData.cb_person_cred_hist_length),
    };
  
    console.log("Prepared Data:", preparedData);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/predict-default-probability", {
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
      setLoanDefault(data.default_probability[0]);
      sessionStorage.setItem("default_probability", JSON.stringify(data.default_probability[0]));
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
          Step 2: Predicting your Loan Default Probability
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mx-auto max-w-3xl mb-12 text-center text-gray-500"
        >
          Now let's predict the potential risks of a loan default based on your data. Again, rest assured, your data is not stored anywhere on our servers. Read our <Link href="/#terms-and-conditions" className="underline text-black-500">Terms and Conditions</Link> for details.
        </Typography>
          <div className="w-full container mx-auto pt-12 pb-0 flex">
                <div className="w-1/3 pr-8 pt-24">
                    <Typography
                        color="blue-gray"
                        className="text-[20px] lg:text-[25px] font-bold leading-[30px] lg:leading-[35px] mt-12 mb-4 text-left"
                    >
                        Our Model
                    </Typography>
                    <Typography color="gray" className="mb-4 text-left">
                        We use an XGBoost model trained and fine-tuned using cross-validation and grid search to find the best parameters, ensuring the most accurate model output.
                    </Typography>
                    <Typography color="gray" className="mb-4 text-left">
                        This model is trained on around 100,000 data points to ensure accuracy and reliability.
                    </Typography>
                    <Typography color="gray" className="mb-4 text-left">
                        XGBoost is known for its high performance and efficiency in machine learning tasks, making it an excellent choice for predicting probability of loan default.
                    </Typography>
                </div>
                <div className="w-2/3 pl-48">
                    <form className="w max-w-2xl mb-24" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="floating-label-group">
                                <input
                                type="text"
                                name="person_age"
                                className="floating-label-input"
                                placeholder=" "
                                value={formData.person_age}
                                onChange={handleChange}
                                required
                                />
                                <label className="floating-label">Age</label>
                            </div>
                            <div className="floating-label-group">
                                <input
                                type="text"
                                name="person_income"
                                className="floating-label-input"
                                placeholder=" "
                                value={formData.person_income}
                                onChange={handleChange}
                                required
                                />
                                <label className="floating-label">Annual Income</label>
                            </div>
                            <div className="floating-label-group">
                                <input
                                type="text"
                                name="person_emp_length"
                                className="floating-label-input"
                                placeholder=" "
                                value={formData.person_emp_length}
                                onChange={handleChange}
                                required
                                />
                                <label className="floating-label relative">
                                    Your Employment Length
                                    <span className="tooltip">
                                        <i className="fas fa-info-circle ml-2"></i>
                                        <span className="tooltiptext" style={{padding: "6px"}}>
                                        The total period of time for which you have been working in the industry.
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <div className="floating-label-group">
                                <input
                                type="text"
                                name="loan_amnt"
                                className="floating-label-input"
                                placeholder=" "
                                value={formData.loan_amnt}
                                onChange={handleChange}
                                required
                                />
                                <label className="floating-label">Loan Amount</label>
                            </div>
                            <div className="floating-label-group">
                                <input
                                type="text"
                                name="loan_int_rate"
                                className="floating-label-input"
                                placeholder=" "
                                value={formData.loan_int_rate}
                                onChange={handleChange}
                                required
                                />
                                <label className="floating-label">
                                    Your Payable Loan Interest Rate
                                    <span className="tooltip">
                                        <i className="fas fa-info-circle ml-2"></i>
                                        <span className="tooltiptext" style={{padding: "6px"}}>
                                        You should enter the interest rate that you would be comfortable to pay each month based on your monthly expenses. Interest Rate = (Monthly Loan Payment / Loan Principal) * 100
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <div className="floating-label-group relative">
                                <input
                                type="text"
                                name="loan_percent_income"
                                className="floating-label-input"
                                placeholder=" "
                                value={formData.loan_percent_income}
                                onChange={handleChange}
                                required
                                />
                                <label className="floating-label">
                                Loan as a Percentage of Annual Income
                                <span className="tooltip">
                                    <i className="fas fa-info-circle ml-2"></i>
                                    <span className="tooltiptext" style={{padding: "6px"}}>
                                    Simply divide your loan amount by your annual salary to receive the decimal answer.
                                    </span>
                                </span>
                                </label>
                            </div>
                            <div className="floating-label-group relative">
                                <input
                                type="text"
                                name="cb_person_cred_hist_length"
                                className="floating-label-input"
                                placeholder=" "
                                value={formData.cb_person_cred_hist_length}
                                onChange={handleChange}
                                required
                                />
                                <label className="floating-label">
                                    Credit History Length
                                    <span className="tooltip">
                                        <i className="fas fa-info-circle ml-2"></i>
                                        <span className="tooltiptext" style={{padding: "6px"}}>
                                        What is the time period for which your credit history has been available (usually the time period begins from when you make your first bank account)?
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <div className="floating-label-group relative">
                                <select
                                name="person_home_ownership"
                                className="floating-label-input"
                                value={formData.person_home_ownership}
                                onChange={handleChange}
                                required
                                >
                                <option value="" disabled>Select Home Ownership Type</option>
                                <option value="person_home_ownership_OWN">Own House</option>
                                <option value="person_home_ownership_RENT">Rented</option>
                                <option value="person_home_ownership_MORTGAGE">Mortage</option>
                                <option value="person_home_ownership_OTHER">Others</option>
                                </select>
                                <label className="floating-label">Home Ownership Status
                                <span className="tooltip">
                                    <i className="fas fa-info-circle ml-2"></i>
                                    <span className="tooltiptext" style={{padding: "6px"}}>
                                    Select what is your current home ownership status? Do you have your own place? Do you rent a house/apartment? Do you have your house on mortgage?
                                    </span>
                                </span>
                                </label>
                            </div>
                            <div className="floating-label-group relative">
                                <select
                                name="loan_intent"
                                className="floating-label-input"
                                value={formData.loan_intent}
                                onChange={handleChange}
                                required
                                >
                                <option value="" disabled>Select possible loan category</option>
                                <option value="loan_intent_FREELANCE_AND_GIG_WORKERS">Freelance and Gig Work</option>
                                <option value="loan_intent_MINORITY_BUSINESS">Minority Business Venture</option>
                                <option value="loan_intent_SMALL_BUSINESS">Own Small Business</option>
                                <option value="loan_intent_SMALL_FARMERS_AND_AGRICULTURE">Small Farmer and Agriculture</option>
                                <option value="loan_intent_WOMAN_ENTREPRENEUR">Woman Entrepreneur</option>
                                <option value="loan_intent_OTHERS">Others</option>
                                </select>
                                <label className="floating-label">Type of Loan
                                <span className="tooltip">
                                    <i className="fas fa-info-circle ml-2"></i>
                                    <span className="tooltiptext" style={{padding: "6px"}}>
                                    What type of business are you wanting to loan for? Note that microloans are intended for small ventures and may not suffice large businesses.
                                    </span>
                                </span>
                                </label>
                            </div>
                            <div className="floating-label-group relative">
                                <select
                                name="cb_person_default_on_file"
                                className="floating-label-input"
                                value={formData.cb_person_default_on_file}
                                onChange={handleChange}
                                required
                                >
                                <option value="" disabled>Do you have a prior default case?</option>
                                <option value="cb_person_default_on_file_Y">Yes, I have</option>
                                <option value="cb_person_default_on_file_N">No, I don't</option>
                                </select>
                                <label className="floating-label">Prior Default Cases
                                <span className="tooltip">
                                    <i className="fas fa-info-circle ml-2"></i>
                                    <span className="tooltiptext" style={{padding: "6px"}}>
                                    Have there been instances in the past where you took a loan and were unable to pay it back and have to default on the loan? 
                                    </span>
                                </span>
                                </label>
                            </div>
                            <div className="floating-label-group relative">
                                <select
                                name="loan_grade"
                                className="floating-label-input"
                                value={formData.loan_grade}
                                onChange={handleChange}
                                required
                                >
                                <option value="" disabled>Select Loan Grade</option>
                                <option value="grade_0">Grade A</option>
                                <option value="grade_1">Grade B</option>
                                <option value="grade_2">Grade C</option>
                                <option value="grade_3">Grade D</option>
                                <option value="grade_4">Grade E</option>
                                <option value="grade_5">Grade F</option>
                                <option value="grade_6">Grade G</option>
                                </select>
                                <label className="floating-label">Loan Grade
                                <span className="tooltip">
                                    <i className="fas fa-info-circle ml-2"></i>
                                    <span className="tooltiptext" style={{ padding: "6px" }}>
                                        Loan grades reflect the creditworthiness of the borrower. Here are the details:
                                        <br /><br />
                                        <strong>Grade A:</strong> Excellent credit, lowest interest rates. Suitable for individuals with a very high credit score and stable income.
                                        <br /><br />
                                        <strong>Grade B:</strong> Very good credit, low interest rates. Suitable for individuals with a high credit score and good income.
                                        <br /><br />
                                        <strong>Grade C:</strong> Good credit, moderate interest rates. Suitable for individuals with a good credit score but may have some minor issues in their credit history.
                                        <br /><br />
                                        <strong>Grade D:</strong> Fair credit, higher interest rates. Suitable for individuals with an average credit score who may have missed a few payments in the past.
                                        <br /><br />
                                        <strong>Grade E:</strong> Poor credit, high interest rates. Suitable for individuals with a below-average credit score and some issues in their credit history.
                                        <br /><br />
                                        <strong>Grade F:</strong> Very poor credit, very high interest rates. Suitable for individuals with a poor credit score and significant issues in their credit history.
                                        <br /><br />
                                        <strong>Grade G:</strong> Bad credit, highest interest rates. Suitable for individuals with a very poor credit score and major issues in their credit history.
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
                    Predicted Default Probability
                    </Typography>
                    <Typography variant="lead" color="gray" className="text-lg mb-2">
                    Your predicted probability of defaulting on the loan is:
                    </Typography>
                    <Typography variant="lead" color="blue-gray" className="text-2xl font-bold">
                    {(result.default_probability[0] * 100).toFixed(2)}%
                    </Typography>
                </div>
            )}
          </div>


      </div>

    </section>
  );
}

export default Loan_Default;
