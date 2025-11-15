import axios from "axios";

const API_URL = "http://localhost:3000/api/juegos"; // tu backend

export const obtenerJuegos = () => axios.get(API_URL);
export const crearJuego = (juego) => axios.post(API_URL, juego);
export const actualizarJuego = (id, juego) => axios.put(`${API_URL}/${id}`, juego);
export const eliminarJuego = (id) => axios.delete(`${API_URL}/${id}`);
export const obtenerJuegoPorId = (id) => axios.get(`${API_URL}/${id}`);
