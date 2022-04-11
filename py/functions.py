import json


def parseJson(fileName):
    with open(fileName, 'r') as jsonFile:
        data = json.load(jsonFile)

        msgContent = data['content']
        userID = data['authorID']
        messageID = data['id']
        #msgContent = tempC[1:-1]
        # print(msgContent)  # debug
        print(msgContent)
    return msgContent, userID, messageID


def receiveJson(jsonData):

    parsedJson = json.loads(jsonData)
    print(json.dumps(parsedJson, indent=4, sort_keys=True))

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
