import nlpFunc as nlp
import json
import os
import shutil
import time
# this will be a standalone script for processing previously sent messages in bulk.


# start of script inits
tic = time.clock()
sentAn = nlp.classifierInit('en-sentiment')
dir = 'messageJsons'


def stepThroughMsgs(fileName):
    sourcePath = f'messageJsons/{fileName}'
    if os.path.exists(sourcePath):
        destPath = fileName
        newLocation = shutil.move(sourcePath, destPath)
        print('The incoming %s file has been moved to the root directory %s' %
              (sourcePath, newLocation))
    with open(fileName, 'r') as jsonFile:
        data = json.load(jsonFile)
        return data


# scrape directory of files
allChannels = os.listdir(path=dir)
channelIndex = 0
scoresDict = {}
messageHistory = {}
for channelFiles in allChannels:
    msgCount = 0
    channelMsgs = allChannels[channelIndex]
    channelIndex += 1
    jsonData = stepThroughMsgs(channelMsgs)
    if jsonData != None:
        for messages in jsonData:
            currentMsg = jsonData[msgCount]
            msgCount += 1
            msgCon = currentMsg['content']
            userID = currentMsg['authorID']
            messageID = currentMsg['id']
            if msgCon != '':

                # do sentiment analysis on msgCon
                predictScore = nlp.flairPrediction(msgCon, sentAn)
                # take sentAn score and append to dict keyed to userID
                if userID in scoresDict:
                    oldScore = scoresDict[userID]
                    newScore = oldScore + predictScore
                    scoresDict.update({userID: newScore})
                else:  # if user id doesnt already exist
                    scoresDict.update({userID: predictScore})

                # update a dictionary w message ID and it's respective score change as key value pair
                messageHistory.update({messageID: predictScore})
            else:
                print('current msg content is empty, skipping...')
    else:
        print('current channel json file is empty, moving on...')

toc = time.clock()
totalTime = toc - tic

with open('legacyScores.json', 'w') as jsonOut:
    jsonObj = json.dumps(scoresDict, indent=4)
    print('wrote scores dict to file')

with open('messageLog.json', 'w') as msgLogFile:
    logObj = json.dumps(messageHistory, indent=4)
    print('wrote message log dict to file')

print(f'Total Time elapsed for the script was: {totalTime}')
