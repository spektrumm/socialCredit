import nlpFunc as nlp
import helper as h
from os import listdir
import time

# initialize the flairNLP classifier
sentAn = nlp.classifierInit()
# set this variable to be where your incoming message files will be from
dir = 'D:\\repos\\socialCredit\\msgIO\\toPy'


# main loop
while True:
    if len(listdir(path=dir)) != 0:  # check if the directory is not empty
        print('new file found')  # debug
        data = h.prepData(dir)
        if data[0] == '':
            predictScore = 0
        else:
            predictScore = nlp.flairPrediction(data[0], sentAn)

        data[0] = predictScore
        inFile = f'{data[2]}-py.json'

        h.fileIO(data, inFile)
    else:
        print('no new files... sleeping')
        time.sleep(1)
        print('checking for new files...')
        # these print messages are mainly for debug, so you can see that the bot is still running while it's "not doing anything".
