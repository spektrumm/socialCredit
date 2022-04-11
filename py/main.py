#import panda as pd
import re
import jsonFunc as jFn
import nlpFunc as nlp
import helper as h
import os
import time

# initialize the flair classifier
sentAn = nlp.classifierInit()
dir = 'tempJson'


# main loop
while True:
    if len(os.listdir(path=dir)) != 0:
        print('new file found')
        data = h.prepData()

        predictScore = nlp.flairPrediction(data[0], sentAn)
        outList = [str(predictScore), data[1], data[2]]

        h.fileIO(outList)
    else:
        print('no new files... sleeping')
        time.sleep(15)
        print('checking for new files...')
