/*All code is heavily inspired by CS340-Sample-Web-App*/
module.exports = function(){
    var express = require('express');
    var router = express.Router();

	function getStarting(res, mysql, id, context, complete){
		var sql = "SELECT Danger, Freak, Savior, Superior, Mundane FROM masksPlaybook WHERE PB_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			context.stats  = results[0];
			complete();
        });
    }
	

	function getPlaybooks(res, mysql, context, complete){
        mysql.pool.query("SELECT PB_ID, name FROM masksPlaybook", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.playbooks  = results;
            complete();
        });
    }
	
	function getCons(res, mysql, context, complete){
        mysql.pool.query("SELECT Con_id, name, rolls FROM masksCon", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.cons  = results;
            complete();
        });
    }
	
    function getHeroes(res, mysql, context, complete){
        mysql.pool.query("SELECT masksChar.Char_ID, hero_name, masksPlaybook.name AS playbook, masksCamp.name as camp FROM masksChar INNER JOIN masksPlaybook ON masksChar.PB_ID = masksPlaybook.PB_ID INNER JOIN masksCamp on masksCamp.Camp_ID = masksChar.Camp_ID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.heroes = results;
            complete();
        });
    }
	
	function getOtherHeroes(res, mysql, context, id, complete){
        var sql = "SELECT Char_ID, hero_name FROM masksChar WHERE Char_ID != ?";
		var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.heroes = results;
            complete();
        });
    }

    function getHero(res, mysql, context, id, complete){
        var sql = "SELECT masksChar.Char_ID, hero_name, real_name, PB_ID, masksChar.Danger, masksChar.Freak, masksChar.Savior, masksChar.Superior, masksChar.Mundane, Potential, Camp_ID FROM masksChar WHERE Char_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.hero = results[0];
			console.log("Hero Stuff " + JSON.stringify(context.hero));
            complete();
        });
    }
	
	function getInflOn(res, mysql, context, id, complete){
        var sql = "SELECT masksChar.Char_ID, masksChar.hero_name FROM masksInfluence INNER JOIN masksChar ON masksChar.Char_ID = masksInfluence.Influence_id WHERE masksInfluence.Char_ID = ?";
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
	
	function deleteCons(res, mysql, id){
	    var sql = "DELETE FROM masksChar_Con WHERE Char_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
        });
	
	}
	
	
	function getConHero(res, mysql, context, id, complete){
        var sql = "SELECT Con_id FROM masksChar_Con WHERE masksChar_Con.Char_ID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.conHero = results;
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
	
	function setCons(res, mysql, id, body){
		var sql;
		var inserts;
		var con_id = 1;
		if(body.Con1 == "on")
		{
			console.log("Con" + con_id);
			sql = "INSERT INTO `masksChar_Con` (Char_id, Con_id) VALUES (?, ?)";
			inserts = [id, con_id];
			sql = mysql.pool.query(sql,inserts,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
			});
		}
		con_id++;
		
		if(body.Con2 == "on")
		{
			console.log("Con" + con_id);
			sql = "INSERT INTO `masksChar_Con` (Char_id, Con_id) VALUES (?, ?)";
			inserts = [id, con_id];
			mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
				}
			});
		}
		con_id++;
		
		if(body.Con3 == "on")
		{
			console.log("Con" + con_id);
			sql = "INSERT INTO `masksChar_Con` (Char_id, Con_id) VALUES (?, ?)";
			inserts = [id, con_id];
			mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
				}
			});
		}
		con_id++;
		
		if(body.Con4 == "on")
		{
			console.log("Con" + con_id);
			sql = "INSERT INTO `masksChar_Con` (Char_id, Con_id) VALUES (?, ?)";
			inserts = [id, con_id];
			mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
				}
			});
		}
		con_id++;
		
		if(body.Con5 == "on")
		{
			console.log("Con" + con_id);
			sql = "INSERT INTO `masksChar_Con` (Char_id, Con_id) VALUES (?, ?)";
			inserts = [id, con_id];
			mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
				}
			});
		}
	}
	
	function deleteInfl(res, mysql, id, complete){
	    var sql = "DELETE FROM masksInfluence WHERE Char_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			complete()
        });
	
	}
	
	function addInfl(res, mysql, id1, id2){
		console.log("In add infl");
	    var sql = "INSERT INTO masksInfluence (Char_id, Influence_id) VALUES (?, ?)";
        var inserts = [id1, id2];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
			
        });
	
	}
	
	function setInfl(res, mysql, id, chars){
		var callbackCount = 0;
		var sql;
		var inserts;
		var context = {};
		var length;
		console.log("Input: " + JSON.stringify(chars));
		getHeroes(res, mysql, context, complete);
		deleteInfl(res, mysql, id, complete);
		function complete(){
            callbackCount++;
            if(callbackCount >= 2){
				length = context.heroes.length;
				var charCount = 0;
				for (i = 0; i < length; i++)
				{
					
					var hID = JSON.stringify(context.heroes[i].Char_ID);
					if(hID != id)
					{
						if (chars[charCount].length == 2)
						{
							addInfl(res, mysql, id, hID);
						}
						charCount++;
					}
				}
			}
		}
	}
	
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
        getHeroes(res, mysql, context, complete);
		getPlaybooks(res, mysql, context, complete);
		getCamps(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
				console.log("Context: " + JSON.stringify(context.heroes));
                res.render('heroes', context);
            }

        }
    });
	
    /* Display one hero with the possibility to update */

    router.get('/:id', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
		context.jsscripts = ["selectedplaybook.js", "updatehero.js"];
		getPlaybooks(res, mysql, context, complete);
		getCons(res, mysql, context, complete);
		getOtherHeroes(res, mysql, context, req.params.id, complete)
        getHero(res, mysql, context, req.params.id, complete);
		getInflOn(res, mysql, context, req.params.id, complete);
		getInflBy(res, mysql, context, req.params.id, complete);
		getConHero(res, mysql, context, req.params.id, complete);
		getCamps(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 8){
                res.render('update-hero', context);
            }
        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
		var callbackCount = 0;
        var mysql = req.app.get('mysql');
		var context = {};
		getStarting(res, mysql, req.body.playbook, context, complete);
		function complete(){
			callbackCount++;
            if(callbackCount >= 1){
				console.log("Stats" + JSON.stringify(context));
				var sql = "INSERT INTO masksChar (hero_name, real_name, Danger, Freak, Savior, Superior, Mundane, PB_ID, Camp_ID) VALUES (?,?,?,?,?,?,?,?,?)";
				var inserts = [req.body.hero_name, req.body.real_name, context.stats.Danger, context.stats.Freak, context.stats.Savior, context.stats.Superior, context.stats.Mundane, req.body.playbook, req.body.campaign];
				sql = mysql.pool.query(sql,inserts,function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end();
				}
			});
			res.redirect('/heroes');
            }

        }
		
        
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');	
		console.log("Camp: " + req.body.camp);
        var sql = "UPDATE masksChar SET hero_name=?, real_name=?, PB_ID=?, Danger = ?, Freak = ?, Savior = ?, Superior = ?, Mundane = ?, Potential = ?, Camp_ID = ? WHERE Char_ID=?";
		var inserts = [req.body.hero_name, req.body.real_name, req.body.playbook, req.body.danger, req.body.freak, req.body.savior, req.body.superior, req.body.mundane, req.body.potential, req.body.camp, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
				console.log("Error" + JSON.stringify(error));
            }else{
				deleteCons(res, mysql, req.params.id);
				setCons(res, mysql, req.params.id, req.body);
				setInfl(res, mysql, req.params.id, req.body.Char);
                res.status(200);
                res.end();
				console.log("Success");
            }
        });
		console.log("End of update");
    });

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM masksChar WHERE Char_ID = ?";
        var inserts = [req.params.id];
		console.log("In Router.Delete Inserts" + inserts);
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