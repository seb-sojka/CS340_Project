module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHeroes(res, mysql, context, complete){
        mysql.pool.query("SELECT masksChar.Char_ID, hero_name, masksPlaybook.name AS playbook FROM masksChar INNER JOIN masksPlaybook ON masksChar.PB_ID = masksPlaybook.PB_ID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.heroes = results;
            complete();
        });
    }

    function getHeroes(res, mysql, context, id, complete){
        var sql = "SELECT masksChar.Char_ID, hero_name, real_name, Danger, Freak, Savior, Superior, Mundane, masksPlaybook.name AS playbook FROM masksChar INNER JOIN masksPlaybook ON masksChar.PB_ID = masksPlaybook.PB_ID WHERE Char_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results[0];
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js"];
        var mysql = req.app.get('mysql');
        getHeroes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('heroes', context);
            }

        }
    });

    /* Display one person that can be updated */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getHeroes(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-person', context);
            }

        }
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE bsg_people SET fname=?, lname=?, homeworld=?, age=? WHERE id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();