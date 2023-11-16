from flask import Flask, request, jsonify
from sklearn.ensemble import BaggingClassifier
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from flask_cors import CORS

import warnings

app = Flask(__name__)
CORS(app)
df=pd.read_csv("transformed_CVD_Data.csv")
y=df['cardio']
x=df.drop(['cardio'],axis=1)
xtr,xts,ytr,yts=train_test_split(x,y,test_size=0.25,random_state=23,stratify=y)
XGBClassifierPipeline=Pipeline([('scaler', StandardScaler()),
                      ('model', XGBClassifier( gamma= 4.198875359789924, max_depth= 17, min_child_weight= 1, reg_alpha= 57))])
bgc = BaggingClassifier(XGBClassifierPipeline,max_samples=0.5, max_features=0.5)
bgc.fit(xtr,ytr)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = [data['age'], data['gender'], data['height'], data['weight'], data['ap_hi'], data['ap_lo'],
                    data['cholesterol'], data['gluc'], data['smoke'], data['alco'], data['active']]
        prediction = bgc.predict([features])
        return jsonify({'prediction': int(prediction[0])})  # Convert numpy int64 to Python int
    except Exception as e:
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)