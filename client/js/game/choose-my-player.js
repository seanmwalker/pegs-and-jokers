import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

export class ChooseMyPlayer extends Component {
	constructor(props) {
        super(props);
        
        this.changePlayers = this.changePlayers.bind(this);
        this.changePlayerCount = this.changePlayerCount.bind(this);
        this.startTheGame = this.startTheGame.bind(this);
		
		this.state = {
			myPlayerName: ''
		};
	}

	changePlayers(e) {
		const playerNames = e.target.value.trim().split('\n').filter(n => n && n.length);

		const canStartGame = this.areGameSettingsValid({ 
			playerNames: playerNames,
			numberOfPlayers: this.state.numberOfPlayers
		})

		this.setState({ 
			canStartGame: canStartGame,
			playerNames: names
		});
	}

	changePlayerCount(e) {
		const numberOfPlayers = parseInt(e.target.value);

		const canStartGame = this.areGameSettingsValid({ 
			playerNames: this.state.playerNames,
			numberOfPlayers:numberOfPlayers
		})

		this.setState({ 
			canStartGame: canStartGame,
			numberOfPlayers:numberOfPlayers
		});
	}
	startTheGame() {
		props.start({ 
			numberOfPlayers: this.state.numberOfPlayers,
			players: this.state.playerNames
		});
	}

	render() {
		return (
			<div className="plaers-list">
				<h2>Select your player</h2>
				<p>Now you need to click on your name below. When everyone has selected their player we will be able to begin.</p>
                {this.props.playerNames.map(player => 
                    <button className="select-player" onClick={() => {
                        this.choosePlayer(player.name);
                    }} disabled={player.isSelected}>{player.name}</button>
                )}
			</div>
		);
	}
}

ChooseMyPlayer.propTypes = {
	choosePlayer: PropTypes.func
};