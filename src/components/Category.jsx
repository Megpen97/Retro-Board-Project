import Item from './Item.jsx';
import './RetroBoard.css';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { BoardContext } from '../contexts/BoardContext';

const Category = ({ title, items, categoryKey }) => {
    const { addItem } = useContext(BoardContext);
    return (
        <div className="RetroCategory">
            <h2>{title}</h2>
            <button
                type="button"
                className="ButtonAdd button button-default"
                aria-label="Add new card"
                title="Add new card"
                onClick={() => addItem(categoryKey)}
            >
                +
            </button>
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    )
}

Category.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string,
    })).isRequired,
    categoryKey: PropTypes.oneOf(['wentWell', 'toImprove', 'actionItems']).isRequired,
};

export default Category