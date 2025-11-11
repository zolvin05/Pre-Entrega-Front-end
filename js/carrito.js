import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "No hay productos en el carrito";
    contenedor.appendChild(mensaje);
    return;
  }

  
  carrito.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta--producto");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-eliminar-carrito");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);
      setTimeout(renderizarCarrito, 0);
    });

    tarjeta.append(img, titulo, precio, btnEliminar);
    contenedor.appendChild(tarjeta);
  });

  
  const total = carrito.reduce((acum, prod) => acum + prod.precio, 0);
  const cantidad = carrito.length;

  const resumen = document.createElement("div");
  resumen.classList.add("resumen-carrito");
  resumen.innerHTML = `
    <p><strong>Cantidad de productos:</strong> ${cantidad}</p>
    <p><strong>Total:</strong> $${total}</p>
  `;

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "btn-vaciar-carrito");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  
  divAcciones.append(resumen, btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);

