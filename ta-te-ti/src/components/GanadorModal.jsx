import Recuadro from "./Recuadro.jsx";
import "../App.css";

const GanadorModal = ({ ganador, resetGame }) => {
  if (ganador === null) return null;
  const ganadorText = ganador === false ? "Empate" : `Gano`;

  return (
    <section className="ganador">
      <div className="text">
        <h2>{ganadorText}</h2>

        <header className="Gano">
          {ganador && <Recuadro>{ganador}</Recuadro>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
};

export default GanadorModal;
