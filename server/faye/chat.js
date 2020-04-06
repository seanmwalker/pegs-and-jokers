export function sendChatMessage({ message, client }) {    
    client.publish('/chat/receive', message);
    console.log('Sent the message.' + JSON.stringify(message));
}

export function registerSubscriptions(client) {
    const chatSubscription = client.subscribe('/chat/send', function(message) {
        console.log('Received a message. ' + JSON.stringify(message));
        exports.sendChatMessage({ message, client });
    });

    chatSubscription.then(function() {
		console.log('Chat subscription is activated!');
	});
}

export function updateNewClient({ client, clientId }) {

}