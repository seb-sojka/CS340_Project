function deleteH(id){
    $.ajax({
        url: '/heroes/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};