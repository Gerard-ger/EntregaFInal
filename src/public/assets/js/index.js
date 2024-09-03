const socket = io()

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
        <button class="btn btn-outline-dark w-100 delete-button" data-id="${product._id}">Eliminar</button>
    </div>
</div>           
        `
    })
    productListDiv.innerHTML = html
})


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

    form.reset()

})


document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll('[data-id]')
    console.log("se creo un evento", deleteButtons.length);

    deleteButtons.forEach(button => {      
        button.addEventListener('click', () => {
            const productId = this.getAttribute('data-id')

            console.log(productId);

            //socket.emit('deleteProduct', {_id: productId})

        })
    })

})




