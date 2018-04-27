const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');

// Get all haulage_mp
router.get('/all', function (req,res) {

  var sql = 'SELECT * from haulage_mp';
  select(sql, req, res);

});

//add a haulage_mp
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.mpIndex !== 'undefined' &&
		  typeof req.body.haulageIndex !== 'undefined' &&
		  typeof req.body.order !== 'undefined') {

		var mpIndex = req.body.mpIndex, hIndex = req.body.haulageIndex, order = req.body.order;
    var values = [mpIndex, hIndex, order];
    var sql = 'INSERT INTO haulage_mp (MotivePowerIndex, HaulageIndex, FormationOrder) VALUES (?, ?, ?)';

    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});


module.exports = router;
