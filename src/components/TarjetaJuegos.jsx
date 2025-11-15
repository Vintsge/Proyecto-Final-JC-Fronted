import React from "react";

export default function TarjetaJuego({ juego, onEditar, onEliminar }) {
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
    </div>
  );
}

