from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
import numpy as np
import pandas as pd
import joblib
from xgboost import XGBClassifier
from groq import Groq
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()


groq_api_key = os.getenv('GROQ_API_KEY')
client = Groq(
    api_key=groq_api_key,
)

def check_credit_score(user):
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

    # print(len(complete_case.keys()))
    # print(complete_case)

    model_path = './models/stacking_model_2.pkl'
    scaler_path = './models/stacking_model_scaler_2.pkl'

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
    print(f"The model predicts: {m[int(prediction[0])]}")

    return ({"value" :int(prediction[0]) , "meaning":m[int(prediction[0])]})

def check_default_probability(user):
    customers = [
        user
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
    xgb_model.load_model('./models/clf_xgb_final.json')
    xgb_scalar = joblib.load('./models/clf_xgb_scaler_final.save')

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
        res.append(float(prediction_prob[1]))
        print(f"Predicted probability of default: {float(prediction_prob[1])*100:0.2f}%")
    
    print(res)
    return ({"default_probability": res})


@app.route('/predict-default-probability', methods=['POST'])
def predict_default_probability():
    user_data = request.json
    result = check_default_probability(user_data)
    print("Probability of default:", result)  # Log the prediction result
    return jsonify(result)

@app.route('/predict-credit-score', methods=['POST'])
def predict_credit_score():
    user_data = request.json
    print("Received user data:", user_data)  # Log the input data
    result = check_credit_score(user_data)
    print("Credit Score:", result)  # Log the prediction result
    return jsonify(result)

@app.route('/check-loan-proposal', methods=['POST'])
def check_loan_proposal():
    data = request.json
    print(data)
    story_content = data["idea"]

    # # Check the success chances of the business idea using GROQ API
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Given below is a business idea a person wants to take a microloan against. Analyze the idea to see if there is a chance the business might fail and the person may not be able to pay back the loan. Give the idea a score out of 10 where, 1 means no risk of business failure at all, and 10 means the idea will definitely fail. Don't be too strict during the analysis. Be lenient during analysing the idea. The story is this:  {story_content}",
            }
        ],
        model="llama3-8b-8192",
    )
    
    print(chat_completion.choices[0].message.content)
    chat_completion2 = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Extract the score from here and give that as output. Dont put any words, just the numeric value of the default score from here: {chat_completion.choices[0].message.content}",
            }
        ],
        model="llama3-8b-8192",
    )
    
    print("Business Failure Risk: ", chat_completion2.choices[0].message.content.strip())
    result = float(chat_completion2.choices[0].message.content.strip())
    print(result)
        
    return ({"business_proposal_risk_score" : result})

def calculate_loan_approval_probability(credit_score, default_probability, business_proposal_risk_score):
    # Normalize the credit score meaning to a numerical value (e.g., Poor = 0, Standard = 1, Good = 2)
    credit_score_mapping = {'Poor': 0, 'Standard': 1, 'Good': 2}
    normalized_credit_score = credit_score_mapping.get(credit_score['meaning'], 0) / 2.0  # Normalize to [0, 1]

    # Extract the probability of default
    prob_default = default_probability['default_probability'][0]  # already in [0, 1]

    # Normalize the business proposal risk score to a [0, 1] range (assuming it's between 1 and 10)
    normalized_business_risk_score = float(business_proposal_risk_score['business_proposal_risk_score']) / 10.0

    # Calculate the loan approval probability
    loan_approval_probability = (
        0.35 * normalized_credit_score + 
        0.45 * (1 - prob_default) + 
        0.20 * (1 - normalized_business_risk_score)
    )

    return loan_approval_probability

@app.route('/calculate-loan-approval-probability', methods=['POST'])
def calculate_loan_approval():
    data = request.json
    credit_score = data['credit_score']
    default_probability = data['default_probability']
    business_proposal_risk_score = data['business_proposal_risk_score']

    loan_approval_probability = calculate_loan_approval_probability(
        credit_score, default_probability, business_proposal_risk_score
    )

    result = {
        'loan_approval_probability': loan_approval_probability
    }

    return jsonify(result)
    


if __name__ == '__main__':
    app.run(debug=True)



####  API CALL 1: /predict-credit-score ####

