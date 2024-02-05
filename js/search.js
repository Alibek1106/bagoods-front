const currentPage = window.location.pathname;

const allProductsContainer = currentPage.includes("index.html")
    ? document.querySelector('.index-all-products-boxes')
    : document.querySelector('.all-products-boxes');

const otherBlocksToHide = currentPage.includes("index.html")
    ? document.querySelectorAll('.hero, .bestseller, .footer')
    : [];

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchError = document.getElementById('searchError');

function hideOtherBlocks() {
    otherBlocksToHide.forEach(block => {
        block.style.display = 'none';
        document.querySelector(".index-all-products-header").style.display = 'none'
        document.querySelector(".all-products-signing").style.display = 'none'
    });
}

function displayProducts(products) {
    hideOtherBlocks();
    allProductsContainer.innerHTML = '';

    products.forEach(product => {
        const productBox = document.createElement('a');
        productBox.className = 'all-products-box';
        productBox.href = `https://bagoods.kg/single-product.html?id=${product.id}`;

        const imageHTML = `<img src="https://bagoods.kg${product.main_image?.image || ''}" alt="${product.name}">`;
        const nameHTML = `<h4>${product.name}</h4>`;

        const priceHTML = product.old_price
            ? `<span class="old-price">${product.old_price} с.</span><span class="price">${product.current_price} с.</span>`
            : `<span class="price">${product.current_price} с.</span>`;

        productBox.innerHTML = `${imageHTML}${nameHTML}${priceHTML}`;
        allProductsContainer.appendChild(productBox);
    });
}

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        try {
            const searchUrl = `https://bagoods.kg/api/v1/products/?search=${encodeURIComponent(searchTerm)}`;
            const response = await fetch(searchUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const searchData = await response.json();
            displayProducts(searchData.results);
            searchError.textContent = '';
        } catch (error) {
            console.error('Ошибка запроса:', error);
            searchError.textContent = 'Произошла ошибка при выполнении запроса.';
        }
    } else {
        searchError.textContent = 'Введите запрос перед отправкой.';
    }
});
