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

    function getHero(res, mysql, context, id, complete){
        var sql = "SELECT masksChar.Char_ID, hero_name, masksPlaybook.name AS playbook, masksChar.Danger, masksChar.Freak, masksChar.Savior, masksChar.Superior, masksChar.Mundane, Potential FROM masksChar INNER JOIN masksPlaybook ON masksChar.PB_ID = masksPlaybook.PB_ID WHERE Char_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hero = results[0];
            complete();
        });
    }
	
	function getInflOn(res, mysql, context, id, complete){
        var sql = "SELECT masksChar.hero_name FROM masksInfluence INNER JOIN masksChar ON masksChar.Char_ID = masksInfluence.Char_ID WHERE masksInfluence.Char_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.inflon = results;
            complete();
        });
    }
	
	function getCon(res, mysql, context, id, complete){
        var sql = "SELECT masksCon.name,  masksCon.rolls FROM masksCon INNER JOIN masksChar_Con ON masksChar_Con.Con_ID = masksCon.Con_ID WHERE masksChar_Con.Char_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.con = results;
            complete();
        });
    }

	function getInflBy(res, mysql, context, id, complete){
        var sql = "SELECT masksChar.hero_name FROM masksInfluence INNER JOIN masksChar ON masksChar.Char_ID = masksInfluence.Char_ID WHERE Influence_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.inflby = results;
            complete();
        });
    }
    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getHeroes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('heroes', context);
            }

        }
    });

    /* Display one hero with the possibility  update */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getHero(res, mysql, context, req.params.id, complete);
		getInflOn(res, mysql, context, req.params.id, complete);
		getInflBy(res, mysql, context, req.params.id, complete);
		getCon(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('update-hero', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people');
            }
        });
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

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM masksChar WHERE Char_ID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();