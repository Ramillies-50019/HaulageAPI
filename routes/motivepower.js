const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');


// Get all motive power
router.get('/all', function (req,res) {

  var sql = 'SELECT * from class';
  select(sql, req, res);

});

//add motive power
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.mpwid !== 'undefined' &&
		  typeof req.body.classindex !== 'undefined'){

		var id = req.body.mpwid, clindex = req.body.classindex;
    var values = [id, clindex];
    var sql = 'INSERT INTO motive_power (MotivePowerID, ClassIndex) VALUES (?, ?)';

    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});














module.exports = router;
