import numpy as np
import pandas as pd
import joblib
from xgboost import XGBClassifier

columns = ['person_age', 'person_income', 'person_emp_length', 'loan_amnt', 'loan_int_rate',
           'loan_percent_income', 'cb_person_cred_hist_length', 'person_home_ownership_MORTGAGE',
           'person_home_ownership_OTHER', 'person_home_ownership_OWN', 'person_home_ownership_RENT',
           'loan_intent_FREELANCE_AND_GIG_WORKERS', 'loan_intent_MINORITY_BUSINESS', 'loan_intent_SMALL_BUSINESS',
           'loan_intent_SMALL_FARMERS_AND_AGRICULTURE', 'loan_intent_WOMAN_ENTREPRENEUR',
           'cb_person_default_on_file_N', 'cb_person_default_on_file_Y', 'grade_0', 'grade_1',
           'grade_2', 'grade_3', 'grade_4', 'grade_5', 'grade_6']

# Create a few more synthetic customers
synthetic_customers = pd.DataFrame([
    # 1. Young freelancer with low income and high loan amount
    [22, 25000, 2, 10000, 12.5, 0.4, 2, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    # 2. Middle-aged entrepreneur with high income and low loan amount
    [38, 95000, 12, 5000, 9.5, 0.05, 12, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    # 3. Retired individual with moderate income and moderate loan amount
    [65, 45000, 35, 15000, 11.0, 0.33, 25, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    # 4. Young woman entrepreneur with moderate income and high loan amount
    [29, 55000, 5, 20000, 13.0, 0.36, 5, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
    # 5. Middle-aged minority business owner with high income and low loan amount
    [40, 80000, 18, 7000, 8.0, 0.09, 15, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    # 6. High default risk: Low income, high loan amount, short employment history, history of default
    [28, 30000, 1, 15000, 14.0, 0.5, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    # 7. High default risk: Low income, very high loan amount, poor credit history
    [35, 40000, 5, 25000, 18.0, 0.625, 3, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    # 8. High default risk: Moderate income, high loan amount, short credit history, high interest rate
    [45, 50000, 3, 20000, 19.0, 0.4, 4, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
    # 9. High default risk: High income but very high loan amount, history of default
    [50, 100000, 10, 50000, 22.0, 0.5, 15, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0]
], columns=columns)



xgb_model = XGBClassifier()
xgb_model.load_model('clf_xgb.json')
xgb_scalar = joblib.load('clf_xgb_scaler.save')

# Reshape and scale the new customers data for prediction
synthetic_customers_reshaped = synthetic_customers.values.astype(np.float32)
synthetic_customers_scaled = xgb_scalar.transform(synthetic_customers_reshaped)

# Predict the probability of default using the XGBClassifier
predictions_prob = xgb_model.predict_proba(synthetic_customers_scaled)

# Classify based on the threshold of 0.5
predictions_class = (predictions_prob[:, 1] > 0.5).astype('int64')

# Print the predictions
for i, (prediction_prob, prediction_class) in enumerate(zip(predictions_prob, predictions_class)):
    print(f"\nSynthetic customer {i+1}:")
    if prediction_class == 1:
        print("The model predicts that the customer will default.")
    else:
        print("The model predicts that the customer will not default.")
    print(f"Predicted probability of default: {prediction_prob[1]*100:0.2f}%")