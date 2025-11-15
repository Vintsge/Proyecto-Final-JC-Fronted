import { useState, useEffect } from "react";
import "./FormularioJuego.css";
import { crearJuego, actualizarJuego } from "../services/juegoService.js";


export default function FormularioJuego({ juegoEditable, onCancel, setModo, cargarJuegos }) {
  const [form, setForm] = useState({
    nombre: "",
    genero: "",
    plataforma: "",
    portadaUrl: "",
    estado: "Pendiente",
    horasJugadas: 0,
    desarrollador: "",
  });

  useEffect(() => {
    if (juegoEditable) setForm(juegoEditable);
  }, [juegoEditable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (juegoEditable) {
        await actualizarJuego(juegoEditable._id, form);
      } else {
        await crearJuego(form);
      }
      cargarJuegos(); // refrescar lista
      setModo("lista");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el juego");
    }
  };

  return (
    <form className="formulario-juego" onSubmit={handleSubmit}>
      <h2>{juegoEditable ? "Editar juego" : "Agregar juego"}</h2>

      <label>Nombre:</label>
      <input name="nombre" value={form.nombre} onChange={handleChange} required />

      <label>Género:</label>
      <input name="genero" value={form.genero} onChange={handleChange} required />

      <label>Plataforma:</label>
      <input name="plataforma" value={form.plataforma} onChange={handleChange} required />

      <label>Portada URL:</label>
      <input name="portadaUrl" value={form.portadaUrl} onChange={handleChange} />

      <label>Estado:</label>
      <select name="estado" value={form.estado} onChange={handleChange}>
        <option>Pendiente</option>
        <option>Jugando</option>
        <option>Agotado</option>
      </select>

      <label>Horas jugadas:</label>
      <input type="number" name="horasJugadas" value={form.horasJugadas} onChange={handleChange} />

      <label>Desarrollador:</label>
      <input name="desarrollador" value={form.desarrollador} onChange={handleChange} />

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}