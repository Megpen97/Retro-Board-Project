import { useContext, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import './RetroBoard.css';
import Category from './Category.jsx';
import Card from './Card.jsx';
import { BoardContext } from '../contexts/BoardContext';
import { COLUMNS, CATEGORIES } from '../boardColumns';

const categoryOf = (board, id) => {
  if (CATEGORIES.includes(id)) return id;
  return CATEGORIES.find((category) => board[category].some((item) => item.id === id));
};

const RetroBoard = () => {
  const { boardState, moveCard } = useContext(BoardContext);
  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = ({ active }) => {
    const category = categoryOf(boardState, active.id);
    setActiveCard(boardState[category]?.find((item) => item.id === active.id) ?? null);
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;

    const from = categoryOf(boardState, active.id);
    const to = categoryOf(boardState, over.id);
    if (!from || !to || from === to) return;

    const overIndex = boardState[to].findIndex((item) => item.id === over.id);
    moveCard(active.id, to, overIndex === -1 ? boardState[to].length : overIndex);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveCard(null);
    if (!over) return;

    const to = categoryOf(boardState, over.id);
    if (!to) return;

    const overIndex = boardState[to].findIndex((item) => item.id === over.id);
    moveCard(active.id, to, overIndex === -1 ? boardState[to].length : overIndex);
  };

  return (
    <div className="RetroBoard">
      <header className="RetroBoard__header">
        <h1 className="RetroBoard__title">Retro Board</h1>
        <p className="RetroBoard__subtitle">
          Drag cards between columns to move them.
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveCard(null)}
      >
        <div className="RetroBoard__columns">
          {COLUMNS.map(({ key, title }) => (
            <Category key={key} title={title} items={boardState[key]} categoryKey={key} />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? <Card item={activeCard} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default RetroBoard;
