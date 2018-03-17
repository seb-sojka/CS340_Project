function updateHero(id){
	$.ajax({
        url: '/heroes/' + id,
        type: 'PUT',
        data: $('#update-hero').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function cancel(){
   window.location.replace("./");
};

function setCon(con){
	console.log("In Set Con");
	var str = "#" + "Con" + con;
	$(str).prop('checked', true);
};

function setInfl(hero){
	var str = "#" + "Char" + hero;
	
	$(str).prop('checked', true);
};