import { useEffect, useState } from "react";
import { obtenerJuegos, eliminarJuego } from "../services/juegoService.js";
import TarjetaJuego from "./TarjetaJuegos.jsx";
import "./BibliotecaJuegos.css";

export default function BibliotecaJuegos({ setJuegoSeleccionado, setModo }) {
  const [juegos, setJuegos] = useState([]);

  const cargarJuegos = () => {
    obtenerJuegos()
      .then(res => setJuegos(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  const handleEditar = (juego) => {
    setJuegoSeleccionado(juego);
    setModo("formulario");
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este juego?")) {
      eliminarJuego(id)
        .then(() => cargarJuegos())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="biblioteca-juegos">
      {juegos.length === 0 ? (
        <p>No hay juegos aún.</p>
      ) : (
        juegos.map(juego => (
          <TarjetaJuego
            key={juego._id}
            juego={juego}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        ))
      )}
      <button onClick={() => {
        setJuegoSeleccionado(null);
        setModo("formulario");
      }}>Agregar juego</button>
      <button onClick={() => setModo("resenasPage")}>
        Administrar reseñas
      </button>

    </div>
  );
}