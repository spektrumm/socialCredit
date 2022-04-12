import nlpFunc as nlp
import json
import os
import shutil
import timeit
# this will be a standalone script for processing previously sent messages in bulk.


# start of script inits
tic = timeit.default_timer()
sentAn = nlp.classifierInit()
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
totalCount = 0
scoresDict = {}
messageHistory = {}
for channelFiles in allChannels:
    msgCount = 0
    channelMsgs = allChannels[channelIndex]
    channelIndex += 1
    jsonData = stepThroughMsgs(channelMsgs)
    if jsonData != [None]:
        for messages in jsonData:
            currentMsg = jsonData[msgCount]
            msgCount += 1
            msgCon = currentMsg['content']
            messageID = currentMsg['id']
            userID = currentMsg['authorID']

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
                totalCount += 1
                # update a dictionary w message ID and it's respective score change as key value pair
                messageHistory.update({messageID: predictScore})
            else:
                print('current msg content is empty, skipping...')
    else:
        print('current channel json file is empty, moving on...')


toc = timeit.default_timer()
totalTime = toc - tic

with open('legacyScores.json', 'w') as jsonOut:
    json.dump(scoresDict, jsonOut)
    print('wrote scores dict to file')

with open('messageLog.json', 'w') as msgLogFile:
    json.dump(messageHistory, msgLogFile)
    print('wrote message log dict to file')

print(f'Total Time elapsed for the script was: {totalTime} seconds')
print(f'The total number of messages processed was: {totalCount}')
