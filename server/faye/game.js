import { getShuffledDecksOfCards } from '../deck-of-cards';

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

export function removeGameById(id) {
    if (allGames[id]) {
        delete allGames[id];
    }
}

export function registerSubscriptions(client) {

    const gameSubscription = client.subscribe('/game/server', function(message) {
        console.log('Received a message. ' + JSON.stringify(message));        

        // When we support multiple concurrent games, we'll need this fixed. For now only one game will exist at a time.
        const gameId = 'theOneGameForNow';

        try {
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
    return theGame.players.find(e => e.name === message.playersName);
}

function drawCard(gameId, message) {
    const theGame = exports.getGameById(gameId);
    const newCard = theGame.gameDeck.pop();
    sendMessage({
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

    sendMessage({
        message: {
            messageType: 'player-selected',
            players: theGame.players
        }
    });

    const allPlayersSelected = !theGame.players.find(p => !p.isSelected);
    if (allPlayersSelected) {
        theGame.players.forEach(player => {
            for (let i = 0; i < 5; i++) {
                player.hand.push(theGame.gameDeck.pop());
            }
        });

        sendMessage({
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
    sendMessage({
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
    sendMessage({
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

    sendMessage({
        message: {
            messageType: 'game-created',
            players: theGame.players
        },
        client
    });
}
