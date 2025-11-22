import { useEffect, useState } from "react";
import { obtenerResenas, eliminarResena, actualizarResena } from "../services/resenaService";
import "./resena.css";

export default function Resenas({ juegoId, nombreJuego, calificacion }) {
    const [resenas, setResenas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editando, setEditando] = useState(null);
    const [formEdit, setFormEdit] = useState({ puntuacion: 1, texto: "" });

    const cargarResenas = async () => {
        setLoading(true);
        try {
            let params = [];
            if (juegoId) params.push(`juegoId=${juegoId}`);
            if (nombreJuego) params.push(`nombreJuego=${nombreJuego}`);
            if (calificacion) params.push(`calificacion=${calificacion}`);

            const query = params.length > 0 ? `?${params.join("&")}` : "";
            const res = await obtenerResenas(query);
            setResenas(res.data);
        } catch (error) {
            console.error(error);
            setResenas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarResenas();
    }, [juegoId, nombreJuego, calificacion]);

    const handleEliminar = async (id) => {
        if (confirm("¿Eliminar esta reseña?")) {
            try {
                await eliminarResena(id);
                cargarResenas();
            } catch (error) {
                console.error(error);
                alert("No se pudo eliminar la reseña");
            }
        }
    };

    const handleGuardarEdicion = async (id) => {
        try {
            await actualizarResena(id, formEdit);
            setEditando(null);
            cargarResenas();
        } catch (error) {
            console.error(error);
            alert("No se pudo actualizar la reseña");
        }
    };

    return (
        <div className="resenas">
            <h4>Reseñas:</h4>
            {loading ? (
                <p>Cargando...</p>
            ) : resenas.length === 0 ? (
                <p>No hay reseñas aún.</p>
            ) : (
                resenas.map(r => (
                    <div key={r._id} className="resena-card">
                        {editando === r._id ? (
                            <div>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={formEdit.puntuacion}
                                    onChange={e => setFormEdit({ ...formEdit, puntuacion: e.target.value })}
                                />
                                <textarea
                                    value={formEdit.texto}
                                    onChange={e => setFormEdit({ ...formEdit, texto: e.target.value })}
                                    rows={2}
                                />
                                <div className="resena-buttons">
                                    <button onClick={() => handleGuardarEdicion(r._id)} className="editar-btn">Guardar</button>
                                    <button onClick={() => setEditando(null)} className="eliminar-btn">Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="resena-header">
                                    <span><strong>{r.autor}</strong> ({r.juego?.nombre})</span>
                                    <span className="resena-puntuacion">{r.puntuacion}/5</span>
                                </div>
                                <p className="resena-texto">{r.texto}</p>
                                <div className="resena-buttons">
                                    <button onClick={() => { setEditando(r._id); setFormEdit({ puntuacion: r.puntuacion, texto: r.texto }); }} className="editar-btn">Editar</button>
                                    <button onClick={() => handleEliminar(r._id)} className="eliminar-btn">Eliminar</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