# curl -X POST -H "Content-Type: application/json" -d '{
#     "Age": 45,
#     "Annual_Income": 120000,
#     "Monthly_Inhand_Salary": 10000,
#     "Num_Bank_Accounts": 5,
#     "Num_Credit_Card": 8,
#     "Interest_Rate": 3,
#     "Num_of_Loan": 2,
#     "Delay_from_due_date": 0,
#     "Num_of_Delayed_Payment": 1,
#     "Changed_Credit_Limit": 5000,
#     "Num_Credit_Inquiries": 2,
#     "Credit_Mix": 1,
#     "Outstanding_Debt": 10000,
#     "Credit_Utilization_Ratio": 20,
#     "Credit_History_Age": 20,
#     "Total_EMI_per_month": 1500,
#     "Amount_invested_monthly": 2000,
#     "Monthly_Balance": 5000,
#     "Type_Of_Loan": "Personal Loan",
#     "Current_Month": "Month_May",
#     "Occupation": "Occupation_Architect",
#     "Payment_of_Min_Amount_Yes": 1,
#     "Payment_Behaviour": "High_spent_Medium_value_payments"
# }' http://127.0.0.1:5000/predict-credit-score

        # output = 
        # {
        # "meaning": "Standard",
        # "value": 1
        # }

# curl -X POST -H "Content-Type: application/json" -d "{
#         "Age": 45,
#         "Annual_Income": 120000,
#         'Monthly_Inhand_Salary': 10000,
#         'Num_Bank_Accounts': 5,
#         'Num_Credit_Card': 8,
#         'Interest_Rate': 3,
#         'Num_of_Loan': 2,
#         'Delay_from_due_date': 0,
#         'Num_of_Delayed_Payment': 1,
#         'Changed_Credit_Limit': 5000,
#         'Num_Credit_Inquiries': 2,
#         'Credit_Mix': 1,
#         'Outstanding_Debt': 10000,
#         'Credit_Utilization_Ratio': 20,
#         'Credit_History_Age': 20,
#         'Total_EMI_per_month': 1500,
#         'Amount_invested_monthly': 2000,
#         'Monthly_Balance': 5000,
#         'Type_Of_Loan': 'Personal Loan',
#         'Current_Month': 'Month_May',
#         'Occupation': 'Occupation_Architect',
#         'Payment_of_Min_Amount_Yes': 1,
#         'Payment_Behaviour': 'High_spent_Medium_value_payments'
# }" http://127.0.0.1:5000/predict-credit-score


####  API CALL 2: /predict-default-probability  ####

# curl -X POST -H "Content-Type: application/json" -d '{
#     "person_age": 22,
#     "person_income": 25000,
#     "person_emp_length": 2,
#     "loan_amnt": 10000,
#     "loan_int_rate": 12.5,
#     "loan_percent_income": 0.4,
#     "cb_person_cred_hist_length": 2,
#     "person_home_ownership": "person_home_ownership_MORTGAGE",
#     "loan_intent": "loan_intent_OTHERS",
#     "cb_person_default_on_file": "cb_person_default_on_file_N",
#     "loan_grade": "grade_0"
# }' http://127.0.0.1:5000/predict-default-probability

        # output = 
        # {
        # "default_probability": [
        #     0.2621043622493744
        # ]
        # }

# curl -X POST -H "Content-Type: application/json" -d '{
#     "person_age": 50,
#     "person_income": 100000,
#     "person_emp_length": 10,
#     "loan_amnt": 50000,
#     "loan_int_rate": 22.0,
#     "loan_percent_income": 0.5,
#     "cb_person_cred_hist_length": 15,
#     "person_home_ownership": "person_home_ownership_MORTGAGE",
#     "loan_intent": "loan_intent_OTHERS",
#     "cb_person_default_on_file": "cb_person_default_on_file_Y",
#     "loan_grade": "grade_1"
# }' http://127.0.0.1:5000/predict-default-probability


####  API CALL 3: /check-loan-proposal  ####

# curl -X POST http://127.0.0.1:5000/check-loan-proposal -H "Content-Type: application/json" -d '{
#     "idea": "Imagine starting a business that installs and operates payphone booths in urban and rural areas. These booths would provide public telephones for people who need to make calls but do not have access to a mobile phone. The business would charge per minute for calls, and the booths would be placed in high-traffic areas such as shopping centers, parks, and transportation hubs. The goal is to offer a convenient communication solution for individuals who need to make quick calls without relying on their own devices."
# }'

        # output =
            # {
            # "business_proposal_risk_score": 6.0
            # }
        
 
####  API CALL 4: /calculate-loan-approval-probability  ####       
            
# curl -X POST -H "Content-Type: application/json" -d '{
#     "credit_score": {
#         "meaning": "Standard",
#         "value": 1
#     },
#     "default_probability": {
#         "default_probability": [0.2621043622493744]
#     },
#     "business_proposal_risk_score": {
#         "business_proposal_risk_score": 6.0
#     }
# }' http://127.0.0.1:5000/calculate-loan-approval-probability

        # output = 
        # {
        # "loan_approval_probability": 0.5870530369877816
        # }
