function filtroString(arr){
    return filtro => arr.filter(elemento => elemento.nombre.includes(filtro))
};

function filtroNumero(arr){
    return filtro => arr.filter(elemento => elemento.precio < filtro)
}

const productos = [
    {nombre: "remeraCorta", precio: 3000, talles: 3, stock: 3},
    {nombre: "camisaSinMangas", precio: 2500, talles: 3, stock: 3},
    {nombre: "pantalon", precio: 4000, talles: 2, stock: 2},
    {nombre: "cinturon", precio: 1200, talles: 1, stock: 3}
];

let filtroProductosS = filtroString(productos);
let filtroProductosN = filtroNumero(productos);


