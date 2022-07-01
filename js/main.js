function filtroString(arr){
    return filtro => arr.filter(elemento => elemento.nombre.includes(filtro))
};

function filtroNumero(arr){
    return filtro => arr.filter(elemento => elemento.precio < filtro)
}

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
        switch(valor) {
            case "precio":
                nuevoElemento = elemento.precio;
                obj.push(nuevoElemento);
                break;
            case "stock":
                nuevoElemento = elemento.stock;
                obj.push(nuevoElemento);
                break;
            case "talles":
                nuevoElemento = elemento.talles;
                obj.push(nuevoElemento);
                break;
        }
    });
    objOrdenado = obj.sort((a,b) => a-b);
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
            case "talles":
                if(arrOrdenado.some(e1 => e1 === arr.find(e2 => e2.talles === elemento)) === false){
                    let oFiltrados = arr.filter(e2 => e2.talles === elemento);
                    oFiltrados.forEach(e3 => {
                        arrOrdenado.push(arr.find(e4 => e4.nombre === e3.nombre));
                    })
                }
                break;
        }
    })
    return arrOrdenado;
}

let producto = (n, p, t, s) => {
    let nuevoProducto = {nombre: n, precio: p, talles: t, stock: s};
    return nuevoProducto;
}



let productos = [
    {nombre: "remera corta", precio: 3000, talles: 3, stock: 3},
    {nombre: "camisa sin mangas", precio: 2500, talles: 3, stock: 3},
    {nombre: "pantalon", precio: 4000, talles: 2, stock: 2},
    {nombre: "cinturon", precio: 1200, talles: 1, stock: 3}
];

let filtroProductosS = filtroString(productos);
let filtroProductosN = filtroNumero(productos);
let productosOrdenadosAbc = ordenarAbc(productos);
let productosOrdenadosCba = productosOrdenadosAbc.reverse();

console.log("Productos: ", productos);

let info = prompt("Seleccione un producto para recibir información.");

if(productos.some(elemento => elemento.nombre.toLowerCase() === info.toLowerCase())){
    let infoProducto = productos.find(elemento => elemento.nombre.toLowerCase() === info.toLowerCase());
    console.log(`El producto ${infoProducto.nombre} tiene un precio de $${infoProducto.precio}, ${infoProducto.talles} talle/s y hay ${infoProducto.stock} en stock.` )
}