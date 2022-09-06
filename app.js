
const allButtons = document.querySelectorAll(".button") // selecciono todos los botones
const tbody = document.querySelector(".tbody")  // seleccion la etiqueta padre donde se va a hacer la lista 
const btnComprar = document.getElementById("btn-comprar")

let carrito = [];  // me fabrico el carrito 

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




