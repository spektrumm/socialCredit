import json


def parseJson(fileName):
    with open(fileName, 'r') as jsonFile:
        data = json.load(jsonFile)

        msgContent = data['content']
        userID = data['authorID']
        messageID = data['id']
        print(msgContent)
    return msgContent, userID, messageID


def jsonDump(list):
    jsonData = {'content': list[0],
                'userID': list[1],
                'authorID': list[2]}

    with open('jsonOut.json', 'w') as out:
        out.write(jsonData)


# def flairPrediction(x):
   # sent = Sentence(x)
    # classifier.predict(sent)
    #score = sent.labels[0]
    # if "POSITIVE" in str(score):
    #   return "pos"
   # elif "NEGATIVE" in str(score):
    #    return "neg"
    # else:
    #  return "neu"
