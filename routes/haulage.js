const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');


// Get all classes
router.get('/all', function (req,res) {

  var sql = 'SELECT * from haulage';
  select(sql, req, res);

});

//add a class
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.date !== 'undefined' &&
		  typeof req.body.journeyIndex !== 'undefined' &&
      typeof req.body.trainIndex !== 'undefined' &&
		  typeof req.body.notes !== 'undefined'){

    var haulDate = req.body.date, jIndex = req.body.journeyIndex, tIndex = req.body.trainIndex, notes = req.body.notes;
    var values = [haulDate, jIndex, tIndex, notes];
    var sql = 'INSERT INTO haulage (Date, JourneyIndex, TrainIndex, Notes) VALUES (?, ?, ?, ?)';

    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});

module.exports = router;
