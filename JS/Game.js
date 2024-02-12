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
    update_rounds();

    console.log('start game');
}

function finish_game(){
    document.getElementsByClassName('start-btn-area')[0].classList.remove('deactivate');
    document.getElementsByClassName('start-btn-area')[0].classList.add('activate');

    document.getElementsByClassName('game-area')[0].classList.remove('activate');
    document.getElementsByClassName('game-area')[0].classList.add('deactivate');
}

function player_hand_selection(hand){
    // start the clock counting back
    const computer_hand = getRandomNumber();

    //add delay

    update_selection_view(hand, 'user');
    update_selection_view(computer_hand, 'computer');
    console.log(hand);

    check_winner(hand, computer_hand);

    
    // increment the round
    update_rounds();
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

let fliker = 0;

function check_winner(hand, computer_hand){
    let id;
    let loser;
    let loser_tag;
    if (hand === computer_hand){
        /**
         * tie
         */
        // alert('its a tie!');
    }
    else if((computer_hand + 1) % 3 === hand){
        /**
         * hand wins
         */
        loser = 'computer';
        loser_tag = document.getElementsByClassName(loser)[0];
        id = setInterval(animate_loseing_life, 0.5);
        // alert('you won this round');
    }
    else{
        /**
         * computer wins
         */
        // alert('you lost this round');
        loser = 'user';
        loser_tag = document.getElementsByClassName(loser)[0];
        id = setInterval(animate_loseing_life, 0.5);
    }

    function animate_loseing_life(){
        
        if (fliker++ === 1){
            clearInterval(id);
        }
        else{
            loser_tag.getElementsByClassName('heart')[0].classList.add('remove-heart');
            
        }
    }    
}


function update_rounds(){
    document.getElementById('rounds').innerText = ++rounds;
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
