let productosOriginales = []
function obtenerProductos() {
    fetch("../info.json")
        .then(response => response.json())
        .then(productos => {
            productosOriginales = JSON.parse(JSON.stringify(productos))
            principal(productos)
        })
        .catch(error => {
            console.error('Ocurrió un error:', error)
            Swal.fire({
                icon: 'error',
                iconColor: "red",
                title: 'Error',
                text: 'Algo salió mal. Por favor, intenta nuevamente más tarde.',
                background: "linear-gradient(0deg, rgba(215, 223, 222, 1.0), rgba(85, 87, 86, 1.0))",
                color: "black",
            })
        })
}

function principal(productos) {

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
        let botonComprar = document.querySelector("#botonComprar")


        function cargarProductos(productosElegidos) {
            contenedorProductos.innerHTML = ""
            contenedorProductos.style.display = "grid"
            productosElegidos.forEach(producto => {
                let tarjetaProducto = document.createElement("div")
                tarjetaProducto.className = "producto"
                tarjetaProducto.innerHTML = `
                <div class="imgContainer">
                    <img class="productoImagen" src=${producto.rutaImagen} alt="${producto.nombre}" />
                </div>
                <div class="productoDetalles">
                    <h3 class="productoNombre">${producto.nombre}</h3>
                    <p class="productoMarca">${producto.marca}</p>
                    <p class="productoPrecio">$ ${producto.precio.toLocaleString('es-AR')}</p>
                    <button id="${producto.id}" type="button" class="btn btn-sm btn-light botonAgregarAlCarrito">Agregar al carrito</button>
                </div>
            `
                contenedorProductos.appendChild(tarjetaProducto)
            })
            actualizarBotonAgregar()
        }

        cargarProductos(productos)

        botonBuscar.addEventListener("click", () => {
            let textoBusqueda = inputBuscar.value.toLowerCase()
            if (textoBusqueda) {
                let productosFiltrados = productos.filter(producto =>
                    producto.nombre.toLowerCase().includes(textoBusqueda) ||
                    producto.marca.toLowerCase().includes(textoBusqueda)
                )
                if (productosFiltrados.length > 0) {
                    cargarProductos(productosFiltrados)
                } else {
                    contenedorProductos.innerHTML = `<p class="mensajeBuscador">No se encontraron productos que coincidan con tu búsqueda.</p>`
                    contenedorProductos.style.display = "flex"
                    contenedorProductos.style.justifyContent = "center"
                    contenedorProductos.style.alignItems = "center"
                }
            } else {
                cargarProductos(productos)
            }
        })

        inputBuscar.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                botonBuscar.click()
            }
        })

        selectFiltro.addEventListener("change", (e) => {
            let valorSeleccionado = e.target.value

            if (valorSeleccionado) {
                if (valorSeleccionado === "categoriasTodas" || valorSeleccionado === "marcasTodas") {
                    cargarProductos(productos)
                } else {
                    let productosFiltrados = productos.filter(producto =>
                        producto.categoria === valorSeleccionado ||
                        producto.marca === valorSeleccionado
                    )
                    cargarProductos(productosFiltrados)
                }
            }
        })


        selectPrecio.addEventListener("change", (e) => {
            let valorSeleccionado = e.target.value

            if (valorSeleccionado) {
                if (valorSeleccionado === "menorPrecio") {
                    productos.sort((prodA, prodB) => prodA.precio - prodB.precio)
                } else if (valorSeleccionado === "mayorPrecio") {
                    productos.sort((prodA, prodB) => prodB.precio - prodA.precio)
                }
                cargarProductos(productos)
            }
        })


        function actualizarBotonAgregar() {
            botonAgregarAlCarrito = document.querySelectorAll(".botonAgregarAlCarrito")
            botonAgregarAlCarrito.forEach(boton => {
                boton.addEventListener("click", agregarProductoAlCarrito)
            })
        }


        let carrito = JSON.parse(localStorage.getItem("carrito")) || []

        if (carrito.length > 0) {
            renderizarCarrito(carrito)
            actualizarTotal()
        }


        function agregarProductoAlCarrito(e) {
            const idBoton = Number(e.target.id)
            let productoAgregado = productos.find(producto => producto.id === idBoton)
            if (productoAgregado.stock > 0){
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 3000,
                    destination: "https://josemeneguzzi.github.io/meneguzzi-combustibles/pages/tienda.html",
                    newWindow: true,
                    avatar: "../img/emoji-smile.svg",
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(0deg, rgba(215, 223, 222, 1.0), rgba(85, 87, 86, 1.0))",
                        color: "black",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        textAlign: "justify",
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                        fontfamily: "Lato, sans-serif",
                        gap: "10px",
                    },
                    onClick: function () { }
                }).showToast()
                if (carrito.some(producto => producto.id === idBoton)) {
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
                productoAgregado.stock--
                renderizarCarrito(carrito)
                localStorage.setItem("carrito", JSON.stringify(carrito))
                actualizarTotal()
            } else {
                Swal.fire({
                    title: "Sin stock",
                    icon: "warning",
                    text: "Este producto no está disponible en este momento.",
                    confirmButtonColor: "black",
                    background: "linear-gradient(0deg, rgba(215, 223, 222, 1.0), rgba(85, 87, 86, 1.0))",
                    color: "black",
                    iconColor: "#ffa500",
                })
            }
        }


        function renderizarCarrito(carrito) {
            let contenedorCarrito = document.querySelector("#carrito")
            contenedorCarrito.innerHTML = ""
            if (carrito.length === 0) {
                contenedorCarrito.innerHTML = `<p class="carritoVacio">Tu carrito está vacío <i class="bi bi-emoji-frown-fill"></i></p>`
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
                    <p>$${producto.precioUnitario.toLocaleString('es-AR')}</p>
                </div>
                <div class="productoCantidad">
                    <small>Cantidad:</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="productoSubtotal">
                    <small>Subtotal:</small>
                    <p>$${producto.subtotal.toLocaleString('es-AR')}</p>
                </div>
                <div class="productoEliminar">
                    <button class="eliminarProducto btn btn-sm btn-light" type="button" id="${producto.id}">Eliminar</button>
                </div>
            `
                    contenedorCarrito.appendChild(tarjetaCarrito)
                })
                actualizarBotonEliminar()
            }
        }


        botonProductosCarrito.addEventListener("click", verOcultarCarrito)
        function verOcultarCarrito(e) {
            let carrito = document.querySelector("#carrito")
            let contenedorProductos = document.querySelector("#contenedorProductos")
            let carritoAcciones = document.querySelector(".carritoAcciones")

            carrito.classList.toggle("oculta")
            contenedorProductos.classList.toggle("oculta")
            carritoAcciones.classList.toggle("oculta")

            if (botonProductosCarrito.innerHTML.includes("Carrito")) {
                botonProductosCarrito.innerHTML = 'Productos <i class="bi bi-grid-3x3-gap-fill"></i>'
            } else {
                botonProductosCarrito.innerHTML = 'Carrito <i class="bi bi-cart-fill"></i>'
            }
        }

        actualizarBotonEliminar()


        function actualizarBotonEliminar() {
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
                renderizarCarrito(carrito)
                localStorage.setItem("carrito", JSON.stringify(carrito))
                actualizarTotal()
            }
        }

        botonVaciar.addEventListener("click", vaciarCarrito)

        function vaciarCarrito() {
            productos.forEach((producto, index) => {
                producto.stock = productosOriginales[index].stock
            })
            carrito.length = 0
            localStorage.setItem("carrito", JSON.stringify(carrito))
            renderizarCarrito(carrito)
            actualizarTotal()
        }

        function actualizarTotal() {
            let total = carrito.reduce((acumulador, producto) => acumulador + producto.subtotal, 0)
            totalCompra.textContent = ` $${total.toLocaleString('es-AR')}`
        }

        cargarProductos(productos)
        actualizarTotal(productos)

        botonComprar.addEventListener("click", (e) => {
            if (carrito.length > 0) {
                Swal.fire({
                    title: "Está seguro que quiere realizar esta compra?",
                    showDenyButton: true,
                    icon: "question",
                    confirmButtonText: "Si",
                    denyButtonText: "No",
                    denyButtonColor: "black",
                    background: "linear-gradient(0deg, rgba(215, 223, 222, 1.0), rgba(85, 87, 86, 1.0))",
                    color: "black",
                    confirmButtonColor: "black",
                    iconColor: "#0084ffe4",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Gracias por su compra!",
                            icon: "success",
                            background: "linear-gradient(0deg, rgba(215, 223, 222, 1.0), rgba(85, 87, 86, 1.0))",
                            color: "black",
                            confirmButtonColor: "black",
                            iconColor: "#1eff00a8 ",
                        })
                        carrito.length = 0
                        localStorage.setItem("carrito", JSON.stringify(carrito))
                        renderizarCarrito(carrito)
                        actualizarTotal()
                    } else if (result.isDenied) {
                        Swal.fire({
                            title: "Compra cancelada",
                            icon: "info",
                            background: "linear-gradient(0deg, rgba(215, 223, 222, 1.0), rgba(85, 87, 86, 1.0))",
                            color: "black",
                            confirmButtonColor: "black",
                            iconColor: "#ffa500",
                        })
                    }
                })
            } else {
                Swal.fire({
                    title: "El carrito está vacío. Agregá productos antes de comprar!",
                    icon: "warning",
                    background: "linear-gradient(0deg, rgba(215, 223, 222, 1.0), rgba(85, 87, 86, 1.0))",
                    color: "black",
                    confirmButtonColor: "black",
                    iconColor: "#fbff00cd",
                })
            }
        })
    }

obtenerProductos()
