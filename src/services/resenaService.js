const API_URL = "http://localhost:4000/api/resenas";

export async function obtenerResenas(juegoId) {
  const url = juegoId ? `${API_URL}?juegoId=${juegoId}` : API_URL;
  const res = await fetch(url);
  return res.json();
}

export async function crearResena(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function actualizarResena(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function eliminarResena(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}
