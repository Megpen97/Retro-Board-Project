import { createContext, useState, useEffect } from 'react';  
import PropTypes from 'prop-types';  

export const BoardContext = createContext();  

const LOCAL_STORAGE_KEY = 'retrospectiveBoardState';  

const CATEGORIES = ['wentWell', 'toImprove', 'actionItems'];  

export const BoardProvider = ({ children }) => {  
  const [boardState, setBoardState] = useState(() => {  
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);  
    return savedState  
      ? JSON.parse(savedState)  
      : {  
          wentWell: [],  
          toImprove: [],  
          actionItems: [],  
        };  
  });  

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
    setBoardState((prevState) => {  
      const newState = { ...prevState };  
      for (let category in newState) {  
        const items = newState[category];  
        const itemIndex = items.findIndex((item) => item.id === itemId);  
        if (itemIndex > -1) {  
          items[itemIndex].text = newText;  
          break;  
        }  
      }  
      return newState;  
    });  
  };  

  const deleteItem = (itemId) => {  
    setBoardState((prevState) => {  
      const newState = { ...prevState };  
      for (let category in newState) {  
        const items = newState[category];  
        newState[category] = items.filter((item) => item.id !== itemId);  
      }  
      return newState;  
    });  
  };  

  const moveItem = (itemId, direction) => {  
    setBoardState((prevState) => {  
      const newState = { ...prevState };  
      let itemToMove;  
      let fromCategory, toCategoryIdx;  

      // Find the category containing the item  
      for (let i = 0; i < CATEGORIES.length; i++) {  
        const category = CATEGORIES[i];  
        const items = prevState[category];  
        const itemIndex = items.findIndex((item) => item.id === itemId);  

        if (itemIndex > -1) {  
          itemToMove = items[itemIndex];  
          fromCategory = category;  

          if (direction === 'right') {  
            toCategoryIdx = (i + 1) % CATEGORIES.length;  
          } else if (direction === 'left') {  
            toCategoryIdx = (i - 1 + CATEGORIES.length) % CATEGORIES.length;  
          }  

          newState[fromCategory] = items.filter((item) => item.id !== itemId);  
          break;  
        }  
      }  

      if (itemToMove) {  
        const toCategory = CATEGORIES[toCategoryIdx];  
        newState[toCategory] = [...newState[toCategory], itemToMove];  
      }  

      return newState;  
    });  
  };  

  return (  
    <BoardContext.Provider value={{ boardState, addItem, updateItemText, deleteItem, moveItem }}>  
      {children}  
    </BoardContext.Provider>  
  );  
};  

BoardProvider.propTypes = {  
  children: PropTypes.node.isRequired,  
};