// src/pages/ResenaPage.jsx
import { useState } from "react";
import Resenas from "./resena.jsx";
import "./resena.css"; // importar los estilos

export default function ResenaPage() {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroJuegoId, setFiltroJuegoId] = useState("");
  const [filtroCalificacion, setFiltroCalificacion] = useState("");

  return (
    <div className="resenas-page">
      <h2>Administración de Reseñas</h2>

      <div className="resenas-filtros">
        <input
          type="text"
          placeholder="Buscar por nombre del juego"
          value={filtroNombre}
          onChange={e => setFiltroNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Buscar por ID de juego"
          value={filtroJuegoId}
          onChange={e => setFiltroJuegoId(e.target.value)}
        />

        <select
          value={filtroCalificacion}
          onChange={e => setFiltroCalificacion(e.target.value)}
        >
          <option value="">Filtrar por calificación</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>

      <Resenas
        nombreJuego={filtroNombre}
        juegoId={filtroJuegoId}
        calificacion={filtroCalificacion}
      />
    </div>
  );
}

