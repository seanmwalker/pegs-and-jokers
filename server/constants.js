// Messages from client to server
export const EVENT_CHOOSE_PLAYER = 'choose-player';
export const EVENT_DRAW_CARD = 'draw-card';
export const EVENT_QUIT_GAME = 'quit-game';
export const EVENT_PLAY_CARD = 'play-card';
export const EVENT_CREATE_GAME = 'create-game';

// Messages from server to client
export const CARD_DRAWN = 'card-drawn';
export const CARD_PLAYED = 'card-played';
export const GAMES_NEEDING_PLAYERS_UPDATED = 'games-needing-players-updated';
export const GAME_STARTED = 'game-started';
export const GAME_SELECTED = 'game-selected';
export const GAME_OVER = 'game-over';
export const GAME_STATE_NEW = 'not-started';
export const GAME_STATE_PICKING_NAMES = 'picking-names';
export const GAME_STATE_PLAYING = 'playing';
export const PLAYER_SELECTED = 'player-selected';

// Use this as the key in redux for those helpful state transitions (Its your turn, waiting on new card etc..)
export const GAME_UI_STATE = 'game-ui-state';

export const SET_GAME_ID = 'set-game-id';
