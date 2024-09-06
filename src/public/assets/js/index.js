const socket = io()

//socket para generar vista de productos
socket.on('productList', products => {
    // console.log(products)
    const productListDiv = document.querySelector('#product-list')
    let html = ''

    products.forEach(product => {
        html += `
<div class="product">
    <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
    <div class="product-body">
        <h5 class="product-title">${product.title}</h5>
        <p class="product-text">Descripcion: ${product.description}</p>
        <p class="product-text">Codigo: ${product.code}</p>
        <p class="product-text">Precio: ${product.price}</p>
        <p class="product-text">Status: ${product.status}</p>
        <p class="product-text">Stock: ${product.stock}</p>
        <p class="product-text">Categoria: ${product.category}</p>
        <p class="product-text">ID: ${product._id}</p>
    </div>
    <div class="product-footer">
        <button class="btn btn-outline-dark w-100 button-delete" data-id="${product._id}">Eliminar</button>
    </div>
</div>           
        `
    })
    productListDiv.innerHTML = html
})

//carga de formulario a la DB
let form = document.querySelector('#products-form')

form.addEventListener('submit', evt => {
    evt.preventDefault()

    const title = form.elements.title.value
    const description = form.elements.description.value
    const code = Number(form.elements.code.value)
    const price = Number(form.elements.price.value)
    const status = form.elements.status.value
    const stock = Number(form.elements.stock.value)
    const category = form.elements.category.value
    const thumbnail = form.elements.thumbnail.value

    const nuevoProduct = { title, description, code, price, status, stock, category, thumbnail }

    socket.emit('addProduct', nuevoProduct)

    //form.reset()

})

//botones eliminar
const productListDiv = document.querySelector('#product-list')

productListDiv.addEventListener('click', function(event) {
    if (event.target.classList.contains('button-delete')) {

        const productId = event.target.getAttribute('data-id')
        socket.emit('deleteProduct', productId)

    }
});





