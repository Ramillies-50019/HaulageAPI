const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');


// Get all locations
router.get('/all', function (req,res) {

	var sql = 'SELECT * from locations';
  select(sql, req, res);

});

// Get 1st 5 locations starting with the letters passed in
router.get('/get5/:prefix', function (req,res) {

  var locPrefix = req.params.prefix;

  var sql = 'SELECT Nlcdesc, LocationID ' +
            'FROM locations ' +
            'WHERE Stanox <> "" ' +
            'AND Nlcdesc like "' + locPrefix + '%" ' +
            'ORDER BY Nlcdesc LIMIT 5';

  select(sql, req, res);

});

/* EXAMPLE OF PASSING MULTIPLE PARAMETERS
router.get('/get5/:prefix/:parm2', function (req,res) {

  var parm1 = req.params.prefix;
  var parm2 = req.params.parm2;
  var response = [];

  response.push({'parm1' : parm1, 'parm2' : parm2});
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(response));

});*/

//add a location
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.desc !== 'undefined') {

    var description = req.body.desc.toUpperCase(), stanox = 'Dummy';
    var values = [stanox, description];
    sql = 'INSERT INTO locations (Stanox, Nlcdesc) VALUES (?, ?)';

    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});

module.exports = router;
