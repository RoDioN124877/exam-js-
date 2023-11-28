document.getElementById('priceFilter').addEventListener('change', function() {
    const priceRange = this.value;
    const filteredByPrice = filterByPrice(cards_arrr, priceRange);
    render_all(filteredByPrice);
});
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
        const price = e.breeds[0].name.length * 3000;
        return price >= min && price <= max;
    });
}

function filterByName(cards, searchText) {
    return cards.filter(e => e.breeds[0].name.toLowerCase().includes(searchText));
}
document.getElementById('searchInput').addEventListener('input', function() {
    if (document.querySelector('.container__cotolog').querySelectorAll('.card').length == 0) {
        document.querySelector('.info_ppp').innerHTML = "Ничего не найдено"
    }
    else{
        document.querySelector('.info_ppp').innerHTML = " "
    }
});
