$(document).ready( function() {

    //Adding and removing classes
    $("#btnA-1a").click( function() {
        $("#targetA-1a").addClass("btn-primary").removeClass("btn-dark").removeClass("btn-secondary");
    });
    $("#btnA-1b").click( function() {
        $("#targetA-1a").addClass("btn-secondary").removeClass("btn-dark").removeClass("btn-primary");
    });

    //Changing CSS and attributes
    $("#btnA-2a").click( function() {
        $("#targetA-2a").css("background-color", "red");
    });
    $("#btnA-2b").click( function() {
        $("#targetA-2a").css("background-color", "blue");
    });
    $("#btnA-2c").click( function() {
        $("#targetA-2a").prop("disabled", true);
    });
    $("#btnA-2d").click( function() {
        $("#targetA-2a").prop("disabled", false);
    });

    //Manipulating Inner HTML
    $("#btnA-3a").click( function() {
        const str = $("#textA-3a").val();
        $("#targetA-3a").html(`<small><em><strong>${str}</strong></em></small>`);
    });
    $("#btnA-3b").click( function() {
        const str = $("#textA-3a").val();
        $("#targetA-3a").text(`${str}`);
    });

    //Removing, cloning and appending
    $("#btnA-4a").click( function() {
        $("#targetA-4a").remove();
    });
    $("#btnA-4b").click( function() {
        let parent = $("#targetA-4b").parent();
        let clone = $("#targetA-4b").clone();
        clone.appendTo(parent);
    });
    $("#btnA-4c").click( function() {
        let parent = $(this).parent();
        $("#targetA-4c").appendTo(parent);
    });

    $("#btnA-5a").click( function() {
        $("#targetA-5a").parent().css("background-color", "orange");
    });
    $("#btnA-5b").click( function() {
        $("#targetA-5a").children().addClass("btn-success");
    });
});