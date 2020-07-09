$(document).ready( function() {

    $("#btnD-1a").click(function() {
        $("#targetD-1a").toggleClass("btn-success form-control");
    });
    $("#btnD-1b").click(function() {
        $("#targetD-1a").parent().css({"background-color":"#DDDDDD", "text-align":"center", "border":"solid 3px #555555"});
    })


    $("#btnD-2a").click(function() {
        let idx = 0;
        if ( $("#listD-1 li").length ) 
            idx =  $("#listD-1 li:last").text().match(/-?\d+/)[0];
        
        $("#listD-1").append(`<li>Item ${Number(idx) + 1}</li>`);
    });
    $("#btnD-2b").click(function() {
        let idx = 0;
        if ( $("#listD-1 li").length )
            idx = $("#listD-1 li:first").text().match(/-?\d+/)[0];

        $("#listD-1").prepend(`<li>Item ${Number(idx) - 1}</li>`);
    });
    $("#btnD-2c").click(function() {
        $("#listD-1 li:last").appendTo("#listD-2");
    });
    $("#btnD-2d").click(function() {
        $("#listD-1 li:last").prependTo("#listD-2");
    });
    $("#btnD-2e").click(function() {
        $("#listD-2").before("<p>This is a before element</p>");
    });
    $("#btnD-2f").click(function() {
        $("#listD-2").after("<p>This is a after element</p>");
    });


    let storediv;
    $("#btnD-3a").click(function() {
        $("#targetD-3a").empty();
    });
    $("#btnD-3b").click(function() {
        storediv = $("#targetD-3a").detach();
    });
    $("#btnD-3c").click(function() {
        $(this).parent().after(storediv);
        storediv = null;
    });
    $("#btnD-3d").click(function() {
        $("#targetD-3a").remove();
    });


    $("#btnD-4a").click(function() {
        $(".selectD-4").wrap('<div style="padding:10px; margin: 10px; background-color:orange;">');
    });
    $("#btnD-4b").click(function() {
        $(".selectD-4").wrapAll('<div style="padding:10px; margin: 10px; background-color:green;">');
    });


    $("#textD-5a").keyup(function(e) {
        if (e.keyCode == 13 && $(this).val() ) {
            const toAppend = $(this).val();
            $(this).prop("value", "");
            $("#listD-5a").append(`<li>${toAppend}</li>`);
        }
    });
    $('#btnD-5a').click(function() {
        const arr = $('#listD-5a li').toArray();
        for (let li of arr) {
            $('#targetD-5a').append(`<p class="p-2 bg-success">${li.innerHTML}</p>`);
        }
    });

});