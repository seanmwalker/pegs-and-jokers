import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { DisplayGame } from './display-game';

export class GameProvider extends Component {
	constructor(props) {
		super(props);
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <DisplayGame {...this.props} />
            </Provider>
        );
    }
}