import json
from flair.data import Sentence
from flair.models import TextClassifier

sia = TextClassifier.load("en-sentiment")


def flairPrediction(x):
    sent = Sentence(x)
    sia.predict(sent)
    score = sent.labels[0]
    if "POSITIVE" in str(score):
        return "pos"
    elif "NEGATIVE" in str(score):
        return "neg"
    else:
        return "neu"


with open("msg.json", 'r') as jsonFile:
    data = json.load(jsonFile)

    tempC = data['content']
    msgContent = tempC[1:-1]
    print(msgContent)
