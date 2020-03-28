
import '../less/game.less';

export function initializeUI({ parentElement, client }) {
    // Ugly hand coded UI. Consider react.
    const gameView = document.createElement('div');
    gameView.id = 'game-container';
    gameView.classList.add('game-container');
    gameView.classList.add('col-10');
    gameView.classList.add('card');
    gameView.innerHTML = `
        <div class="game-label h2">Game Time</div>
        <p>Add a welcome screen, and make the game itelf</p>
    `;

    parentElement.appendChild(gameView);

    // Add your publish calls here.
    const panel = document.getElementById('game-container');
    panel.addEventListener('click', event => {
        const gameId = 'some game... When you have state you will have this.';
        client.publish('/game/' + gameId, 'Who clicked on me!');
    });
}

export function registerSubscriptions(client) {
    var subscription = client.subscribe('/game', function(message) {
        // handle messages
        alert('Game message came in: ' + message.toString());
    });
}

export function setup({ parentElement, client }) {
    registerSubscriptions(client);
    initializeUI({ parentElement, client });
}
