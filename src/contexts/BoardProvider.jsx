import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BoardContext } from './BoardContext';
import { CATEGORIES } from '../boardColumns';

const LOCAL_STORAGE_KEY = 'retrospectiveBoardState';
const emptyBoard = () =>
  CATEGORIES.reduce((board, category) => ({ ...board, [category]: [] }), {});

const loadBoard = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return emptyBoard();

    return CATEGORIES.reduce(
      (board, category) => ({
        ...board,
        [category]: Array.isArray(saved[category]) ? saved[category] : [],
      }),
      {}
    );
  } catch {
    return emptyBoard();
  }
};

export const BoardProvider = ({ children }) => {
  const [boardState, setBoardState] = useState(loadBoard);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(boardState));
  }, [boardState]);

  const addItem = (category) => {
    if (!CATEGORIES.includes(category)) {
      console.error(`Invalid category: ${category}`);
      return;
    }

    const newItem = { id: Date.now(), text: '', likes: 0 };
    setBoardState((prevState) => ({
      ...prevState,
      [category]: [...prevState[category], newItem],
    }));
  };

  const updateItemText = (itemId, newText) => {
    setBoardState((prevState) =>
      CATEGORIES.reduce(
        (newState, category) => ({
          ...newState,
          [category]: prevState[category].map((item) =>
            item.id === itemId ? { ...item, text: newText } : item
          ),
        }),
        {}
      )
    );
  };

  const deleteItem = (itemId) => {
    setBoardState((prevState) =>
      CATEGORIES.reduce(
        (newState, category) => ({
          ...newState,
          [category]: prevState[category].filter((item) => item.id !== itemId),
        }),
        {}
      )
    );
  };


  const moveCard = (itemId, toCategory, toIndex) => {
    setBoardState((prevState) => {
      const fromCategory = CATEGORIES.find((category) =>
        prevState[category].some((item) => item.id === itemId)
      );
      if (!fromCategory || !CATEGORIES.includes(toCategory)) return prevState;

      const item = prevState[fromCategory].find((entry) => entry.id === itemId);
      const withoutItem = prevState[fromCategory].filter((entry) => entry.id !== itemId);

      const target =
        fromCategory === toCategory ? [...withoutItem] : [...prevState[toCategory]];

      const index = toIndex >= 0 && toIndex <= target.length ? toIndex : target.length;
      target.splice(index, 0, item);

      return {
        ...prevState,
        [fromCategory]: withoutItem,
        [toCategory]: target,
      };
    });
  };

  return (
    <BoardContext.Provider
      value={{ boardState, addItem, updateItemText, deleteItem, moveCard }}
    >
      {children}
    </BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
