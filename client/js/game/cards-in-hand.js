import PropTypes from 'prop-types';
import { Card } from './card';

export function CardsInHand(props) {
    return (
        <div className='cards-in-hand col-8'>
            {props.hand.map(card => {
                return (
                <Card selectCard={props.playCard} {...card} />
                )
            })}

        </div>
    );
}

CardsInHand.propTypes = {
    hand: PropTypes.array,
    selectCard: PropTypes.func
};