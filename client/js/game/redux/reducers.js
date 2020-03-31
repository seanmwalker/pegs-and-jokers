import _ from 'lodash';
import { GAME_STATE_NEW, GAME_STATE_PICKING_NAMES, GAME_STATE_PLAYING } from '../constants';

// And start the react component to manage the game.
export function createNewState(state, obj) {
    const newState = _.cloneDeep(state);
    return Object.assign(newState, obj);
}

export function reducers(state = initialState, action) {
    switch (action.type) {
        case 'card-played':
            return createNewState(state, DONE, { faceUpCard: action.faceUpCard });

        case 'card-drawn':
            const newState = createNewState(state, DONE, {});

            if (newState.myPlayersName === action.playerName) {
                newState.hand.push(action.newCard);
            }

            return newState;

        case 'game-created':
            return createNewState(state, DONE, { 
                gameState: GAME_STATE_PICKING_NAMES,
                players: action.players
            });

        case 'game-over':
            return createNewState(state, DONE, { 
                gameState: GAME_STATE_NEW,
                hand: [],
                faceUpCard: undefined,
                players: []
            });

        case 'game-started':
            return createNewState(state, DONE, { 
                gameState: GAME_STATE_PLAYING,
                hand: action.hand
            });

        case 'player-selected':
            return createNewState(state, DONE, { 
                gameState: GAME_STATE_PICKING_NAMES,
                players: action.players
            });

        default:
            console.log('No match for this game action: ' + JSON.stringify(action));
            return createNewState(state, {});
    }

}