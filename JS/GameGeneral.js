/**
 * general functions
 */

/**
 * get the current user from the local storage
 */
let user = JSON.parse(localStorage.getItem("current_user")).username;

/**
 * update a game's view according to the users current record and the highest score in this game
 * @param {*} game_name 
 */
function last_visit(game_name){
    let user_data = JSON.parse(localStorage.getItem(user));
    console.log(user);
    console.log(user_data);

    if(!user_data.hasOwnProperty("game-data")){
        document.getElementById("last-visit").innerText = "your first use, enjoy";
        document.getElementById("my-record").innerText = "0";
    }
    else{
        let games_data = user_data["game-data"];
        let values = Object.values(games_data);

        if(!games_data.hasOwnProperty(game_name)){
            document.getElementById("last-visit").innerText = "your first use, enjoy";
            document.getElementById("my-record").innerText = "0";
        }
        else{
            const d = format_date(new Date(games_data[game_name]["last_visit"]));
            document.getElementById("last-visit").innerText = d;
            document.getElementById("my-record").innerText = games_data[game_name]['score'];
        }   
    }
}

/**
 * return a readable string for representing a date
 * @param {*} date 
 * @returns 
 */
function format_date(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

/**
 * update the local storage according to the game results
 * @param {*} game the name of the game to store - RPS / TC
 */
function store_results(game){
    store_user_results(game);
    store_game_results(game);
}


/**
 * update the user's local storage according to the game results
 * @param {*} game_name RPS / TC
 */
function store_user_results(game_name){
    let user_storage = JSON.parse(localStorage.getItem(user));

    console.log(user_storage);

    const d = new Date();
    console.log(d.toUTCString());
    
    if(!user_storage.hasOwnProperty('game-data')){
        // create the propery and store it
        user_storage['game-data'] = {}
    }
    
    let game_list = user_storage['game-data'];

    if(!game_list.hasOwnProperty(game_name)){
        // add the game to the user
        if(game_name === 'RPS'){
            user_storage["game-data"][game_name] = { 'score': score, 'last_visit': d, image_path:'../Media/rock paper scissors.png' };
        }
        else{
            user_storage["game-data"][game_name] = { 'score': score, 'last_visit': d, image_path:'../Media/tricky cups.png' };
        }
        console.log(user_storage);
    }
    else{
        //update the memory
        let game = game_list[game_name];
        game['last_visit'] = d;

        if(score > game['score']){
            game['score'] = score;
        }
    }

    console.log(user_storage);
    localStorage.setItem(user, JSON.stringify(user_storage));
}

/**
 * update the game's local storage according to the users score
 * @param {*} game_name 
 */
function store_game_results(game_name){
    let game_storage = JSON.parse(localStorage.getItem(game_name));
    if(!game_storage){
        localStorage.setItem(game_name,JSON.stringify({'username': user, 'score': score}));
        console.log('created new game record');
    }
    else if(score > game_storage['score']){
        game_storage['score'] = score;
        game_storage['username'] = user;
        localStorage.setItem(game_name,JSON.stringify(game_storage));
        console.log(game_name);
    }
}

/**
 * open the game-area and initialize the game
 */
function start_game(e){
    document.getElementsByClassName('start-btn-area')[0].classList.remove('activate');
    document.getElementsByClassName('start-btn-area')[0].classList.add('deactivate');

    document.getElementsByClassName('game-area')[0].classList.remove('deactivate');
    document.getElementsByClassName('game-area')[0].classList.add('activate');

    initialize();

    console.log('start game');
}

function finish_game(){
    location.reload();
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) % 3;
}