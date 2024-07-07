# InclusiveCapital
a credit-risk-assessment platform for disadvantaged groups to check their loan eligibility for business loans


To decide whether loan will be approved or rejected, the three scores: credit_score, loan_default_probability, business_proposal_risk are taken and then run through a decision tree to decide whether to approve or reject the loan. The current decision tree follows this idea:
# Decision Tree for Loan Approval

## Node 1: Credit Score
- **Poor**
  - **Node 2: Probability of Default**
    - **> 0.5**: Reject
    - **≤ 0.5**:
      - **Node 3: Business Proposal Default Score**
        - **> 6**: Reject
        - **≤ 6**: Moderate Risk of Approval
- **Standard**
  - **Node 4: Probability of Default**
    - **> 0.7**:
      - **Node 5: Business Proposal Default Score**
        - **> 7**: Reject
        - **≤ 7**: Moderate Risk of Approval
    - **≤ 0.7**:
      - **Node 6: Probability of Default**
        - **> 0.2**:
          - **Node 7: Business Proposal Default Score**
            - **> 3**: Moderate Risk of Approval
            - **≤ 3**: Approve
        - **≤ 0.2**: Approve
- **Good**
  - **Node 8: Probability of Default**
    - **> 0.8**:
      - **Node 9: Business Proposal Default Score**
        - **> 8**: Reject
        - **≤ 8**: Moderate Risk of Approval
    - **≤ 0.8**:
      - **Node 10: Probability of Default**
        - **> 0.2**:
          - **Node 11: Business Proposal Default Score**
            - **> 3**: Moderate Risk of Approval
            - **≤ 3**: Approve
        - **≤ 0.2**: Approve

