import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { CardsInHand } from './cards-in-hand';
import { FaceUpCardPile } from './face-up-cards';
import { CardPile } from './card-pile';

export class Cards extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row">
				<CardsInHand hand={this.props.hand} selectCard={this.props.playCard} />
				<FaceUpCardPile faceUpCard={this.props.faceUpCard} />
				<CardPile selectCard={this.props.drawCard} />
			</div>
		);
	}
}

Cards.propTypes = {
	drawCard: PropTypes.func,
	faceUpCard: PropTypes.object,
	hand: PropTypes.array,
	playCard: PropTypes.func
};