#import panda as pd
import re
import jsonFunc as jFn
import nlpFunc as nlp


fileName = 'msg.json'

msgData = []
msgData = jFn.parseJson(fileName)

print(msgData)

jFn.jsonDump(msgData)

jFn.deleteFile()
