


$("#add_user").submit(function(event){
    alert("data Inserted successfully!");
})


$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();

    var data = {}
    $.map(unindexed_array,function(n,i){
        data[n['name']] = n['value']
    })

    // console.log(data);

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data" : data
    }


    $.ajax(request).done(function(response){
        alert("data updated succesfully!");
    })

})


if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm("DO YOU WANT TO DELETE THIS FROM THE DATABASE ?")){
            $.ajax(request).done(function(response){
                alert("data DELETED succesfully!");
                location.reload();
            })
        }
    })
}