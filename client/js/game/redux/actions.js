import { GAME_UI_STATE, SET_GAME_ID } from '../../../../server/constants';

// This one action should solve for all of the Faye pub sub messaging.
export function processMessage(message) {
    message.type = message.messageType;
    delete message.messageType;
    return message;
}

export function showPickingPlayers(gameId) {
    return {
        type: GAME_STATE_PICKING_NAMES,
        gameId: gameId
    }
}

export function setGameId(gameId) {
    return {
        type: SET_GAME_ID,
        gameId: gameId
    };
}

export function notifyPublishStateChange(newPublishEventName) {
    return {
        type: GAME_UI_STATE,
        publishEvent: notifyPublishStateChange
    };
}