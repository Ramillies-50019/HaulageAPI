const express = require('express');
const router = express.Router();

const select = require('../queries/select');
const insert = require('../queries/insert');


// Get all classes
router.get('/all', function (req,res) {

  var sql = 'SELECT * from class';
  select(sql, req, res);

});

//add a class
router.post('/add', function (req,res) {

  var response = [];

	if (typeof req.body.classid !== 'undefined' &&
		  typeof req.body.classtype !== 'undefined' &&
		  typeof req.body.country !== 'undefined') {

    var id = req.body.classid, type = req.body.classtype, country = req.body.country;
    var values = [id, type, country];
    var sql = 'INSERT INTO class (ClassID, ClassType, Country) VALUES (?, ?, ?)'
		
    insert(sql, values, req, res);

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(response));
	}
});

module.exports = router;
