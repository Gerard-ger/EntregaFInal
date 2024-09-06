document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.agregar-carrito');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const cartId = '66d729f3d403fb9c06ff344a';  // ver como usar el ID del carrito dinámicamente 
            
            //intente meter un Toasti pero no me anda bien, no se porque
            Toastify({
                text: `Se agregó el producto al carrito`,
                className: "info",
                duration: 3000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            
            // Enviar la solicitud al servidor
            fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'POST'
            })
           
        });
    });
});

