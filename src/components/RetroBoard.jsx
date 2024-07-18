import { useContext } from 'react'
import './RetroBoard.css';
import Category from './Category.jsx';
import { BoardContext } from '../contexts/BoardContext';


const RetroBoard = () => {
  const { boardState } = useContext(BoardContext);  
  return (
      <>
        <h1>Retro Board</h1>
        <div>
          {/* <button className="button button-default">Column</button> */}
        </div>
        <div className="RetroApp row">
          <div className="RetroCategory RetroCategory-1">
            <Category 
              title="Went Well" 
              items={boardState.wentWell}
              categoryKey="wentWell"
            />
          </div>

          <div className="RetroCategory RetroCategory-2">
            <Category 
              title="To Improve" 
              items={boardState.toImprove}
              categoryKey="toImprove"  />
          </div>

          <div className="RetroCategory RetroCategory-3">
            <Category 
              title="Action Items" 
              items={boardState.actionItems}
              categoryKey="actionItems"  />
            
          </div>
        </div>
      </>
  )
}

export default RetroBoard