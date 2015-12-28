var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

/* GET home page. */

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views',  'index.html'));
});

/* Utility method */
function results(res, err, client) {

    var results = [];

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        client.end();
        return res.json(results);
    });

    // Handle Errors
    if(err) {
      console.log(err);
    }

}


/* CRUD methods */

/* Create */
router.post('/api/v1/todos', function(req, res) {

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        return results(res, err, client);
    });
});

/* Read */
router.get('/api/v1/todos', function(req, res) {

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        return results(res, err, client);
    });

});

/* Update */
router.put('/api/v1/todos/:todo_id', function(req, res) {

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        return results(res, err, client);
    });

});

/* Delete */
router.delete('/api/v1/todos/:todo_id', function(req, res) {

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        return results(res, err, client);
    });

});


module.exports = router;
