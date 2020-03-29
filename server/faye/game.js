import { getShuffledDecksOfCards } from '../deck-of-cards';

export function sendMessage({ message, client }) {    
    client.publish('/game/receive', message);
    console.log('Sent the message.' + JSON.stringify(message));
}

export const allGames = {};

export function getGameById(id) {
    if (allGames[id]) {
        return allGames[id];
    }
    else {
        allGames[id] = {};
    }
}

export function removeGameById(id) {
    if (allGames[id]) {
        delete allGames[id];
    }
}

export function registerSubscriptions(client) {

    const gameSubscription = client.subscribe('/game/send', function(message) {
        console.log('Received a message. ' + JSON.stringify(message));        

        // When we support multiple concurrent games, we'll need this fixed. For now only one game will exist at a time.
        const gameId = 'theOneGameForNow';

        switch (message.messageType) {
            case 'choose-player':
                choosePlayer(gameId, message);
                break;
                
            case 'draw-card':
                drawCard(gameId, message);
                break;
                
            case 'create-game':
                // Change the list of names to the object
                createTheGame(gameId, message, client);
                break;
                
            case 'play-card':
                // Remove the card from the players hand
                playTheCard(gameId, theGame, message, client);
                break;
                
            case 'quit-game':
                // Remove the state of the game.
                quitTheGame(gameId, client);
                break;
            default: 
                console.error('Unhandled message: ' + JSON.stringify(message));                
        }
    });

    gameSubscription.then(function() {
		console.log('Game subscription is activated!');
	});
}

function getPlayerForGame(theGame, message) {
    return theGame.players.find(e => e.name === message.playersName);
}

function drawCard(gameId, message) {
    const theGame = exports.getGameById(gameId);
    const newCard = theGame.gameDeck.pop();
    exports.sendMessage({
        message: {
            messageType: 'card-drawn',
            newCard: newCard,
            playerName: message.playerName
        }
    });
}

function choosePlayer(gameId, message) {
    const theGame = exports.getGameById(gameId);
    const player = getPlayerForGame(theGame, message);
    player.isSelected = true;

    exports.sendMessage({
        message: {
            messageType: 'player-selected',
            players: theGame.players
        }
    });

    const allPlayersSelected = !theGame.players.find(p => !p.isSelected);
    if (allPlayersSelected) {
        theGame.players.forEach(player => {
            for (const i = 0; i < 5; i++) {
                player.hand.push(theGame.gameDeck.pop());
            }
        });

        exports.sendMessage({
            message: {
                messageType: 'game-started',
                players: theGame.players
            }
        }); 
    }
}

function quitTheGame(gameId, client) {
    exports.removeGameById(gameId);
    // Respond with the new status.
    exports.sendMessage({
        message: {
            messageType: 'game-over'
        },
        client
    });
}

function playTheCard(gameId, message, client) {
    const theGame = exports.getGameById(gameId);
    const player = getPlayerForGame(theGame, message);
    player.hand = player.hand.filter(card => card.id === message.card.id);
    // Notify all users that the card has been played
    exports.sendMessage({
        message: {
            card: card,
            messageType: 'card-played',
            player: player
        },
        client
    });
}

function createTheGame(gameId, message, client) {
    const theGame = exports.getGameById(gameId);
    theGame.gameDeck = getShuffledDecksOfCards(message.numberOfPlayers / 2);
    theGame.players = message.playerNames.map(p => {
        return {
            name: p,
            isSelected: false
        };
    });
    exports.sendMessage({
        message: {
            messageType: 'game-created',
            players: theGame.players
        },
        client
    });
}
