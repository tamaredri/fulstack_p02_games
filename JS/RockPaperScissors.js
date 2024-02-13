/*
    Restart Page functionalities
*/

document.addEventListener("DOMContentLoaded",load_RPS_page);


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
    update_view_score_table('RPS');
}



function initialize(){
    rounds = 0;
    user_life = 3;
    computer_life = 3;
    score = 30;
    update_rounds();
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



