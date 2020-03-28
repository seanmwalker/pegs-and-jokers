# pegs-and-jokers
Pegs and Jokers - for the grandparents and their friends during the quarantine

## Getting Started

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



