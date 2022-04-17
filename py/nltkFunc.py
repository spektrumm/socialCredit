from nltk.sentiment import SentimentIntensityAnalyzer


def siaInit():
    sia = SentimentIntensityAnalyzer()
    return sia


sentAn = siaInit()

print(sentAn.polarity_scores(
    ""))


def vaderPredict(str, analyzer):
    score = analyzer.polarity_scores(str)

    if score['pos'] != 0.0:
        return score['pos']
