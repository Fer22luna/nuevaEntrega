const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '77ee715719msh1cbc2d5321189fdp1dc147jsn15ace5c24e31',
		'X-RapidAPI-Host': 'random-recipes.p.rapidapi.com'
	}
};

const divPadre = document.getElementById("div-padre")


fetch('https://random-recipes.p.rapidapi.com/ai-quotes/8?id=3', options)
	.then(response => response.json())
	
  .then((data) => data.forEach((element) => {
    const divs = document.createElement("div")
    
   divs.classList.add("card","col","d-flex","justify-content-center-mb-4") 
    divs.innerHTML = 
    
    `
    <img src="${element.image}" class="card-img-top p-3" alt="">
    <div class="card-body  text-center ">
        <div class="card-body">
            <h4 class="card-title">${element.title}</h4>
            <h5 class="text-primary"><span class="precio">500</span></h5>
        </div>

        <button type="button" value="Queso" class="btn btn-outline-primary mb-3 button"
            id="btn-2">Añadir a
            carro</button>
    

    `
  divPadre.append(divs)
  
  }
  )) 
  
	.catch(err => console.error(err));



const allButtons = document.querySelectorAll(".button") // selecciono todos los botones
console.log(allButtons)
const tbody = document.querySelector(".tbody")  // seleccion la etiqueta padre donde se va a hacer la lista 
const btnComprar = document.getElementById("btn-comprar")

let carrito = [];  // me fabrico el array

allButtons.forEach(btn =>{
    btn.addEventListener("click", agregarAlCarrito)
    btn.addEventListener("click", ()=>{

      Toastify({
        text: "Agregaste un producto al carrito",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #25316D, #5F6F94)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    })
})



function agregarAlCarrito (event){
    const button = event.target 
    const producto = button.closest(".card")  
    const productoTitle = producto.querySelector(".card-title").textContent
    const productoPrecio = producto.querySelector(".precio").textContent

    agregarProductoAlCarrito(productoTitle,productoPrecio)
    agregarStorage()

}


function agregarProductoAlCarrito(productoTitle,productoPrecio) {

carrito.push({productoTitle,productoPrecio})
listaCarrito(productoTitle,productoPrecio)
}


// esta funcion me va a armar la tabla con las variables seleccionadas

function listaCarrito(productoTitle,productoPrecio){

        const tr = document.createElement("tr")  // creo un table row
        tr.classList.add("itemCarrito")  // con la sigueinte clase 
        const itemCantidad = 1
        const contenido = `
        <th scope="row">1</th>
                        <td class="table-productos">
                        <h6 class="title">${productoTitle}</h6>
                        </td>
                        <td class="table-precio"><p>${productoPrecio}</p></td>
                        <td class="table-cantidad">
                        <input class="input-elemento" type="number" min="1" value="${itemCantidad}">
                            <button class="delete btn btn-danger mx-5">X</button>
                        </td>
        
        `

tr.innerHTML = contenido  // le meto ese contenido
tbody.appendChild(tr)  // En el contenedor padre le pongo los hijos

tr.querySelector(".delete").addEventListener("click", removerDelCarrito)
tr.querySelector(".input-elemento").addEventListener("change", sumaCantidad)
/*
const titulo = document.querySelectorAll(".title")
//console.log(titulo)

const inputElemento = document.querySelectorAll(".input-elemento")

for (let i = 0; i < inputElemento.length; i++) {
  inputElemento[i].addEventListener("change", (e)=>{
  let sumaInput = e.target
  console.log(sumaInput.value)
if (productoTitle === titulo[i].textContent) {

  sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
  itemCantidad = sumaInput.value
 
}
  })
  
}
*/
  carritoTotal() 
}

function sumaCantidad (e){
  const sumaInput = e.target
  const tr = sumaInput.closest(".itemCarrito")
  const title = tr.querySelector(".title").textContent
console.log(sumaCantidad)
carrito.forEach(item => {
//
}
)
}








function carritoTotal(){
    let total = 0;

    const itemCartTotal = document.querySelector(".itemCartTotal")
    const todosItems = document.querySelectorAll(".itemCarrito")
    tablePrecio = document.querySelectorAll(".table-precio")
    const inputElemento = document.querySelectorAll(".input-elemento")
    
    
///  Aca tuve un inconveniente quise usar el forEach para recorrer cada elemento de todosItems, pero cuando me 
/// seleccionaba el tablePrecio siempre lo hacia del primer elemento y no de los otros, es decir, me lo repetia
/// Asi que tuve que armar a tablePrecio como un objeto y recorrerlo con un for


for (let i = 0; i < todosItems.length; i++) {
 // inputElemento[i].addEventListener("change", (e)=>{
 //   let sumaInput = e.target
const precio = Number(tablePrecio[i].textContent)
//const cantidad = Number(sumaInput.value)
total = total + precio //*cantidad
  
    

itemCartTotal.innerHTML = `Total es $${total}`
//}) 
}}


function removerDelCarrito(event) {

    const buttonDelete = event.target
    const tr = buttonDelete.closest(".itemCarrito")  
    tr.remove()
    carritoTotal() // llamo la funcion para que me borre tambien el valor del TOTAL
    
    
}  


// Meterlos al localStorage

function agregarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))

}


// aca usando la libreria sweetalert y agregando el operador ternario


  btnComprar.addEventListener("click", () =>{ carrito.length === 0 ? swal({
    title: "Carro Vacio!",
    text: "Porfavor agregar productos!",
    icon: "warning",
    button: "OK",
  })
  :swal({
    title: "Muchas Gracias",
    text: "Su compra ha sido exitosa",
    icon: "success",
    button: "OK",
  })


  })




