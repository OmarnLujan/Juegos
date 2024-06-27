import "../App.css";

function Recuadro({ children, isSelected, updateTablero, index }) {
  const className = `recuadro ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateTablero(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

export default Recuadro;
