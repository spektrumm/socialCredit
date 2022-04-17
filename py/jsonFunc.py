import json
import shutil
from os import path, remove, listdir
import removeURL as url
# various file IO functions regarding the use of relevant json files and their directories


def getDir(directory):  # get a selected file from the provided directory
    dirArray = listdir(path=directory)
    selectedFile = dirArray[0]
    return selectedFile


def parseJson(fileName, directory):  # move the selected file and parse it for specific keyed data
    sourcePath = f'{directory}/{fileName}'
    if path.exists(sourcePath):
        destPath = fileName
        newLocation = shutil.move(sourcePath, destPath)
        print('The incoming %s file has been moved to the root directory %s' %
              (sourcePath, newLocation))
    with open(fileName, 'r', encoding='utf-8') as jsonFile:
        data = json.load(jsonFile)
        userID = data['authorID']
        messageID = data['id']
        channelID = data['channelID']
        msgContent = data['cleanContent']
        if (data['embeds']) == [None]:
            outList = [msgContent, userID, messageID, channelID]
        else:
            truncStr = url.findURL(msgContent)
            outList = [truncStr, userID, messageID, channelID]
    return outList


def jsonDump(list):  # json.dump new data into an output json file, and move it to the correct directory
    jsonData = {'score': list[0],
                'authorID': list[1],
                'messageID': list[2],
                'channelID': list[3]}
    tName = jsonData['messageID']
    fileName = f'{tName}-js.json'
    with open(fileName, 'w') as out:
        json.dump(jsonData, out)
    if path.exists(fileName):
        destPath = '/msgIO/toJs'
        newLocation = shutil.move(fileName, destPath)
        print('The %s file has been moved to the location, %s' %
              (fileName, newLocation))


def deleteFile(fileName):  # take temp input file and delete it to remove directory clutter
    if path.exists(fileName):
        remove(fileName)
    else:
        print(f'The file {fileName} does not exist')
