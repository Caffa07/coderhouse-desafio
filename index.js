
function mostrarPresupuestos(presupuesto){
  const contenedorPresupuestos = document.getElementById("presupuestosContenedor");
  contenedorPresupuestos.innerHTML="";

  contenedorPresupuestos.innerHTML = `
  <h2>${presupuesto.titulo}</h2>
  <img src= "${presupuesto.imagen}">
  <br>
  <p><img src= "${presupuesto.descripcion}"></p>`; 
}
function botonAtras(presupuestos){
   const botonAtras = document.createElement ("button");
   botonAtras.classList.add("boton-volver");
   botonAtras.innerText = "Atras";
   botonAtras.addEventListener("click", () => {
      mPresupuestos(presupuestos);
   })
   document.getElementById("presupuestosContenedor").prepend(botonAtras);
}
function crearBotonVerPresupuesto(presupuesto){
   const button = document.createElement("button");
   button.classList.add("boton-contacto");
   button.innerText = "Ver Presupuesto";
   button.addEventListener("click", () => {
       mostrarPresupuestos(presupuesto);
       botonAtras();
       botonContacto();
   })
   return button;
}
function mPresupuestos(presupuestos) {
   const contenedorPresupuestos =  document.getElementById("presupuestosContenedor");
   contenedorPresupuestos.innerHTML = ""
    fetch("./data.json")
    .then(Response => Response.json())
    .then(json => {

      presupuestos = json;

      presupuestos.forEach(presupuesto => {
           const divPresupuesto = document.createElement("div");
           divPresupuesto.classList.add("presup");
          divPresupuesto.innerHTML = `
          <h1>${presupuesto.titulo}</h1>
          <img src= "${presupuesto.imagen}">
          <br>
          `
          const botonVerPresupuesto = crearBotonVerPresupuesto(presupuesto);
          divPresupuesto.append(botonVerPresupuesto);
          contenedorPresupuestos.append(divPresupuesto);
   
       });
    });


}
function botonContacto(){
  const botonContacto = document.createElement ("button");
  botonContacto.classList.add("boton-volver");
  botonContacto.innerText = "Contacto";
  botonContacto.addEventListener("click", () => {
    mostrarContacto();
    botonAtras();
    Toastify({
      text: "No Olvides visitar nuestra Galeria",
      className: "info",
    }).showToast();
  })
  document.getElementById("presupuestosContenedor").prepend(botonContacto);
}
function mostrarContacto(presupuesto){
  const contenedorContacto = document.getElementById("presupuestosContenedor");
  contenedorContacto.innerHTML="";
  
  contenedorContacto.innerHTML = ` 
<form id="mainContacto">
  <h2 class="h2Contacto">Hacé tu consulta</h2>
  <div class="d-grid gap-2 col-6 mx-auto">
      <input type="date" name="fecha" id="userDia"
  </div>
  <div class="d-grid gap-2 col-6 mx-auto">
      <input class="boton-volver" type="submit" value="Buscar">
  </div>    
</form>`; 
}

function completarFormulario(e){
e.preventDefault();
fechaElejida = document.getElementById("userDia").value;
  const listado = document.getElementById("listado");
  const listadoFechas = JSON.parse(localStorage.getItem(fechaElejida));
  listadoFechas == null ? listado.innerHTML = "<h1>No Tenemos Consultas Para Esa Fecha</h1>" : mostrarListado(listadoFechas);
  
  formulario();
  }


