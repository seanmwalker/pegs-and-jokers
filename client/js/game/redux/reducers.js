import _ from 'lodash';
import {
    CARD_DRAWN,
    CARD_PLAYED,
    GAMES_NEEDING_PLAYERS_UPDATED,
    GAME_OVER,
    GAME_SELECTED,
    GAME_STATE_NEW,
    GAME_STATE_PICKING_NAMES,
    GAME_STATE_PLAYING,
    GAME_STARTED,
    PLAYER_SELECTED,
    SET_GAME_ID
} from '../../../../server/constants';

// And start the react component to manage the game.
export function createNewState(state, obj) {
    const newState = _.cloneDeep(state);
    return Object.assign(newState, obj);
}

export function reducers(state = initialState, action) {
    console.log('Reducer call: ' + JSON.stringify(action));
    switch (action.type) {
        case CARD_DRAWN:
            const newState = createNewState(state, {});

            if (newState.myPlayersName === action.playerName) {
                newState.hand.push(action.newCard);
            }

            return newState;

        case CARD_PLAYED:
            return createNewState(state, { faceUpCard: action.faceUpCard });

        case GAME_SELECTED:
            return createNewState(state, { 
                gameId: action.gameId,
                gameState: GAME_STATE_PICKING_NAMES,
                players: action.players
            });

        case GAMES_NEEDING_PLAYERS_UPDATED:
            const gamesNeedingPlayersState = { 
                gamesNeedingPlayers: action.gamesNeedingPlayers
            };

            // If we have a game and we're still on the start screen, move to the picking names screen.
            if (state.gameId && state.gameState === GAME_STATE_NEW) {
                gamesNeedingPlayersState.gameState = GAME_STATE_PICKING_NAMES;

            }

            return createNewState(state, gamesNeedingPlayersState);
        
        case GAME_STARTED:
            return createNewState(state, { 
                gameState: GAME_STATE_PLAYING,
                hand: action.hand
            });

        case GAME_OVER:
            return createNewState(state, { 
                gameState: GAME_STATE_NEW,
                hand: [],
                faceUpCard: undefined,
                players: []
            });

        case PLAYER_SELECTED:
            return createNewState(state, { 
                gameState: GAME_STATE_PICKING_NAMES,
                players: action.players
            });

        case SET_GAME_ID:
            return createNewState(state, { 
                gameId: action.gameId
            });

        default:
            console.log('No match for this game action: ' + JSON.stringify(action));
            return createNewState(state, {});
    }

}