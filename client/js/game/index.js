import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { DisplayGame, gameStateNew, gameStatePickingNames, gameStatePlaying } from './display-game';
import '../../less/game.less';

export function setup({ parentElement, client }) {

    const props = {
        choosePlayer: (playerName) => {
            props.myPlayersName = playerName;

            client.publish('/game', {
                messageType: 'choose-player',
                playerName: playerName
            });
        },
        drawCard: (playerName) => {
            client.publish('/game', {
                messageType: 'draw-card',
                playerName: playerName
            });
        },
        end: () => {
            client.publish('/game', {
                messageType: 'quit-game'
            });
        },
        faceUpCard: undefined,
        gameState: gameStateNew,
        hand: [],
        myPlayersName: '',
        players: [],
        playCard: (card) => {
            client.publish('/game', {
                card: card,
                messageType: 'play-card',
                playersName: myPlayersName
            });
        },
        start: ({ numberOfPlayers, playerNames }) => {
            client.publish('/game', {
                messageType: 'create-game',
                numberOfPlayers: numberOfPlayers,
                playerNames: playerNames
            });
        }
    };

    client.subscribe('/game', function(message) {
        console.log('Game message came in: ' + message.toString());

        switch (message.messageType) {
            case 'card-played':
                props.faceUpCard = message.faceUpCard;
                break;
            case 'card-drawn':
                if (props.myPlayersName === message.playerName) {
                    props.hand.push(message.newCard);
                }
                break;
            case 'game-created':
                props.gameState = gameStatePickingNames;
                props.players = message.players
                break;
            case 'game-over':
                props.hand = [];
                props.gameState = gameStateNew;
                props.faceUpCard = undefined;
                props.players = [];
                break;
            case 'game-started':
                props.gameState = gameStatePlaying;
                props.hand = message.hand;
                break;
            case 'player-selected':
                props.gameState = gameStatePickingNames;
                props.players = message.players
                break;
            }
        });

    const div = document.createElement('div');
    div.classList.add('game-container');
    div.classList.add('col-10');
    div.classList.add('card');
    parentElement.appendChild(div);
    ReactDOM.render(<DisplayGame {...props} />, div);
}