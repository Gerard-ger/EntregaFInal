const socket = io()

socket.on('CartProductList', productsCart => {
    
    const products = productsCart.products
    const productListDiv = document.querySelector('#productsCart-list')
    let html = ''

    products.forEach(product => {
        html += `
        <div class="product">
        <h2>${product.productId.title}</h2>
        <img src="${product.productId.thumbnail}" alt="${product.productId.title}" width="150">
        <p>${product.productId.description}</p>
        <p>Price: ${product.productId.price}</p>
        <p>Cantidad: ${product.quantity}</p>
        <form>
            <button class="delete-product" data-id="${product.productId._id}" cart-id="${productsCart._id}">quitar del carrito</button>
        </form>
    </div>

    `
    })
    productListDiv.innerHTML = html
})

//botones equitar de carrito
const productListDiv = document.querySelector('#productsCart-list')

productListDiv.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-product')) {

        const productId = event.target.getAttribute('data-id')
        const cartId = event.target.getAttribute('cart-id')//'66d729f3d403fb9c06ff344a'
        const data = { cartId, productId }
        socket.emit('deleteProductToCart', data)
        
    }
});

