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

function deleteH(id){
    $.ajax({
        url: '/heroes/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};