const connection = require('../dbconnection');

var insert = function(sql, values, req, res){

  connection.query(sql, values, function(err, results, fields) {
    if (!err){

      var response = [];

      if (results.affectedRows != 0) {
        response.push({'result' : 'success', 'insertId' : results.insertId});
      } else {
        response.push({'result' : 'error', 'msg' : 'No Results Found'});
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(response));
    } else {
      res.status(400).send(err);
    }
  });

};

module.exports = insert;
