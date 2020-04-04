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
		const players = e.target.value.trim().split('\n').filter(n => n && n.length);

		const canStartGame = this.areGameSettingsValid({ 
			players: players,
			numberOfPlayers: this.state.numberOfPlayers
		})

		this.setState({ 
			canStartGame: canStartGame,
			players: names
		});
	}

	changePlayerCount(e) {
		const numberOfPlayers = parseInt(e.target.value);

		const canStartGame = this.areGameSettingsValid({ 
			players: this.state.players,
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
			players: this.state.players
		});
	}

	isTeamFull({ team, numPlayersToBeFull }) {
		const teamPlayerCount = this.props.players.find(p => p.team === this.props.teams[team]);
		return teamPlayerCount >= numPlayersToBeFull;
	}

	render() {
		const numPlayersToBeFull = players.length / 2;
		const isTeamAFull = isTeamFull({ team: 'a', numPlayersToBeFull });
		const isTeamBFull = isTeamFull({ team: 'b', numPlayersToBeFull });
		
		return (
			<div className="players-list">
				<h2>Select your player</h2>
				<p>Now you need to click on your name below. When everyone has selected their player we will be able to begin.</p>
				{this.props.players.map((player, index) => 
					<div>
						<button key={index} className="select-player" onClick={() => {
							this.props.choosePlayer({ team: teams.a, playerName: player.name });
						}} disabled={player.isSelected || isTeamAFull}>Join {teams.a}</button>
						
						{player.name}

						<button key={index} className="select-player" onClick={() => {
							this.props.choosePlayer({ team: teams.b, playerName: player.name });
						}} disabled={player.isSelected || isTeamBFull}>Join {teams.b}</button>
					</div>
                )}
			</div>
		);
	}
}

ChooseMyPlayer.propTypes = {
	choosePlayer: PropTypes.func,
	players: PropTypes.array,
	teams: PropTypes.object
};