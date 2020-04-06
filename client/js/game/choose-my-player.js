import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

export class ChooseMyPlayer extends Component {
	constructor(props) {
        super(props);
        
        this.changePlayers = this.changePlayers.bind(this);
        this.changePlayerCount = this.changePlayerCount.bind(this);
		this.startTheGame = this.startTheGame.bind(this);
		this.isTeamFull = this.isTeamFull.bind(this);
		
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
		const numPlayersToBeFull = this.props.players.length / 2;
		const isTeamAFull = this.isTeamFull({ team: 'a', numPlayersToBeFull });
		const isTeamBFull = this.isTeamFull({ team: 'b', numPlayersToBeFull });
		
		return (
			<div className="players-list">
				<h2>Select your player</h2>
				<p>Now you need to click on your name below. When everyone has selected their player we will be able to begin.</p>
				{this.props.players.map((player, index) => 
					<div className="player-pick-teams">
						<button key={index} className="select-player" onClick={() => {
							this.props.choosePlayer({ team: this.props.teams.a, playerName: player.name });
						}} disabled={player.isSelected || isTeamAFull}>Join {this.props.teams.a}</button>
						
						<span className="players-name">
							{player.name}
						</span>

						<button key={index} className="select-player" onClick={() => {
							this.props.choosePlayer({ team: this.props.teams.b, playerName: player.name });
						}} disabled={player.isSelected || isTeamBFull}>Join {this.props.teams.b}</button>
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