import _ from 'lodash';
import 'bootstrap';
import * as chat from './js/chat';
import * as game from './js/game';

import './less/index.less';
import 'bootstrap/dist/css/bootstrap.min.css';


function start() {

    // Get the content region
    const parentElement = document.getElementById('main-content');

    var client = new Faye.Client('/faye', {
        timeout: 120,
        retry: 10
    });

    chat.setup({ parentElement, client });
    game.setup({ parentElement, client });

    // Leave this for now...
    function createPlaceholderContent() {
        const message = ['Hello', 'welcome', 'to', 'Pegs', 'and', 'Jokers!'];
        const element = document.createElement('div');
        element.id = 'message';
        element.innerHTML = _.join(message, ' ');  
        parentElement.appendChild(element);
    }
    createPlaceholderContent();
}

start();


