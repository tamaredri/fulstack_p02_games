
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
    let form_username = e.target.username.value.trim();
    if (!username_exists(form_username)) {
        alertUsername();
        e.preventDefault();
        return false;
    }
    let password = e.target.password.value.trim();
    if(!valid_password(form_username, password)){
        alert(' ' + form_username + ' entered the wrong password. Please try again');
        e.preventDefault();
        return false;
    }

   
    store_current_user(form_username);

    console.log(form_username);

    return true;
}

/**
 * check if the user exists in the local storage
 * @param {*} username 
 * @returns 
 */
function username_exists(username){
    if(!localStorage.getItem(username)){
        console.log('the user ' + username + ' does not exist');
        return false;
    }
    return true;
}

/**
 * check if the paswword is the right one
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
function valid_password(username, password){
    if(JSON.parse(localStorage.getItem(username)).password != password){
        console.log('wrong password');
        return false;
    }
    return true;
}

/**
 * present the user with a choise when one of the values entered were wrong.
 * @param {*} username 
 */
function alertUsername(username) {
    var confirmation = confirm("the username " + username + " does not exist.\nClick 'ok' to register as a new user.\nClick 'Cancel' to try again.");
    if (confirmation) {
        window.location.href = "../HTML/SignUp.html";
    }
    else{
        document.getElementById("login-form").reset();
    }
}

/**
 * once the sign in process was sucessful - set the current
 * @param {*} user 
 */
function store_current_user(user){
    const user_data = {
        username: user,
        time: new Date().toUTCString()
     }

     localStorage.setItem('current_user', JSON.stringify(user_data));
}

// ***** cookies

function get_cookie() {
    let name = "username=";
    let decoded_cookie = decodeURIComponent(document.cookie);
    let cookies_list = decoded_cookie.split(';');

    for(let i = 0; i < cookies_list.length; i++) {
      let cookie = cookies_list[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (c.indexOf(name) == 0) {
        // extract the username from the cookie according to its location in the string.
        return c.substring(name.length, c.length);
      }
    }
    // no username was found
    return "";
  }

function check_cookie(username) {
    return username === get_cookie();
}

function set_cookies(username){
    if(!check_cookie(username)){
        const d = new Date();
        d.setHours(currentDate.getHours() + 12);
        document.cookie = "username=" + username + "; expires=" +  d.toUTCString() + ';';
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
    console.log(user);
    const user_data = {
        username: user.username.value,
        password: user.password.value,
        name: user['full-name'].value,
        phone: user['phone-number'].value,
        mail: user.mail.value
     }

     localStorage.setItem(user.username.value, JSON.stringify(user_data));
}



