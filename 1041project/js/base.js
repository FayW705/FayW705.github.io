$(document).ready(function () {
    decideNav();
    setTimeout("openTransition()", 1000)
    slide();
    $('.carousel').carousel({
        interval: 4000,
        wrap: true,
        pause:hover
    });
});
function decideNav() {
    var width = screen.width;
    if (width < 768) {
        $("#justified").removeClass("nav-justified");
        $("#justified").addClass("navbar-nav");
    }
    if (width >= 992) {
        $("#slide").addClass("col-md-8");
        $("#slide").addClass("col-md-offset-2");
    }
}
function openTransition() {


    $("#header_all").addClass("loaded");
    $("#logo").addClass("loaded");
    $("#moai").addClass("loaded");
    $("body").addClass("loaded")
}
function slide() {
}
