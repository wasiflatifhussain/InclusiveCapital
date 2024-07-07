# InclusiveCapital
a credit-risk-assessment platform for disadvantaged groups to check their loan eligibility for business loans


To decide whether loan will be approved or rejected, the three scores: credit_score, loan_default_probability, business_proposal_risk are taken and then run through a probability calculation against their importance/weights to decide whether to approve or reject the loan. The current function has these features:

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
   - **Business Proposal Default Score**: Normalize to a 0-1 scale (0 = 10, 1 = 0)

3. **Calculate the Weighted Sum:**
   - Combine the normalized scores using the assigned weights.

### Formula

```
Loan Approval Probability = (Weight of Score × Normalized Credit Score) + (Weight of Score × (1 - Probability of Default)) + (Weight of Score × Normalized Business Proposal Default Score)
```
