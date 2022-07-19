/*!
 * Created by rean on 2017/10/8
 */

$(function () {
    'use strict';
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $(".nav-bar").addClass("header-fix");
        } else {
            $(".nav-bar").removeClass("header-fix");
        }
    });

    if ($(window).width() > 990) {
        $('.dropdown').on('mouseenter mouseleave', function () {
            dropdown($(this))
        });
    } else {
        $('.dropdown').on('click', function () {
            dropdown($(this))
        });
    }

    $('.search-trigger').on('click', function () {
        $('.search-pop').fadeIn();
    });
    $('.search-pop .close').on('click', function () {
        $('.search-pop').fadeOut();
    });
    $('.nav-mobile-toggle').on('click', function () {
        var menu = $('.nav-menu');
        if (menu.hasClass('open')) {
            menu.removeClass('open');
        } else {
            menu.addClass('open');
        }
    });

    $('#top-back').hide().on('click', function () {
        $('body,html').animate({scrollTop: 0}, 300);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 350) {
            $("#top-back").fadeIn();
        } else {
            $("#top-back").fadeOut();
        }
    });
    $('.cndns-right .cndns-right-btn:first').css({border: "none"});

    // $('.owl-case').owlCarousel({
    //     itemsCustom : [
    //         [0, 1],
    //         [450, 2],
    //         [991, 3]
    //     ]
    // });
    
});

function dropdown(e) {
    if (e.hasClass('open')) {
        e.removeClass('open')
    } else {
        e.addClass('open')
    }
}