from fileinput import filename
from flair.data import Sentence
from flair.models import TextClassifier
from segtok.segmenter import split_single


def classifierInit():
    classifier = TextClassifier.load("en-sentiment")
    return classifier


def flairPrediction(x, classifier):
    sent = Sentence(x)
    classifier.predict(sent)
    score = sent.labels[0]
    if "POSITIVE" in str(score):
        return "pos"
    elif "NEGATIVE" in str(score):
        return "neg"
    else:
        return "neu"
