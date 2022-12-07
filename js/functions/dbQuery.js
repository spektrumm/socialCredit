
//Query db with sql and post
module.exports = async function (db, sql, post) {
  return new Promise(function (resolve, reject) {
    db.query(sql, post, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
