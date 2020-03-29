import lodash from 'lodash';

export const backOfCard =     {
    name: 'Back of card',
    color: 'red',
    text: '&#x1F0A0;'
};

export const deck = [
    {
        name: 'Ace of spades',
        color: 'black',
        text: '&#x1F0A1;'
    },
    {
        name: '2 of spades',
        color: 'black',
        text: '&#x1F0A2;'
    },
    {
        name: '3 of spades',
        color: 'black',
        text: '&#x1F0A3;'
    },
    {
        name: '4 of spades',
        color: 'black',
        text: '&#x1F0A4;'
    },
    {
        name: '5 of spades',
        color: 'black',
        text: '&#x1F0A5;'
    },
    {
        name: '6 of spades',
        color: 'black',
        text: '&#x1F0A6;'
    },
    {
        name: '7 of spades',
        color: 'black',
        text: '&#x1F0A7;'
    },
    {
        name: '8 of spades',
        color: 'black',
        text: '&#x1F0A8;'
    },
    {
        name: '9 of spades',
        color: 'black',
        text: '&#x1F0A9;'
    },
    {
        name: '10 of spades',
        color: 'black',
        text: '&#x1F0AA;'
    },
    {
        name: 'Jack of spades',
        color: 'black',
        text: '&#x1F0AB;'
    },
    {
        name: '??? of spades',
        color: 'black',
        text: '&#x1F0AC;'
    },
    {
        name: 'Queen of spades',
        color: 'black',
        text: '&#x1F0AD;'
    },
    {
        name: 'King of spades',
        color: 'black',
        text: '&#x1F0AE;'
    },
    {
        name: 'Ace of hearts',
        color: 'red',
        text: '&#x1F0B1;'
    },
    {
        name: '2 of hearts',
        color: 'red',
        text: '&#x1F0B2;'
    },
    {
        name: '3 of hearts',
        color: 'red',
        text: '&#x1F0B3;'
    },
    {
        name: '4 of hearts',
        color: 'red',
        text: '&#x1F0B4;'
    },
    {
        name: '5 of hearts',
        color: 'red',
        text: '&#x1F0B5;'
    },
    {
        name: '6 of hearts',
        color: 'red',
        text: '&#x1F0B6;'
    },
    {
        name: '7 of hearts',
        color: 'red',
        text: '&#x1F0B7;'
    },
    {
        name: '8 of hearts',
        color: 'red',
        text: '&#x1F0B8;'
    },
    {
        name: '9 of hearts',
        color: 'red',
        text: '&#x1F0B9;'
    },
    {
        name: '10 of hearts',
        color: 'red',
        text: '&#x1F0BA;'
    },
    {
        name: 'Jack of hearts',
        color: 'red',
        text: '&#x1F0BB;'
    },
        //'??? of hearts': '&#x1F0BC;'
    {
        name: 'Queen of hearts',
        color: 'red',
        text: '&#x1F0BD;'
    },
    {
        name: 'King of hearts',
        color: 'red',
        text: '&#x1F0BE;'
    },
    {
        name: 'red-joker',
        color: 'red',
        text: '&#x1F0BF;'
    },
    {
        name: 'Ace of diamonds',
        color: 'red',
        text: '&#x1F0C1;'
    },
    {
        name: '2 of diamonds',
        color: 'red',
        text: '&#x1F0C2;'
    },
    {
        name: '3 of diamonds',
        color: 'red',
        text: '&#x1F0C3;'
    },
    {
        name: '4 of diamonds',
        color: 'red',
        text: '&#x1F0C4;'
    },
    {
        name: '5 of diamonds',
        color: 'red',
        text: '&#x1F0C5;'
    },
    {
        name: '6 of diamonds',
        color: 'red',
        text: '&#x1F0C6;'
    },
    {
        name: '7 of diamonds',
        color: 'red',
        text: '&#x1F0C7;'
    },
    {
        name: '8 of diamonds',
        color: 'red',
        text: '&#x1F0C8;'
    },
    {
        name: '9 of diamonds',
        color: 'red',
        text: '&#x1F0C9;'
    },
    {
        name: '10 of diamonds',
        color: 'red',
        text: '&#x1F0CA;'
    },
    {
        name: 'Jack of diamonds',
        color: 'red',
        text: '&#x1F0CB;'
    },
        //'??? of diamonds': '&#x1F0CC;'
    {
        name: 'Queen of diamonds',
        color: 'red',
        text: '&#x1F0CD;'
    },
    {
        name: 'King of diamonds',
        color: 'red',
        text: '&#x1F0CE;'
    },
    {
        name: 'Black joker',
        color: 'black',
        text: '&#x1F0CF;'
    },
    {
        name: 'Ace of clubs',
        color: 'black',
        text: '&#x1F0D1;'
    },
    {
        name: '2 of clubs',
        color: 'black',
        text: '&#x1F0D2;'
    },
    {
        name: '3 of clubs',
        color: 'black',
        text: '&#x1F0D3;'
    },
    {
        name: '4 of clubs',
        color: 'black',
        text: '&#x1F0D4;'
    },
    {
        name: '5 of clubs',
        color: 'black',
        text: '&#x1F0D5;'
    },
    {
        name: '6 of clubs',
        color: 'black',
        text: '&#x1F0D6;'
    },
    {
        name: '7 of clubs',
        color: 'black',
        text: '&#x1F0D7;'
    },
    {
        name: '8 of clubs',
        color: 'black',
        text: '&#x1F0D8;'
    },
    {
        name: '9 of clubs',
        color: 'black',
        text: '&#x1F0D9;'
    },
    {
        name: '10 of clubs',
        color: 'black',
        text: '&#x1F0DA;'
    },
    {
        name: 'Jack of clubs',
        color: 'black',
        text: '&#x1F0DB;'
    },
        //'??? of clubs': '&#x1F0DC;'
    {
        name: 'Queen of clubs',
        color: 'black',
        text: '&#x1F0DD;'
    },
    {
        name: 'King of clubs',
        color: 'black',
        text: '&#x1F0DE;' 
    },
    // '': '&#x1F0DF;'
    // '': '&#x1F0E0;'
    // '': '&#x1F0E1;'
    // '': '&#x1F0E2;'
    // '': '&#x1F0E3;'
    // '': '&#x1F0E4;'
    // '': '&#x1F0E5;'
    // '': '&#x1F0E6;'
    // '': '&#x1F0E7;'
    // '': '&#x1F0E8;'
    // '': '&#x1F0E9;'
    // '': '&#x1F0EA;'
    // '': '&#x1F0EB;'
    // '': '&#x1F0EC;'
    // '': '&#x1F0ED;'
    // '': '&#x1F0EE;'
    // '': '&#x1F0EF;'
    // '': '&#x1F0F0;'
    // '': '&#x1F0F1;'
    // '': '&#x1F0F2;'
    // '': '&#x1F0F3;'
    // '': '&#x1F0F4;'
    // '': '&#x1F0F5;'
];

export function getShuffledDecksOfCards(numberOfDecks) {
    const decks = [];

    for (const i = 0; i < numberOfDecks; i++) {
        //Make a copy of the deck
        const newDeck = _.cloneDeep(exports.deck);

        //Shuffle the cards
        const shuffledDeck = _.shuffle(newDeck);

        // And add them to the other decks
        decks = _.contat(decks, shuffledDeck);
    }

    // Since we will have duplicate cards with multiple decks. We need a unique id.
    let i = 0;
    return decks.map(c => {
        c.id = i++;
        return c;
    });
}