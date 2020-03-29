import _ from 'lodash';
import 'bootstrap';
import * as chat from './js/chat';
import * as game from './js/game/index';

import './less/index.less';
import 'bootstrap/dist/css/bootstrap.min.css';


function start() {

    // Get the content region
    const parentElement = document.getElementById('main-content');

    // Start the pub/sub client
    var client = new Faye.Client('/faye', {
        timeout: 120,
        retry: 10
    });

    // Load the two main elements of the site.
    chat.setup({ parentElement, client });
    game.setup({ parentElement, client });
}

start();