function mostrarListado(listadoFechas){
  let listado = document.getElementById("listado");
  listado.innerHTML = "";
  
  listadoFechas.forEach(lista => {
      let li = document.createElement("li");
      li.innerHTML=`
      <h2>${lista.lounge} - ${lista.invited} - ${lista.name} - ${lista.lastname} -  ${lista.num} 
      </h2>
      `
      listado.appendChild(li);
  });
}
function formulario(){
  const form = document.getElementById("opciones");
  form.innerHTML = `
<form id="form-datos">  
  <div id="containerform">
        <h1>Dejanos Tus Datos y nos pondremos en contacto</h1>
    <div class="row">
        <div class="selectedSalon col-sm-12 col-md-6 col-xl-6">
        <select id="salon" class="form-select" aria-label="Default select example">
                         <option value="">Salon</option>
                         <option value="Gv Eventos">Gv Eventos</option>
                         <option value="Atpadis">Atpadis</option>
                         <option value="La Sibila">La Sibila</option>
                         <option value="FlorDeLiz">Flor de Liz</option>
                         <option value="Otros">Otros</option>
                     </select>
    </div>
        <div  class="selectedInvitados col-sm-12 col-md-6 col-xl-6">
            <input id="invitados" class="form-control" type="text" placeholder="Cantidad aproximada de invitados" aria-label="default input example">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="selectedNombre col-sm-12 col-md-4 col-xl-4">
            <input id="name" class="form-control" type="text" placeholder="Nombre" aria-label="default input example">
        </div>
        <div  class="selectedApellido col-sm-12 col-md-4 col-xl-4">
            <input id="lastname" class="form-control" type="text" placeholder="Apellido" aria-label="default input example">
        </div>
        <div class="selectedTelefono col-sm-12 col-md-4 col-xl-4">
            <input id="cell" class="form-control" type="text" placeholder="Teléfono" aria-label="default input example">
        </div>
    </div>
    <br>
        <div class="d-grid gap-2 col-6 mx-auto">
        <button class="boton-volver" type="submit">Agregar</button>
        </div>
    <br>     
  </div>
</form>`
  
  document.getElementById("form-datos").addEventListener("submit", agregarFecha);
}


function agregarFecha(e){
  e.preventDefault();
  const lounge = document.getElementById("salon").value;
  const invited = document.getElementById("invitados").value;
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const num = document.getElementById("cell").value

  const listado = new Listado(lounge, invited, name, lastname, num);
  validacion(listado);
  const localStorageFechas = JSON.parse(localStorage.getItem(fechaElejida));

  if(localStorageFechas == null){
      localStorage.setItem(fechaElejida, JSON.stringify([listado]));
      
  } else{
    localStorageFechas.push(listado);
      localStorage.setItem(fechaElejida, JSON.stringify(localStorageFechas));
      
    setTimeout(() =>  mostrarListado(localStorageFechas), 2300);
  } 
  e.target.reset();
}
function validacion(lista){
if(lista.lounge == ""|| lista.invited == ""|| lista.name == ""|| lista.lastname == "" || lista.num == ""){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Los Campos Estan Vacios!',
  })
}else{
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu Fecha Se Guardo con Exito, Pronto nos podremos en contacto',
    showConfirmButton: false,
    timer: 2200
  })
 setTimeout(() =>  mostrarListado([lista]), 2300);
}
}
//////////// Fetch con async-await Traido desde una url a modo de practica y prueba/////////
const getData = async () => {
  await fetch("https://rickandmortyapi.com/api/character")
  .then(response => response.json())
  .then(data => console.log(data.results));
}
getData()
////////////////////////////////////////////////////////////////////////////////////////
class Presupuesto {
  constructor(titulo, imagen, descripcion) {
      this.titulo = titulo;
      this.imagen = imagen;
      this.descripcion = descripcion;
  }
}
// const presupuestos = [
//   new Presupuesto("Presupuesto W4 1", "./img/Presupuesto1.jpg", "./img/EXCLUSIVO1-2023.jpg"),
//   new Presupuesto("Presupuesto W4 2", "./img/Presupuesto2.jpg", "./img/EXCLUSIVO2-2023.jpg"),
//   new Presupuesto("Presupuesto W4 Full", "./img/w4Full.jpg", "./img/EXCLUSIVOPACKFULL-2023.jpg"),
// ]

document.getElementById("presupuestosContenedor").addEventListener("submit", completarFormulario)

class Listado{
  constructor(lounge, invited, name, lastname, num){
      this.lounge = lounge;
      this.invited = invited;
      this.name = name;
      this.lastname = lastname;
      // this.day = day;
      // this.year = year;
      // this.month = month;
      this.num = num;
  }
}
let fechaElejida;
mPresupuestos();