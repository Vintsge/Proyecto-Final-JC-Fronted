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
      <p>Género: {juego.genero}</p>
      <p>Plataforma: {juego.plataforma}</p>
      <p>Estado: {juego.estado}</p>
      <p>Horas jugadas: {juego.horasJugadas}</p>
      <p>Desarrollador: {juego.desarrollador}</p>

      <button onClick={() => onEditar(juego)}>Editar</button>
      <button onClick={() => onEliminar(juego._id)}>Eliminar</button>

      {/* Formulario para agregar reseña */}
      {mostrarFormulario && (
        <FormularioResena
          juegoId={juego._id}
          autorId="Usuario GameTracker"
          onClose={toggleFormulario}
        />
      )}

      {!mostrarFormulario && (
        <button onClick={toggleFormulario}>Agregar reseña</button>
      )}
    </div>
  );
}
