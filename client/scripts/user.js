$(document).ready(function(){
    console.log("Hey it loads!");

    $.ajax({
        type: "GET",
        url: "/user",
        success: function(data){
            console.log(data);
            $("#welcome").text("Welcome, " +  data.username);
            appendDom(data)
        }
    });
});

function appendDom (userData){
    var el = "<h1>" + userData.firstName + " " + userData.lastName + "</h1>" +
            "<h3>Email : " + userData.email + "</h3>";

    $('#user').append(el);
}