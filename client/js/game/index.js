import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { connect } from 'react-redux';
import { reducers } from './redux/reducers';
import {
    notifyPublishStateChange,
    processMessage,
    setGameId,
    showPickingPlayers,
    joinGame
} from './redux/actions';
import { GameProvider } from './game-provider';
import {
    EVENT_CHOOSE_PLAYER,
    EVENT_CREATE_GAME,
    EVENT_DRAW_CARD,
    EVENT_JOIN_GAME,
    EVENT_PLAY_CARD,
    EVENT_QUIT_GAME,
    GAME_STATE_NEW
} from '../../../server/constants';

import '../../less/game.less';

export function setup({ parentElement, client }) {
    const initialState = {
        faceUpCard: undefined,
        gamesNeedingPlayers: [],
        gameState: GAME_STATE_NEW,
        hand: [],
        myPlayersName: '',
        players: [],
        teams: {}
    };

    // Make the div that our game space will be rendered in
    const div = createGameDiv(parentElement);

    const mapStateToProps = (state, ownProps) => {
        const currentState = Object.assign({}, store.getState());
        currentState.store = ownProps.store;
        return currentState;
    };

    const mapDispatchToProps = mapDispatchToPropsForMessaging(initialState, client)

    const store = createStore(reducers, initialState)
    window.store = store;

    subscribeToGameMessages({ client, dispatch: store.dispatch });

    const ConnectedGameProvider = connect(
        mapStateToProps,
        mapDispatchToProps
    )(GameProvider);

    ReactDOM.render(<ConnectedGameProvider store={store} />, div);
}

export function sendMessageToServer({ client, message }) {
    return client.publish('/game/server', message)
    .then(() => {
        console.log('Message sent to server.: ' + JSON.stringify(message));
    })
    .catch(e => {
        console.error('Message to server failed: ' + e.toString());
    });
}

export function createGameDiv(parentElement) {
    const div = document.createElement('div');
    div.classList.add('game-container');
    div.classList.add('col-10');
    div.classList.add('card');
    parentElement.appendChild(div);
    return div;
}

export function mapDispatchToPropsForMessaging(initialState, client) {
    return dispatch => {
        return {
            choosePlayer: ({ team, playerName }) => {
                initialState.myPlayersName = playerName;

                sendMessageToServer({
                    client,
                    message: {
                        messageType: EVENT_CHOOSE_PLAYER,
                        team: team,
                        playerName: playerName
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_CHOOSE_PLAYER));
            },

            drawCard: (playerName) => {
                sendMessageToServer({
                    client,
                    message: {
                        messageType: EVENT_DRAW_CARD,
                        playerName: playerName
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_DRAW_CARD));
            },

            end: () => {
                sendMessageToServer({
                    client,
                    message: {
                        messageType: EVENT_QUIT_GAME
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_QUIT_GAME));
            },

            playCard: (card) => {
                sendMessageToServer({
                    client,
                    message: {
                        card: card,
                        messageType: EVENT_PLAY_CARD,
                        playersName: myPlayersName
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_PLAY_CARD));
            },

            showChoosePlayers: (gameId) => {
                dispatch(showPickingPlayers(gameId));
            },

            start: ({ gameId, numberOfPlayers, playerNames, teamA, teamB }) => {
                dispatch(setGameId(gameId));

                sendMessageToServer({
                    client,
                    message: {
                        gameId: gameId,
                        messageType: EVENT_CREATE_GAME,
                        numberOfPlayers: numberOfPlayers,
                        playerNames: playerNames,
                        teams: {
                            a: teamA,
                            b: teamB
                        }
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_CREATE_GAME));
            },

            join: (gameId) => {
                dispatch(joinGame(gameId));
                dispatch(notifyPublishStateChange(EVENT_JOIN_GAME));
            }
        };
    };
}

export function subscribeToGameMessages({ client, dispatch }) {
    client.subscribe('/game/client', function (message) {
        console.log('Game message came in: ' + JSON.stringify(message));
        dispatch(processMessage(message));
    })
        .then(function () {
            console.log('Game subscription to the server is activated! args=' + JSON.stringify(arguments));
        });
}