function ordenarAbc(arr){
    let obj = [];
    let arrOrdenado = [];
    arr.forEach(elemento => {
        nuevoElemento = elemento.nombre;
        obj.push(nuevoElemento);
    });
    objOrdenado = obj.sort();
    objOrdenado.forEach(elemento => {
        arrOrdenado.push(arr.find(i => i.nombre === elemento))
    })
    return arrOrdenado;
}

function ordenarNumeros(arr, valor){
    let obj = [];
    let arrOrdenado = [];
    arr.forEach((elemento) => {
        let {precio, stock} = elemento;
        switch(valor) {
            case "precio":
                nuevoElemento = precio;
                obj.push(nuevoElemento);
                break;
            case "stock":
                nuevoElemento = stock;
                obj.push(nuevoElemento);
                break;
        }
    });
    objOrdenado = obj.sort((a,b) => b-a);
    let oFiltrados;
    objOrdenado.forEach(elemento => {
        switch(valor) {
            case "precio":
                if(arrOrdenado.some(e1 => e1 === arr.find(e2 => e2.precio === elemento)) === false){
                    oFiltrados = arr.filter(e2 => e2.precio === elemento);
                    oFiltrados.forEach(e3 => {
                        arrOrdenado.push(arr.find(e4 => e4.nombre === e3.nombre));
                    })
                }
                break;
            case "stock":
                if(arrOrdenado.some(e1 => e1 === arr.find(e2 => e2.stock === elemento)) === false){
                    oFiltrados = arr.filter(e2 => e2.stock === elemento);
                    oFiltrados.forEach(e3 => {
                        arrOrdenado.push(arr.find(e4 => e4.nombre === e3.nombre));
                    })
                }
                break;
        }
    })
    return arrOrdenado;
}

const producto = (n, p, t, s) => {
    let nuevoProducto = {nombre: n, precio: p, talles: t, stock: s};
    return nuevoProducto;
}

const filtro = (e) => {
    let productosFiltrados = [];
    localStorage.setItem("productosLS", JSON.stringify(productos));
    productosLS = JSON.parse(localStorage.getItem("productosLS"));
    if(e.key === "Enter"){
        if(shopFiltro.value != ""){
            let productosFiltrados2 = [];
            productosLS.forEach(elemento => {
                elemento.nombre.toLowerCase().includes(shopBuscador.value.toLowerCase()) && productosFiltrados.push(elemento);
            });
            productosFiltrados.forEach(elemento => {
                elemento.precio <= shopFiltro.value && productosFiltrados2.push(elemento);
                productosFiltrados = productosFiltrados2;
            });
            localStorage.setItem("productosLS", JSON.stringify(productosFiltrados));
            productosLS = JSON.parse(localStorage.getItem("productosLS"));
            cargarProductos(productosLS);
        }else{
            productosLS.forEach(elemento => {
                elemento.nombre.toLowerCase().includes(shopBuscador.value.toLowerCase()) && productosFiltrados.push(elemento);
            });
            localStorage.setItem("productosLS", JSON.stringify(productosFiltrados));
            productosLS = JSON.parse(localStorage.getItem("productosLS"));
            cargarProductos(productosLS);
        }
    }
}

const menorPrecio = () => {
    productosLS = JSON.parse(localStorage.getItem("productosLS"));
    let arrOrdenado = ordenarNumeros(productosLS, "precio");
    cargarProductos(arrOrdenado.reverse());
};

const mayorPrecio = () => {
    productosLS = JSON.parse(localStorage.getItem("productosLS"));
    let arrOrdenado = ordenarNumeros(productosLS, "precio");
    cargarProductos(arrOrdenado);
};

const restaurarOrden = () => {
    productosLS = JSON.parse(localStorage.getItem("productosLS"));
    cargarProductos(productosLS);
};

