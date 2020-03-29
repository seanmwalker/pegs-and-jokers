import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Start } from './start';
import { ChooseMyPlayer } from './choose-my-player';
import { Cards } from './cards';

export const gameStateNew = 'not-started';
export const gameStatePickingNames = 'picking-names';
export const gameStatePlaying = 'playing';

export class DisplayGame extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const ComponentToRender = this.props.gameState === gameStateNew ? Start : this.props.gameState === gameStatePickingNames ? ChooseMyPlayer : Cards;
        return (<ComponentToRender {...this.props} />);
    }
}

DisplayGame.propTypes = {
	choosePlayer: PropTypes.func,
	drawCard: PropTypes.func,
	faceUpCard: PropTypes.object,
	gameState: PropTypes.string,
	hand: PropTypes.array,
	playCard: PropTypes.func,
	start: PropTypes.func
};