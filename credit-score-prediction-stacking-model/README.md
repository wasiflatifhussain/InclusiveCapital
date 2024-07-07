Prepare a model that can predict the credit score for the customer as it plays a vital role in their chances of receiving microloans.

## Insights from exploratory data analysis:

### Features in the dataset and their importance

1. **Age**
   - **Description**: The age of the customer.
   - **Importance**: Older customers may have longer credit histories and more stable financial behavior, which can positively influence credit scores.

2. **Annual_Income**
   - **Description**: The total annual income of the customer.
   - **Importance**: Higher income can indicate a greater ability to repay debts, which positively impacts the credit score.

3. **Monthly_Inhand_Salary**
   - **Description**: The monthly take-home salary of the customer.
   - **Importance**: It reflects the customer's cash flow and ability to manage monthly payments, affecting their creditworthiness.

4. **Num_Bank_Accounts**
   - **Description**: The number of bank accounts the customer holds.
   - **Importance**: Having multiple bank accounts can indicate financial stability and diversity in banking relationships.

5. **Num_Credit_Card**
   - **Description**: The number of credit cards the customer holds.
   - **Importance**: Responsible management of multiple credit cards can positively impact the credit score, while misuse can have the opposite effect.

6. **Interest_Rate**
   - **Description**: The interest rate on the customer's loan or credit card.
   - **Importance**: Higher interest rates can lead to higher monthly payments, affecting the customer's ability to repay debt and impacting their credit score.

7. **Num_of_Loan**
   - **Description**: The number of loans the customer currently has.
   - **Importance**: Multiple loans can indicate higher debt levels, which may negatively affect the credit score if not managed properly.

8. **Delay_from_due_date**
   - **Description**: The number of days payments have been delayed from the due date.
   - **Importance**: Late payments are a significant negative factor in credit score calculations.

9. **Num_of_Delayed_Payment**
   - **Description**: The number of delayed payments the customer has made.
   - **Importance**: A history of delayed payments can significantly lower a credit score.

10. **Changed_Credit_Limit**
    - **Description**: The change in the customer's credit limit.
    - **Importance**: Frequent changes in credit limit can indicate financial instability or proactive credit management, depending on the context.

11. **Num_Credit_Inquiries**
    - **Description**: The number of inquiries made into the customer's credit report.
    - **Importance**: Numerous credit inquiries in a short period can be a red flag for lenders, indicating potential financial distress.

12. **Credit_Mix**
    - **Description**: The variety of credit accounts (e.g., credit cards, mortgages, auto loans) held by the customer.
    - **Importance**: A diverse credit mix shows the ability to manage different types of credit, positively impacting the credit score.

13. **Outstanding_Debt**
    - **Description**: The total amount of debt the customer currently owes.
    - **Importance**: High levels of outstanding debt can negatively impact the credit score, indicating higher financial risk.

14. **Credit_Utilization_Ratio**
    - **Description**: The ratio of used credit to total available credit.
    - **Importance**: High credit utilization can lower the credit score as it may indicate over-reliance on credit.

15. **Credit_History_Age**
    - **Description**: The length of the customer's credit history.
    - **Importance**: Longer credit histories typically contribute positively to the credit score, showing experience in managing credit.

16. **Total_EMI_per_month**
    - **Description**: The total Equated Monthly Installment (EMI) the customer pays per month.
    - **Importance**: Higher EMIs can impact the ability to take on new debt and affect the credit score.

17. **Amount_invested_monthly**
    - **Description**: The amount the customer invests monthly.
    - **Importance**: Regular investments can indicate good financial habits and stability, positively affecting the credit score.

18. **Monthly_Balance**
    - **Description**: The balance remaining after all monthly expenses and EMIs.
    - **Importance**: A higher monthly balance indicates better financial health and positively impacts the credit score.

19. **Type_Of_Loan**
    - **Description**: The type of loan the customer has (e.g., Personal Loan, Mortgage Loan).
    - **Importance**: Different loan types have varying impacts on credit scores based on risk levels associated with each type.

20. **Current_Month**
    - **Description**: The current month.
    - **Importance**: This can be used to identify seasonal patterns in spending and repayment behavior.

21. **Occupation**
    - **Description**: The occupation of the customer.
    - **Importance**: Certain occupations may have more stable income and employment, which can positively affect credit scores.

22. **Payment_of_Min_Amount_Yes**
    - **Description**: Indicates whether the customer pays at least the minimum amount due.
    - **Importance**: Regularly paying the minimum amount can help avoid penalties and maintain a positive credit history.

23. **Payment_Behaviour**
    - **Description**: The spending and payment behavior of the customer (e.g., High_spent_Medium_value_payments).
    - **Importance**: Payment behavior patterns can provide insights into the customer's financial habits and discipline.

### Issues with this dataset:
    - The following headings are supposed to be numerical but appear as categorical datatypes: Age, Annual_Income, Num_of_Loan, Num_of_Delayed_Payment, Changed_Credit_Limit, Amount_invested_monthly, Outstanding_Debt Credit_Mix, Monthly_Balance
    - Remove these headings: ID, Name and SSN (Not useful)
    - Remove missing data
    - Credit_Mix has value a value "-" which needs to be removed/fixed
    - Num_Credit_Card has zeros
    - Type_of_Loan nees to be rewritten
    - Negative values exist in the header: Num_Bank_Accounts
    - Outliers need to be removed
    - Missing data need to be filled/removed
    - Target column does not have even balance of outputs
    - Following headers need more fixing to balance out dataset: Credit_History_Age,Payment_of_Min_Amount,Payment_Behaviour,'Credit_Mix'

### Apply oversampling
    - As our data is not fully balanced, we intend to use oversampling to balance it out as much as possible using SMOTE
    - SMOTE (Synthetic Minority Over-sampling Technique) is a popular method used to address class imbalance in datasets, particularly in the context of binary classification problems.

### Handling Numerical
    - Using Power transformer to avoid Data Skewness
    - The PowerTransformer is a tool in scikit-learn used to apply power transformations to numerical data to stabilize variance and make the data more Gaussian-like (i.e., normally distributed)

### Model Training
Train a stacking model of the following structure:
```
bagging = BaggingClassifier(n_jobs=-1)
extraTrees = ExtraTreesClassifier(max_depth=10, n_jobs=-1)
randomForest = RandomForestClassifier(n_jobs=-1)
histGradientBoosting = HistGradientBoostingClassifier()
XGB = XGBClassifier(n_jobs=-1)

model = StackingClassifier([
    ('bagging', bagging),
    ('extraTress', extraTrees),
    ('randomforest', randomForest),
    ('histGradientBoosting', histGradientBoosting),
    ('XGB', XGB)
], n_jobs=-1)
```

More about stacking models:
1. The StackingClassifier is an ensemble learning method that combines multiple base models via a meta-model. The base models (also known as level-0 models) are trained on the dataset, and then the meta-model (also known as level-1 model) is trained on the outputs of the base models as features.
2. Base Models: These are the individual models that are trained on the initial dataset:
      - Bagging Classifier
      - Extra Trees Classifier
      - Random Forest Classifier
      - Histogram-based Gradient Boosting Classifier
      - XGBoost Classifier
These are passed as a list of tuples to the StackingClassifier
3. Meta-Model: This is implicitly defined by the StackingClassifier itself. The meta-model is trained on the predictions of the base models. By default, the meta-model is a logistic regression model, but it can be customized.
4. Parallel Processing: The n_jobs=-1 parameter allows the model to use all available processors to parallelize the computations, which can speed up the training process significantly.
