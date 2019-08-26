// ==UserScript==
// @name Show deleted chat messages for Stack Exchange
// @grant GM_registerMenuCommand
// @match *://chat.stackexchange.com/*
// ==/UserScript==

function showDeleted() {

    var userscript = function($) {

    $('span.deleted').closest('.message').each(function() {
        var id = this.id.replace('message-', ''), _this = this;
        $.get('/messages/' + id + '/history', function(data) {
            var msgtxt = data.match(/<div class="content">([\s\S]+?)<\/div>/)[1].trim();
            var deletedBy = $('b:contains("deleted")', data).closest('.monologue').find('.username a').text();
            $('.content > span', _this)
                .html(msgtxt)
                .attr('title', 'Deleted by ' + deletedBy)
                .css({backgroundColor: '#f4eaea', color: '#990000'});
        });
    });

    };

    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.text = '(' + userscript + ')(jQuery);';
    document.head.appendChild(el);

}

setTimeout(showDeleted,2000);
GM_registerMenuCommand('showDeleted', showDeleted);
