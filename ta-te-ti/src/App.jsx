import { useState } from "react";
import "./App.css";
import Recuadro from "./components/Recuadro.jsx";
import GanadorModal from "./components/GanadorModal.jsx";
import confetti from "canvas-confetti";
import { turnos } from "./constantes.js";
import { revisarFinalJuego, revisarGanadores } from "./tablero.js";

function App() {
  // carga el estado del local store si no existe crea uno nuevo
  const [tablero, setTablero] = useState(()=>{
    const tableroFromStorage = window.localStorage.getItem('tablero')
    return tableroFromStorage ? JSON.parse(tableroFromStorage) : Array(9).fill(null)
  });
  const [turno, setTurno] = useState(()=>{
    const turnoFromStorage = window.localStorage.getItem('turno')
    return turnoFromStorage ? turnoFromStorage : turno.X
  });
  const [ganador, setGanador] = useState(null); //null no ganador, false empate, true ganador

  const resetGame = () => {
    setTablero(Array(9).fill(null));
    setTurno(turnos.X);
    setGanador(null);

    window.localStorage.removeItem('tablero');
    window.localStorage.removeItem('turno');
  };

  const updateTablero = (index) => {
    //no actualizar posiciones ocupadas
    if (tablero[index] || ganador) return;
    //actualizar tablero
    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno; // X o O
    setTablero(nuevoTablero);
    //revisar ganadores
    const nuevoGanador = revisarGanadores(nuevoTablero);
    if (nuevoGanador) {
      confetti();
      setGanador(nuevoGanador);
    } else if (revisarFinalJuego(nuevoTablero)) {
      setGanador(false); // empate
    }
    //cambiar el turno
    const nuevoTurno = turno === turnos.X ? turnos.O : turnos.X;
    setTurno(nuevoTurno);
    //guardar partida
    window.localStorage.setItem('tablero', JSON.stringify(nuevoTablero))
    window.localStorage.setItem('turno', nuevoTurno)
  };

  return (
    <main className="tablero">
      <button onClick={resetGame}>Reiniciar Juego</button>
      <h1>tateti</h1>
      <section className="game">
        {tablero.map((_, index) => {
          return (
            <Recuadro
              key={index}
              children={tablero[index]}
              updateTablero={updateTablero}
              index={index}
            ></Recuadro>
          );
        })}
      </section>
      <section className="turno">
        <Recuadro isSelected={turno === turnos.X}>{turnos.X}</Recuadro>
        <Recuadro isSelected={turno === turnos.O}>{turnos.O}</Recuadro>
      </section>

      <GanadorModal key={10} ganador={ganador} resetGame={resetGame} />
    </main>
  );
}

export default App;
