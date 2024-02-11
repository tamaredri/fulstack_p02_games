let username;

/*
    Restart Page functionalities
*/

document.addEventListener("DOMContentLoaded", () => {
    var currentPage = window.location.pathname;

    /*
        store all the games and add default values for the highest scores.
    */

    if (currentPage.includes('Login')){
        document.getElementById("login-form").addEventListener('submit', login_submit);
    }
    else if (currentPage.includes('SignUp')){
        document.getElementById("signup-form").addEventListener('submit', signup_submit);
    }

})


/*
    Log In
*/

function login_submit(e) {
    let form_username = e.target.username.value;
    if (!username_exists(form_username)) {
        alertUsername();
        e.preventDefault();
        return false;
    }
    let password = e.target.password.value;;
    if(!valid_password(form_username, password)){
        alert(' ' + form_username + ' entered the wrong password. Please try again');
        e.preventDefault();
        return false;
    }

    username = form_username;

    console.log(username);
    console.log(form_username);

    return true;
}

function username_exists(username){
    if(!localStorage.getItem(username)){
        console.log('the user ' + username + ' does not exist');
        return false;
    }
    return true;
}

function valid_password(username, password){
    if(JSON.parse(localStorage.getItem(username)).password != password){
        console.log('wrong password');
        return false;
    }
    return true;
}

function alertUsername(username) {
    var confirmation = confirm("the username " + username + " does not exist.\nClick 'ok' to register as a new user.\nClick 'Cancel' to try again.");
    if (confirmation) {
        window.location.href = "../HTML/SignUp.html";
    }
    else{
        document.getElementById("login-form").reset();
    }
}

/*
    Sign Up
*/

function signup_submit(e){
    console.log(e.target['full-name'].value);
    console.log(e.target.username.value);

    if(username_exists(e.target.username.value)){
        alert('username: ' + e.target.username.value + " already exists. Please choose another one.");
        e.preventDefault();
        return false;
    }
    console.log(e.target.password.value);
    console.log(e.target['verify-password'].value);

    if (e.target.password.value != e.target['verify-password'].value){
        alert("'Password' and 'verify password' are not the same. Please check again");
        e.preventDefault();
        return false;
    }

    store_user(e.target);

    console.log("storing " + e.target.username.value);

    username = e.target.username;
    return true;
}


function store_user(user){
    const user_data = {
        username: user.username.value,
        password: user.password.value,
        name: user['full-name'].value,
        phone: user['phone-number'].value,
        mail: user.mail.value,
        'game-data':  ""
     }

     localStorage.setItem(user.username.value, JSON.stringify(user_data));
}

/*
    Home page
*/

function load_home_page(){
    /*
        1. update the last game played by the user. if none - remove the section frpm the DOM
        2. for each game, upload the highest score.
    */
}

/*
    Random Number - integer between 0 and 2
 */
function getRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
}

/*
    Rock - Paper - Scissors
*/

function load_RPS_page(){
    /*
        1. load the last-seen for this user. if none - overide the text and say 'your first use, enjoy'
        2. functions from the slides to make the game work.
    */
}


/*
    Tricky Cups
*/

function load_Cups_page(){
    /**
     *  1. the same like RPS
     *  2. make the game work
     */
}



