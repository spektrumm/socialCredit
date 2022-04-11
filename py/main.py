
from fileinput import filename
from flair.data import Sentence
from flair.models import TextClassifier
from segtok.segmenter import split_single
#import panda as pd
import re
import functions as fn
import json

#classifier = TextClassifier.load("en-sentiment")


fileName = 'msg.json'

msgData = []
msgData = fn.parseJson(fileName)

print(msgData)
