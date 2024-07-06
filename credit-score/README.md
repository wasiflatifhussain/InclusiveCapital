Prepare a model that can predict the credit score for the customer as it plays a vital role in their chances of receiving microloans.

### Insights from exploratory data analysis:

#### Issues with this dataset:
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

#### Apply oversampling
    - As our data is not fully balanced, we intend to use oversampling to balance it out as much as possible using SMOTE
    - SMOTE (Synthetic Minority Over-sampling Technique) is a popular method used to address class imbalance in datasets, particularly in the context of binary classification problems.

#### Handling Numerical
    - Using Power transformer to avoid Data Skewness
    - The PowerTransformer is a tool in scikit-learn used to apply power transformations to numerical data to stabilize variance and make the data more Gaussian-like (i.e., normally distributed)

#### Model Training
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
