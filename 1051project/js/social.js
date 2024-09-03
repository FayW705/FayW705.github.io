jQuery(window).load(function () {
    $("#logo").animate({ opacity: "1" }, 1600, function () {
        $("#team1").animate({ opacity: "1" }, 100, function () {
            $("#team2").animate({ opacity: "0.7" }, 200, function () {
                $("#team2").animate({ opacity: "0" }, 200, function () {
                    $("#team2").animate({ opacity: "0.7" }, 400, function () {
                        $("#team2").animate({ opacity: "0" }, 400, function () {
                            $("#team2").animate({ opacity: "0.7" }, 300, function () {
                                $("#team2").animate({ opacity: "0" }, 300, function () {

                                });
                            });
                        });
                    });
                });
            });
        });
    });
})
function allclear(i) {
    if (i == "social") {
        playon(2);
        story(2);
        place(2);
        meatteam(2);
        actor(2)
    }
    if (i == "playon") {
        meatteam(2);
        story(2);
        place(2);
        social(2);
        actor(2)
    }
    if (i == "story") {
        playon(2);
        meatteam(2);
        place(2);
        social(2);
        actor(2)
    }
    if (i == "place") {
        playon(2);
        story(2);
        meatteam(2);
        social(2);
        actor(2)
    }
    if (i == "meatteam") {
        playon(2);
        story(2);
        place(2);
        social(2);
        actor(2)
    }
    if (i == "actor") {
        playon(2);
        story(2);
        place(2);
        social(2);
        meatteam(2);
    }

    
}
function social(i) {
    if (i == 1) {
        allclear("social");
        $("#facebook").css("z-index", 50);
        $("#facebook").animate({ opacity: "1" }, 500, function () {

        });

    } else if (i == 2) {
        $("#facebook").animate({ opacity: "0" }, 500, function () {
            $("#facebook").css("z-index", -1);
        });
    }
}
function playon(i) {
    if (i == 1) {
        allclear("playon");
        $("#play").css("z-index", 50);
        $("#play").animate({ opacity: "1" }, 500, function () {

        });
    } else if (i == 2) {
        $("#play").animate({ opacity: "0" }, 500, function () {
            $("#play").css("z-index", -1);
        });
    }
}
function story(i) {
    if (i == 1) {
        allclear("story");
        $("#story").css("z-index", 50);
        $("#story").animate({ opacity: "1" }, 500, function () {

        });
    } else if (i == 2) {
        $("#story").animate({ opacity: "0" }, 500, function () {
            $("#story").css("z-index", -1);
        });
    }
}
function place(i) {
    if (i == 1) {
        allclear("place");
        $("#place").css("z-index", 50);
        $("#place").animate({ opacity: "1" }, 500, function () {

        });
    } else if (i == 2) {
        $("#place").animate({ opacity: "0" }, 500, function () {
            $("#place").css("z-index", -1);
        });
    }
}
function meatteam(i) {
    if (i == 1) {
        allclear("meatteam");
        $("#meatteam").css("z-index", 50);
        $("#meatteam").animate({ opacity: "1" }, 500, function () {

        });
    } else if (i == 2) {
        $("#meatteam").animate({ opacity: "0" }, 500, function () {
            $("#meatteam").css("z-index", -1);
        });
    }
}
function actor(i) {
    if (i == 1) {
        allclear("actor");
        $("#actor").css("z-index", 50);
        $("#actor").animate({ opacity: "1" }, 500, function () {

        });
    } else if (i == 2) {
        $("#actor").animate({ opacity: "0" }, 500, function () {
            $("#actor").css("z-index", -1);
        });
    }
}
function meatteam_img(i) {
    if (i == 1) {
       
        $(".meatteam_img").animate({ opacity: "0" }, 200, function () {
            $("#martin").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 2) {
        $(".meatteam_img").animate({ opacity: "0" }, 200, function () {
            $("#edison").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 3) {
        $(".meatteam_img").animate({ opacity: "0" }, 200, function () {
            $("#anny").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 4) {
        $(".meatteam_img").animate({ opacity: "0" }, 200, function () {
            $("#ted").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 5) {
        $(".meatteam_img").animate({ opacity: "0" }, 200, function () {
            $("#MT").animate({ opacity: "1" }, 200, function () {
            });
        });
    }
}
function actor_img(i) {
    if (i == 1) {

        $(".actor_img").animate({ opacity: "0" }, 200, function () {
            $("#z1").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 2) {
        $(".actor_img").animate({ opacity: "0" }, 200, function () {
            $("#z2").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 3) {
        $(".actor_img").animate({ opacity: "0" }, 200, function () {
            $("#z3").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 4) {
        $(".actor_img").animate({ opacity: "0" }, 200, function () {
            $("#z4").animate({ opacity: "1" }, 200, function () {
            });
        });
    } else if (i == 5) {
        $(".actor_img").animate({ opacity: "0" }, 200, function () {
            $("#z").animate({ opacity: "1" }, 200, function () {
            });
        });
    }
}