import warnings
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import joblib
from flask import Flask, request, jsonify
from sklearn.ensemble import BaggingClassifier
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from flask_cors import CORS
import base64
import soundfile
from PersonalAssistant.convert_audio import ConvertAudio
# from PersonalAssistant.speach_to_text import Stt
import os
import io
from werkzeug.utils import secure_filename
import wave
import numpy as np
import speech_recognition as sr

from pydub import AudioSegment
import subprocess

from transformers import BartForSequenceClassification, Trainer, TrainingArguments, EvalPrediction, pipeline, BartTokenizerFast

tokenizer = BartTokenizerFast.from_pretrained('facebook/bart-large-mnli')

loadtrainer = BartForSequenceClassification.from_pretrained('./model/')
classifier = pipeline("zero-shot-classification",
                      model=loadtrainer, tokenizer=tokenizer, device=0)
id2labels = ['food', 'others', 'restroom', 'water']


# model = Stt('small', '.en')


app = Flask(__name__)


CORS(app)
# df=pd.read_csv("transformed_CVD_Data.csv")
# y=df['cardio']
# x=df.drop(['cardio'],axis=1)
# xtr,xts,ytr,yts=train_test_split(x,y,test_size=0.25,random_state=23,stratify=y)
# XGBClassifierPipeline=Pipeline([('scaler', StandardScaler()),
#                       ('model', XGBClassifier( gamma= 4.198875359789924, max_depth= 17, min_child_weight= 1, reg_alpha= 57))])
# bgc = BaggingClassifier(XGBClassifierPipeline,max_samples=0.5, max_features=0.5)
# bgc.fit(xtr,ytr)
svm_model = joblib.load("./machine_learning_backend/ML_Models/model.pkl")

r = sr.Recognizer()


def audio_processing(path):
    with sr.AudioFile(path) as source:
        # listen for the data (load audio to memory)
        audio_data = r.record(source)
        # recognize (convert from speech to text)
        text = r.recognize_google(audio_data)
        result = classifier(text, id2labels, multi_label=False)

    return (text, result['labels'][0])


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = [data['age'], data['gender'], data['height'], data['weight'], data['ap_hi'], data['ap_lo'],
                    data['cholesterol'], data['gluc'], data['smoke'], data['alco'], data['active']]
        prediction = svm_model.predict([features])
        threshold = 0.8
        probability = svm_model.predict_proba([features])
        if probability[0][prediction][0] >= threshold and prediction[0] == 1:
            classification_result = "High chances for cardiovascular disorder"
        else:
            classification_result = "Less chances for cardiovascular disorder"

        # Convert numpy int64 to Python int
        return jsonify({'prediction': int(prediction[0]), 'probability': float(probability[0][prediction][0]), 'classification': classification_result})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/audio', methods=['POST', 'GET'])
def audio():
    audio_wav = None
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['file']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join("./", filename)
            file.save(file_path)

            # Read the saved audio file
            try:
                text, result = audio_processing(file_path)
                return jsonify({"text": text, "label": result}), 200
            except Exception as e:
                return jsonify({'error': str(e)})


@app.route('/response', methods=['POST'])
def symptoms():
    try:
        data = request.get_json()

        # Convert numpy int64 to Python int
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)
