let user = JSON.parse(localStorage.getItem("current_user")).username;

/*
    Restart Page functionalities
*/

document.addEventListener("DOMContentLoaded",  ()=>{
    var currentPage = window.location.pathname;

    console.log(currentPage);

    if (currentPage.includes('RockParerScissorsGame')){
        load_RPS_page();
    }
    else if (currentPage.includes('CupsGame')){
        load_cups_page();
    }
});


/*
    Rock - Paper - Scissors
*/

let rounds;
let user_life;
let computer_life;
let score;
  

/**
 * initialize page settings
 */

function load_RPS_page(){
    /*
        1. load the last-seen for this user. if none - overide the text and say 'your first use, enjoy'
        2. functions from the slides to make the game work.
    */

    document.getElementById('start').addEventListener('click',start_game);


    document.getElementById('rock-btn').addEventListener('click',()=>{
        player_hand_selection(0);
    });

    document.getElementById('paper-btn').addEventListener('click',()=>{
        player_hand_selection(1);
    });

    document.getElementById('scissors-btn').addEventListener('click',()=>{
        player_hand_selection(2);
    });

    last_visit('RPS');
}

function last_visit(game_name){
    let user_data = JSON.parse(localStorage.getItem(user));
    console.log(user);
    console.log(user_data);

    if(!user_data.hasOwnProperty("game-data")){
        document.getElementById("last-visit").innerText = "your first use, enjoy";
    }
    else{
        let games_data = user_data["game-data"];
        let values = Object.values(games_data);

        if(!games_data.hasOwnProperty(game_name)){
            document.getElementById("last-visit").innerText = "your first use, enjoy";
        }
        else{
            const d = format_date(new Date(games_data[game_name]["last_visit"]));
            document.getElementById("last-visit").innerText = d;
        }   
    }
}

function format_date(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}




function start_game(e){
    document.getElementsByClassName('start-btn-area')[0].classList.remove('activate');
    document.getElementsByClassName('start-btn-area')[0].classList.add('deactivate');

    document.getElementsByClassName('game-area')[0].classList.remove('deactivate');
    document.getElementsByClassName('game-area')[0].classList.add('activate');

    rounds = 0;
    user_life = 3;
    computer_life = 3;
    score = 30;
    update_rounds();

    console.log('start game');
}

function finish_game(){
    location.reload();
}

/**
 * manage the game process
 */

/**
 * make move, update score and view according to the users selection
 * @param {*} hand the user's selection - Rock/Paper/Scissors
 */

function player_hand_selection(hand){
    // start the clock counting back
    const computer_hand = getRandomNumber();

    update_selection_view(hand, 'user');
    update_selection_view(computer_hand, 'computer');
    disable_buttons();

    check_winner(hand, computer_hand);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) % 3;
}

/**
 * update the hand view according to the user's selection
 * @param {*} hand the user's selection - Rock/Paper/Scissors
 * @param {*} user which user has to be updated - computer / user
 */
function update_selection_view(hand, user){
    const image = document.getElementsByClassName(user)[0].getElementsByClassName('hand-box')[0];
    switch (hand) {
        case 0:
            image.src = '../Media/rock.png';
            break;
        case 1:
            image.src = '../Media/paper.png';
            break;
        case 2:
            image.src = '../Media/scissors.png';
            break;
    
        default:
            image.src = '../Media/rock.png';
            break;
    }
    
}

/**
 * disable the selection butttons while the animation is taking place
 */
function disable_buttons(){
    [...document.getElementsByClassName('options')[0].getElementsByTagName('button')].forEach(element => {
        element.disabled = true;
        element.classList.add('btn-disabld');
    });
}

/**
 * re-enable the selection butttons
 */
function enable_buttons(){
    [...document.getElementsByClassName('options')[0].getElementsByTagName('button')].forEach(element => {
        element.disabled = false;
        element.classList.remove('btn-disabld');
    });
}

/**
 * chack who wins - computer / user, calculate the score accordingly and animate the screen.
 * @param {*} user_hand user's selection
 * @param {*} computer_hand computer's selection
 */
function check_winner(user_hand, computer_hand){
    let fliker = 0;
    let id;
    let loser;
    let heart_tag;
    if (user_hand === computer_hand){
        /**
         * tie
         */
        fliker = 5;
        score += 5;
    }
    else {
        if((computer_hand + 1) % 3 === user_hand){
            /**
             * hand wins
             */
            loser = 'computer';
            score += 10;
        }
        else{
            /**
             * computer wins
             */
            loser = 'user';
            score -= 10;
        }
        heart_tag = document.getElementsByClassName(loser)[0].getElementsByClassName('lives')[0].getElementsByClassName('heart');
    }
    
    id = setInterval(animate_loseing_life, 500);

    /**
     * animate the heart - fliker view
     */
    function animate_loseing_life(){
        
        if (fliker === 6){
            clearInterval(id);

            switch (loser) {
                case 'user':
                    user_life--;
                    break;
                case 'computer':
                    computer_life--;
                    break;
            }

            enable_buttons();
            fliker = 0;
            console.log('reset display');
            
            update_rounds();

            update_selection_view(1, 'user');
            update_selection_view(1, 'computer');
            check_game_over();

        }
        else if(fliker % 2){

            switch (loser) {
                case 'user':
                    heart_tag[user_life - 1].classList.add('remove-heart');
                    break;
                case 'computer':
                    heart_tag[3 - computer_life].classList.add('remove-heart');
                    break;
            }
            console.log('add heart');
            fliker++;
        }
        else {
            switch (loser) {
                case 'user':
                    heart_tag[user_life - 1].classList.remove('remove-heart');
                    break;
                case 'computer':
                    heart_tag[3 - computer_life].classList.remove('remove-heart');
                    break;
            }
            console.log('remove heart');
            fliker++;
        }
    }  
}

/**
 * increment the rounds by 1 and update the view
 */
function update_rounds(){
    document.getElementById('rounds').innerText = ++rounds;
}

/**
 * chack if one of side lost and terminate the game accordingly
 */
function check_game_over(){
    if(computer_life === 0){
        alert(`${user}, YOU WON!! your score is ${score}`);
        finish_game();
        store_results('RPS');
    }
    else if (user_life === 0){
        //score = 0; decide about it
        alert(`${user}, GAME OVER!! You lost. your score is ${score}`);
        finish_game();
        store_results('RPS');
    }

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
        if(game === 'RPS'){
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
 * 
 * @param {*} game_name 
 */
function store_game_results(game_name){

}

/*
    Tricky Cups
*/

function load_cups_page(){
    /**
     *  1. the same like RPS
     *  2. make the game work
     */
    last_visit('TC');
}
