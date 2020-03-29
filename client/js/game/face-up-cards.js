import PropTypes from 'prop-types';
import { Card } from './card';
import { backOfCard } from '../../../server/deck-of-cards';

export function FaceUpCardPile(props) {
    return (
        <div className="face-up-card-pile col-2">
            <Card {...props.faceUpCard} />
        </div>
    );
}

FaceUpCardPile.defaultProps = {
    faceUpCard: backOfCard
};

FaceUpCardPile.propTypes = {
	faceUpCard: PropTypes.object
};