document.getElementById('priceFilter').addEventListener('change', function() {
    const priceRange = this.value;
    const filteredByPrice = filterByPrice(cards_arrr, priceRange);
    render_all(filteredByPrice);
});
cards_arrr.filter(e)
// Поиск по имени
document.getElementById('searchInput').addEventListener('input', function() {
    const searchText = this.value.trim().toLowerCase();
    const filteredByName = filterByName(cards_arrr, searchText);
    render_all(filteredByName);
});

function filterByPrice(cards, priceRange) {
    if (priceRange === 'all') return cards;

    const [min, max] = priceRange.split('-').map(Number);
    return cards.filter(e => {
        console.log(e);
        const price = e.breeds[0].name.length * 1000;
        return price >= min && price <= max;
    });
}

function filterByName(cards, searchText) {
    return cards.filter(e => e.breeds[0].name.toLowerCase().includes(searchText));
}

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
