import nlpFunc as nlp
import json
import os
import shutil
import timeit
import removeURL as url
import nltkFunc as vader
# this will be a standalone script for processing previously sent messages in bulk.


# start of script inits
tic = timeit.default_timer()
#sentAn = nlp.classifierInit()
sentAn = vader.siaInit()
dir = 'messageJsons'


# take in a variable file name and step through each key value entry in the respective json file
def stepThroughMsgs(fileName):
    sourcePath = f'messageJsons/{fileName}'
    if os.path.exists(sourcePath):
        destPath = fileName
        newLocation = shutil.move(sourcePath, destPath)
        print('The incoming %s file has been moved to the root directory %s' %
              (sourcePath, newLocation))
        with open(fileName, 'r', encoding='utf-8') as jsonFile:
            data = json.load(jsonFile)
            return data


# scrape directory of files
allChannels = os.listdir(path=dir)
# define necessary variables
channelIndex = 0
totalCount = 0
scoresDict = {}
messageHistory = []

# loop through the files in the directory of all channel messages files
for channelFiles in allChannels:
    msgCount = 0
    channelMsgs = allChannels[channelIndex]
    channelIndex += 1
    jsonData = stepThroughMsgs(channelMsgs)
    if jsonData != [None]:  # check if the file contents are not empty
        for messages in jsonData:
            currentMsg = jsonData[msgCount]
            msgCount += 1
            rawContent = currentMsg['cleanContent']
            if '\u200b' in rawContent:
                msgCon = rawContent.replace('\u200b', '')
            else:
                msgCon = rawContent
                print('no strange @ representation present')

            messageID = currentMsg['id']
            userID = currentMsg['authorID']
            channelID = currentMsg['channelID']
            timeStamp = currentMsg['createdTimestamp']
            if currentMsg['embeds'] == []:
                print('embeds key is empty, no link is present in the message.')
                msgStr = msgCon
            else:
                msgStr = url.findURL(msgCon)
                print(f'url found in msg #{messageID}, removing url.')

            if msgStr != '':  # check if the content of the selected message is not empty

                # do sentiment analysis on msgCon
                #predictScore = nlp.flairPrediction(msgStr, sentAn)
                predictScore = vader.vaderPredict(msgStr, sentAn)
                # take sentAn score and append to dict keyed to userID
                if userID in scoresDict:
                    oldScore = scoresDict[userID]
                    newScore = oldScore + predictScore
                    scoresDict.update({userID: newScore})
                else:  # if user id doesnt already exist
                    scoresDict.update({userID: predictScore})
                totalCount += 1
                # update a dictionary w message ID and it's respective score change as key value pair
                tempDict = {'channelID': channelID, 'messageID': messageID,
                            'scoreChange': predictScore, 'authorID': userID, 'content': msgStr, 'timestamp': timeStamp}
                messageHistory.append(tempDict)

            else:
                print('current msg content is empty, skipping...')
    else:
        print('current channel json file is empty, moving on...')

# get total process time (because why not)
toc = timeit.default_timer()
totalTime = toc - tic

# output userID : totalScore pairs to a single file for us with bot
with open('legacyScores.json', 'w') as jsonOut:
    json.dump(scoresDict, jsonOut, indent=4)
    print('wrote scores dict to file')

# output log of all processed messages (for referring individual acquired scores to their respective messages)
with open('messageLog.json', 'w') as msgLogFile:
    json.dump(messageHistory, msgLogFile, indent=4, sort_keys=True)
    print('wrote message log dict to file')

# process info
print(f'Total Time elapsed for the script was: {totalTime} seconds')
print(f'The total number of messages processed was: {totalCount}')
