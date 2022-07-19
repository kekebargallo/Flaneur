function ordenarAbc(arr){
    let obj = [];
    let arrOrdenado = [];
    arr.forEach((elemento) => {
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

const agregarAlCarrito = () => {
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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se agregó el elemento al carrito.',
                showConfirmButton: false,
                timer: 1500
              })
        }
      })
}


const productos = [
    {id: "remCorta", nombre: "Remera corta estampada", precio: 3000, stock: 3, img: {primeraImg: "../assets/img/rem-patty-maniqui-frontal.jpg", segundaImg: "../assets/img/rem-patty-maniqui-atras.jpeg", terceraImg: "../assets/img/rem-patty-cruda.jpeg", imgCuadrada: "..assets/img/rem-patty-maniqui-encuadrada.jpeg"}},
    {id: "camisa", nombre: "Camisa sin mangas", precio: 2500, stock: 3, img: {primeraImg: "../assets/img/camisa-maniqui-frontal.jpeg", segundaImg: "../assets/img/camisa-cruda-atras.jpeg", terceraImg: "../assets/img/camisa-cruda.jpg", imgCuadrada: "..assets/img/camisa-maniqui-frontal-encuadrada.jpg"}},
    {id: "pantalon", nombre: "Pantalon Flaneur", precio: 4000, stock: 2, img: {primeraImg: "../assets/img/pantalon-maniqui-frontal.jpeg", segundaImg: "../assets/img/pantalon-maniqui-atras.jpeg", terceraImg: "../assets/img/pantalon-crudo-frontal.jpg", imgCuadrada: "..assets/img/pantalon-maniqui-frontal-encuadrado.jpeg"}},
    {id: "cinturon", nombre: "Cinturon Flaneur", precio: 1200, stock: 3, img: {primeraImg: "../assets/img/cinturon-maniqui-frontal.jpg", segundaImg: "../assets/img/cinturon-crudo.jpg", terceraImg: "../assets/img/cinturon-maniqui-frontal.jpg", imgCuadrada: "..assets/img/cinturon-maniqui-encuadrada.jpeg"}}
];

localStorage.setItem("productosLS", JSON.stringify(productos));
let productosLS = JSON.parse(localStorage.getItem("productosLS"))

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
        let {img: {primeraImg, segundaImg, terceraImg}} = elemento;
        let card = document.createElement("article");
        card.setAttribute("class", "shop__galeria-card");
        card.innerHTML = `<div id="carouselExampleControlsNoTouching${elemento.id}" class="carousel slide shop__galeria-card-carrusel" data-bs-touch="false" data-bs-interval="false">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${primeraImg}" class="d-block w-100" alt=${elemento.nombre}>
                </div>
                <div class="carousel-item">
                    <img src="${segundaImg}" class="d-block w-100" alt=${elemento.nombre}>
                </div>
                <div class="carousel-item">
                    <img src="${terceraImg}" class="d-block w-100" alt="${elemento.nombre}">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching${elemento.id}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching${elemento.id}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <p class="shop__galeria-card-info">${elemento.nombre}<br>${elemento.precio}$</p>
        <div class="shop__galeria-card-talles">
            <h3>talle:</h3>
            <label>S <input type="radio" name="talle" value="small"></label>
            <label>M <input type="radio" name="talle" value="medium"></label>
            <label>L <input type="radio" name="talle" value="large"></label>
        </div>
        <a class="shop__galeria-card-boton" id="comprar_${elemento.id}"><span>COMPRAR</span></a>`
    shopGaleria.appendChild(card);
    })
};

cargarProductos(productosLS);

let comprarRemBtn = document.getElementById("comprar_remCorta");
comprarRemBtn.addEventListener("mouseup", agregarAlCarrito);

let comprarCamisaBtn = document.getElementById("comprar_camisa");
comprarCamisaBtn.addEventListener("mouseup", agregarAlCarrito);

let comprarPantalonBtn = document.getElementById("comprar_pantalon");
comprarPantalonBtn.addEventListener("mouseup", agregarAlCarrito);

let comprarCinturonBtn = document.getElementById("comprar_cinturon");
comprarCinturonBtn.addEventListener("mouseup", agregarAlCarrito);

