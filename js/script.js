let productos = [
    { id: 1, nombre: "Aceite Helix 15w40 x 4lts", marca: "shell", categoria: "lubricantes", stock: 3, precio: 45500, rutaImagen: "../img/helix-15w40-4lts.jpg" },
    { id: 2, nombre: "Aceite Helix 15w40 x 1lt", marca: "shell", categoria: "lubricantes", stock: 8, precio: 12600, rutaImagen: "../img/helix-15w40-1lt.jpg" },
    { id: 3, nombre: "Aceite Helix 10w40 x 4lts", marca: "shell", categoria: "lubricantes", stock: 2, precio: 50600, rutaImagen: "../img/helix-10w40-4lts.jpg" },
    { id: 4, nombre: "Aceite Helix 10w40 x 1lt", marca: "shell", categoria: "lubricantes", stock: 4, precio: 13300, rutaImagen: "../img/helix-10w40-1lt.jpg" },
    { id: 5, nombre: "Aceite Helix 5w40 x 4lts", marca: "shell", categoria: "lubricantes", stock: 1, precio: 61400, rutaImagen: "../img/helix-5w40-4lts.jpg" },
    { id: 6, nombre: "Aceite Helix 5w40 x 1lt", marca: "shell", categoria: "lubricantes", stock: 7, precio: 16500, rutaImagen: "../img/helix-5w40-1lt.jpg" },
    { id: 7, nombre: "Kit Reglamentario Vehicular", marca: "fullRacing", categoria: "accesorios", stock: 7, precio: 53800, rutaImagen: "../img/kit-reglamentario.jpg" },
    { id: 8, nombre: "Infla y Sella Neumaticos", marca: "bardahl", categoria: "accesorios", stock: 7, precio: 7400, rutaImagen: "../img/inflaysella-bardahl.jpg" },
    { id: 9, nombre: "Llave Saca Filtros", marca: "wander", categoria: "accesorios", stock: 7, precio: 12750, rutaImagen: "../img/llave-saca-filtro.jpg" },
    { id: 10, nombre: "Lampara H4 12v", marca: "philips", categoria: "accesorios", stock: 7, precio: 5450, rutaImagen: "../img/lamp-h4-philips.jpg" },
    { id: 11, nombre: "Lampara H7 12v", marca: "philips", categoria: "accesorios", stock: 3, precio: 11700, rutaImagen: "../img/lamp-h7-philips.jpg" },
    { id: 12, nombre: "Guante Nitrilo Elastizado", marca: "dps", categoria: "accesorios", stock: 8, precio: 3600, rutaImagen: "../img/guante-dps-nitrilo.jpg" },
    { id: 13, nombre: "Cinta Aisladora 9 mts", marca: "3m", categoria: "accesorios", stock: 2, precio: 2200, rutaImagen: "../img/cinta-aisladora-3m.jpg" },
    { id: 14, nombre: "Aceite Actevo 4T 20w50 x1lt", marca: "castrol", categoria: "lubricantes", stock: 4, precio: 9500, rutaImagen: "../img/castrol-actevo-20w50.jpg" },
    { id: 15, nombre: "Aceite Go 2T x 1lt", marca: "castrol", categoria: "lubricantes", stock: 1, precio: 8800, rutaImagen: "../img/castrol-go-2t-1lt.jpg" },
    { id: 16, nombre: "Repara Radiadores", marca: "sundey", categoria: "accesorios", stock: 7, precio: 6650, rutaImagen: "../img/sundey-repara-radiadores.jpg" },
    { id: 17, nombre: "Sellador Pinchaduras", marca: "slime", categoria: "accesorios", stock: 0, precio: 22450, rutaImagen: "../img/slime-pomo.jpg" },
    { id: 18, nombre: "Lubricante Multiuso x 220gr", marca: "wd-40", categoria: "lubricantes", stock: 7, precio: 8650, rutaImagen: "../img/wd40-ft-220gr.jpg" },
    { id: 19, nombre: "Lubricante Multiuso x 3,78lts", marca: "wd-40", categoria: "lubricantes", stock: 7, precio: 42350, rutaImagen: "../img/wd40-1gallon.jpg" },
    { id: 20, nombre: "Lubricante Multiuso Seco x 226gr", marca: "wd-40", categoria: "lubricantes", stock: 7, precio: 9700, rutaImagen: "../img/wd40-lubr-seco.jpg" },
]


let contenedorProductos = document.querySelector("#contenedorProductos")
let inputBuscar = document.querySelector("#inputBuscar")
let botonBuscar = document.querySelector("#botonBuscar")
let selectFiltro = document.querySelector("#selectFiltro")
let selectPrecio = document.querySelector("#selectPrecio")
let botonAgregarAlCarrito = document.querySelectorAll(".botonAgregarAlCarrito")
let botonProductosCarrito = document.querySelector("#productosCarrito")
let botonesEliminar = document.querySelectorAll(".eliminarProducto")
let botonVaciar = document.querySelector(".vaciarCarrito")
let totalCompra = document.querySelector("#total")
let botonComprar = document.getElementById("botonComprar")




function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "producto"
        tarjetaProducto.innerHTML = `
            <div class="producto">
            <div class="imgContainer">
                <img class="productoImagen" src=${producto.rutaImagen} alt="${producto.nombre}" />
            </div>
            <div class="productoDetalles">
                <h3 class="productoNombre">${producto.nombre}</h3>
                <p class="productoMarca">${producto.marca}</p>
                <p class="productoPrecio">$ ${producto.precio}</p>
                <button id="${producto.id}" type="button" class="btn btn-sm btn-light botonAgregarAlCarrito">Agregar al carrito</button>
            </div>
            </div>
        `
        contenedorProductos.appendChild(tarjetaProducto)
    })
    actualizarBotonAgregar()
}

