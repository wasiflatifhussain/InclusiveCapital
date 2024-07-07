# InclusiveCapital

InclusiveCapital is an innovative platform designed to help underrepresented groups such as women entrepreneurs, small farmers and agriculture, minority businesses, small businesses, and freelance and gig workers check their eligibility for receiving microloans. The platform leverages advanced machine learning models to predict the likelihood of loan approval, providing crucial insights to individuals who typically face difficulties in securing funding.

## Features

- **Credit Score Prediction**: Uses a stacking model to predict the user's credit score.
- **Probability of Default**: Utilizes an XGBoost classifier model optimized with grid search and cross-validation to estimate the probability of default.
- **Business Proposal Evaluation**: Analyzes the business proposal using the Groq API to provide a business proposal risk score.
- **Loan Approval Probability**: Combines the credit score, probability of default, and business proposal risk score to determine the probability of loan approval.

## Loan Approval Probability Calculation

### Approach

1. **Weight Distribution for Loan Approval Calculation**

    ##### Weights:
    - **Credit Score**: 35% - Reflects the applicant's historical financial behavior.
    - **Probability of Default**: 45% - Maintains a strong emphasis on the likelihood of the applicant defaulting.
    - **Business Proposal Risk Score**: 20% - Considers the potential risk of the business failing.
    
    #### Justification:
    - **Credit Score (35%)**: This weight ensures that the applicant's past financial behavior is given significant consideration, as a person with good creditworthiness shows a habit of paying back in time.
    - **Probability of Default (45%)**: The highest weight, as it directly affects the risk of not recovering the loan amount.
    - **Business Proposal Risk Score (20%)**: While important, the risk of the business failing is slightly less critical compared to the direct probability of loan default, as the person may be able to pay back the loan from elsewhere also.

2. **Normalize the Scores:**
   - **Credit Score**: Poor = 0, Standard = 0.5, Good = 1
   - **Probability of Default**: Use the value directly (0 to 1)
   - **Business Proposal Risk Score**: Normalize to a 0-1 scale (0 = 10, 1 = 0)

3. **Calculate the Weighted Sum:**
   - Combine the normalized scores using the assigned weights.

### Formula

```
Loan Approval Probability = (0.35 × Normalized Credit Score) + (0.45 × (1 - Probability of Default)) + (0.2 × Normalized Business Proposal Risk Score)
```
