const path = require('path');
//https://stackoverflow.com/questions/26165725/nodejs-check-file-exists-if-not-wait-till-it-exist

module.exports = function (filePath, timeout, fs) {
    return new Promise(function (resolve, reject) {

        var timer = setTimeout(function () {
            watcher.close();
            reject('File did not exists and was not created during the timeout.');
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve(true);
            }
        });

        var dir = path.dirname(filePath);
        var basename = path.basename(filePath);
        var watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve(true);
            }
        });
    });
}