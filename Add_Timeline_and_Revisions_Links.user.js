// ==UserScript==
// @name        Stack Exchange: Add Timeline and Revisions links to posts
// @description Adds links to posts to always show history and links to questions to show the Timeline".
// @namespace   StackExchange
// @match       *://*.askubuntu.com/questions/*
// @match       *://*.mathoverflow.net/questions/*
// @match       *://*.serverfault.com/questions/*
// @match       *://*.stackapps.com/questions/*
// @match       *://*.stackexchange.com/questions/*
// @match       *://*.stackoverflow.com/questions/*
// @match       *://*.superuser.com/questions/*
// @version     1.2
// @history     1.2 Updated match list
// @history     1.1 Added revisions link
// ==/UserScript==

function addUtilityLinks ($) {

    $(".post-menu").each ( function (J) {
        var jThis   = $(this);
        var href    = jThis.find ('a[class="short-link"]').attr ("href");
        var idMtch  = href.split (/[qa]\/(\d+)/);
        if (idMtch.length > 2) {
            var id  = idMtch[1];
            jThis.append (
                '<span class="lsep">|</span><a href="/posts/' + id + '/revisions">revisions</a>'
            );
            jThis.append (
                '<span class="lsep">|</span><a href="/posts/' + id + '/timeline">timeline</a>'
            );
        }
    } );
    $(".revcell3.vm>div").each (function () {
        //-- Looks like a timebomb...
        guid = $(this).find ("a").attr ("href").match (/\w{8} (?:-\w{4} ){3}-\w{12}/)[0];
        $(this).prepend ('<a href="#rev' + guid + '">link</a><span class="lsep">|</span>');
    } );
}

withPages_jQuery (addUtilityLinks);

function withPages_jQuery (NAMED_FunctionToRun) {
    //--- Use named functions for clarity and debugging...
    var funcText        = NAMED_FunctionToRun.toString ();
    var funcName        = funcText.replace (/^function\s+(\w+)\s*\((.|\n|\r)+$/, "$1");
    var script          = document.createElement ("script");
    script.textContent  = funcText + "\n\n";
    script.textContent += 'jQuery(document).ready( function () {' + funcName + '(jQuery);} );';
    document.body.appendChild (script);
};
