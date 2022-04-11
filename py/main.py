#import panda as pd
import re
import jsonFunc as jFn
import nlpFunc as nlp

# initialize the flair classifier
sentAn = nlp.classifierInit()

# grab msg and parse for specific data
fileName = 'msg.json'  # temp
msgData = []
msgData = jFn.parseJson(fileName)

print(msgData)  # debug

# pull score from msg data
msgContent = msgData[0]
predictScore = nlp.flairPrediction(msgContent, sentAn)
outList = [str(predictScore), msgData[1], msgData[2]]

print(outList)  # debug

jFn.jsonDump(outList)

jFn.deleteFile()
