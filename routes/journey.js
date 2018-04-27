const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');


// Get all journeys
router.get('/all', function (req,res) {

  var sql = 'SELECT * from journey';
  select(sql, req, res);

});

//add a journey
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.miles !== 'undefined' &&
		  typeof req.body.chains !== 'undefined' &&
		  typeof req.body.km !== 'undefined') {

		var miles = req.body.miles, chains = req.body.chains, km = req.body.km;
    var values = [miles, chains, km];
    var sql = 'INSERT INTO journey (Miles, Chains, KM) VALUES (?, ?, ?)';

    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});

module.exports = router;
