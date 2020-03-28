
import '../less/chat.less';

export function initializeUI({ parentElement, client }) {
    // Ugly hand coded UI. Consider react.
    const chatView = document.createElement('div');
    chatView.classList.add('chat-container');
    chatView.classList.add('col-2');
    chatView.classList.add('card');
    chatView.innerHTML = `
        <div class="chat-label h4">Global Chat</div>

        <div id="global-chats" class="chat-window alert alert-info"></div>

        <div class="chat-label h4">Direct Chats</div>

        <div id="direct-chats" class="chat-window alert alert-info"></div>

        <div class="send-chat-message form-group">
            <select id="send-to" class="form-control">
                <option value="everyone" selected>Everyone</option>
            </select>
            <div class="row">
                <div class="col-9">
                    <input type="text" id="chat-message" class="form-control" value="" placeholder="Enter your message" />
                </div>
                <div class="col-3">
                    <button id="send-message" class="btn btn-info">></button>
                </div>
            </div>
        </div>
    `;

    parentElement.appendChild(chatView);

    const button = document.getElementById('send-message');
    button.addEventListener('click', event => {
        const recipient = document.getElementById('send-to').value;

        const message = {
            text: document.getElementById('chat-message').value,
            from: 'me',
            to: recipient
        };

        client.publish('/chat/send', message);

        document.getElementById('chat-message').value = '';

        console.log('Sent the chat message...');
    });
}

export function registerSubscriptions(client) {
    var subscription = client.subscribe('/chat/receive', function(message) {
        console.log('Received a chat message... ' + JSON.stringify(message));
        if (message.to === 'everyone') {
            const msg = document.createElement('div');
            msg.classList.add('chat-message');
            msg.innerHTML = 'From: ' + message.from + '<br/>' + message.text;    
            document.getElementById('global-chats').appendChild(msg);
        }
        else {
            const msg = document.createElement('div');
            msg.classList.add('chat-message');
            msg.innerHTML = 'To: ' + message.recipient + '<br/>From: ' + message.from + '<br/>' + message.text;    
            document.getElementById('global-chats').appendChild(msg);

        }
    });
}

export function setup({ parentElement, client }) {
    registerSubscriptions(client);
    initializeUI({ parentElement, client });
}
