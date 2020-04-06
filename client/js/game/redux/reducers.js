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
            return cardDrawn(state, action);

        case CARD_PLAYED:
            return cardPlayed(state, action);

        case GAME_SELECTED:
            return gameSelected(state, action);

        case GAMES_NEEDING_PLAYERS_UPDATED:
            return gamesNeedingPlayersUpdated(action, state);
        
        case GAME_STARTED:
            return gameStarted(state, action);

        case GAME_OVER:
            return gameOver(state);

        case PLAYER_SELECTED:
            return playerSelected(state, action);

        case SET_GAME_ID:
            return setGameId(state, action);

        default:
            console.log('No match for this game action: ' + JSON.stringify(action));
            return createNewState(state, {});
    }

}

function cardPlayed(state, action) {
    return createNewState(state, {
        faceUpCard: action.faceUpCard
    });
}

function setGameId(state, action) {
    return createNewState(state, {
        gameId: action.gameId
    });
}

function playerSelected(state, action) {
    return createNewState(state, {
        gameState: GAME_STATE_PICKING_NAMES,
        players: action.players
    });
}

function gameOver(state) {
    return createNewState(state, {
        gameState: GAME_STATE_NEW,
        hand: [],
        faceUpCard: undefined,
        players: [],
        teams: undefined
    });
}

function gameStarted(state, action) {
    return createNewState(state, {
        gameState: GAME_STATE_PLAYING,
        hand: action.hand
    });
}

function gamesNeedingPlayersUpdated(action, state) {
    const gamesNeedingPlayersState = {
        gamesNeedingPlayers: action.gamesNeedingPlayers
    };
    // If we have a game and we're still on the start screen, move to the picking names screen.
    if (state.gameId && state.gameState === GAME_STATE_NEW) {
        gamesNeedingPlayersState.gameState = GAME_STATE_PICKING_NAMES;
    }
    return createNewState(state, gamesNeedingPlayersState);
}

function gameSelected(state, action) {
    const gameToJoin = state.gamesNeedingPlayers.find(g => g.gameId === action.gameId);

    return createNewState(state, {
        gameId: action.gameId,
        gameState: GAME_STATE_PICKING_NAMES,
        teams: gameToJoin.teams,
        players: gameToJoin.players
    });
}

function cardDrawn(state, action) {
    const newState = createNewState(state, {});
    if (newState.myPlayersName === action.playerName) {
        newState.hand.push(action.newCard);
    }
    return newState;
}
