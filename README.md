# Social Credit Discord Bot

This project started as a meme project, but then after some deliberation and realization we decided to pursue it.

Essentially, we run a [discord.js](https://discord.js.org/#/) bot that will scrape every new message in a server (that isn't a bot).
Then, take that json output data and send it to a python script for sentiment analysis using [flairNLP](https://github.com/flairNLP/flair), which returns a sentiment analysis score based off the content of the message.
This score (and relevant discord data) is sent back into the JS bot, which then saves it to a database and updates things on the discord side of things (ie. updates roles, sends rank/derank messages, etc.)

The final goal is to have a functioning discord bot that users can interact with to check the leaderboard (top or bottom), specific user scores, etc. as well as having an independent website that shows all users data in a leaderboard pulling from an sql database.

## This project requires:

- [flairNLP](https://github.com/flairNLP/flair) (and it's dependencies, good luck)
- [discord.js](https://discord.js.org/#/)

