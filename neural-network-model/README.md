#### Dataset headings used and their importance:

1. person_age:
Description: Age of the borrower.
Importance: Younger borrowers might have less credit history, while older borrowers may have more stable financial profiles.

2. person_income:
Description: Annual income of the borrower.
Importance: Higher income typically suggests a better ability to repay loans.

3. person_home_ownership:
Description: Home ownership status of the borrower (e.g., RENT, OWN, MORTGAGE).
Importance: Home ownership can be an indicator of financial stability and collateral availability.

4. person_emp_length:
Description: Length of employment in years.
Importance: Longer employment history indicates job stability, which reduces the risk of default.

5. loan_intent:
Description: The purpose of the loan (e.g., PERSONAL, EDUCATION, MEDICAL, VENTURE).
Importance: Different loan intents have different risk profiles. For example, personal loans might have higher default rates compared to educational loans.

6. loan_grade:
Description: The grade assigned to the loan based on the borrower's creditworthiness (e.g., A, B, C, D).
Importance: Higher grades (e.g., A) indicate lower risk, while lower grades (e.g., D) indicate higher risk.

7. loan_amnt:
Description: The amount of the loan.
Importance: Larger loan amounts carry higher risk and require a more thorough evaluation of the borrower's ability to repay.

8. loan_int_rate:
Description: The interest rate on the loan.
Importance: Higher interest rates are often associated with higher risk loans.

9. loan_status:
Description: The status of the loan (e.g., 1 for default, 0 for not default).
Importance: Indicates whether the borrower has defaulted on the loan, which is crucial for risk assessment.

10. loan_percent_income:
Description: The percentage of the borrower’s income that the loan amount represents.
Importance: Helps assess the borrower's ability to manage loan repayments relative to their income.

11. cb_person_default_on_file:
Description: Indicates if the person has previously defaulted on a loan (Y for yes, N for no).
Importance: Past defaults are strong indicators of future credit risk.

12. cb_person_cred_hist_length:
Description: The length of the borrower’s credit history in years.
Importance: Longer credit histories provide more information on the borrower’s credit behavior and are usually favorable.


#### Important Correlations and Notes about the dataset:
1. strong positive correlation between person_age and cb_person_cred_hist_length positive correlation between loan_status and loan_int_rate positive correlation between loan_status and loan_percent_income positive correlation between loan_amnt and loan_percent_income
2. We can see that most non default loans are in the 7.5-12.5% interest rate range, with some loans over 20% interest. The default loans have a slighter higher interest rate.
3. The non default loans have a lower loan to income percentage, as expected, however, there are also some data points as higher loan to income percentages. The default loans have data points at slighter higher loan to income percentage and the range of these percentages is larger than non default loans.
4. For this data set, loan amounts are up to 35,000 and the loan to income percentage is below 90%. The majority of the data points lie within loan amount of 25,000 and loan to income percentage of 50%. The positive correlation between these features means that as the loan amount increases, this tends to mean the applicant is borrowing an increasing percentage of their income.
5. On average, as the loan to income percentage increases, the loan interest rate tends to increase.
6. Most defaults are in grades A - D out of A-G; so E-G grades are dropped are they have negligible impact on the neural networks outputs.
7. Defaults are relatively consistent across all loan purposes in the dataset.
8. This graphs tell us that the majority of loan defaults are renters.
9. Interestingly, 84% of renters who default have no prior defaults on file.
10. Almost 60% of renters who default, have a credit history length of 4 years or less. Extra credit worthiness checks should be done by loan writers in order to reduce the number of loan defaults.

#### Edits made to the dataset:
1. person_emp_length had two anomalies: 123 and NaN which were replaced with median person_emp_length
2. loan_int_rate anomalies: NaN values(multiple) were replaced with mean loan_int_rate
3. categorical variables like person_home_ownership converted into dummy/numeric variable using one-hot-encoding
4. converted the categorical variable loan_grade into ordinal values using OrdinalEncoder from scikit-learn. this is useful because loan_grade has a natural ordering (e.g., A is better than B, which is better than C, etc.)
5. MinMaxScaler used to normalize the training and test datasets

### First Model with default dataset:
Using a Sequential model, which is appropriate for a straightforward feedforward neural network.
It uses a linear stack of layers where one layer leads to the next (output of prev layer = input of next layer)
Uses adam optimizer to reduce loss  and sigmoid activation function to adjust values from one layer to next


