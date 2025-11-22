import { useState } from "react";
import BibliotecaJuegos from "./components/BibliotecaJuegos.jsx";
import FormularioJuego from "./components/FormularioJuego.jsx";
import ResenaPage from "./components/resenaPage.jsx";

function App() {
  const [modo, setModo] = useState("lista");
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [refrescar, setRefrescar] = useState(false);

  return (
    <div>
      <h1>🎮 GameTracker</h1>

      {modo === "lista" && (
        <BibliotecaJuegos
          refrescar={refrescar}
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

      {modo === "resenasPage" && <ResenaPage />}
    </div>
  );
}

export default App;
