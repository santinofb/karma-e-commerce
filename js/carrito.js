const productosCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const btnVaciar = document.querySelector("#carrito-acciones-vaciar");
const btnComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
    
        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">

                
                <div class="carrito-producto-titulo">
                    <small>${producto.categoria.nombre}</small>
                    <h3 title="${producto.titulo}">${producto.titulo}</h3>
                </div>
                

                <div class="carrito-producto-talle">
                    <small>Talle</small>
                    <h3>${producto.talle}</h3>
                </div>
        
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <h3>${producto.cantidad}</h3>
                </div>
        
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <h3>$${producto.precio}</h3>
                </div>
        
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <h3>$${producto.precio * producto.cantidad}</h3>
                </div>

                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
    
            carritoProductos.append(div);
        })
    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
    
    actualizarBtnEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBtnEliminar() {
    btnEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    });
}

function eliminarCarrito(e) {

    Toastify({
        text: "Producto eliminado",
        duration: 1000,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
          background: "#961818",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem",
          cursor: "default"
        },
        offset: {
            x: "1rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const btnId = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === btnId); 

    productosCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

btnVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: "¿Estas seguro?",
        text: "Se van a eliminar todos tus productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero eliminarlos!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminados!",
            text: "Tus productos fueron eliminados.",
            icon: "success"
          });
            productosCarrito.length = 0;
            localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
            cargarProductosCarrito();
        }
    });
}

function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerHTML = `$${totalCalculado}`;
}

btnComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}