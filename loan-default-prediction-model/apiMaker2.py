import numpy as np
import pandas as pd
import joblib
from xgboost import XGBClassifier

def check_default_probability():
    # Define customer data
    customers = [
        {
            'person_age': 22,
            'person_income': 25000,
            'person_emp_length': 2,
            'loan_amnt': 10000,
            'loan_int_rate': 12.5,
            'loan_percent_income': 0.4,
            'cb_person_cred_hist_length': 2,
            'person_home_ownership': 'person_home_ownership_MORTGAGE',
            'loan_intent': 'loan_intent_OTHERS',
            'cb_person_default_on_file': 'cb_person_default_on_file_N',
            'loan_grade': 'grade_0'
        },
        {
            'person_age': 38,
            'person_income': 95000,
            'person_emp_length': 12,
            'loan_amnt': 5000,
            'loan_int_rate': 9.5,
            'loan_percent_income': 0.05,
            'cb_person_cred_hist_length': 12,
            'person_home_ownership': 'person_home_ownership_OWN',
            'loan_intent': 'loan_intent_SMALL_BUSINESS',
            'cb_person_default_on_file': 'cb_person_default_on_file_N',
            'loan_grade': 'grade_1'
        },
        {
            'person_age': 65,
            'person_income': 45000,
            'person_emp_length': 35,
            'loan_amnt': 15000,
            'loan_int_rate': 11.0,
            'loan_percent_income': 0.33,
            'cb_person_cred_hist_length': 25,
            'person_home_ownership': 'person_home_ownership_RENT',
            'loan_intent': 'loan_intent_OTHERS',
            'cb_person_default_on_file': 'cb_person_default_on_file_N',
            'loan_grade': 'grade_2'
        },
        {
            'person_age': 29,
            'person_income': 55000,
            'person_emp_length': 5,
            'loan_amnt': 20000,
            'loan_int_rate': 13.0,
            'loan_percent_income': 0.36,
            'cb_person_cred_hist_length': 5,
            'person_home_ownership': 'person_home_ownership_MORTGAGE',
            'loan_intent': 'loan_intent_WOMAN_ENTREPRENEUR',
            'cb_person_default_on_file': 'cb_person_default_on_file_N',
            'loan_grade': 'grade_3'
        },
        {
            'person_age': 40,
            'person_income': 80000,
            'person_emp_length': 18,
            'loan_amnt': 7000,
            'loan_int_rate': 8.0,
            'loan_percent_income': 0.09,
            'cb_person_cred_hist_length': 15,
            'person_home_ownership': 'person_home_ownership_MORTGAGE',
            'loan_intent': 'loan_intent_MINORITY_BUSINESS',
            'cb_person_default_on_file': 'cb_person_default_on_file_N',
            'loan_grade': 'grade_4'
        },
        {
            'person_age': 28,
            'person_income': 30000,
            'person_emp_length': 1,
            'loan_amnt': 15000,
            'loan_int_rate': 14.0,
            'loan_percent_income': 0.5,
            'cb_person_cred_hist_length': 2,
            'person_home_ownership': 'person_home_ownership_RENT',
            'loan_intent': 'loan_intent_OTHERS',
            'cb_person_default_on_file': 'cb_person_default_on_file_Y',
            'loan_grade': 'grade_0'
        },
        {
            'person_age': 35,
            'person_income': 40000,
            'person_emp_length': 5,
            'loan_amnt': 25000,
            'loan_int_rate': 18.0,
            'loan_percent_income': 0.625,
            'cb_person_cred_hist_length': 3,
            'person_home_ownership': 'person_home_ownership_OWN',
            'loan_intent': 'loan_intent_OTHERS',
            'cb_person_default_on_file': 'cb_person_default_on_file_Y',
            'loan_grade': 'grade_1'
        },
        {
            'person_age': 45,
            'person_income': 50000,
            'person_emp_length': 3,
            'loan_amnt': 20000,
            'loan_int_rate': 19.0,
            'loan_percent_income': 0.4,
            'cb_person_cred_hist_length': 4,
            'person_home_ownership': 'person_home_ownership_RENT',
            'loan_intent': 'loan_intent_OTHERS',
            'cb_person_default_on_file': 'cb_person_default_on_file_Y',
            'loan_grade': 'grade_2'
        },
        {
            'person_age': 50,
            'person_income': 100000,
            'person_emp_length': 10,
            'loan_amnt': 50000,
            'loan_int_rate': 22.0,
            'loan_percent_income': 0.5,
            'cb_person_cred_hist_length': 15,
            'person_home_ownership': 'person_home_ownership_MORTGAGE',
            'loan_intent': 'loan_intent_OTHERS',
            'cb_person_default_on_file': 'cb_person_default_on_file_Y',
            'loan_grade': 'grade_1'
        }
    ]

    # Define the legend
    legend = {
        'person_home_ownership': [
            'person_home_ownership_MORTGAGE', 'person_home_ownership_OTHER', 'person_home_ownership_OWN', 'person_home_ownership_RENT'
        ],
        'loan_intent': [
            'loan_intent_FREELANCE_AND_GIG_WORKERS', 'loan_intent_MINORITY_BUSINESS', 'loan_intent_OTHERS', 
            'loan_intent_SMALL_BUSINESS','loan_intent_SMALL_FARMERS_AND_AGRICULTURE', 'loan_intent_WOMAN_ENTREPRENEUR'
        ],
        'cb_person_default_on_file': [
            'cb_person_default_on_file_N', 'cb_person_default_on_file_Y'
        ],
        'loan_grade': [
            'grade_0', 'grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5', 'grade_6'
        ]
    }

    # Columns of the final DataFrame
    columns = ['person_age', 'person_income', 'person_emp_length', 'loan_amnt', 'loan_int_rate',
               'loan_percent_income', 'cb_person_cred_hist_length', 'person_home_ownership_MORTGAGE', 
               'person_home_ownership_OTHER', 'person_home_ownership_OWN', 'person_home_ownership_RENT', 
               'loan_intent_FREELANCE_AND_GIG_WORKERS', 'loan_intent_MINORITY_BUSINESS', 'loan_intent_OTHERS', 
               'loan_intent_SMALL_BUSINESS', 'loan_intent_SMALL_FARMERS_AND_AGRICULTURE', 'loan_intent_WOMAN_ENTREPRENEUR',
               'cb_person_default_on_file_N', 'cb_person_default_on_file_Y', 'grade_0', 'grade_1', 
               'grade_2', 'grade_3', 'grade_4', 'grade_5', 'grade_6']

    # Process customer data
    complete_customers = []
    for customer in customers:
        complete_customer = {**customer}
        
        for home_ownership in legend['person_home_ownership']:
            complete_customer[home_ownership] = 1 if home_ownership == customer['person_home_ownership'] else 0
        
        for intent in legend['loan_intent']:
            complete_customer[intent] = 1 if intent == customer['loan_intent'] else 0
        
        for default in legend['cb_person_default_on_file']:
            complete_customer[default] = 1 if default == customer['cb_person_default_on_file'] else 0
        
        for grade in legend['loan_grade']:
            complete_customer[grade] = 1 if grade == customer['loan_grade'] else 0
        
        del complete_customer['person_home_ownership']
        del complete_customer['loan_intent']
        del complete_customer['cb_person_default_on_file']
        del complete_customer['loan_grade']
        
        complete_customers.append(complete_customer)

    # Convert to DataFrame
    synthetic_customers = pd.DataFrame(complete_customers)

    # Ensure all expected columns are present
    for col in columns:
        if col not in synthetic_customers.columns:
            synthetic_customers[col] = 0

    synthetic_customers = synthetic_customers[columns]

    xgb_model = XGBClassifier()
    xgb_model.load_model('clf_xgb_final.json')
    xgb_scalar = joblib.load('clf_xgb_scaler_final.save')

    # Reshape and scale the new customers data for prediction
    synthetic_customers_reshaped = synthetic_customers.values.astype(np.float32)
    synthetic_customers_scaled = xgb_scalar.transform(synthetic_customers_reshaped)

    # Predict the probability of default using the XGBClassifier
    predictions_prob = xgb_model.predict_proba(synthetic_customers_scaled)

    # Classify based on the threshold of 0.5
    predictions_class = (predictions_prob[:, 1] > 0.5).astype('int64')

    res = []
    # Print the predictions
    for i, (prediction_prob, prediction_class) in enumerate(zip(predictions_prob, predictions_class)):
        print(f"\nSynthetic customer {i+1}:")
        res.append(prediction_prob[1])
        print(f"Predicted probability of default: {prediction_prob[1]*100:0.2f}%")
    
    print(res)
    return ({"default_probability": res})

check_default_probability()
