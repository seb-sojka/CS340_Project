/*All code is heavily inspired by CS340-Sample-Web-App*/
module.exports = function(){
    var express = require('express');
    var router = express.Router();

	function getCamps(res, mysql, context, complete){
		mysql.pool.query("SELECT Camp_ID, name FROM masksCamp", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.camps = results;
            complete();
        });
    }
		
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getCamps(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
				console.log("Context: " + JSON.stringify(context.camps));
                res.render('camp', context);
            }

        }
    });
	
   
    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
		var callbackCount = 0;
        var mysql = req.app.get('mysql');
		var context = {};
		var sql = "INSERT INTO masksCamp (name) VALUES (?)";
		var inserts = [req.body.name];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
		});
		res.redirect('/heroes');        
    });


    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM masksCamp WHERE Camp_ID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
				console.log("Error " + JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
				console.log("Success ");
                res.status(202).end();
            }
        })
    })

    return router;
}();