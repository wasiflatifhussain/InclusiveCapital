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

### First Model:
Using a Sequential model, which is appropriate for a straightforward feedforward neural network.
It uses a linear stack of layers where one layer leads to the next (output of prev layer = input of next layer)
Uses adam optimizer to reduce loss  and sigmoid activation function to adjust values from one layer to next
