

document.addEventListener("DOMContentLoaded",load_TC_page);


/*
    Tricky Cups
*/

let level;

function load_TC_page(){
    /**
     *  1. the same like RPS
     *  2. make the game work
     */
    document.getElementById('start').addEventListener('click',start_game);

    document.getElementById(['1st']).addEventListener('click', ()=>{
        console.log('1st');
    })

    document.getElementById(['2nd']).addEventListener('click', ()=>{
        
        console.log('2nd');
    })

    document.getElementById(['3rd']).addEventListener('click', ()=>{
        
        console.log('3rd');
    })

    last_visit('TC');
    update_view_score_table('TC');
}

function initialize(e){
    level = document.getElementById('level').value;
    console.log(level);
    console.log(typeof(level));
    update_level_text(level);
    disable_buttons();
}

function update_level_text(level){
    let level_text;
    if(level === "0"){
        level_text = 'easy';
    }
    else if(level === "1"){
        level_text = 'normal';
    }
    else if(level === "2"){
        level_text = 'hard';
    }
    console.log(level_text);
    document.getElementById('level-name').innerText = level_text; 
}

/**
 * disable the selection butttons while the animation is taking place
 */
function disable_buttons(){
    [...document.getElementsByClassName('cupps-holder')[0].getElementsByTagName('button')].forEach(element => {
        element.disabled = true;
    });
}

/**
 * re-enable the selection butttons
 */
function enable_buttons(){
    [...document.getElementsByClassName('cupps-holder')[0].getElementsByTagName('button')].forEach(element => {
        element.disabled = false;
    });
}