### Editing the raw dataset to inject the desired loan_intent categories and replace existing categories:
Intuition:
Based on the current correlations discovered from the dataset analysis, this is the mapping stragegy being employed to use the following loan intents into the dataset:
#### Targetted Loan Intents
1. WOMAN_ENTREPRENEUR
2. MINORITY_BUSINESS
3. GREEN_ENERGY_PROJECTS
4. VETERAN_OWNED_BUSINESS
5. LGBTQ_ENTREPRENEURS

#### Approach:
Mapping Based on Interest Rates:

- Higher interest rates tend to correlate with defaults.
- Lower interest rates tend to correlate with non-defaults.
- Mapping Based on Loan Amount and Loan Percent Income:
  Higher loan amounts and higher loan percent income tend to correlate with defaults.
- Maintaining Distribution:
  Ensure that the distribution of the new categories mirrors the existing distribution to maintain the correlation structures.

#### Current Mapping Strategy:
- WOMAN_ENTREPRENEUR: Categories with lower interest rates and loan percent income, tending towards non-defaults.
- MINORITY_BUSINESS: Categories with moderate interest rates and loan amounts.
- GREEN_ENERGY_PROJECTS: Categories related to education or medical purposes which might have varied loan amounts and rates.
- VETERAN_OWNED_BUSINESS: Categories with high creditworthiness (lower default rates).
- LGBTQ_ENTREPRENEURS: Categories with higher interest rates and loan amounts.


### Editing modified dataset to inject business_proposal_analysis header to data:
Intuition: Analyzing the business proposal can give valuable insights into whether the business will become successful. By analyzing the modified dataset, we can draw patterns in the existing data and assume which of the datapoints may have business_proposal_analysis categorical rating of high-medium-low.

##### We are currently considering two strategies to categorize the data and add the new header:
###### Strategy 1 (using basic correlations):
- High Business Plan:
    1. Lower interest rates (7.5% - 12.5%).
    2. Lower loan to income percentage.
    3 .Loan grades A-D.
    4. Non-default loans (loan_status = 0).
- Medium Business Plan:
    1. Moderate interest rates (12.5% - 20%).
    2. Moderate loan to income percentage.
    3. Loan grades A-D.
    4. Mix of default and non-default loans.
- Low Business Plan:
    1. Higher interest rates (> 20%).
    2. Higher loan to income percentage.
    3. Default loans (loan_status = 1).

###### Strategy 2 (more refined with deeper insights):
- High Business Plan:
  1. Non-default loans (`loan_status` = 0) with:
     - Lower interest rates (≤ 12.5%).
     - Lower loan to income percentage (≤ 0.5).
     - No prior defaults (`cb_person_default_on_file` = 'N').
     - Credit history length > 4 years.
  2. Default loans (`loan_status` = 1) with:
     - Lower interest rates (≤ 12.5%).
     - Lower loan to income percentage (≤ 0.5).
     - No prior defaults (`cb_person_default_on_file` = 'N').
     - Credit history length > 4 years.
- Medium Business Plan:
  1. Non-default loans (`loan_status` = 0) with:
     - Moderate interest rates (12.5% - 17%).
     - Loan percent income ≤ 0.9.
  2. Default loans (`loan_status` = 1) with:
     - Interest rates ≤ 17%.
- Low Business Plan:
  1. Default loans (`loan_status` = 1) with:
     - Higher interest rates (> 17%).
     - Short credit history (credit history length ≤ 3 years).
     - Prior defaults (`cb_person_default_on_file` = 'Y').
  2. Non-default loans (`loan_status` = 0) with:
     - Higher interest rates (> 17%).
     - Short credit history (credit history length ≤ 3 years).
     - Prior defaults (`cb_person_default_on_file` = 'Y').

###### Strategy 1 outcome: 
- business_proposal_analysis
- High      16595
- Medium    15923
- Low          63
- Name: count, dtype: int64
###### Strategy 2 outcome:
- business_proposal_analysis
- Medium    21096
- High       7394
- Low        4091
- Name: count, dtype: int64

 ###### As we are unsure which dataset may provide better results, it is better to consider both strategies, as well as other grouping strategies as we go along, to figure out the most optimum dataset.
