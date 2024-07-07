# InclusiveCapital
a credit-risk-assessment platform for disadvantaged groups to check their loan eligibility for business loans


To decide whether loan will be approved or rejected, the three scores: credit_score, loan_default_probability, business_proposal_risk are taken and then run through a probability calculation against their importance/weights to decide whether to approve or reject the loan. The current function has these features:

## Loan Approval Probability Calculation

### Approach

1. **Assign Weights to Each Score:**
   - **Credit Score**: 40%
   - **Probability of Default**: 30%
   - **Business Proposal Default Score**: 30%

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
