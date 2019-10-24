// fetch api without async/await
function fetchProducts (url) {
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        // displayProducts(data.products);
    }).catch((err) => {
        console.log(err);
    });
}