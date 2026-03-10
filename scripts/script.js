const categoriesContainer = document.getElementById('categories-container');
const treesContainer = document.getElementById('trees-container');


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
        btn.textContent = item.category_name;
        categoriesContainer.appendChild(btn);
    })
}

const loadTrees = async () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    displayTrees(data.plants);
}

const displayTrees = (trees) => {
    console.log(trees);
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