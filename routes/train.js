const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');

// Get all trains
router.get('/all', function (req,res) {

  var sql = 'SELECT * from train';
  select(sql, req, res);

});

//add a train
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.hcode !== 'undefined' &&
		  typeof req.body.time !== 'undefined' &&
		  typeof req.body.notes !== 'undefined'){

		var headcode = req.body.hcode, traintime = req.body.time, notes = req.body.notes;
    var values = [headcode, traintime, notes];
    var sql = 'INSERT INTO train (HeadCode, Time, Notes) VALUES (?, ?, ?)';
    		
    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});

module.exports = router;
