var productNameInput = document.getElementById("pName");
var productPriceInput = document.getElementById("pPrice");
var productCategoryInput = document.getElementById("pCategory");
var productDescriptionInput = document.getElementById("pDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var tb = document.getElementById("tb");
var tableBody = document.getElementById("tableBody")
var notMatch = document.getElementById("notMatch");
var localStorageKey = "products"


var productsContainer = []
if (localStorage.getItem("products") != null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsContainer)
}

function addProduct() {
    if (validateProductName() && validateProducPrice() && validateProductCategory() && validateProductDesc()) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            description: productDescriptionInput.value,
        }
        productsContainer.push(product);
        displayProducts(productsContainer);
        localStorage.setItem("products", JSON.stringify(productsContainer));
    }

    // clearForm();
}

function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}

function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
}

function displayProducts(list) {
    var cartona = "";
    for (i = 0; i < list.length; i++) {
        cartona += `<tr>
<td id="updateName" class="text-capitalize">${list[i].newName ? list[i].newName : list[i].name}</td>
<td id="updatePrice">${list[i].price}</td>
<td id="updateCategory">${list[i].category}</td>
<td id="updateDescriprion">${list[i].description}</td>
<td><button onclick="setFormForUpdate(${i})" class="btn btn-warning btn-sm ">Update</button></td>
<td><button class="btn btn-danger  btn-sm " onclick="deleteProduct(${i})">Delete</button></td>
</tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}
var productUpdateValue = 0;

function setFormForUpdate(index) {
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDescriptionInput.value = productsContainer[index].description;
    productUpdateValue = index;
}

function updateProduct() {

    var productsOfUpdate = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    }
    productsContainer.splice(productUpdateValue, 1, productsOfUpdate);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts(productsContainer);
    addBtn.classList.replace('d-none', 'd-block');
    updateBtn.classList.replace('d-block', 'd-none');
    clearForm();

}


function searchProducts() {
    var matchedProducts = [];
    var keyword = document.getElementById("psearch").value;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(keyword.toLowerCase()) === true) {
            productsContainer[i].newName = productsContainer[i].name.toLowerCase().replace(keyword, `<span class='text-danger fw-bolder'>${keyword}</span>`);
            matchedProducts.push(productsContainer[i]);
            displayProducts(matchedProducts);
        }
    }
    if (matchedProducts.length == 0) {
        document.getElementById("tableBody").innerHTML = `<span class="text-danger fw-bolder ps-5 ms-5">Not Matched</span>`;
    }

}

function validateProductName() {
    var regex = /^[A-Z][a-z]{3,6}$/;
    var isValid = regex.test(productNameInput.value);
    if (isValid) {
        document.getElementById("nameError").classList.replace('d-inline-block', 'd-none');
    } else {
        document.getElementById("nameError").classList.replace('d-none', 'd-inline-block');
    }
    return isValid;
}

function validateProducPrice() {
    var regex = /^[1-9]{1}[0-9]{3,}$/;
    var isValid = regex.test(productPriceInput.value);
    if (isValid) {
        document.getElementById("priceError").classList.replace('d-inline-block', 'd-none');
    } else {
        document.getElementById("priceError").classList.replace('d-none', 'd-inline-block');
    }
    return isValid;
}

function validateProductCategory() {
    var regex = /^[a-z]{3,7}$/;
    var isValid = regex.test(productCategoryInput.value);
    if (isValid) {
        document.getElementById("categoryError").classList.replace('d-inline-block', 'd-none');
    } else {
        document.getElementById("categoryError").classList.replace('d-none', 'd-inline-block');
    }
    return isValid;
}

function validateProductDesc() {
    var regex = /^[a-z]{4,}$/;
    var isValid = regex.test(productDescriptionInput.value);
    if (isValid) {
        document.getElementById("descError").classList.replace('d-inline-block', 'd-none');
    } else {
        document.getElementById("descError").classList.replace('d-none', 'd-inline-block');
    }
    return isValid;
}

// validateProductName(productNameInput.value);