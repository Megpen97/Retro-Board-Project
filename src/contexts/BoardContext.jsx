import React, { createContext, useState, useEffect } from 'react';  
import PropTypes from 'prop-types';  

export const BoardContext = createContext();  

const LOCAL_STORAGE_KEY = 'retrospectiveBoardState';  

export const BoardProvider = ({ children }) => {  
  const [boardState, setBoardState] = useState(() => {  
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);  
    return savedState ? JSON.parse(savedState) : {  
      wentWell: [],  
      toImprove: [],  
      actionItems: []  
    };  
  });  

  useEffect(() => {  
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(boardState));  
  }, [boardState]);  

  const addItem = (category) => {  
    if (!['wentWell', 'toImprove', 'actionItems'].includes(category)) {  
      console.error(`Invalid category: ${category}`);  
      return;  
    }  

    const newItem = { id: Date.now(), text: '', likes: 0 };  
    setBoardState((prevState) => ({  
      ...prevState,  
      [category]: [...prevState[category], newItem]  
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
      let fromCategory, toCategory;  

      if (direction === 'left') {  
        fromCategory = ['toImprove', 'actionItems'].find((cat) =>  
          prevState[cat].some((item) => item.id === itemId)  
        );  
        toCategory = fromCategory === 'toImprove' ? 'wentWell' : 'toImprove';  
      } else {  
        fromCategory = ['wentWell', 'toImprove'].find((cat) =>  
          prevState[cat].some((item) => item.id === itemId)  
        );  
        toCategory = fromCategory === 'wentWell' ? 'toImprove' : 'actionItems';  
      }  

      itemToMove = newState[fromCategory].find((item) => item.id === itemId);  
      newState[fromCategory] = newState[fromCategory].filter((item) => item.id !== itemId);  
      newState[toCategory] = [...newState[toCategory], itemToMove];  

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
  children: PropTypes.node.isRequired  
};