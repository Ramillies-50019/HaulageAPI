const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');

// Get all trainLoctions
router.get('/all', function (req,res) {

  var sql = 'SELECT * from train_location';
  select(sql, req, res);

});

//add a trainLocation
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.trainIndex !== 'undefined' &&
		  typeof req.body.locationID !== 'undefined' &&
		  typeof req.body.locationType !== 'undefined') {

		var trIndex = req.body.trainIndex, locID = req.body.locationID, locType = req.body.locationType;
    var values = [trIndex, locID, locType];
    var sql = 'INSERT INTO train_location (TrainIndex, LocationID, LocationType) VALUES (?, ?, ?)';

    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});


module.exports = router;
