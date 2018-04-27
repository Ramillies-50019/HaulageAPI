const connection = require('../dbconnection');

var select = function(sql, req, res){

  connection.query(sql, function(err, results, fields) {
  	if (!err){
  		var response = [];

		  if (results.length != 0) {
			  response.push({'result' : 'success', 'data' : results});
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

module.exports = select;
