import { getShuffledDecksOfCards } from '../deck-of-cards';
import { EVENT_CHOOSE_PLAYER,
    EVENT_DRAW_CARD,
    EVENT_QUIT_GAME,
    EVENT_PLAY_CARD, 
    EVENT_CREATE_GAME,
    CARD_DRAWN,
    CARD_PLAYED,
    GAMES_NEEDING_PLAYERS_UPDATED,
    GAME_OVER,
    PLAYER_SELECTED
} from '../constants';

export function sendMessage({ message, client }) {    
    client.publish('/game/client', message);
    console.log('Sent the message.' + JSON.stringify(message));
}

export const allGames = {};

export function getGameById(id) {
    if (allGames[id]) {
        return allGames[id];
    }
    else {
        const newGame = {};
        allGames[id] = newGame;
        return newGame;
    }
}

export function getGamesNeedingPlayers() {
    const results = [];
    Object.keys(allGames).forEach(g => {
        if (g.players && g.players.find(p => !p.isSelected)) {
            results.push(g);
        }
    });

    return results;
}

export function removeGameById(id) {
    if (allGames[id]) {
        delete allGames[id];
    }
}

export function registerSubscriptions(client) {

    const gameSubscription = client.subscribe('/game/server', function(message) {
        console.log('Received a message. ' + JSON.stringify(message));        

        try {
            switch (message.messageType) {
                case EVENT_CHOOSE_PLAYER:
                    choosePlayer({ client, message });
                    break;
                    
                case EVENT_DRAW_CARD:
                    drawCard({ client, message });
                    break;
                    
                case EVENT_CREATE_GAME:
                    // Change the list of names to the object
                    createTheGame({ client, message });
                    break;
                    
                case EVENT_PLAY_CARD:
                    // Remove the card from the players hand
                    playTheCard({ client, theGame, message });
                    break;
                    
                case EVENT_QUIT_GAME:
                    // Remove the state of the game.
                    quitTheGame({ client, gameId });
                    break;
                default: 
                    console.error('Unhandled message: ' + JSON.stringify(message));                
            }
        }
        catch (e) {
            console.error('Error processing message from client: ' + e.toString() + ' ' + e.stack);
        }
    });

    gameSubscription.then(function() {
		console.log('Game subscription to client requests is activated!');
	});
}

function getPlayerForGame(theGame, message) {
    return theGame.players.find(e => e.name === message.playerName);
}

function drawCard({ client, message }) {
    const theGame = exports.getGameById(gameId);
    const newCard = theGame.gameDeck.pop();
    sendMessage({
        client, 
        message: {
            messageType: CARD_DRAWN,
            newCard: newCard,
            playerName: message.playerName
        }
    });
}

function choosePlayer({ client, message }) {
    const theGame = exports.getGameById(gameId);
    const player = getPlayerForGame(theGame, message);
    player.team = message.team;
    player.isSelected = true;

    sendMessage({
        client, 
        message: {
            messageType: PLAYER_SELECTED,
            players: theGame.players,
            gamesNeedingPlayers: getGamesNeedingPlayers()
        }
    });

    const allPlayersSelected = !theGame.players.find(p => !p.isSelected);
    if (allPlayersSelected) {
        // Create the deck
        theGame.gameDeck = getShuffledDecksOfCards(message.numberOfPlayers / 2);

        // Give the players their cards
        theGame.players.forEach(player => {
            for (let i = 0; i < 5; i++) {
                player.hand.push(theGame.gameDeck.pop());
            }
        });

        sendMessage({
            client, 
            message: {
                messageType: 'game-started',
                players: theGame.players
            }
        }); 
    }
}

function quitTheGame({ client, gameId }) {
    exports.removeGameById(gameId);
    // Respond with the new status.
    sendMessage({
        client, 
        message: {
            messageType: GAME_OVER
        },
        client
    });
}

function playTheCard({ client, message }) {
    const theGame = exports.getGameById(gameId);
    const player = getPlayerForGame(theGame, message);
    player.hand = player.hand.filter(card => card.id === message.card.id);
    // Notify all users that the card has been played
    sendMessage({
        client, 
        message: {
            card: card,
            messageType: CARD_PLAYED,
            player: player
        },
        client
    });
}
//gamesNeedingPlayers
function createTheGame({ client, message }) {
    // We need to make a game
    const theGame = exports.getGameById(message.gameId);
    theGame.teams = message.teams;
    theGame.players = message.playerNames.map(p => {
        return {
            name: p,
            team: undefined,
            isSelected: false
        };
    });

    sendMessage({
        client, 
        message: {
            messageType: GAMES_NEEDING_PLAYERS_UPDATED,
            gamesNeedingPlayers: getGamesNeedingPlayers()
        },
        client
    });
}
