let prenda = prompt("Elige prenda A, B o C");
let todoOk = true;
let confirmacion;
let valorPrenda;

switch(prenda.toUpperCase()){
    case "A":
        confirmacion = prompt("Elegiste A? Escribe si o no.");
        if(confirmacion.toUpperCase() === "SI"){
            valorPrenda = 1500;
            alert(`Perfecto, el precio es de ${valorPrenda}$`);
        }else if(confirmacion.toUpperCase() === "NO"){
            alert("Lo sentimos. Vuelve a intentar.");
            todoOk = false;
        }else{
            alert("Vuelve a intentar.");
            todoOk = false;
        }
        break;
    case "B":
        confirmacion = prompt("Elegiste B? Escribe si o no.");
        if(confirmacion.toUpperCase() === "SI"){
            valorPrenda = 2000;
            alert(`Perfecto, el precio es de ${valorPrenda}$`);
        }else if(confirmacion.toUpperCase() === "NO"){
            alert("Lo sentimos. Vuelve a intentar.");
            todoOk = false;
        }else{
            alert("Vuelve a intentar.");
            todoOk = false;
        }
        break;
    case "C":
        confirmacion = prompt("Elegiste C? Escribe si o no.");
        if(confirmacion.toUpperCase() === "SI"){
            valorPrenda = 3000;
            alert(`Perfecto, el precio es de ${valorPrenda}$`)
        }else if(confirmacion.toUpperCase() === "NO"){
            alert("Lo sentimos. Vuelve a intentar.");
            todoOk = false;
        }else{
            alert("Vuelve a intentar.");
            todoOk = false;
        }
        break;
    default:
        alert("Vuelve a intentar.");
        todoOk = false;
        break;
}

while(todoOk === false){
    let prenda = prompt("Elige prenda A, B o C");
    todoOk = true;
    switch(prenda.toUpperCase()){
        case "A":
            confirmacion = prompt("Elegiste A? Escribe si o no.");
            if(confirmacion.toUpperCase() === "SI"){
                valorPrenda = 1500;
                alert(`Perfecto, el precio es de ${valorPrenda}$`);
            }else if(confirmacion.toUpperCase() === "NO"){
                alert("Lo sentimos. Vuelve a intentar.");
                todoOk = false;
            }else{
                alert("Vuelve a intentar.");
                todoOk = false;
            }
            break;
        case "B":
            confirmacion = prompt("Elegiste B? Escribe si o no.");
            if(confirmacion.toUpperCase() === "SI"){
                valorPrenda = 2000;
                alert(`Perfecto, el precio es de ${valorPrenda}$`);
            }else if(confirmacion.toUpperCase() === "NO"){
                alert("Lo sentimos. Vuelve a intentar.");
                todoOk = false;
            }else{
                alert("Vuelve a intentar.");
                todoOk = false;
            }
            break;
        case "C":
            confirmacion = prompt("Elegiste C? Escribe si o no.");
            if(confirmacion.toUpperCase() === "SI"){
                valorPrenda = 3000;
                alert(`Perfecto, el precio es de ${valorPrenda}$`);
            }else if(confirmacion.toUpperCase() === "NO"){
                alert("Lo sentimos. Vuelve a intentar.");
                todoOk = false;
            }else{
                alert("Vuelve a intentar.");
                todoOk = false;
            }
            break;
        default:
            alert("Vuelve a intentar.");
            todoOk = false;
            break;
    }
}

todoOk = true;

for(let i = 0; i <= 2; i++){
    unidades = parseInt(prompt("Cuantas prendas quiere. Escriba el número."));
    if(Number.isInteger(unidades) == true){
        i = 4;
    }else if(Number.isInteger(unidades) == false){
        alert("Vuelva a intentar colocando un número.");
    }else if(Number.isInteger(unidades) == false && i === 3)
        alert("Recargue la página");
        todoOk = false;
}

alert("El precio de su pedido es de " + valorPrenda * unidades + "$.")