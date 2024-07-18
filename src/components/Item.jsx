import './RetroBoard.css';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { BoardContext } from '../contexts/BoardContext';

const Item = ({ item }) => {

    const { updateItemText, deleteItem, moveItem } = useContext(BoardContext);
    const handleTextChange = (e) => {
        updateItemText(item.id, e.target.value);
    };
    return (
        <>
            <div className="RetroCard" aria-label="Retro card">
                <input
                    type='text'
                    value={item.text}
                    onChange={handleTextChange}
                    placeholder='Enter text here'
                />

                <div className="button-group">
                    <button
                    type="button"
                    className="button button-left"
                    title="Move left"
                    onClick={() => moveItem(item.id, 'left')}
                    >
                        &#10094;
                    </button>
                    <button
                    type="button"
                    className="button button-delete"
                    title="Delete"
                    onClick={() => deleteItem(item.id)}
                    >
                        Delete
                    </button>                  
                    <button
                        type="button"
                        className="button button-right"
                        title="Move right"
                        onClick={() => moveItem(item.id, 'right')}
                    >
                        &#10095;
                    </button>
                </div>

            </div>
        </>
    )
}

Item.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string,
    }).isRequired,
};

export default Item