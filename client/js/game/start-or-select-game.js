import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

export class Start extends Component {
	constructor(props) {
		super(props);

		this.areGameSettingsValid = this.areGameSettingsValid.bind(this);
		this.changePlayers = this.changePlayers.bind(this);
		this.changePlayerCount = this.changePlayerCount.bind(this);
		this.startTheGame = this.startTheGame.bind(this);
		this.updateGameName = this.updateGameName.bind(this);
		this.updateTeamAName = this.updateTeamAName.bind(this);
		this.updateTeamBName = this.updateTeamBName.bind(this);
		this.joinThisGame = this.joinThisGame.bind(this);
		
		this.state = {
			canStartGame: false,
			gameId: '',
			teamA: '',
			teamB: '',
			playerNames: [],
			numberOfPlayers: 4
		};
	}

	areGameSettingsValid({ gameId, numberOfPlayers, playerNames, teamA, teamB }) {
		const enoughPlayers = playerNames.length === numberOfPlayers;
		const hasGameId = !!gameId;
		const hasTeamA = !!teamA;
		const hasTeamB = !!teamB;

		return enoughPlayers && hasGameId && hasTeamA && hasTeamB;
	}

	changePlayers(e) {
		const playerNames = e.target.value.trim().split('\n').filter(n => n && n.length);

		const canStartGame = this.areGameSettingsValid({ 
			gameId: this.state.gameId,
			numberOfPlayers: this.state.numberOfPlayers,
			playerNames: playerNames,
			teamA: this.state.teamA,
			teamB: this.state.teamB
		})

		this.setState({ 
			canStartGame: canStartGame,
			playerNames: playerNames
		});
	}

	changePlayerCount(e) {
		const numberOfPlayers = parseInt(e.target.value);

		const canStartGame = this.areGameSettingsValid({ 
			gameId: this.state.gameId,
			numberOfPlayers: numberOfPlayers,
			playerNames: this.state.playerNames,
			teamA: this.state.teamA,
			teamB: this.state.teamB
		})

		this.setState({ 
			canStartGame: canStartGame,
			numberOfPlayers:numberOfPlayers
		});
	}

	startTheGame() {
		this.props.start({ 
			gameId: this.state.gameId,
			numberOfPlayers: this.state.numberOfPlayers,
			playerNames: this.state.playerNames,
			teamA: this.state.teamA,
			teamB: this.state.teamB
		});
	}

	joinThisGame(gameId) {
		this.props.join(gameId);
	}

	updateGameName(e) {
		const canStartGame = this.areGameSettingsValid({ 
			gameId: this.state.gameId,
			numberOfPlayers: this.state.numberOfPlayers,
			playerNames: this.state.playerNames,
			teamA: this.state.teamA,
			teamB: this.state.teamB
		})

		this.setState({
			canStartGame: canStartGame,
			gameId: e.target.value
		});
	}

	updateTeamAName(e) {
		const canStartGame = this.areGameSettingsValid({ 
			gameId: this.state.gameId,
			numberOfPlayers: this.state.numberOfPlayers,
			playerNames: this.state.playerNames,
			teamA: this.state.teamA,
			teamB: this.state.teamB
		})

		this.setState({
			canStartGame: canStartGame,
			teamA: e.target.value
		});
	}

	updateTeamBName(e) {
		const canStartGame = this.areGameSettingsValid({ 
			gameId: this.state.gameId,
			numberOfPlayers: this.state.numberOfPlayers,
			playerNames: this.state.playerNames,
			teamA: this.state.teamA,
			teamB: this.state.teamB
		})

		this.setState({
			canStartGame: canStartGame,
			teamB: e.target.value
		});
	}

	render() {
		return (
			<div className="row start-or-select-game">
				<div className="col-6">
					<h2>Start A Game</h2>
					<p>To Start a game give it a name, and two team names, then select the number of players and enter their names. Them click the button to start.</p>
					<br/>
					<label>Your Game Name:</label>
					<input type="text" id="game-id" placeholder="Enter a name for your game" value={this.state.gameId} onChange={this.updateGameName} />
					<br/>
					<label>Enter the first team's name:</label>
					<input type="text" id="team-a" placeholder="Enter a name for your first team" value={this.state.teamA} onChange={this.updateTeamAName} />
					<br/>
					<label>Enter the second team's name:</label>
					<input type="text" id="team-b" placeholder="Enter a name for your second team" value={this.state.teamB} onChange={this.updateTeamBName} />
					<br/>
					<label>How many players will there be in this game?</label>
					<select id="number-of-players" defaultValue={this.state.numberOfPlayers} onChange={this.changePlayerCount}>
						<option value="4">Four Players</option>
						<option value="6">Six Players</option>
						<option value="8">Eight Players</option>
					</select>
					<br/>
					<br/>
					<label>List the players by name:</label>
					<textarea onChange={this.changePlayers} placeholder="Enter players names one per line"></textarea>
					<br/>
					<br/>
					<button onClick={this.startTheGame} disabled={!this.state.canStartGame}>Start</button>
				</div>
				<div className="col-6">
					<h2>Join A Game</h2>
					<p>
						The following games are waiting for people to join so they can start playing!
					</p>
					<div className="games-waiting-for-players d-flex align-items-stretch">
						{this.props.gamesNeedingPlayers.map((game, key) =>
							<div key={key} className="game" onClick={() => { this.props.showChoosePlayers(game.gameId); }}>
								<h3>Game: <b>{game.gameId}</b></h3>
								<button className="text-center join-game" onClick={() => {
									this.joinThisGame(game.gameId);
									}}>Join</button>
								<br/>
								{game.players.map((player, index) => 
									<div key={index}>Player: 
										<span className={'badge badge-' + (player.isSelected ? 'primary' : 'info')}>{player.name}</span>
									</div>
					 			)}
							</div>
						)}

						{!this.props.gamesNeedingPlayers.length && 
							<div className="alert alert-info">No games waiting for players.</div>
						}
					</div>
				</div>
			</div>
		);
	}
}

Start.propTypes = {
	gamesNeedingPlayers: PropTypes.array,
	join: PropTypes.func,
	start: PropTypes.func,
	showChoosePlayers: PropTypes.func
};