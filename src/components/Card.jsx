import { useContext } from 'react';
import { FaTrash, FaGripVertical } from 'react-icons/fa';
import { BoardContext } from '../contexts/BoardContext';

/**
 * The card's visuals, with no knowledge of dragging.
 *
 * Rendered twice over: once by Item and once by DragOverlay.
 */
const Card = ({ item, handleRef, handleProps, isDragging, isOverlay }) => {
  const { updateItemText, deleteItem } = useContext(BoardContext);

  const classes = [
    'RetroCard',
    isDragging ? 'RetroCard--dragging' : '',
    isOverlay ? 'RetroCard--overlay' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes}>
      <div className="RetroCard__body">
        <button
          type="button"
          ref={handleRef}
          className="RetroCard__grip"
          aria-label="Drag to move card"
          title="Drag to move"
          {...handleProps}
        >
          <FaGripVertical />
        </button>

        <input
          type="text"
          className="RetroCard__input"
          value={item.text}
          onChange={(e) => updateItemText(item.id, e.target.value)}
          placeholder="Enter text here"
          aria-label="Card text"
        />

        <button
          type="button"
          className="RetroCard__delete"
          aria-label="Delete card"
          title="Delete"
          onClick={() => deleteItem(item.id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default Card;
