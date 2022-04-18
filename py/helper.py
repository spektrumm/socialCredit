import jsonFunc as fn
# this is a decluttering file, that helps keep main.py as slim as possible


def prepData(directory):  # calls 2 separate json operation functions from the first step of processing incoming data
    chosenFile = fn.getDir(directory)
    data = fn.parseJson(chosenFile, directory)
    return data


# calls the last 2 json operation functions required for dealing with outgoing messages
def fileIO(list, msgFile, directory):
    fn.jsonDump(list, directory)

    # fn.deleteFile(msgFile)
