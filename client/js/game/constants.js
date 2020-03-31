export const EVENT_CHOOSE_PLAYER = 'choose-player';
export const EVENT_DRAW_CARD = 'draw-card';
export const EVENT_QUIT_GAME = 'quit-game';
export const EVENT_PLAY_CARD = 'play-card';
export const EVENT_CREATE_GAME = 'create-game';

export const GAME_STATE_NEW = 'not-started';
export const GAME_STATE_PICKING_NAMES = 'picking-names';
export const GAME_STATE_PLAYING = 'playing';

// Use this as the key in redux for those helpful state transitions (Its your turn, waiting on new card etc..)
export const GAME_UI_STATE = 'game-ui-state';
