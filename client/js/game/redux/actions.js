import { GAME_UI_STATE } from '../constants';

// This one action should solve for all of the Faye pub sub messaging.
export function processMessage(message) {
    message.type = message.messageType;
    delete message.messageType;
    return message;
}

export function notifyPublishStateChange(newPublishEventName) {
    return {
        type: GAME_UI_STATE,
        publishEvent: notifyPublishStateChange
    };
}