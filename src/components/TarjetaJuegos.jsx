import React, { useState } from "react";
import FormularioResena from "./FormularioResena.jsx";

export default function TarjetaJuego({ juego, onEditar, onEliminar }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Alterna la visualización del formulario
  const toggleFormulario = () => setMostrarFormulario(!mostrarFormulario);

  return (
    <div className="tarjeta-juego">
      {juego.portadaUrl && <img src={juego.portadaUrl} alt={juego.nombre} />}
      <h3>{juego.nombre}</h3>
      <p>
        <strong>Género:</strong> <span className="valor-juego">{juego.genero}</span>
      </p>
      <p>
        <strong>Plataforma:</strong> <span className="valor-juego">{juego.plataforma}</span>
      </p>
      <p>
        <strong>Estado:</strong> <span className="valor-juego">{juego.estado}</span>
      </p>
      <p>
        <strong>Horas jugadas:</strong> <span className="valor-juego">{juego.horasJugadas}</span>
      </p>
      <p>
        <strong>Desarrollador:</strong> <span className="valor-juego">{juego.desarrollador}</span>
      </p>


      <button className="editar" onClick={() => onEditar(juego)}>Editar</button>
      <button className="eliminar" onClick={() => onEliminar(juego._id)}>Eliminar</button>

      {/* Formulario para agregar reseña */}
      {mostrarFormulario && (
        <FormularioResena
          juegoId={juego._id}
          autorId="Usuario GameTracker"
          onClose={toggleFormulario}
        />
      )}

      {!mostrarFormulario && (
        <button className="agregar" onClick={toggleFormulario}>Agregar reseña</button>
      )}
    </div>
  );
}
