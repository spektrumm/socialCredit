from operator import index
import re
# takes string input and finds a url present (assuming there is one), then removes it


def findURL(string):

    # findall() has been used
    # with valid conditions for urls in string
    regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
    url = re.findall(regex, string)
    if url != []:
        indexUrl = url[0]

        noURL = string.replace(indexUrl[0], '')
    else:
        noURL = string

    return noURL
