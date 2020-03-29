# pegs-and-jokers
Pegs and Jokers - for the grandparents and their friends during the quarantine

## Getting Started

This application will run on Windows, Mac and Linux.

Assumptions:

You have modern development tools.

 - If on windows, you use a nicer command line prompt: https://conemu.github.io/
 - You have installed git / git bash on your machine: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
 - You have installed Node.js. Use the latest LTS version: https://nodejs.org/en/download/
 - You have a code editor. I recommend considering: https://code.visualstudio.com/download


Enter the following commands (assumes you have git installed and are using http, feel free to use ssh keys as well)
```
git clone https://github.com/seanmwalker/pegs-and-jokers.git
cd pegs-and-jokers
npm install
npm start
```

Then open your browser to ```http://localhost:8000``` and you can see the current site.

### Technology Stack

 - This project is an express.js based web server.
  - https://expressjs.com/
 - This project will use faye for pub/sub to send and receive instant notification of changes from other clients or the server 
 itself.
   - https://faye.jcoglan.com/node/clients.html
 - This project uses webpack to manage the front end assets (web pages, javascript, css and images)
   - We use webpack devserver middleware for development to keep things nice and simple.
   - We are also using hot module reload, so your page may reload or just be updated when you make client side changes in your project.
 - We are using nodemon to develop, and possibly to run the app with. 
   - https://github.com/remy/nodemon#nodemon
 - Less will handle our css for us:
   - http://lesscss.org/features/


## UX Layout

```
/             -> Home page. Shows games in progress that you are in, games waiting for more people that you can join, and a way to start a new game
```

## Publish / Subscribe Events

The game will send small amounts of data betwen browsers through the server using Faye. Below are the different types of events that are required to communicate properly

### Application Level Events:

When you are first coming, or leaving, or not in a game itself, the following events are available for the browser to call and receive responses for.

```
/faye/games         -> Lists the games that are available

/faye/game/create   -> Creates a new game with the creator as the first player. 

/faye/game/join     -> Joins a game.

/faye/game/end      -> Cancels a game, removes it from all users who were playing. 

/faye/my-stats      -> Shows your users details.

/faye/login         -> Use some form of login TBD... Maybe it's just list of email addresses and passwords that we compare against.

/faye/logout        -> just clears your cookies/session data and removes you from any games you were in.

/faye/message       -> we should let some fun happen. Let players send a message to someone else. Helps for cheating and other things to keep the fun unpredictable.
```

### Game Level Events

Once you are in a game, the following events are used.

Asssit here, I don't know how to play this game...

```
/faye/game/leave     -> Leaves a game.

/faye/deal

/faye/move

/faye/play-card
```

### Game Global Events

```
/faye/winner

/faye/you-lost
```


## Game Play

Notes on how to play can be found here: https://www.pagat.com/race/pegsandjokers.html

 - Create a new game:
   - Pick the number of people in a game. This equals the number of decks of cards that are needed. 
     - Divide the number of people into two teams.
     - Standard decks of cards are used, with two jokers in each deck. Three decks (162 cards including 6 jokers) may be enough for up to six players: eight players should use four decks (216 cards including 8 jokers).
   - Name the game
   - Wait for the others to join the game, you will get a link you can send them which will automatically join the game
 - The board has a specific layout based in the number of players as well.
   - Each side of the board has a straight section of track 18 units long: there is a corner hole at each end, shared between two adjacent sides, and 17 holes between them.
   - The 8th hole after the corner is the "come out" position for the pegs on that side, and next to it is the colored "start" area with five holes where the pegs of that color are stored at the start of the game.
   - The 3rd hole after the corner is the "in-spot" for that color, and branching off at the "in-spot" is a colored private track of 5 holes, which is the "home" or "safe" area or "castle", where the pegs end their journey. 
 - Five cards are dealt to each player, and the remaining cards are stacked face down. As usual players hold their cards so that they can see their faces but no one else can. Played cards form a face up pile on the table. Players take turns in clockwise order. At your turn you do the following:
   -Draw one card from the top of the face-down deck, so that you hold six cards.
   -Play one card of your choice from your hand face up onto your discard pile.
   -Move according to the power of the played card.

Movement of pegs:

 - In order to move your peg out of your start area, you must play a jack, queen, king, ace (to move it to its "come out" hole) or a joker (to move it to the hole occupied by a peg of a different color anywhere on the main track).

 - When playing a 2, 3, 4, 5, 6, 9 or 10, you move one of your own pegs that is not in your start area forward that number of holes along the track.

 - When playing an ace, you may either move one of your pegs from your start area to your "come out" hole, or move one of your pegs forward one hole.

 - When playing a jack, queen or king you may either move one of your pegs from your start area to your "come out" hole, or move one of your pegs forward 10 holes.

 - When playing an 8, you must move one of your pegs backwards 8 holes.

 - When playing a 7, you may either move one of your pegs forward 7 holes, or split the 7 between two of your pegs, moving them 1 and 6, 2 and 5 or 3 and 4 holes forwards. Of course the split move can only be made if you have at least two pegs in play.

 - When you play a joker, you move any one of your pegs (for example one in the start area) into a hole on the main track that is occupied by another player's peg, belonging either to a partner or to an opponent. This has the effect of sending that peg to its in-spot or start area respectively, as described above. A joker cannot be used to move to an empty hole, so if there are no pegs of any colour on the main track a joker cannot be played.

 - You must always use the full value of the card played. For example when playing a 6 you must move a peg forward 6 holes, no less. If you play a 6 when you have a peg on your in-spot and all your other pegs in the start area, you must move your peg on along the main track, since there is not room in the home track for a move of 6.



 ## How to program this

  - Need to have the rules applied
    - Need a map of the card values and movement and rules
    - Need a playing space that shows the board, and in the middle perhaps we show 'your cards' and the discard and pick from card piles.
    - Need to have game state that tracks who's turn it is, and how we can let them take their turn. Here is what I think the workflow would be per turn:
      - Pick the card
      - Pick the piece to move
        - Show only the pieces that can be moved at this point
      - Move the piece
      - Check to see if the game has reached its end

### Step one: Let the people see the cards, and use a video sharing program to view one person's board. They manage the pieces on the board for everyone, but the app here lets them manage the cards.

This lets us get something usable for now. It will allow them to play, long before the whole app is completed. Since video can show the board, and they can manage the rules, the only thing missing is the cards.

### Step two: Add the board to the app

We could also show the board in the app, but let them tell the piece to move without any rules getting checked. Basically just show the list of pieces, and they can click to move it, and let others complain if it's not fair.

### Step three: Enforce all the rules.

This could take weeks to complete in a bug free way. So go for it if they want it all...