from fileinput import filename
from flair.data import Sentence
from flair.models import TextClassifier
#from segtok.segmenter import split_single


def classifierInit():
    classifier = TextClassifier.load("en-sentiment")
    return classifier


def flairPrediction(x, classifier):
    sent = Sentence(x)
    classifier.predict(sent)
    score = sent.labels[0]
    if "POSITIVE" in str(score):
        isoScore = sent.labels[0].score
        pOutScore = isoScore * 100
        print(f'{pOutScore} is the adjusted output score')
        return pOutScore
    elif "NEGATIVE" in str(score):
        isoScore = sent.labels[0].score
        nOutScore = isoScore * -100
        print(f'{nOutScore} is the adjusted output score')
        return nOutScore
    else:
        isoScore = sent.labels[0].score
        outScore = isoScore * 100
        print(f'{outScore} is the adjusted output score')
        print('neu')
        return outScore
