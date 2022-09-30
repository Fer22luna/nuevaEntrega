const divPadre = document.getElementById("div-padre"); // Div padre donde van a estar las cards

// usamos fetch para traernos la data de la api.json (productos.json)

fetch('./productos.json')
  .then(response => response.json())
  .then((data) => mostrarCards(data))
  .catch(err => console.error(err));

//  aca nos fabricamos una funcion que la llamamos en el fetch
//  esta funcion basicamente me crea los cards y las coloca en el contenedor padre.
//  Esta funcion tiene como variable la data que traemos desde el JSON

function mostrarCards(data) {

  data.forEach((producto) => {
    const divs = document.createElement("div")

    divs.classList.add("card", "col", "d-flex", "justify-content-center-mb-4")
    divs.innerHTML =
      `
    <img src="${producto.img}" class="card-img-top p-3" alt="">
    <div class="card-body  text-center ">
        <div class="card-body">
            <h4 class="card-title">${producto.title}</h4>
            <h5 class="text-primary"><span class="precio">${producto.precio}</span></h5>
        </div>
  
        <button type="button" value="" class="btn btn-outline-primary mb-3 button"
            id="btn-2">Añadir a
            carro</button>
    `
    divPadre.append(divs)
  })
}

let carrito = [];  // me fabrico el array del carrito
const tbody = document.querySelector(".tbody")  // seleccion la etiqueta padre donde se va a hacer la lista 
const btnComprar = document.getElementById("btn-comprar")

// Esperamos a que se cargue el contendido del DOM y seleccionamos los botones de las cards

document.addEventListener("DOMContentLoaded", function () {

  const allButtons = document.querySelectorAll(".button")
  // Usamos un forEach para a cada boton agregarles los siguiente eventos

  allButtons.forEach(btn => {
    btn.addEventListener("click", agregarAlCarrito)
    btn.addEventListener("click", () => {

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
        onClick: function () { }
      }).showToast();

    })
  })
})

//

function agregarAlCarrito(event) {
  const button = event.target
  const producto = button.closest(".card")  // contenedor mas cerca con la clase card
  const productoTitle = producto.querySelector(".card-title").textContent
  const productoPrecio = producto.querySelector(".precio").textContent
  const productoCantidad = 1
  const cantidad = document.querySelectorAll(".cantidad")

  // Aca en caso de elementos repetidos me aumente uno en valor de la cantidad dentro del objeto y tambien en el table-row

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].productoTitle === productoTitle) {
      carrito[i].productoCantidad++;
      cantidad[i].textContent++
      carritoTotal() // Para que me actualize el valor del TOTAL
      return null // Neesito que me retorne null para que no me cree otro table-row y solo se sume la cantidad
    }
  }

  carrito.push({ productoTitle, productoPrecio, productoCantidad }) // pusheo los nombres y precios al array carrito
  listaCarrito(productoTitle, productoPrecio, productoCantidad) // llamo esta funcion para que me cree las table-row 
  agregarStorage()
  carritoTotal()
}

// esta funcion me va a armar la tablas con las variables seleccionadas

function listaCarrito(productoTitle, productoPrecio, productoCantidad) {

  const tr = document.createElement("tr")  // creo un table row
  tr.classList.add("itemCarrito")  // con la siguiente clase 
  const contenido = `
          <th scope="row"><p class="cantidad">${productoCantidad}</p></th>
                          <td class="table-productos">
                          <h6 class="title">${productoTitle}</h6>
                          </td>
                          <td class="table-precio"><p class="prec">${productoPrecio}</p></td>
                          <td class="table-cantidad">
                              <button class="delete btn btn-danger mx-5">X</button>
                          </td>         
          `

  tr.innerHTML = contenido  // le meto ese contenido
  tbody.appendChild(tr)  // En el contenedor padre le pongo los hijos

  tr.querySelector(".delete").addEventListener("click", removerDelCarrito)
  carritoTotal()

}

function carritoTotal() {

  let total = 0;

  const itemCartTotal = document.querySelector(".itemCardTotal")
  const todosItems = document.querySelectorAll(".itemCarrito")
  const tablePrecio = document.querySelectorAll(".prec")
  const cantidad = document.querySelectorAll(".cantidad")

  // Aca tuve que agregar un if para que me funciones bien, si solo dejaba el for
  // cuando agregaba elementos al carrito y luego los sacaba el TOTAL no me quedaba en 0 (cero)
  // Sino el valor del ultimo elemento removido del carrito. 

  if (todosItems.length !== 0) {

    for (let i = 0; i < todosItems.length; i++) {
      const precio = Number(tablePrecio[i].textContent)
      const quantity = Number(cantidad[i].textContent)
      total += precio * quantity
      itemCartTotal.innerHTML = `Total es $${total}`
    }
  } else {
    total = 0
    itemCartTotal.innerHTML = `Total es $${total}`

  }
}

// Le agrego al botton X , el evento click con la siguiente funcion para remover los elementos de las table-row

function removerDelCarrito(event) {

  const buttonDelete = event.target
  const tr = buttonDelete.closest(".itemCarrito")
  const titulo = tr.querySelector(".title").textContent

  // El tr.remove()  me remueve los elementos del table-row, y el for con el metodo Splice
  // me elimina los elementos del Array carrito

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].productoTitle === titulo) {
      carrito.splice(i, 1)
    }
  }
  tr.remove()
  carritoTotal() // llamo la funcion para que me borre tambien el valor del TOTAL    
}

// Meterlos al localStorage

function agregarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Aca usando la libreria sweetalert y agregando el operador ternario 

btnComprar.addEventListener("click", () => {
  carrito.length === 0 ? swal({
    title: "Carro Vacio!",
    text: "Porfavor agregar productos!",
    icon: "warning",
    button: "OK",
  })
    : swal({
      title: "Muchas Gracias",
      text: "Su compra ha sido exitosa",
      icon: "success",
      button: "OK",
    })
})




