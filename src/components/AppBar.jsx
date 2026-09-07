import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../contexts/BoardContext';

/**
 * The page's sticky brand bar.
 *
 * Sits flat against the page at rest and lifts once content scrolls beneath
 * it, so the shadow signals overlap rather than being permanent decoration.
 */
const AppBar = () => {
  const { totalCards } = useContext(BoardContext);
  const [isLifted, setIsLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsLifted(window.scrollY > 4);

    onScroll(); // the page may load already scrolled
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`AppBar${isLifted ? ' AppBar--lifted' : ''}`}>
      <div className="AppBar__inner">
        <span className="AppBar__name">Retro Board</span>

        <p className="AppBar__count">
          {totalCards} {totalCards === 1 ? 'card' : 'cards'}
        </p>
      </div>
    </header>
  );
};

export default AppBar;
