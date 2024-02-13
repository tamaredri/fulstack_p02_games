

document.addEventListener("DOMContentLoaded",load_TC_page);

/*
    Tricky Cups
*/

let level;
let score = Math.floor(Math.random() * 9) % 10 + 40;
let swap_number;
let interval;

function load_TC_page(){
    /**
     *  1. the same like RPS
     *  2. make the game work
     */
    document.getElementById('start').addEventListener('click',start_game);

    document.getElementById(['first']).addEventListener('click', ()=>{
        show_result("first",50);
    })

    document.getElementById(['second']).addEventListener('click', ()=>{
        show_result("second",50);
    })

    document.getElementById(['third']).addEventListener('click', ()=>{
        show_result("third",50);
    })

    last_visit('TC');
    update_view_score_table('TC');
}

function initialize(e){
    level = document.getElementById('level').value;
    console.log(level);
    update_level_text(level);
    disable_buttons();
    set_level_data();
    show_ball("second",30);
}

function set_level_data(){
    switch (level) {
        case "0":
            interval = 3000;
            swap_number = 5;
            [...document.getElementsByClassName('cup-btn')].forEach(element => {
                element.classList.add('easy');
            });
            break;
        
        case "1":
            interval = 2000;
            swap_number = 7;
            [...document.getElementsByClassName('cup-btn')].forEach(element => {
                element.classList.add('normal');
            });
            break;

        case "2":
            interval = 1000;
            swap_number = 9;
            [...document.getElementsByClassName('cup-btn')].forEach(element => {
                element.classList.add('hard');
            });
            break;

        default:
            break;
    }
    console.log(level);
    console.log(swap_number);    
    console.log(interval);



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


function show_ball(cup,interval) {
    let id = null;
    const elem = document.getElementById(cup).getElementsByTagName("img")[0]; 
   
    console.log(elem);

    let pos = elem.style.top;
    console.log('pos: ' + pos);
    let move = -50;

    id = setInterval(frame1, interval);
  
    console.log(pos);

    function frame1() {
      if (pos === move) {
        clearInterval(id);
        id = setInterval(frame2, interval);
      } else {
        pos--; 
        console.log(pos);
        elem.style.top = pos + "px";
      }
    }

    function frame2() {
        if (pos === 0) {
          clearInterval(id);
          swap_cups();
        } else {
            pos++; 
            console.log(pos);
            elem.style.top = pos + "px";
        }
      }
}

function switchButtons(button1, button2) {
    var style1 = window.getComputedStyle(button1);
    var style2 = window.getComputedStyle(button2);

    var transformValue1 = style1.transform;
    var transformValue2 = style2.transform;
    var translateX1 = 0; // Default value if there is no translateX property
    var translateX2 = 0; // Default value if there is no translateX property
    
    if (transformValue1 && transformValue1 !== 'none') {
        translateX1 = parseFloat(transformValue1.split(',')[4].trim());
    }
    

    if (transformValue2 && transformValue2 !== 'none') {
        translateX2 = parseFloat(transformValue2.split(',')[4].trim());
    }

    console.log('translateX1 ' + translateX1);
    console.log('translateX2 ' + translateX2);

    var position1 = button1.offsetLeft + translateX1;
    var position2 = button2.offsetLeft + translateX2;

    console.log('position1 ' + position1);
    console.log('position2 ' + position2);

    let gap = position1 - position2;
    
    button1.style.transform = `translateX(${translateX1 - gap}px)`;
    console.log('new position 1 ' + (translateX1 - gap));

    button2.style.transform = `translateX(${translateX2 + gap}px)`;
    console.log('new position 2 ' + (translateX2 + gap));
}

function swap_cups() {
    
    let id = null; 

    clearInterval(id);
    id = setInterval(swap,interval);

    function swap() {
        console.log(swap_number);

        if (swap_number === 0) {
            clearInterval(id);
            enable_buttons();
        } else {
            let first = getRandomNumber();
            let second = getRandomNumber();

            while(first === second){
            second=getRandomNumber();
            }

            console.log('id 1 ' + first);
            console.log('id 2 ' + second);

            const elem = get_cup_btn(first); 
            const elem2 = get_cup_btn(second);
            switchButtons(elem,elem2);

            swap_number--;  
            
            console.log('swap iteration' + swap_number);
        }
    }

}

function get_cup_btn(place){
switch (place) {
    case 0:
        return document.getElementById("first");
        break;
    
    case 1:
        return document.getElementById("second");
        break;

    case 2:
        return document.getElementById("third");
        break;

    default:
        break;
}    
}

function show_result(cup, interval) {
    let id = null;
    const elem = document.getElementById(cup).getElementsByTagName("img")[0]; 

    console.log(elem);

    let position = 0;
    console.log(position);

    let move = -50;

    id = setInterval(frame1, interval);

    function frame1() {
        if (position === move) {
            clearInterval(id);
            if(cup==="second"){
                alert("you won your score is " + score);
            }else{
                score = 0;
                alert("you lose your score is " + score);
            }
            store_results("TC");
            finish_game();
        } else {
            position--; 
            elem.style.top = position + "px";
        }
    }
}

function select_cup(cup){
    show_result("first");
    show_result("second");
    show_result("third"); 
}

function getElementIndex(element) {
    var parent = element.parentNode;
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {
        if (children[i] === element) {
            return i;
        }
    }

    // Element not found in parent
    return -1;
}



