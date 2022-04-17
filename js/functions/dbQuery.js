module.exports = async function (db, sql){
    return new Promise(function(resolve, reject){
        db.query(sql, function(err, result) {
            if(err){
                reject(err);
            }
            resolve(result);
        });
    })
}