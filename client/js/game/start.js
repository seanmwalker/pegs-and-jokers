import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

export class Start extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			canStartGame: false,
			playerNames: [],
			numberOfPlayers: 4
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
				<textArea onChange={this.changePlayers} placeholder="Enter players names one per line"></textArea>
				<br/>
				<br/>
				<button onClick={this.startTheGame} disabled={this.state.canStartGame ? '' : 'disabled'}>Start</button>
			</div>
		);
	}
}

Start.propTypes = {
	start: PropTypes.func
};