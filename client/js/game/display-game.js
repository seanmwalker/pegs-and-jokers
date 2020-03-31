import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Start } from './start';
import { ChooseMyPlayer } from './choose-my-player';
import { Cards } from './cards';
import { GAME_STATE_NEW, GAME_STATE_PICKING_NAMES } from './constants';

export class DisplayGame extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const ComponentToRender = this.props.gameState === GAME_STATE_NEW ? Start : this.props.gameState === GAME_STATE_PICKING_NAMES ? ChooseMyPlayer : Cards;
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