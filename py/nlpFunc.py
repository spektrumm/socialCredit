from flair.data import Sentence
from flair.models import TextClassifier
# flairNLP functions file


# initialize the chosen classifier to use with sentiment analysis feature of flair.
def classifierInit():
    classifier = TextClassifier.load("en-sentiment")
    return classifier


# provide a str (x), and the given classifier to be used with flair sentiment analysis.
def flairPrediction(x, classifier):
    sent = Sentence(x)
    classifier.predict(sent)
    score = sent.labels[0]

    # str(score) is formatted as such: <"this is a good example sentence text" -> POSITIVE (0.9999)>
    if "POSITIVE" in str(score):
        isoScore = sent.labels[0].score
        pOutScore = isoScore * 100
        print(f'{pOutScore} is the adjusted output score')  # debug
        return pOutScore
    elif "NEGATIVE" in str(score):
        isoScore = sent.labels[0].score
        nOutScore = isoScore * -100
        print(f'{nOutScore} is the adjusted output score')  # debug
        return nOutScore
    else:
        isoScore = sent.labels[0].score
        outScore = isoScore * 100
        print(f'{outScore} is the adjusted output score')  # debug
        print('neu')
        return outScore

        # 'else' neutral option doesn't really seem to get used all that often in scraping discord messages but always good to have this catch.
