const borrarCarrito = () => {
    Swal.fire({
        focusConfirm: false,
        title: '¿Desea vaciar el carrito?',
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
          localStorage.setItem("carritoLS", "");
          let carrito = localStorage.getItem("carritoLS");
          cargarProductosCarrito(carrito);
        }
      })
}

const terminarCompra = () => {
    Swal.fire({
        focusConfirm: false,
        title: '¿Desea ejecutar la compra?',
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
            icon: 'success',
            title: 'Compra ejecutada.',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem("carritoLS", "");
          let carrito = localStorage.getItem("carritoLS");
          cargarProductosCarrito(carrito);
        }
      })
}

const cargarProductosCarrito = (arr) => {
    precioFinal = 0;
    carritoPagina.innerHTML = "";

    if(localStorage.getItem("carritoLS") == "[]" || localStorage.getItem("carritoLS") == ""){
        titulo = document.getElementById("tituloCarrito");
        titulo.setAttribute("class", "noDisplay");

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
        carritoPagina.setAttribute("class", "carrito");
        carrito = JSON.parse(localStorage.getItem("carritoLS"));

        carrito = JSON.parse(localStorage.getItem("carritoLS"));
        arr.forEach(elemento => {
            let {nombre, id, precio, img: {imgCuadrada}} = elemento;
            let card = document.createElement("article");
            card.setAttribute("class", "cardCarrito");
            card.setAttribute("id", id);

            card.innerHTML = `<div class="cardCarritoImg"><img src="${imgCuadrada}" alt
            ="${nombre}"></div>
            <div class="cardCarritoTexto"><h3>${nombre}</h3></div>
            <a id="quitarCarrito${id}" class="cardCarritoBotonQuitar"><span>Quitar del carrito</span></a>
            <a href="./shop.html" class="cardCarritoBotonShop"><span>Ver en shop</span></a>
            <div class="cardCarritoPrecio"><p>$${precio}</p></div>`

            carritoPagina.appendChild(card);
            precioFinal = precioFinal + elemento.precio;
        })
        let terminarCompraDOM = document.createElement("article");
        terminarCompraDOM.setAttribute("class", "carritoTerminarCompra");
        terminarCompraDOM.innerHTML = `<a id="borrarCarritoBoton">Vaciar el carrito</a>
        <a id="terminarCompraBoton">Terminar compra</a>
        <p>Precio final: $${precioFinal}</p>`
        carritoPagina.appendChild(terminarCompraDOM);

        terminarCompraBoton = document.getElementById("terminarCompraBoton");
        terminarCompraBoton.addEventListener("mouseup", terminarCompra);

        borrarCarritoBoton = document.getElementById("borrarCarritoBoton");
        borrarCarritoBoton.addEventListener("mouseup", borrarCarrito);

        carrito.forEach(elemento => {
        switch (elemento.id) {
            case "remCorta":
                let quitarCarritoRemCorta = document.getElementById("quitarCarritoremCorta");
                quitarCarritoRemCorta.addEventListener("mouseup", () => {quitarCarrito("remCorta")});
                break;
            case "camisa":
                let quitarCarritoCamisa = document.getElementById("quitarCarritocamisa");
                quitarCarritoCamisa.addEventListener("mouseup", () => {quitarCarrito("camisa")});
                break;
            case "pantalon":
                let quitarCarritoPantalon = document.getElementById("quitarCarritopantalon");
                quitarCarritoPantalon.addEventListener("mouseup", () => {quitarCarrito("pantalon")});
                break;
            case "cinturon":
                let quitarCarritoCinturon = document.getElementById("quitarCarritocinturon");
                quitarCarritoCinturon.addEventListener("mouseup", () => {quitarCarrito("cinturon")});
        }
        })
    }
};

const quitarCarrito = productoId => {
    Swal.fire({
        focusConfirm: false,
        title: '¿Seguro que desea eliminar este producto del carrito?',
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
            icon: 'success',
            title: 'Se eliminó el elemento del carrito.',
            showConfirmButton: false,
            timer: 1500
          }
          )
          let carrito = JSON.parse(localStorage.getItem("carritoLS"));
          let nuevoCarrito = [];
          carrito.forEach(elemento => {
            elemento.id.includes(productoId) == false && nuevoCarrito.push(elemento);
          });
          localStorage.setItem("carritoLS", JSON.stringify(nuevoCarrito));
          cargarProductosCarrito(nuevoCarrito);
        }
      })
}

const carritoPagina = document.getElementById("carrito");

if(localStorage.getItem("carritoLS") == "[]" || localStorage.getItem("carritoLS") == ""){
    titulo = document.getElementById("tituloCarrito");
    titulo.setAttribute("class", "noDisplay");
    
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
    let carrito = JSON.parse(localStorage.getItem("carritoLS"));
    cargarProductosCarrito(carrito);
}
