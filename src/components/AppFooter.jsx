import { useContext } from 'react';
import { BoardContext } from '../contexts/BoardContext';

const AppFooter = () => {
  const { totalCards, clearBoard } = useContext(BoardContext);

  const handleReset = () => {
    const cards = `${totalCards} ${totalCards === 1 ? 'card' : 'cards'}`;
    if (window.confirm(`Delete all ${cards}? This cannot be undone.`)) {
      clearBoard();
    }
  };

  return (
    <footer className="AppFooter">
      <div className="AppFooter__inner">
        <p className="AppFooter__note">This board saves to this browser only.</p>

        <button
          type="button"
          className="AppFooter__reset"
          onClick={handleReset}
          disabled={totalCards === 0}
        >
          Reset board
        </button>
      </div>
    </footer>
  );
};

export default AppFooter;
