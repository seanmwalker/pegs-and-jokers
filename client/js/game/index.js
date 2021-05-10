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
    GAME_STATE_NEW,
    GAME_OVER
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

export function getCookieValue(value) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let pieces = cookies[i].split('=');

        if (pieces[0]==value) {
            return pieces[1];

        }
    };

    return '';
}

export function setCookieValue({ name, value }) {
    document.cookie = name + '=' + value + ';max-age=' + 60 * 60 * 12;
}

export const cookies = {
    gameId: 'gameId',
    playersName: 'playersName'
};

export function getGameIdCookie() {
    return exports.getCookieValue(cookies.gameId);
}


export function setGameIdCookie(gameId) {
    exports.setCookieValue({ name: cookies.gameId, value: gameId });
}

export function getPlayerNameCookie() {
    return exports.getCookieValue('playerName');
}

export function setPlayersNameCookie(name) {
    exports.setCookieValue({ name: cookies.playersName, value: name });
}

export function clearCookies() {
    document.cookie = cookies.gameId + '=;expires=Sat, 01 Jan 2000 06:00:00 GMT';
    document.cookie = cookies.playersName + '=;expires=Sat, 01 Jan 2000 06:00:00 GMT';
}

export function mapDispatchToPropsForMessaging(initialState, client) {
    return dispatch => {
        return {
            choosePlayer: ({ gameId, team, playerName }) => {
                initialState.myPlayersName = playerName;
                exports.setPlayersNameCookie(playerName);

                sendMessageToServer({
                    client,
                    message: {
                        gameId: gameId,
                        messageType: EVENT_CHOOSE_PLAYER,
                        team: team,
                        playerName: playerName
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_CHOOSE_PLAYER));
            },

            drawCard: ({ gameId, playerName }) => {
                sendMessageToServer({
                    client,
                    message: {
                        gameId: gameId,
                        messageType: EVENT_DRAW_CARD,
                        playerName: playerName
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_DRAW_CARD));
            },

            end: (gameId) => {
                sendMessageToServer({
                    client,
                    message: {
                        gameId: gameId,
                        messageType: EVENT_QUIT_GAME
                    }
                });

                dispatch(notifyPublishStateChange(EVENT_QUIT_GAME));
            },

            playCard: ({ gameId, card }) => {
                sendMessageToServer({
                    client,
                    message: {
                        card: card,
                        gameId: gameId,
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
                exports.setGameIdCookie(gameId);
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
                exports.setGameIdCookie(gameId);
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
        if (message.gameState===GAME_OVER) {
            exports.clearCookies();
        }
    })
        .then(function () {
            console.log('Game subscription to the server is activated! args=' + JSON.stringify(arguments));
        });
}