cargarProductos(productos);

botonBuscar.addEventListener("click", () => {
    let textoBusqueda = inputBuscar.value.toLowerCase()
    if (textoBusqueda) {
        let productosFiltrados = productos.filter(producto => 
            producto.nombre.toLowerCase().includes(textoBusqueda) || 
            producto.marca.toLowerCase().includes(textoBusqueda)
        );
        if (productosFiltrados.length > 0) {
            cargarProductos(productosFiltrados)
        } else {
            contenedorProductos.innerHTML = "<p>No se encontraron productos que coincidan con tu búsqueda.</p>"
        }
    } else {
        cargarProductos(productos)
    }
});

inputBuscar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        botonBuscar.click();
    }
});


selectFiltro.addEventListener("change", (e) => {
    let valorSeleccionado = e.target.value;

    if (valorSeleccionado) {
        if (valorSeleccionado === "categoriasTodas" || valorSeleccionado === "marcasTodas" ) {
            cargarProductos(productos);
        } else {
            let productosFiltrados = productos.filter(producto => 
                producto.categoria === valorSeleccionado || 
                producto.marca === valorSeleccionado
            );
            cargarProductos(productosFiltrados);
        }
    }
});


selectPrecio.addEventListener("change", (e) => {
    let valorSeleccionado = e.target.value;

    if (valorSeleccionado) {
        if (valorSeleccionado === "menorPrecio") {
            productos.sort((prodA, prodB) => prodA.precio - prodB.precio);
        } else if (valorSeleccionado === "mayorPrecio") {
            productos.sort((prodA, prodB) => prodB.precio - prodA.precio);
        }
        cargarProductos(productos);
    }
});


function actualizarBotonAgregar(){
    botonAgregarAlCarrito = document.querySelectorAll(".botonAgregarAlCarrito")
    botonAgregarAlCarrito.forEach(boton => {
        boton.addEventListener("click", agregarProductoAlCarrito)
    })
}


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (carrito.length > 0) {
    renderizarCarrito(carrito);
    actualizarTotal()
}


function agregarProductoAlCarrito(e){
    const idBoton = Number(e.target.id)
    let productoAgregado = productos.find(producto => producto.id === idBoton)
    
    if(carrito.some(producto => producto.id === idBoton)){
        const index = carrito.findIndex(producto => producto.id === idBoton)
        carrito[index].cantidad++
        carrito[index].subtotal = carrito[index].precioUnitario * carrito[index].cantidad

    } else {
        carrito.push({
        id: productoAgregado.id,
        nombre: productoAgregado.nombre,
        precioUnitario: productoAgregado.precio,
        cantidad: 1,
        subtotal: productoAgregado.precio,
        imagen: productoAgregado.rutaImagen,
        marca: productoAgregado.marca,
        
    })
}
renderizarCarrito(carrito)
localStorage.setItem("carrito", JSON.stringify(carrito))
actualizarTotal()
}


function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = ""
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class="carrito vacio">TU CARRITO ESTA VACÍO</p>`
    } else { 
    carrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "tarjetaCarrito"
        tarjetaCarrito.innerHTML = `
            <div class="productoNombre">
                <small>Producto:</small>
                <p>${producto.nombre}</p>
            </div>
            <div class="productoPrecio">
                <small>Precio:</small>
                <p>${producto.precioUnitario}</p>
            </div>
            <div class="productoCantidad">
                <small>Cantidad:</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="productoSubtotal">
                <small>Subtotal:</small>
                <p>${producto.subtotal}</p>
            </div>
            <button class="eliminarProducto btn btn-sm btn-light" type="button" id="${producto.id}">Eliminar</button>
        `
        contenedorCarrito.appendChild(tarjetaCarrito)
        })
        actualizarBotonEliminar()
    }
}


botonProductosCarrito.addEventListener("click", verOcultarCarrito)
function verOcultarCarrito(e) {
    let carrito = document.getElementById("carrito")
    let contenedorProductos = document.getElementById("contenedorProductos")
    let carritoAcciones = document.querySelector(".carritoAcciones")

    carrito.classList.toggle("oculta")
    contenedorProductos.classList.toggle("oculta")
    carritoAcciones.classList.toggle("oculta")

    if (e.target.innerText === "CARRITO") {
        e.target.innerText = "PRODUCTOS"
    } else {
        e.target.innerText = "CARRITO"
    }
}


actualizarBotonEliminar()


function actualizarBotonEliminar(){
    botonesEliminar = document.querySelectorAll(".eliminarProducto")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoDelCarrito)
    })
}


function eliminarProductoDelCarrito(e) {
    const idBoton = Number(e.target.id)
    const index = carrito.findIndex(producto => producto.id === idBoton)
    if (index > -1) {
        carrito.splice(index, 1)
        renderizarCarrito(carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito))
        actualizarTotal()
    }
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    carrito.length = 0
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
    actualizarTotal()
}

function actualizarTotal() {
    let total = carrito.reduce((acumulador, producto) => acumulador + producto.subtotal, 0);
    totalCompra.textContent = ` $${total}`;
}

cargarProductos(productos)
actualizarTotal(productos)

botonComprar.addEventListener("click", (e) => {
    if (carrito.length > 0) {
        Swal.fire("Gracias por su compra!");
        carrito.length = 0;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito(carrito);
        actualizarTotal();
    } else {
        Swal.fire("El carrito está vacío. ¡Agrega productos antes de comprar!");
    }
});
