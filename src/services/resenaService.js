import axios from "axios";

const API_URL = "http://localhost:3000/api/resenas";

// Obtener reseñas, opcionalmente filtradas por juegoId o nombreJuego
export const obtenerResenas = (filtros = {}) => {
  const params = new URLSearchParams(filtros).toString();
  return axios.get(`${API_URL}${params ? `?${params}` : ""}`);
};

export const crearResena = (data) => axios.post(API_URL, data);
export const actualizarResena = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarResena = (id) => axios.delete(`${API_URL}/${id}`);
export const obtenerResenasPorJuego = async (juegoId) => {
  const response = await axios.get(`${API_URL}?juegoId=${juegoId}`);
  return response.data;
};