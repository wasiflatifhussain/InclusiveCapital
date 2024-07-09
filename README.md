# InclusiveCapital

<img src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/ca58e377-a173-4263-a66e-652256eb5954" alt="favicon" width="300"/>

InclusiveCapital is an innovative platform designed to help underrepresented groups such as women entrepreneurs, small farmers and agriculture, minority businesses, small businesses, and freelance and gig workers check their eligibility for receiving microloans. The platform leverages advanced machine learning models to predict the likelihood of loan approval, providing crucial insights to individuals who typically face difficulties in securing funding.

## Features

- **🔍 Credit Score Prediction**: Uses a stacking model to predict the user's credit score.
- **📉 Probability of Default**: Utilizes an XGBoost classifier model optimized with grid search and cross-validation to estimate the probability of default.
- **📊 Business Proposal Evaluation**: Analyzes the business proposal using the Groq API to provide a business proposal risk score.
- **✅ Loan Approval Probability**: Combines the credit score, probability of default, and business proposal risk score to determine the probability of loan approval.

## Loan Approval Probability Calculation

### Approach

1. **Weight Distribution for Loan Approval Calculation**

    ##### Weights:
    - **💳 Credit Score**: 35% - Reflects the applicant's historical financial behavior.
    - **📉 Probability of Default**: 45% - Maintains a strong emphasis on the likelihood of the applicant defaulting.
    - **📊 Business Proposal Risk Score**: 20% - Considers the potential risk of the business failing.
    
    #### Justification:
    - **💳 Credit Score (35%)**: This weight ensures that the applicant's past financial behavior is given significant consideration, as a person with good creditworthiness shows a habit of paying back in time.
    - **📉 Probability of Default (45%)**: The highest weight, as it directly affects the risk of not recovering the loan amount.
    - **📊 Business Proposal Risk Score (20%)**: While important, the risk of the business failing is slightly less critical compared to the direct probability of loan default, as the person may be able to pay back the loan from elsewhere also.

2. **Normalize the Scores:**
   - **💳 Credit Score**: Poor = 0, Standard = 0.5, Good = 1
   - **📉 Probability of Default**: Use the value directly (0 to 1)
   - **📊 Business Proposal Risk Score**: Normalize to a 0-1 scale (0 = 10, 1 = 0)

3. **Calculate the Weighted Sum:**
   - Combine the normalized scores using the assigned weights.

### Formula

Loan Approval Probability = (0.35 × Normalized Credit Score) + (0.45 × (1 - Probability of Default)) + (0.2 × Normalized Business Proposal Risk Score)

## AI Models Used

### Credit Score Prediction

For predicting the credit score, we use a **stacking model**. This model is trained on a vast dataset of 100,000 data points to ensure accuracy and reliability. The stacking model combines multiple machine learning algorithms to improve prediction performance, leveraging the strengths of each algorithm to provide a more accurate and robust credit score.

The specific classifiers used in our stacking model are:

- **BaggingClassifier**
- **ExtraTreesClassifier** with a maximum depth of 10
- **RandomForestClassifier**
- **HistGradientBoostingClassifier**
- **XGBClassifier**

This ensemble approach ensures robustness and accuracy. The model is trained on a vast dataset of 100,000 data points to ensure precision and reliability in predicting the user's credit score.


### Loan-Default Probability Calculation

To estimate the probability of loan default, we employ an **XGBoost model**. This model is optimized using cross-validation and grid search to find the best parameters, ensuring the most accurate model output. Like the credit scoring model, it is also trained on around 100,000 data points. XGBoost is known for its high performance and efficiency in machine learning tasks, making it an excellent choice for predicting loan default probability.

### Business Proposal Evaluation

For evaluating business proposals, we utilize **Llama-3b**, a powerful AI model. This model analyzes the business idea, assesses its strengths and weaknesses, and provides a risk score out of 10. The Llama-3b model leverages state-of-the-art natural language processing techniques to deliver comprehensive analyses, helping to identify the potential risks and benefits of a business proposal.

### Loan Approval Probability Calculation

The probability of loan approval is determined by combining the results from the above models. We use the following weighted formula to calculate the loan approval probability:
```
Loan Approval Probability = (0.35 × Normalized Credit Score) + (0.45 × (1 - Probability of Default)) + (0.2 × Normalized Business Proposal Risk Score)
```


## Technologies Used

- **💻 Frontend**: 
  - [Material Tailwind](https://www.material-tailwind.com/)
  - [Heroicons](https://heroicons.com/)
  - [Next.js](https://nextjs.org/)

- **⚙️ Backend**: 
  - [Flask](https://flask.palletsprojects.com/)
  - AI models using various machine learning libraries

## Setup and Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/InclusiveCapital.git
    cd InclusiveCapital
    ```

2. **Install frontend dependencies:**
    ```sh
    cd frontend
    npm install
    ```

3. **Install backend dependencies:**
    ```sh
    cd flask-backend
    pip install -r requirements.txt
    ```

4. **Run the application:**

    **Frontend:**
    ```sh
    cd frontend
    npm run dev
    ```

    **Backend:**
    ```sh
    cd flask-backend
    python3 app.py
    ```

## Usage

1. **Navigate to the frontend URL:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Use the platform:**
   - 💳 Check your credit score.
   - 📉 Estimate the probability of loan default.
   - 📊 Evaluate your business proposal.
   - ✅ Calculate your loan approval probability.
  
## 📸 Samples of the Interface
<img width="1470" alt="1" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/a46a0a7e-2523-4852-b5e7-6042ca302168">
<img width="1470" alt="2" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/4d5e1ae8-06e8-46da-a3e8-ad949034bce0">
<img width="1470" alt="3" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/4b379430-a1d7-4e99-bd87-f9508f7d5e5b">
<img width="1470" alt="4" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/832a114c-9788-4bfd-affc-51a6bb028a03">
<img width="1470" alt="5" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/1decf136-2429-4de2-b2bb-676ec48fd880">
<img width="1470" alt="6" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/6b6b76b9-1c8e-4059-926b-53c7ee4f68f7">
<img width="1470" alt="7" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/fb0324fa-2d0f-4825-a608-995dae74e83e">
<img width="1470" alt="8" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/48393679-3f5c-42ca-b940-24a6380e3542">
<img width="1470" alt="9" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/1f040eff-0c2b-468d-844f-823eb215858c">
<img width="1470" alt="10" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/693c7ecb-2e24-4f17-ad8b-c84b3187d249">
<img width="1470" alt="11" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/cb11690a-cc7d-4ad4-98c8-2279619b51f3">
<img width="1470" alt="12" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/d1ff6f6e-8d60-4267-bfbe-4a2918ad35b2">
<img width="1470" alt="13" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/c5e239ba-f97b-44be-986f-98c769a8a9f4">
<img width="1470" alt="15" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/f515ad0d-e618-4b4e-bc00-33823fa1eaa0">
<img width="1470" alt="16" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/4a9833bc-518f-425a-a27b-77fb873a1b73">
<img width="1470" alt="17" src="https://github.com/wasiflatifhussain/InclusiveCapital/assets/86021138/8895cc0d-a237-4017-8536-fb4e9a723c18">



