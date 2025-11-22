import { useState } from "react";
import { crearResena } from "../services/resenaService";
import "./resena.css"; 

export default function FormularioResena({ juegoId, recargarResenas, onClose }) {
  const [form, setForm] = useState({ puntuacion: 1, texto: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!juegoId) return alert("No se ha seleccionado un juego");

    try {
      setLoading(true);

      const resenaData = {
        puntuacion: form.puntuacion,
        texto: form.texto,
        juego: juegoId,
        autor: "Usuario GameTracker"
      };

      // Crear reseña
      await crearResena(resenaData);

      // Refrescar la lista de reseñas
      if (recargarResenas) await recargarResenas();

      // Reset del formulario
      setForm({ puntuacion: 1, texto: "" });

      // Cerrar formulario si se pasa la función
      if (onClose) onClose();

    } catch (error) {
      console.error(error);
      alert("Error al guardar la reseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-resena">
      <label>Puntuación:</label>
      <input
        type="number"
        name="puntuacion"
        min="1"
        max="5"
        value={form.puntuacion}
        onChange={handleChange}
        required
      />

      <label>Comentario:</label>
      <textarea
        name="texto"
        value={form.texto}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar reseña"}
      </button>
      <button type="button" onClick={onClose} disabled={loading}>
        Cancelar
      </button>
    </form>
  );
}
