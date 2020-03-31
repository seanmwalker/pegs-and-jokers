import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

export class Start extends Component {
	constructor(props) {
		super(props);

		this.areGameSettingsValid = this.areGameSettingsValid.bind(this);
		this.changePlayers = this.changePlayers.bind(this);
		this.changePlayerCount = this.changePlayerCount.bind(this);
		this.startTheGame = this.startTheGame.bind(this);
		
		this.state = {
			canStartGame: false,
			playerNames: [],
			numberOfPlayers: 4
		};
	}

	areGameSettingsValid({ playerNames, numberOfPlayers }) {
		return playerNames.length === numberOfPlayers;
	}

	changePlayers(e) {
		const playerNames = e.target.value.trim().split('\n').filter(n => n && n.length);

		const canStartGame = this.areGameSettingsValid({ 
			playerNames: playerNames,
			numberOfPlayers: this.state.numberOfPlayers
		})

		this.setState({ 
			canStartGame: canStartGame,
			playerNames: playerNames
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
		this.props.start({ 
			numberOfPlayers: this.state.numberOfPlayers,
			playerNames: this.state.playerNames
		});
	}

	render() {
		return (
			<div>
				<h2>Start A Game</h2>
				<p>To Start a game select the number of players and click the button to start.</p>
				<br/>
				<label>How many players will there be in this game?</label>
				<select id="number-of-players" defaultValue={this.state.numberOfPlayers} onChange={this.changePlayerCount}>
					<option value="4">Four Players</option>
					<option value="6">Four Players</option>
					<option value="8">Four Players</option>
				</select>
				<br/>
				<br/>
				<label>List the players by name:</label>
				<textarea onChange={this.changePlayers} placeholder="Enter players names one per line"></textarea>
				<br/>
				<br/>
				<button onClick={this.startTheGame} disabled={!this.state.canStartGame}>Start</button>
			</div>
		);
	}
}

Start.propTypes = {
	start: PropTypes.func
};