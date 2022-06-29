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
    let comprobador;
    objOrdenado.forEach(elemento => {
        switch(valor) {
            case "precio":
                comprobador = arrOrdenado.some(e1 => e1 === elemento);
                arrOrdenado.push(arr.find(e2 => e2.precio === elemento));
                break;
            case "stock":
                arrOrdenado.push(arr.find(e2 => e2.talles === elemento));
                break;
            case "talles":
                comprobador = arrOrdenado.some(e1 => e1 === elemento);
                arrOrdenado.push(arr.find(e2 => e2.talles === elemento));
                break;
        }
    })
    return arrOrdenado;
}

const productos = [
    {nombre: "remeraCorta", precio: 3000, talles: 3, stock: 3},
    {nombre: "camisaSinMangas", precio: 2500, talles: 3, stock: 3},
    {nombre: "pantalon", precio: 4000, talles: 2, stock: 2},
    {nombre: "cinturon", precio: 1200, talles: 1, stock: 3}
];

let filtroProductosS = filtroString(productos);
let filtroProductosN = filtroNumero(productos);
let productosOrdenadosAbc = ordenarAbc(productos);
let productosOrdenadosCba = productosOrdenadosAbc.reverse();

console.log(ordenarNumeros(productos, "talles"));
