const categoriesContainer = document.getElementById('categories-container');
const treesContainer = document.getElementById('trees-container');
const spinner = document.getElementById('spinner');
const allTreesBtn = document.getElementById('all-trees-btn');
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");
const emptyCartMessage = document.getElementById("empty-cart-message");
let cart = [];

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

const selectCategory = async (catId, btn) => {
    showSpinner();
    const allBtn = document.querySelectorAll('#categories-container button, #all-trees-btn');
    
    allBtn.forEach(item => {
        item.classList.remove('btn-primary');
        item.classList.add('btn-outline');
    })
    btn.classList.remove('btn-outline');
    btn.classList.add('btn-primary');

    const url = `https://openapi.programming-hero.com/api/category/${catId}`;
    const res = await fetch(url);
    const data = await res.json();
    hideSpinner();
    displayTrees(data.plants);
}

showSpinner = () => {
    spinner.classList.remove('hidden');
}

hideSpinner = () => {
    spinner.classList.add('hidden');
}

allTreesBtn.addEventListener('click', () => {
    const allBtn = document.querySelectorAll('#categories-container button, #all-trees-btn');
    
    allBtn.forEach(item => {
        item.classList.remove('btn-primary');
        item.classList.add('btn-outline');
    })
    allTreesBtn.classList.remove('btn-outline');
    allTreesBtn.classList.add('btn-primary');
    
    loadTrees();
})



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
                <h2 onclick="displayTreeDetails(${item.id})" class="card-title">${item.name}</h2>
                <p class="line-clamp-2">${item.description}</p>
                <div class="badge badge-outline badge-success">${item.category}</div>
                <div class="card-actions flex justify-between items-center">
                    <h2 class="font-bold text-2xl ${item.price>500? "text-red-500":"text-green-500"}">$${item.price}</h2>
                    <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" class="btn bg-[#00C950] text-white font-bold btn-sm">Cart</button>
                </div>
            </div>
        `;
        treesContainer.appendChild(card);
    })
}

const addToCart = (id, name, price) => {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } 
    else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

const updateCart = () => {
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        totalPrice.innerText = "0";
        return;
    }
    emptyCartMessage.classList.add('hidden');

    let total = 0;
    cart.forEach(item => {
        total += (item.price * item.quantity);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="bg-slate-200 p-2 rounded-lg">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="font-bold text-lg">${item.name}</h3>
                    <p>$${item.price} x ${item.quantity}</p>
                  </div>
                  <button onclick="removeCart(${item.id})" class="btn btn-ghost outline-none">X</button>
                </div>
                <h3 class="flex justify-end text-xl font-bold">$${item.price * item.quantity}</h3>
             </div>
             
        `;
        cartContainer.appendChild(newDiv);
    });
    totalPrice.innerText = total;
}

const removeCart = (id) => {
    console.log(id);
    cart = cart.filter(item => item.id != id);
    updateCart();
}

const displayTreeDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const tree = data.plants;

    const treeDetails = document.getElementById("tree-details");
    treeDetails.innerHTML = `
        <figure>
            <img src="${tree.image}" alt="${tree.name}" class="w-full h-60" />
        </figure>
        <h2 class="card-title">${tree.name}</h2>
        <p class="line-clamp-2">${tree.description}</p>
        <div class="badge badge-outline badge-success">${tree.category}</div>
        <div class="card-actions flex justify-between items-center">
            <h2 class="font-bold text-2xl text-green-500">$${tree.price}</h2>
        </div>
    `;

    document.getElementById("my_modal_5").showModal();

}

loadCategories();
loadTrees();