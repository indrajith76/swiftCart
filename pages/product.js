const productsContainer = document.getElementById("products-container");
const productDetailsModal = document.getElementById("productDetailsModal");
const productDetailsBox = document.getElementById("productDetailsDiv");

function product() {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => productsDisplayHandler(data))
}

function productDetails(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => displayProductDetailsHandler(data))
}

function category() {
    fetch("https://fakestoreapi.com/products/categories")
        .then(res => res.json())
        .then(data => categoryDisplayHandler(data))
}

function categoryHandler(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => productsDisplayHandler(data))
}

const categoryDisplayHandler = (categories) => {
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";
    const allProductBtn = document.createElement("li");
    allProductBtn.innerHTML = `
    <button onclick="product()" class="cursor-pointer w-full px-3 py-1 text-white transition bg-orange-600 rounded-3xl hover:bg-orange-700 capitalize">all</button>
    `;
    categoryList.append(allProductBtn)

    categories.map(c => {
        const li = document.createElement("li");
        li.innerHTML = `
        <button onclick="categoryHandler(${"`" + c + "`"})" class="cursor-pointer w-full px-3 py-1 text-gray-800 hover:text-white font-medium transition bg-white border border-gray-300 rounded-3xl hover:bg-orange-600 capitalize">${c}</button>
        `;
        categoryList.append(li);
    });

}

function productsDisplayHandler(products) {
    productsContainer.innerHTML = "";
    products.map(p => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class=" overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div class="flex items-center justify-center p-4 bg-[#f0f2f5]">
                    <img src="${p.image}"
                        class="object-contain h-64 mix-blend-multiply" />
                </div>

                <div class="p-5">
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                            ${p.category}
                        </span>
                        <div class="flex items-center gap-1 text-sm text-gray-500">
                            <i class="fa-solid fa-star text-yellow-500"></i>
                            <span>${p.rating.rate} (${p.rating.count})</span>
                        </div>
                    </div>

                    <h3 class="mb-2 text-lg font-medium text-gray-800 line-clamp-1">
                        ${p.title}
                    </h3>

                    <p class="mb-6 text-lg font-bold text-gray-900 font2nd">
                        $${p.price}
                    </p>

                    <div class="flex gap-3">
                        <button
                            onclick="productDetails(${p.id})"
                            class="flex items-center justify-center w-full gap-1 py-1 text-gray-600 transition border border-gray-300 rounded-xl hover:bg-gray-50">
                            <i class="fa-regular fa-eye text-sm"></i>
                            Details
                        </button>

                        <button
                            class="flex items-center justify-center w-full gap-1 py-1 text-white transition bg-orange-600 rounded-xl hover:bg-orange-700">
                            <i class="fa-solid fa-cart-arrow-down"></i>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(card)
    });
}

function displayProductDetailsHandler(data) {
    productDetailsModal.classList.remove("hidden");
    window.document.body.classList.add("overflow-hidden")
    productDetailsBox.innerHTML = "";
    productDetailsBox.innerHTML = `
            <div class="p-4 bg-[#f0f2f5]">
                <img src="${data.image}" class="object-contain h-auto lg:h-full min-w-48 mix-blend-multiply" />
            </div>
            <div class="flex flex-col justify-between py-5 pr-5"> 
                <h3 class="text-lg lg:text-2xl font-medium text-gray-800">
                    ${data.title}
                </h3>
                <div class="flex items-center justify-between my-5">
                    <span class="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                        ${data.category}
                    </span>
                    <div class="flex items-center gap-1 text-sm text-gray-500">
                        <i class="fa-solid fa-star text-yellow-500"></i>
                        <span>${data.rating.rate} (${data.rating.count})</span>
                    </div>
                </div>

                <p class="text-xs lg:text-[16px]">${data.description}</p>

                <div class="flex items-center justify-between mt-5">
                    <p class="text-xl font-bold text-gray-900 font2nd">
                       Price: $${data.price}
                    </p>
                    <button
                        class="flex items-center justify-center gap-1 px-5 py-1 text-white transition bg-orange-600 rounded-xl hover:bg-orange-700">
                        <i class="fa-solid fa-cart-arrow-down"></i>
                        Add
                    </button>
                </div>
            </div>            

    <button onclick="closeModal()" class="absolute cursor-pointer -right-2 -top-2"><i class="fa-solid fa-circle-xmark"></i></button>
    `;
}

function closeModal() {
    productDetailsModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}


category()
product()