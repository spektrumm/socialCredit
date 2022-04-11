import jsonFunc as fn


def prepData():
    data = fn.parseJson('msg.json')
    return data


def fileIO(list):
    fn.jsonDump(list)

    fn.deleteFile()
