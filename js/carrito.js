const borrarCarrito = () => {
    localStorage.setItem("carritoLS", "");
}

const cargarProductosCarrito = (arr) => {
    carritoPagina.innerHTML = "";
    arr.forEach(elemento => {
        let card = document.createElement("article");
        card.setAttribute("class", "shop__galeria-card");
        card.innerHTML = `HOLA`
    carritoPagina.appendChild(card);
    })
};

botonBorrarCarrito = document.getElementById("borrarCarrito");
botonBorrarCarrito.addEventListener("mouseup", borrarCarrito);

const carritoPagina = document.getElementById("carrito");

if(localStorage.getItem("carritoLS") == "[]" || localStorage.getItem("carritoLS") == ""){
    carritoPagina.setAttribute("class", "sinProductos");
    let sinCarrito = document.createElement("article");
    sinCarrito.setAttribute("class", "sinCarritoContainer");
    sinCarrito.innerHTML = '<h2>Su carrito está vacío</h2>';
    let link = document.createElement("a");
    link.setAttribute("class", "linkSinCarrito");
    link.setAttribute("href", "./shop.html");
    link.innerHTML = "<h3>Volver al shop</h3>"
    carritoPagina.appendChild(sinCarrito);
    sinCarrito.appendChild(link);
}else{
    carritoPagina.setAttribute("class", "carrito")
    carrito = JSON.parse(localStorage.getItem("carritoLS"));
    cargarProductosCarrito(carrito);
}
