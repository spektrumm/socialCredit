module.exports = async function (db, sql){
    db.query(sql, function(err, result) {
        if(err){
            throw err
        }
        return result;
    });

}