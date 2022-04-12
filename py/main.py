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
        data = h.prepData(dir)

        predictScore = nlp.flairPrediction(data[0], sentAn)
        data[0] = predictScore
        inFile = f'{data[2]}-in.json'

        h.fileIO(data, inFile)
    else:
        print('no new files... sleeping')
        time.sleep(1)
        print('checking for new files...')
