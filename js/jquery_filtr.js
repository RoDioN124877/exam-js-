jQuery(function ($) {
    function fixDiv() {
        var $cache = $('#filtr');
        if ($(window).scrollTop() > 220)
            $cache.css({
                'position': 'fixed',
                'top': '0px',

            });
        else
            $cache.css({
                'position': 'relative',
                'top': '0px',

            });
    }
    $(window).scroll(fixDiv);
    fixDiv();
});
jQuery(function ($) {
    function fixDiv() {
        var $cache = $('#titel_cotici');
        if ($(window).scrollTop() > 220)
            $cache.css({
                'margin-top': '127px',

            });
        else
            $cache.css({
                'margin-top': '0px',

            });
    }
    $(window).scroll(fixDiv);
    fixDiv();
});
