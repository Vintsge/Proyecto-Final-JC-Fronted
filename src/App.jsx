import { useState } from "react";
import BibliotecaJuegos from "./components/BibliotecaJuegos.jsx";
import FormularioJuego from "./components/FormularioJuego.jsx";

function App() {
  const [modo, setModo] = useState("lista"); // lista o formulario
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [refrescar, setRefrescar] = useState(false); // para recargar lista

  return (
    <div>
      <h1>🎮 GameTracker</h1>

      {modo === "lista" && (
        <BibliotecaJuegos
          setJuegoSeleccionado={setJuegoSeleccionado}
          setModo={setModo}
        />
      )}

      {modo === "formulario" && (
        <FormularioJuego
          juegoEditable={juegoSeleccionado}
          onCancel={() => setModo("lista")}
          setModo={setModo}
          cargarJuegos={() => setRefrescar(!refrescar)}
        />
      )}
    </div>
  );
}

export default App;