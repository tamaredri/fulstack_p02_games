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
}

function start_game(e){
    document.getElementsByClassName('start-btn-area')[0].classList.remove('activate');
    document.getElementsByClassName('start-btn-area')[0].classList.add('deactivate');

    document.getElementsByClassName('game-area')[0].classList.remove('deactivate');
    document.getElementsByClassName('game-area')[0].classList.add('activate');

    rounds = 0;
    user_life = 3;
    computer_life = 3;
    update_rounds();

    console.log('start game');
}

function finish_game(){
    location.reload();
}

function player_hand_selection(hand){
    // start the clock counting back
    const computer_hand = getRandomNumber();
    console.log(hand);

    update_selection_view(hand, 'user');
    update_selection_view(computer_hand, 'computer');
    disable_buttons();

    check_winner(hand, computer_hand);
}

function getRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 9) % 3;
    console.log(randomNumber);
    return randomNumber;
}

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

function disable_buttons(){
    [...document.getElementsByClassName('options')[0].getElementsByTagName('button')].forEach(element => {
        element.disabled = true;
        element.classList.add('btn-disabld');
    });
}

function enable_buttons(){
    [...document.getElementsByClassName('options')[0].getElementsByTagName('button')].forEach(element => {
        element.disabled = false;
        element.classList.remove('btn-disabld');
    });
}

function check_winner(hand, computer_hand){
    console.log(computer_life);
    console.log(user_life);
    

    let fliker = 0;
    let id;
    let loser;
    let heart_tag;
    if (hand === computer_hand){
        /**
         * tie
         */
        // alert('its a tie!');
        fliker = 5;

    }
    else {
        if((computer_hand + 1) % 3 === hand){
            /**
             * hand wins
             */
            // alert('you won this round');
            loser = 'computer';
        }
        else{
            /**
             * computer wins
             */
            // alert('you lost this round');
            loser = 'user';
        }
        heart_tag = document.getElementsByClassName(loser)[0].getElementsByClassName('lives')[0].getElementsByClassName('heart');
    }
    
    id = setInterval(animate_loseing_life, 500);

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


function update_rounds(){
    document.getElementById('rounds').innerText = ++rounds;
}

function check_game_over(){
    console.log(computer_life);
    console.log(user_life);

    if(computer_life === 0){
        alert('You won!! your score is ${}');
        finish_game();
    }
    else if (user_life === 0){
        alert('GAME OVER!! You lost. your score is ${}');
        finish_game();
    }

}


/*
    Tricky Cups
*/

function load_cups_page(){
    /**
     *  1. the same like RPS
     *  2. make the game work
     */
}
