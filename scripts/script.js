const categoriesContainer = document.getElementById('categories-container');
const treesContainer = document.getElementById('trees-container');
const spinner = document.getElementById('spinner');

const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
}

const displayCategories = (categories) => {
    categories.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline w-full';
        btn.onclick = () => selectCategory(item.id, btn);
        btn.textContent = item.category_name;
        categoriesContainer.appendChild(btn);
    })
}

const selectCategory = async (cat, btn) => {
    showSpinner();
    const allBtn = document.querySelectorAll('#categories-container button, #all-trees-btn');
    
    allBtn.forEach(item => {
        item.classList.remove('btn-primary');
        item.classList.add('btn-outline');
    })
    btn.classList.remove('btn-outline');
    btn.classList.add('btn-primary');

    const url = `https://openapi.programming-hero.com/api/category/${cat}`;
    const res = await fetch(url);
    const data = await res.json();
    hideSpinner();
    displayTrees(data.plants);
}

showSpinner = () => {
    spinner.classList.remove('hidden');
    // treesContainer.classList.add('hidden');
}

hideSpinner = () => {
    spinner.classList.add('hidden');
    // treesContainer.classList.remove('hidden');
}

const loadTrees = async () => {
    showSpinner();
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    displayTrees(data.plants);
    hideSpinner();
}

const displayTrees = (trees) => {
    treesContainer.innerHTML = "";
    trees.forEach(item => {
        const card = document.createElement('div');
        card.className = "card bg-base-100 shadow-sm";
        card.innerHTML = `
            <figure>
                <img src="${item.image}" alt="${item.name}" class="h-40 w-full" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${item.name}</h2>
                <p class="line-clamp-2">${item.description}</p>
                <div class="badge badge-outline badge-success">${item.category}</div>
                <div class="card-actions flex justify-between items-center">
                    <h2 class="font-bold text-2xl text-green-500">$${item.price}</h2>
                    <button class="btn btn-primary btn-sm">Buy Now</button>
                </div>
            </div>
        `;
        treesContainer.appendChild(card);
    })
}

loadCategories();
loadTrees();