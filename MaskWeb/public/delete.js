/*All code is heavily inspired by CS340-Sample-Web-App*/
function deleteH(id){
    $.ajax({
        url: '/heroes/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteC(id){
    $.ajax({
        url: '/camp/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};