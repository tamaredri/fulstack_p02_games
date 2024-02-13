

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
            interval = 9000;
            swap_number = 5;
            [...document.getElementsByClassName('cup-btn')].forEach(element => {
                element.classList.add('easy');
            });
            break;
        
        case "1":
            interval = 7000;
            swap_number = 10;
            [...document.getElementsByClassName('cup-btn')].forEach(element => {
                element.classList.add('normal');
            });
            break;

        case "2":
            interval = 5000;
            swap_number = 20;
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

    let pos_start = elem.style.top;
    let pos = elem.style.top;
    let move = -50;

    id = setInterval(frame1, interval);
  
    console.log(pos);

    function frame1() {
      if (pos === move) {
        clearInterval(id);
        id = setInterval(frame2, interval);
      } else {
        pos--; 
        elem.style.top = pos + "px";
      }
    }

    function frame2() {
        if (pos === 0) {
          clearInterval(id);
          swap_cups();
        } else {
          pos++; 
          elem.style.top = pos + "px";
        }
      }
}

function switchButtons(button1, button2) {
    var position1 = button1.offsetLeft;
    var position2 = button2.offsetLeft;

    console.log(position1);
    console.log(position2);
    // Get the computed style of the element
    var style1 = window.getComputedStyle(button1);
    var style2 = window.getComputedStyle(button2);

    // Extract the translateX value from the transform property
    var transformValue1 = style1.transform;
    var transformValue2 = style2.transform;
    var translateX1 = 0; // Default value if there is no translateX property
    var translateX2 = 0; // Default value if there is no translateX property
    console.log(transformValue1);
    console.log(transformValue2);
    if (transformValue1 && transformValue1 !== 'none') {
        var match = transformValue1.match(/translateX\(([-0-9.]+)px\)/);
        translateX1= transformValue1[4];
    }


    if (transformValue2 && transformValue2 !== 'none') {
        var match = transformValue2.match(/translateX\(([-0-9.]+)px\)/);
        translateX2 = transformValue2[4];
    }
    
    let num = position1 -position2;
    console.log(num);
    console.log(translateX1);
    console.log(translateX2);

    if (num < 0 ) {
        button1.style.transform = `translateX(${translateX1-num}px)`;
        button2.style.transform = `translateX(${translateX2+num}px)`;
        console.log("translateX1 === 0");
    } else {
        button1.style.transform = `translateX(${translateX1+num}px)`;
        button2.style.transform = `translateX(${translateX2-num}px)`;
        console.log("translateX2 != 0");
    }

    //document.getElementsByClassName("cups-holder")[0].children[index1] = button2;
    //document.getElementsByClassName("cups-holder")[0].children[index2] = button1;

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

            const elem = get_cup_btn(first); 
            const elem2 = get_cup_btn(second);
            switchButtons(elem,elem2);

            swap_number--;   
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

  function show_result(cup,interval) {
    let id = null;
    const elem = document.getElementById(cup).getElementsByTagName("img")[0]; 
   
    console.log(elem);

    let pos_start = elem.style.top;
    let pos = elem.style.top;
    let move = -50;

    id = setInterval(frame1, interval);
  
    console.log(pos);

    function frame1() {
      if (pos === move) {
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
        pos--; 
        elem.style.top = pos + "px";
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



