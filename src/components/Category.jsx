import { useContext } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Item from './Item.jsx';
import { BoardContext } from '../contexts/BoardContext';
import { CATEGORIES } from '../boardColumns';

const Category = ({ title, items, categoryKey }) => {
  const { addItem } = useContext(BoardContext);

  const { setNodeRef, isOver } = useDroppable({ id: categoryKey });

  const classes = [
    'RetroCategory',
    `RetroCategory--${categoryKey}`,
    isOver ? 'RetroCategory--over' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section ref={setNodeRef} className={classes}>
      <div className="RetroCategory__head">
        <h2 className="RetroCategory__title">{title}</h2>
        <span className="RetroCategory__count">{items.length}</span>
      </div>

      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="RetroCategory__list">
          {items.length === 0 ? (
            <p className="RetroCategory__empty">Drop a card here</p>
          ) : (
            items.map((item) => <Item key={item.id} item={item} />)
          )}
        </div>
      </SortableContext>

      <button type="button" className="ButtonAdd" onClick={() => addItem(categoryKey)}>
        <span className="ButtonAdd__plus" aria-hidden="true">
          +
        </span>
        Add card
      </button>
    </section>
  );
};

export default Category;
