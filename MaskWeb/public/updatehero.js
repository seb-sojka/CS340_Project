/*All code is heavily inspired by CS340-Sample-Web-App*/
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
	var str = "#" + "Con" + con;
	$(str).prop('checked', true);
};

function setInfl(hero){
	var str = "#" + "Char" + hero;
	$(str).prop('checked', true);
};

function selectPlaybook(id){
	$("#playbook-selector").val(id);
}

function selectCamp(id){
	$("#camp-selector").val(id);
}

function changeCamp(id){
	var str = "/camp/"+id;
	window.location.replace(str);
}