const agregarAlCarrito = productoId => {
    Swal.fire({
        focusConfirm: false,
        title: '¿Quiere agregar este elemento al carrito?',
        text: false,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'grey',
        cancelButtonColor: 'grey',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar',
        focusConfirm: false
      }).then((result) => {
        if (result.isConfirmed) {
            let producto;
            
            productosLS.forEach(elemento => {
                if(elemento.id.includes(productoId)){
                    producto = elemento;
                };
            });
            let carrito = [];
            if(localStorage.getItem("carritoLS") == "[]" || localStorage.getItem("carritoLS") == ""){
                carrito.push(producto);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se agregó el elemento al carrito.',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }else{
                let confirmacion = true;
                carrito = JSON.parse(localStorage.getItem("carritoLS"));
                carrito.forEach(elemento => {
                    if(elemento.id.includes(productoId)){
                        confirmacion = false;
                    }
                })
                if(confirmacion){
                    carrito.push(producto);   
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se agregó el elemento al carrito.',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Usted ya tiene este producto en el carrito.',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            }
            localStorage.setItem("carritoLS", JSON.stringify(carrito))
        }
      })
}

const shopGaleria = document.getElementById("shopGaleria");
const shopBuscador = document.getElementById("shopBuscador");
shopBuscador.addEventListener("keydown", filtro);

const shopFiltro = document.getElementById("shopFiltro");
shopFiltro.addEventListener("keydown", filtro);

const menorPrecioShop = document.getElementById("menorPrecioShop");
menorPrecioShop.addEventListener("mouseup", menorPrecio);

const mayorPrecioShop = document.getElementById("mayorPrecioShop");
mayorPrecioShop.addEventListener("mouseup", mayorPrecio);

const restaurarOrdenShop = document.getElementById("restaurarOrdenShop");
restaurarOrdenShop.addEventListener("mouseup", restaurarOrden);

const cargarProductos = (arr) => {
    shopGaleria.innerHTML = "";
    arr.forEach(elemento => {
        let {nombre, id, precio, img: {primeraImg, segundaImg, terceraImg}} = elemento;
        let card = document.createElement("article");
        card.setAttribute("class", "shop__galeria-card");
        card.innerHTML = `<div id="carouselExampleControlsNoTouching${elemento.id}" class="carousel slide shop__galeria-card-carrusel" data-bs-touch="false" data-bs-interval="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${primeraImg}" class="d-block w-100" alt=${nombre}>
                </div>
                <div class="carousel-item">
                    <img src="${segundaImg}" class="d-block w-100" alt=${nombre}>
                </div>
                <div class="carousel-item">
                    <img src="${terceraImg}" class="d-block w-100" alt="${nombre}">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching${id}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching${id}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <p class="shop__galeria-card-info">${nombre}<br>${precio}$</p>
        <div class="shop__galeria-card-talles">
            <h3>talle:</h3>
            <label>S <input type="radio" name="talle" value="small"></label>
            <label>M <input type="radio" name="talle" value="medium"></label>
            <label>L <input type="radio" name="talle" value="large"></label>
        </div>
        <a class="shop__galeria-card-boton" id="comprar_${id}"><span>COMPRAR</span></a>`
    shopGaleria.appendChild(card);
    })
};

let productos = [];
let productosLS = JSON.parse(localStorage.getItem("productosLS"));

const fetchData = async () =>{
    try {
        const res = await fetch('../json/data.json');
        productos = await res.json();

        localStorage.setItem("productosLS", JSON.stringify(productos));
        productosLS = JSON.parse(localStorage.getItem("productosLS"))
        cargarProductos(productosLS);
        
        let comprarRemBtn = document.getElementById("comprar_remCorta");
        comprarRemBtn.addEventListener("mouseup", () =>{agregarAlCarrito("remCorta")});

        let comprarCamisaBtn = document.getElementById("comprar_camisa");
        comprarCamisaBtn.addEventListener("mouseup", () =>{agregarAlCarrito("camisa")});

        let comprarPantalonBtn = document.getElementById("comprar_pantalon");
        comprarPantalonBtn.addEventListener("mouseup", () =>{agregarAlCarrito("pantalon")});

        let comprarCinturonBtn = document.getElementById("comprar_cinturon");
        comprarCinturonBtn.addEventListener("mouseup", () =>{agregarAlCarrito("cinturon")});
    } catch (error) {
        console.log(error)
        cargarProductos(productosLS);
    }
}

fetchData();

localStorage.getItem("carritoLS") == null && localStorage.setItem("carritoLS", JSON.stringify([]));