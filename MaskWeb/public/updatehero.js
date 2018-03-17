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
	var str = "#" + con + "Con";
	$(str).prop('checked', true);
};

function setInfl(hero){
	var str = "#" + hero + "Char";
	console.log(str);
	$(str).prop('checked', true);
};