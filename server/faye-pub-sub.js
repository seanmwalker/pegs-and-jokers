import faye from 'faye';
import* as chat from './faye/chat';
import* as game from './faye/game';

export function initializeFaye(server) {
    const bayeux = new faye.NodeAdapter({
        mount: '/faye',
        timeout: 45
    });

    bayeux.attach(server);

    const client = bayeux.getClient();

    // Add extensions here if needed. See commented text below.
    
    chat.registerSubscriptions(client);
    game.registerSubscriptions(client);

    bayeux.on('handshake', function (clientId) {
        console.log('Client connected', clientId);
    });
}



// NOTE: If we need to handle authentication or other session stuff, extensions are good for that.
// bayeux.addExtension({
//     incoming: function(message, request, callback) {

//         //if (request && request.headers.origin !== 'http://example.com') {
//         //	message.error = '403::Forbidden origin';
//         //}
//         // This could be something we've sent from the server and has no request in that case.
//         if (!request) {
//             callback(message);
//             return;
//         }
//     },

//     outgoing: function(message, callback) {
//         // Again, leave non-subscribe messages alone
//         if (message.ext) {
//             delete message.ext;
//         }
//         callback(message);
//     }

// });