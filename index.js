// "use strict"
//FOR
// let auto = 1
// for (auto ; auto <= 20; auto++){
//     console.log("Auto N°" + auto);
// }

let inputName = Number(prompt("Ingresa tu Año de Nacimeinto para ingresar"));
let counter = 0;

while(inputName > 2004 && counter !==2 ) {
    alert("Ingresa otra fecha que no sea " + inputName);
    inputName = Number(prompt("Ingresa tu Año de Nacimeinto para ingresar"));
}

let inputOP;
let saldo = 0;

do {
    console.log(`1. Consultar saldo
    2. Retirar dinero
    3. Transferir dinero
    0. Salir`);
    switch (inputOP){
        case 0:
            console.log("Gracias por su Visita");
        break;
        case 1:
            console.log(`Tu saldo es de: ${saldo}`);
        break;
        case 2:
            console.log(`No puede retirar dinero ya que su saldo es: ${saldo}`);
        break;
        case 3:
            console.log(`No se puede realizar Operación`);
        break;
        default:
            console.log(`Elije una opción valida`);
            break;
    }
    inputOP = Number(prompt("Ingresa una Opcion"));
} while (inputOP !== 0);



