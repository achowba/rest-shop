const productsUrl = 'http://localhost:2806/products/';

let productWrapper = document.querySelector("#products");
let singleProductWrapper = document.querySelector("#single-product");
let cardsLoader = document.querySelector("#cards-loader");
let cardLoader = document.querySelector("#card-loader");
let alertSuccess = document.querySelector(".alert-success");
let alertInfo = document.querySelector(".alert-info");
let alertError = document.querySelector(".alert-error");

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
}

let body = {};
let parameterArray = [];
let parameterValue = null;
let productsContent = '';
let singleProductContent = '';
let productId = ''
let singleProductsUrl = '';

document.addEventListener('click', function (e){
    if(e.target && e.target.id == 'delete-button'){
        let productId = e.target.dataset.productid;
        let productItem = e.target.parentElement.style;

        alertInfo.style.display = 'block';
        deleteProduct(productId, productItem);
        // console.log(e);
    }
});

productId = getURLParameter("productId");

if (productId) {
    singleProductsUrl = `http://localhost:2806/products/${productId}`;
    getSingleProduct(singleProductsUrl);
    cardsLoader.style.display = 'none';
} else {
    getAllProducts();
    cardLoader.style.display = 'none';
}

function getURLParameter(parameterName) {
    location.search.substr(1).split("&").map((item) => {
        parameterArray = item.split("=");
            if (parameterArray[0] === parameterName) {
                parameterValue = decodeURIComponent(parameterArray[1]);
            }
        }
    );
    return parameterValue;
}

async function fetchData (url, method) {
    if (method == 'DELETE') {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(url, {
        method,
        headers
    });
    let data = await response.json();
    return data;
}

function getAllProducts () {
    fetchData(productsUrl, 'GET').then((res) => {
        displayProducts(res.products);
    });
}

function getSingleProduct (url) {
    fetchData(url, 'GET').then((res) => {
        displaySingleProduct(res.product);
        return res;
    });
}

function displayProducts (productsArray) {
    productsArray.sort().map((product) => {
        productsContent += `
            <section class="card">
                <figure class="card-image">
                    <img class="image" src="${product.imageUrl}" alt="Product Image"/>
                </figure>
                <div class="card-detail">
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-description"><b>AED </b>${product.price}</p>
                </div>
                <a class="view-details" href=${location.href}?productId=${product._id} target="_blank" rel="noopener noreferrer">View Details</a>
                <a id="delete-button" data-productId=${product._id} onclick="">Delete</a>
            </section>
        `;

        productWrapper.innerHTML = productsContent;
        cardsLoader.style.display = 'none';
        // deleteProductButton = document.querySelector("#delete-button");
    });
}

function displaySingleProduct (productObject) {
    singleProductContent += `
        <section class="card">
            <figure class="card-image">
                <img class="image" src="${productObject.imageUrl}" alt="Product Image"/>
            </figure>
            <div class="card-detail">
                <h3 class="card-title">${productObject.name}</h3>
                <p class="card-description"><b>AED </b>${productObject.price}</p>
            </div>
            <a class="add-to-cart" data-productId=${productObject._id} target="_blank" rel="noopener noreferrer">Add to Cart</a>
        </section>
    `;

    singleProductWrapper.innerHTML = singleProductContent;
    cardLoader.style.display = 'none';
}

function deleteProduct (productId, productItem) {
    console.log(productId);

    let productUrl = `http://localhost:2806/products/${productId}`;
    fetch(productUrl, {
        method: 'delete',
        body: JSON.stringify({
            productId,
        }),
        headers,
    }).then((res) => {
        res.json().then((data) => {
            if (data.status == 'success') {
                productItem.display = "none";
                alertInfo.style.display = 'none';
                alertSuccess.style.display = 'block';

                hideAlert(alertSuccess);
            } else {
                alertError.style.display = 'block';
                hideAlert(alertError);
                hideAlert(alertInfo);
            }
        });
    }).catch((e) => {
        console.log(e.message);
        alertError.style.display = 'block';
    });

}

function deleteData(item, url) {
    return fetch(url + '/' + item, {
        method: 'delete'
    }).then(response =>
        response.json().then(json => {
        return json;
        })
    );
}

function hideAlert (alertDiv) {
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 3000);
}
