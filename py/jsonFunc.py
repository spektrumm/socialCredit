import json
import shutil
from os import path
from os import remove
from os import listdir


def getDir(directory):
    dirArray = listdir(path=directory)
    selectedFile = dirArray[0]
    return selectedFile


def parseJson(fileName, directory):
    sourcePath = f'{directory}/{fileName}'
    if path.exists(sourcePath):
        destPath = fileName
        newLocation = shutil.move(sourcePath, destPath)
        print('The incoming %s file has been moved to the root directory %s' %
              (sourcePath, newLocation))
    with open(fileName, 'r') as jsonFile:
        data = json.load(jsonFile)

        msgContent = data['content']
        userID = data['authorID']
        messageID = data['id']
        outList = [msgContent, userID, messageID]
    return outList


def jsonDump(list):
    jsonData = {'score': list[0],
                'authorID': list[1],
                'messageID': list[2]}
    tName = jsonData['messageID']
    fileName = f'{tName}-out.json'
    with open(fileName, 'w') as out:
        json.dump(jsonData, out)
    if path.exists(fileName):
        destPath = 'outJson'
        newLocation = shutil.move(fileName, destPath)
        print('The %s file has been moved to the location, %s' %
              (fileName, newLocation))


def deleteFile(fileName):
    if path.exists(fileName):
        remove(fileName)
    else:
        print(f'The file {fileName} does not exist')


fileOutName = getDir('tempJson')
print(f'tempJson/{fileOutName}')  # debug
