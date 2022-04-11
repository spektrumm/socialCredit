import jsonFunc as fn


def prepData(directory):
    chosenFile = fn.getDir(directory)
    data = fn.parseJson(chosenFile, directory)
    return data


def fileIO(list, msgFile):
    fn.jsonDump(list)

    fn.deleteFile(msgFile)
