//? Tercera Pre-entrega - JS
/*La idea es que el usuario, registrado o no, ingrese sus datos y posteriormente, se muestren 
esos datos, en el navbar. Creamos una función, para resolverlo.*/

const form = document.getElementById("form");
const botonI = document.getElementById("inicioS");
const botonC = document.getElementById("cierreS");
const botonMagico = document.getElementById("botonMagico");

const inicioDeSesion = () => {
  let nombreyapellido = document.getElementById("nombreyapellido").value;
  let usuario = document.getElementById("usuario").value;
  let datos = document.getElementById("ingresoDeUsuario");

  const soloLetras = /^[A-Za-z]+$/;
  if (
    nombreyapellido.length < 3 ||
    nombreyapellido.length > 20 ||
    !nombreyapellido.match(soloLetras)
  ) {
    alert(
      "El nombre y apellido deben tener entre 3 y 20 caracteres. Utiliza letras solamente."
    );
  }

  ingresoDeUsuario = document.createElement("div");
  ingresoDeUsuario.className = "text-white";
  ingresoDeUsuario.innerHTML = `<div>
                                    <span>Nombre: ${nombreyapellido}</span><br>
                                    <span>Usuario: ${usuario}</span>
                                  </div>`;
  datos.append(ingresoDeUsuario);

  botonI.disabled = true;
  botonC.disabled = false;
  botonC.addEventListener("click", () => cerrarSesion(ingresoDeUsuario));
};

function cerrarSesion(ingresoDeUsuario) {
  botonI.disabled = false;
  botonC.disabled = true;
  ingresoDeUsuario.innerHTML = "";
  Swal.fire({
    title: "¡Has cerrado sesión correctamente!",
    icon: "success",
    confirmButtonText: "ok",
    width: "22em",
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evitamos el refrescamiento del formulario.
  inicioDeSesion();
  form.reset();
});

/* Continuamos con el proceso de compra. Creo un nuevo archivo JS: "productos". A fin de tenerlo como "base de datos", y para a través de éste, mostrar el contenido en la web de modo dinámico, sin utilizar html. */
// Iniciamos la variable carrito con el contenido de localStorage. Si no hay nada, lo iniciamos como un array vacío.

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("contenedor-productos");
console.log(productos); // verificando que el array de objetos, funcione.

const mostrarProductos = (productos) => {
  productos.forEach((producto) => {
    const cardProducto = document.createElement("div");
    cardProducto.innerHTML = "";
    cardProducto.setAttribute("id", "tarjeta-producto");
    cardProducto.innerHTML = `<div class="card" style="width: 18rem;">
                                        <img src="./${producto.imagen}" class="card-img-top" alt="img-producto">
                                        <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <p class="card-text">$${producto.precio}</p>
                                        </div>
                                        <div class="card-body">
                                        <button id="Agregar-${producto.id}" type="button" class="btn btn-success">Comprar</button>
                                        </div>
                                  </div> `;
    contenedorProductos.appendChild(cardProducto);
    const btnComprar = document.getElementById(`Agregar-${producto.id}`);
    btnComprar.addEventListener("click", (e) => {
      agregarAlCarrito(producto.id);
      Toastify({
        text: `Agregaste ${producto.nombre}`,
        duration: 3000,
        style: {
          background: "green",
        },
      }).showToast();
    });
  });
};

// Función para agregar el producto al carrito

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const existe = carrito.some((p) => p.id === id);

  if (existe) {
    const indice = carrito.findIndex((el) => el.id === id);
    carrito[indice].cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
    console.log(carrito);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const contenedorCarrito = document.getElementById("carritoBody");
  contenedorCarrito.innerHTML = "";

  if (carrito.length > 0) {
    const contenedorTotal = document.createElement("tr");
    contenedorTotal.innerHTML = `<td colspan = "5" class="text-center"><h5><strong>El total de tu compra es de $${calcularTotal()}</strong></h5></td>`;

    carrito.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `  <tr>
                                    <td>${producto.nombre}</td>
                                    <td>${producto.cantidad}</td>
                                    <td>$${producto.precio}</td>
                                    <td>$${
                                      producto.precio * producto.cantidad
                                    }</td>
                                    <td><button id="eliminar-${
                                      producto.id
                                    }" class="btn btn-danger">Eliminar</button></td>
                                </tr> `;

      contenedorCarrito.appendChild(fila);
      contenedorCarrito.appendChild(contenedorTotal);

      const boton = document.getElementById(`eliminar-${producto.id}`);
      boton.addEventListener("click", () => {
        eliminarProducto(producto.id);
        Toastify({
          text: `Eliminaste ${producto.nombre}`,
          duration: 3000,
          position: "left",
          gravity: "bottom",
          style: {
            background: "red",
          },
        }).showToast();
      });
    });
    if (carrito.length > 0){
      botonMagico.style.display = "block";
    }
    botonMagico.addEventListener("click", () => {
      Swal.fire({
        title: "¿Deseas confirmar tu compra?",
        iconColor: "yellowgreen",
        icon: "question",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Operación exitosa");
          carrito = [];
          localStorage.setItem("carrito", JSON.stringify(carrito))
          botonMagico.style.display = "none";
          mostrarCarrito();
        } else {
          Swal.fire("Operación Cancelada");
        }
      });
    });

  } else {
    contenedorCarrito.innerHTML =
      '<td colspan = "5" class="text-center"><h5><strong>No hay productos agregados al carrito</strong></h5></td>';
  }
};

const eliminarProducto = (id) => {
  carrito = carrito.filter((producto) => producto.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

const calcularTotal = (contenedor) => {
  return carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
};

mostrarProductos(productos);
mostrarCarrito();