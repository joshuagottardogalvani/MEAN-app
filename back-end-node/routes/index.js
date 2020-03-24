var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const fs = require('fs');
const config = {
    user: 'gottardo.joshua',
    password: 'xxx123#',
    server: "213.140.22.237",
    /* database: 'School' */
};                                        
const path = require('path');
const http = require('http');
const app= express();

router.get('/', function(req, res, next) {
    res.render('index');
});

let executeQueryPug = function (res, query, next, pagina) {
  sql.connect(config, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request();
    request.query(query, function (err, result) {
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      res.render(pagina, {risultato: result.recordset});
      sql.close();
    });
  });
}

router.get('/unita', function(req, res, next) {
    /* sql.connect(config, err => {
        if(err) console.log(err);
        let sqlRequest = new sql.Request();
        sqlRequest.query('SELECT * FROM [cr-unit-attributes]', (err, result) => {
            if (err) console.log(err);
            res.render('unita', { risultato: result.recordsets[0] });
        });
    }); */
    let sqlQuery = "SELECT * FROM [cr-unit-attributes]";
    executeQueryPug(res, sqlQuery, next, 'unita');
});

router.get('/dettagli/:nome', function(req, res, next) {
/*   sql.connect(config, err => {
    if(err) console.log(err);
    let sqlRequest = new sql.Request();
    sqlRequest.query(`SELECT * FROM [cr-unit-attributes] WHERE Unit = '${req.params.nome}'`, (err, result) => {
        if (err) console.log(err);
        res.render('dettagli', { unita: result.recordsets[0][0] });
    });
  }); */
    let sqlQuery = `SELECT * FROM [cr-unit-attributes] WHERE Unit = '${req.params.nome}'`;
    executeQueryPug(res, sqlQuery, next, 'dettagli');
});

router.get('/inserisci', function(req, res, next) {
    res.render('inserisci');
});

module.exports = router;
