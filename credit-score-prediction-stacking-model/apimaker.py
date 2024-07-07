import pandas as pd
import numpy as np
import joblib
import os

def check_credit_score():
    user = {
        "Age": 45,
        "Annual_Income": 120000,
        'Monthly_Inhand_Salary': 10000,
        'Num_Bank_Accounts': 5,
        'Num_Credit_Card': 8,
        'Interest_Rate': 3,
        'Num_of_Loan': 2,
        'Delay_from_due_date': 0,
        'Num_of_Delayed_Payment': 1,
        'Changed_Credit_Limit': 5000,
        'Num_Credit_Inquiries': 2,
        'Credit_Mix': 1,
        'Outstanding_Debt': 10000,
        'Credit_Utilization_Ratio': 20,
        'Credit_History_Age': 20,
        'Total_EMI_per_month': 1500,
        'Amount_invested_monthly': 2000,
        'Monthly_Balance': 5000,
        'Type_Of_Loan': 'Personal Loan',
        'Current_Month': 'Month_May',
        'Occupation': 'Occupation_Architect',
        'Payment_of_Min_Amount_Yes': 1,
        'Payment_Behaviour': 'High_spent_Medium_value_payments'
    }

    legend = {
        'Type_Of_Loan': [
            'Credit-Builder Loan', 'Personal Loan', 'Debt Consolidation Loan',
            'Student Loan', 'Payday Loan', 'Mortgage Loan', 'Auto Loan', 'Home Equity Loan'
        ],
        'Current_Month': [
            'Month_January', 'Month_February', 'Month_March',
            'Month_May', 'Month_June', 'Month_July', 'Month_August', 
            'Month_September', 'Month_October', 'Month_November', 'Month_December'
        ],
        'Occupation': [
            'Occupation_Architect', 'Occupation_Developer', 'Occupation_Doctor',
            'Occupation_Engineer', 'Occupation_Entrepreneur', 'Occupation_Journalist',
            'Occupation_Lawyer', 'Occupation_Manager', 'Occupation_Mechanic',
            'Occupation_Media_Manager', 'Occupation_Musician', 'Occupation_Scientist',
            'Occupation_Teacher', 'Occupation_Writer', 'Occupation_Others'
        ],
        'Payment_Behaviour': [
            'Payment_Behaviour_High_spent_Medium_value_payments',
            'Payment_Behaviour_High_spent_Small_value_payments',
            'Payment_Behaviour_Low_spent_Large_value_payments',
            'Payment_Behaviour_Low_spent_Medium_value_payments',
            'Payment_Behaviour_Low_spent_Small_value_payments',
            'Payment_Behaviour_Medium_spent_Medium_value_payments'
        ]
    }

    complete_case = {**user}

    for loan_type in legend['Type_Of_Loan']:
        complete_case[loan_type] = 1.0 if loan_type == user['Type_Of_Loan'] else 0.0

    for month in legend['Current_Month']:
        complete_case[month] = 1 if month == f"Month_{user['Current_Month']}" else 0

    for occupation in legend['Occupation']:
        complete_case[occupation] = 1 if occupation == f"Occupation_{user['Occupation']}" else 0

    for behavior in legend['Payment_Behaviour']:
        complete_case[behavior] = 1 if behavior == f"Payment_Behaviour_{user['Payment_Behaviour']}" else 0


    del complete_case['Type_Of_Loan']
    del complete_case['Current_Month']
    del complete_case['Occupation']
    del complete_case['Payment_Behaviour']

    print(len(complete_case.keys()))
    print(complete_case)


    model_path = './stacking_model_2.pkl'
    scaler_path = './stacking_model_scaler_2.pkl'

    if not os.path.exists(model_path):
        print(f"Error: {model_path} does not exist.")
        return

    if not os.path.exists(scaler_path):
        print(f"Error: {scaler_path} does not exist.")
        return

    stacking_model = joblib.load(model_path)
    stacking_scalar = joblib.load(scaler_path)

    case_df = pd.DataFrame([complete_case])

    expected_features = [
        'Age', 'Annual_Income', 'Monthly_Inhand_Salary', 'Num_Bank_Accounts',
        'Num_Credit_Card', 'Interest_Rate', 'Num_of_Loan', 'Delay_from_due_date',
        'Num_of_Delayed_Payment', 'Changed_Credit_Limit', 'Num_Credit_Inquiries',
        'Credit_Mix', 'Outstanding_Debt', 'Credit_Utilization_Ratio',
        'Credit_History_Age', 'Total_EMI_per_month', 'Amount_invested_monthly',
        'Monthly_Balance', 'Credit-Builder Loan', 'Personal Loan',
        'Debt Consolidation Loan', 'Student Loan', 'Payday Loan', 'Mortgage Loan',
        'Auto Loan', 'Home Equity Loan', 'Month_January', 'Month_February',
        'Month_March', 'Month_May', 'Month_June', 'Month_July', 
        'Month_August', 'Month_September', 'Month_October', 'Month_November',
        'Month_December', 'Occupation_Architect', 'Occupation_Developer', 
        'Occupation_Doctor', 'Occupation_Engineer', 'Occupation_Entrepreneur', 
        'Occupation_Journalist', 'Occupation_Lawyer', 'Occupation_Manager', 
        'Occupation_Mechanic', 'Occupation_Media_Manager', 'Occupation_Musician', 
        'Occupation_Scientist', 'Occupation_Teacher', 'Occupation_Writer',
        'Occupation_Others', 'Payment_of_Min_Amount_Yes',
        'Payment_Behaviour_High_spent_Medium_value_payments',
        'Payment_Behaviour_High_spent_Small_value_payments',
        'Payment_Behaviour_Low_spent_Large_value_payments',
        'Payment_Behaviour_Low_spent_Medium_value_payments',
        'Payment_Behaviour_Low_spent_Small_value_payments',
        'Payment_Behaviour_Medium_spent_Medium_value_payments'
    ]

    # Ensure the columns are in the correct order
    case_df = case_df[expected_features]

    # Transform the input data using the saved scaler
    case_transformed = stacking_scalar.transform(case_df)

    # Make a prediction
    prediction = stacking_model.predict(case_transformed)
    m = {
        0: "Poor",
        1: "Standard",
        2: "Good"
    }
    print(f"The model predicts: {m[prediction[0]]}")

    return ({"value" :prediction[0] , "meaning":m[prediction[0]]})


check_credit_score()