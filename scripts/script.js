const loadCategories = async () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
}

const displayCategories = (categories) => {
    console.log(categories);
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(item => {
        console.log(item.category_name);
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline w-full';
        btn.textContent = item.category_name;
        categoriesContainer.appendChild(btn);
    })
}

loadCategories();