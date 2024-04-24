
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";

import useCarrito from "./hooks/useCarrito";

function App() {

  //llamando a nuestro hooks personalizado
  const {
    data,
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    vaciarCarrito,
    estaVacio,
    carritoTotal
          } =  useCarrito();

  //iniciandocarrito en localstorage para que sea persistente y no se borre cuando  refrequemos la pagina




  return (
    <>
      <Header
        //enviando como props  para el carrito

        carrito={carrito}
        eliminarDelCarrito={eliminarDelCarrito}
        incrementarCantidad={incrementarCantidad}
        decrementarCantidad={decrementarCantidad}
        vaciarCarrito = {vaciarCarrito}
        estaVacio = {estaVacio}
        carritoTotal = {carritoTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              agregarAlCarrito={agregarAlCarrito}
              //eliminarDeCarrito = {eliminarDeCarrito}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
