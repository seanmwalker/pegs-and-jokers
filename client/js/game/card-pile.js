import PropTypes from 'prop-types';
import { Card } from './card';
import { backOfCard } from '../../../server/deck-of-cards';

export function CardPile(props) {
    return (
        <div className="face-down-card-pile col-2">
            <Card selectCard={props.selectCard} {...backOfCard} />
        </div>
    );
}

CardPile.defaultProps = {
    selectCard: () => {
        alert('No selectCard function provided.');
    }
};

CardPile.propTypes = {
	selectCard: PropTypes.func
};