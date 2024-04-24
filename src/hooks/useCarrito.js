import { useState,useEffect,useMemo } from "react";
import { db } from "../database/db";
// creando nuestros  hooks personalisados
const useCarrito = () => {

  
    const iniciarCarrito = () =>{
        const localStorageCarrito = localStorage.getItem('carrito')
        //retornamos con una condicional iff preguntado si esta o no 
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
      }
    
    
      //state
      const [data] = useState(db);
      const [carrito, setCarrito] = useState(iniciarCarrito);
    
      const MIN_ITEMS = 1;
      const MAX_ITEMS = 5;
    
    
      //useeffect para almacenar en el localstorage 
      useEffect(()=>
      {
        localStorage.setItem('carrito',JSON.stringify(carrito))
      },[carrito])
    
      function agregarAlCarrito(productos) {
        // funcion de flecha
        const existeProducto = carrito.findIndex(
          (temporal) => temporal.id === productos.id
        );
    
        if (existeProducto >= 0) {
          if (carrito[existeProducto].quantity >= MAX_ITEMS) return 
            
          
          //exite
          // creamos variable temporal para hacer que  el contador cresca
          const contadorCarrito = [...carrito];
          // agregamos al array si existe le incrementamos en 1
          contadorCarrito[existeProducto].quantity++;
          // mandamos al state
          setCarrito(contadorCarrito);
        } else {
          //aqui agreamos un nuevo atributo a productos  que seria quantity iniciado en 1
          productos.quantity = 1;
          setCarrito([...carrito, productos]);
        }
      }
      // funcion para eliminar con el array methor Filter  que llama a todos los que sean diferentes del escogido
      function eliminarDelCarrito(id) {
        setCarrito((temporal) =>
          temporal.filter((productos) => productos.id !== id)
        );
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //FUNCION DE  INCREMENTAR CANTIDAD con el boton y em metodo MAp DETECTANDO DE  UN ID
      function incrementarCantidad(id) {
        //vamos al carrito que tenemos en el state recorremos el array
        // guardamos en una  variable el array
        const botonMas = carrito.map(productos => {
          //preguntamos
          if (productos.id === id && productos.quantity < MAX_ITEMS) {
            return {
              //retornamos todo el array
              ...productos,
              //despues modificamos la cantidad
              quantity: productos.quantity + 1 
            };
          }
          //para no perder el resto de elementos ponemos fuera del IF  un retorno de todo
          return productos;
        });
        // seteamos al carrito mediante el state que tenemos  creado
        setCarrito(botonMas);
      }
    ////////////////////////////////////////////////////
    // FUNCION PARA DECREMENTARA  LA CANTIDAD
      function decrementarCantidad(id){
        const botonMenos = carrito.map(productos =>{
          if (productos.id === id && productos.quantity > MIN_ITEMS) {
            return{
              ...productos,
              quantity: productos.quantity - 1
            }
            
          }
          return productos
        })
        setCarrito(botonMenos)
    
    
      }
    
      function vaciarCarrito(){
    
        setCarrito([])
    
      }
        //states Derivados 
    // usando un hook llamado use MEMO
    //state para  verificar que el carrito este vacio y asi cambiarlo 
    const estaVacio =useMemo(() => carrito.length === 0,[carrito]) 

    // state  con el array method  reduce()  PARA   hacer conteo de precios

    const carritoTotal = useMemo (() => carrito.reduce((total,productos) => total + (productos.quantity * productos.price), 0),[carrito] )


    // para retornar los datops  entre llaves  {}
  return {
    data,
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    vaciarCarrito,
    estaVacio,
    carritoTotal

    
  }

  
  
}

export default useCarrito
