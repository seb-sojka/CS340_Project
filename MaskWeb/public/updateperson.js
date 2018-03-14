function updatePerson(id){
    $.ajax({
        url: '/heroes/' + id,
        type: 'PUT',
        data: $('#update-heroes').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};