function deleteHero(id){
	console.log("In Delete Function");
    $.ajax({
        url: '/heroes/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};