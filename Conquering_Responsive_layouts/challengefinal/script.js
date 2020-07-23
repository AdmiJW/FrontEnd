$(document).ready( function() {


    $('#open-checkbox').on('change', function(e) {
        if (e.target.checked) {
            $('.header-nav').addClass('show');
        }
        else {
            $('.header-nav').removeClass('show');
        }
    });

    $('.nav-item').on('mouseenter', function(e) {
        $('.header-nav_arrow').css('top', `calc(${e.target.offsetTop}px + ${e.target.offsetHeight / 2}px - 22.5px)`).css('opacity', 1);
    }).on('mouseleave', function(e) {

       $('.header-nav_arrow').css('top', 0).css('opacity', 0); 
    });


    $('.footer-section label').click( function() {
        setTimeout(() => {
            document.body.scrollIntoView(false);
        }, 200);
    });

});