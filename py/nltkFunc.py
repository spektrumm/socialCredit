from nltk.sentiment import SentimentIntensityAnalyzer


def siaInit():
    sia = SentimentIntensityAnalyzer()
    return sia


def vaderPredict(str, analyzer):
    score = analyzer.polarity_scores(str)
    rawScore = score['compound']
    calcScore = rawScore * 100
    print(f'raw score is {rawScore}')

    return calcScore
