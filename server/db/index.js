var MongoClient = require("mongodb").MongoClient

var state = {
    db : null
}

exports.connect = function(url, done) {
    if (state.db) return;
    MongoClient.connect(url, function(err, db) {
        if (err){
          throw new Error("MongoDb Connection failed");  
        } else {
          state.db = db;
          done();
        }
    })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
    })
  }
}