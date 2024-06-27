
import { lineasGanadoras } from "./constantes.js";

export const revisarGanadores = (nuevoTablero) => {
    //revision de todas las combinaciones
    for (const linea of lineasGanadoras) {
      const [a, b, c] = linea;
      if (
        nuevoTablero[a] &&
        nuevoTablero[a] === nuevoTablero[b] &&
        nuevoTablero[a] === nuevoTablero[c]
      ) {
        return nuevoTablero[a];
      }
    }
  };
  export const revisarFinalJuego = (nuevoTablero) => {
    //revisa si hay un empate, no quedan espacios vacios en el tablero
    return nuevoTablero.every((cuadrado) => cuadrado !== null); // X o O
  };