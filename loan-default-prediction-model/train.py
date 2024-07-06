import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore")
from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split, KFold
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping

def load_and_preprocess_data(file_path):
    df = pd.read_csv(file_path)

    # Calculate the median of 'person_emp_length' excluding the values 123
    median_emp_length = df[df['person_emp_length'] != 123]['person_emp_length'].median()

    # Fill in NaN with the median employment length
    df['person_emp_length'] = df['person_emp_length'].fillna(median_emp_length)
    df['person_emp_length'] = df['person_emp_length'].replace({123: median_emp_length})
    df['loan_int_rate'] = df['loan_int_rate'].fillna(df['loan_int_rate'].mean())

    # Convert 'business_proposal_analysis' to dummy variables
    business_proposal_dummies = pd.get_dummies(df['business_proposal_analysis'], prefix='business_proposal')
    df = pd.concat([df, business_proposal_dummies], axis=1)
    df.drop(['business_proposal_analysis'], axis=1, inplace=True)

    # Convert specified features to dummy variables
    dummies_list = ['person_home_ownership', 'loan_intent', 'cb_person_default_on_file']
    dummies = pd.get_dummies(df[dummies_list], drop_first=True)
    df = pd.concat([df.drop(dummies_list, axis=1), dummies], axis=1)

    # Define the order of categories for loan_grade
    grades = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    ordinal_encoder = OrdinalEncoder(categories=[grades])
    df['loan_grade_ordinal'] = ordinal_encoder.fit_transform(df[['loan_grade']])

    onehot_encoder = OneHotEncoder(sparse=False)
    loan_grade_dummies = onehot_encoder.fit_transform(df[['loan_grade_ordinal']])
    loan_grade_dummies_df = pd.DataFrame(loan_grade_dummies, columns=[f'grade_{int(i)}' for i in range(loan_grade_dummies.shape[1])])
    df = pd.concat([df, loan_grade_dummies_df], axis=1)
    df.drop(['loan_grade', 'loan_grade_ordinal'], axis=1, inplace=True)

    # Filter out rows where person_age > 80
    df = df[df['person_age'] <= 80]

    return df

def build_model(input_dim):
    model = Sequential()
    model.add(Dense(23, activation='relu', kernel_regularizer=l2(0.01), input_dim=input_dim))
    model.add(Dropout(0.2))
    model.add(Dense(12, activation='relu', kernel_regularizer=l2(0.01)))
    model.add(Dropout(0.2))
    model.add(Dense(6, activation='relu', kernel_regularizer=l2(0.01)))
    model.add(Dropout(0.2))
    model.add(Dense(units=1, activation='sigmoid'))
    model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
    return model

def cross_validate_model(X, y, n_splits=5):
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=101)
    val_accuracies = []

    for train_index, val_index in kf.split(X):
        X_train, X_val = X[train_index], X[val_index]
        y_train, y_val = y[train_index], y[val_index]

        scaler = MinMaxScaler()
        X_train = scaler.fit_transform(X_train)
        X_val = scaler.transform(X_val)

        model = build_model(X_train.shape[1])
        early_stop = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=25)

        model.fit(x=X_train, y=y_train, epochs=600, validation_data=(X_val, y_val),
                  callbacks=[early_stop], verbose=0)

        val_loss, val_acc = model.evaluate(X_val, y_val, verbose=0)
        val_accuracies.append(val_acc)

    print(f"Validation accuracies from cross-validation: {val_accuracies}")
    print(f"Mean validation accuracy: {np.mean(val_accuracies)}")

def train_final_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=101, stratify=y)

    scaler = MinMaxScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    final_model = build_model(X_train.shape[1])
    early_stop = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=25)

    final_model.fit(x=X_train, y=y_train, epochs=600, validation_data=(X_test, y_test),
                    callbacks=[early_stop], verbose=1)

    final_loss, final_acc = final_model.evaluate(X_test, y_test, verbose=0)
    print(f"Final model validation accuracy: {final_acc}")

    final_model.save('final_model.keras')
    return final_model

def main():
    file_path = './credit_risk_dataset_with_analysis_advanced_4.csv'
    df = load_and_preprocess_data(file_path)

    X = df.drop('loan_status', axis=1).values
    y = df['loan_status'].values

    cross_validate_model(X, y)
    train_final_model(X, y)

if __name__ == "__main__":
    main()
