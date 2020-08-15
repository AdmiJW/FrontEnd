$(document).ready( function () {

    let clicktimeout;
    $("#btnC-1a").click( function() {
        clearTimeout(clicktimeout);
        clicktimeout = setTimeout(function() {
            $("#btnC-1a").html("Click/ Double click me!");
        }, 2000);
        $(this).html("You clicked me!");
    });
    $("#btnC-1a").dblclick(function() {
        $(this).html("You double clicked me!");
    });
    $("#btnC-1b").hover(function() {
        $(this).html("I can feel it coming...");
    }).on("mouseleave", function() {
        $(this).html("Hover me!");
    });

    let enterleavetime;
    $("#btnC-3a").on("mouseenter", function() {
        clearTimeout(enterleavetime);
        $(this).html("You entered the button!");
    }).on("mouseleave", function() {
        enterleavetime = setTimeout(function() {
            $("#btnC-3a").html("mouseenter and mouseleave");
        }, 3000);
        $(this).html("You leave the button!");
    });

    let mouseupdown;
    $("#btnC-3b").on("mousedown", function() {
        clearTimeout(mouseupdown);
        $(this).html("You are holding down the mouse button!");
    }).on("mouseup", function() {
        mouseupdown = setTimeout(function() {
            $("#btnC-3b").html("mousedown and mouseup");
        }, 3000);
        $(this).html("You released the mouse button!")
    });

    $("#areaC-3a").css("background-color", "black").css("color", "white");
    $("#areaC-3a").on("mousemove", function(e) {
        $(this).html(`<p>Your position X: ${e.clientX}</p><p>Your position Y: ${e.clientY}</p>`);
    }).on("mouseleave", function(e) {
        $(this).html("Move your mouse into this area!");
    });

    $("#textC-4a").focus(function() {
        $(this).css({"background-color":"black", "color":"white"});
    }).blur(function() {
        $(this).css({"background-color":"white", "color":"black"});
    });


    $("#textC-5a").keyup(function(e) {
        $("#targetC-5a").html(`You just pressed: ${e.key} of ASCII code: ${e.keyCode}`);
        $("#targetC-5b").html(`${$(this).val()}`);
    });

    $("#selectC-6a").change(function(e) {
        let choice = e.target.value;
        switch(choice) {
            case "Warning": $(this).removeClass().addClass("form-control bg-warning");
                            break;
            case "Primary": $(this).removeClass().addClass("form-control bg-primary");
                            break;
            case "Success": $(this).removeClass().addClass("form-control bg-success");
                            break;
        }
        alert("You have choosen: " + choice);
    });
    $("#formC-6a").submit(function(e) {
        e.preventDefault();
        alert("So you have choosen... : " + $("#selectC-6a").val() );
    });


});