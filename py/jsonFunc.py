from fileinput import filename
import json
import shutil
from os import path
from os import remove


def parseJson(fileName):
    sourcePath = 'tempJson/msg.json'
    if path.exists(sourcePath):
        destPath = 'msg.json'
        newLocation = shutil.move(sourcePath, destPath)
        print('The incoming %s file has been moved to the root directory %s' %
              (sourcePath, newLocation))
    with open(fileName, 'r') as jsonFile:
        data = json.load(jsonFile)

        msgContent = data['content']
        userID = data['authorID']
        messageID = data['id']
    return msgContent, userID, messageID


def jsonDump(list):
    jsonData = {'score': list[0],
                'userID': list[1],
                'authorID': list[2]}
    fileName = 'out.json'
    with open(fileName, 'w') as out:
        json.dump(jsonData, out)
    sourcePath = "out.json"
    if path.exists(sourcePath):
        destPath = 'outJson'
        newLocation = shutil.move(sourcePath, destPath)
        print('The %s file has been moved to the location, %s' %
              (sourcePath, newLocation))


def deleteFile():
    fileName = 'msg.json'
    if path.exists(fileName):
        remove(fileName)
    else:
        print(f'The file {fileName} does not exist')
