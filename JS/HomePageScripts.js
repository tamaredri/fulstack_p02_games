let user = JSON.parse(localStorage.getItem("current_user")).username;

document.addEventListener("DOMContentLoaded", () => {
    
    //console.log((document.cookie))
    //add_gamesData("RPS",5,new Date(),"../Media/rock paper scissors.png");
    //add_gamesData("TC",30,new Date(),"../Media/tricky cups.png");
    load_home_page();

})

function fill_dataBase(){
    /* * */
    const user_data = {
        username: "shira45",
        password: "1234",
        name: "shira kono",
        phone: "052-2547999",
        mail: "",
     }
     localStorage.setItem(user.username.value, JSON.stringify(user_data));

     const user_data1 = {
        username: "shir745",
        password: "1234",
        name: "shir konovitch",
        phone: "052-2512399",
        mail: "",
     }
     localStorage.setItem(user.username.value, JSON.stringify(user_data1));
    const user_data2 = {
        username: "matan31",
        password: "1234",
        name: "matan konovitch",
        phone: "054-4812399",
        mail: "",
     }
     localStorage.setItem(user.username.value, JSON.stringify(user_data2));

     const user_data3 = {
        username: "shay18",
        password: "1234",
        name: "shay konovitch",
        phone: "053-2341229",
        mail: "",
     }
     localStorage.setItem(user.username.value, JSON.stringify(user_data3));

     const user_data4 = {
        username: "lavi95",
        password: "1234",
        name: "lavi konovitch",
        phone: "054-5673324",
        mail: "",
     }
     localStorage.setItem(user.username.value, JSON.stringify(user_data4));
}

/*
    Home page
*/

function load_home_page(){
    /*
        1. update the last game played by the user. if none - remove the section frpm the DOM
        2. for each game, upload the highest score.
        if the user is new - remove the title-info element and write : 'enjoy your first use'
    */
   last_game_played();
   get_game_results('RPS');
   get_game_results('TC');
}

function add_gamesData(game_name,score,last_visit,path){
    let user_data = JSON.parse(localStorage.getItem(user));
    console.log(user_data);
    if(!user_data.hasOwnProperty("game-data")){
        user_data["game-data"] = {};
    }
    user_data["game-data"][game_name] = { score: score, last_visit: last_visit, image_path:path };
    console.log(user_data);
    localStorage.setItem(user, JSON.stringify(user_data));

}

function last_game_played(){
    let user_data = JSON.parse(localStorage.getItem(user));
    console.log(user);
    console.log(user_data);

    if(!user_data.hasOwnProperty("game-data")){
        document.getElementsByClassName("title-info")[0].classList.add("deactivate");
    }
    else{
        let games_data = user_data["game-data"];
        let values = Object.values(games_data);
        console.log(games_data);
        console.log(values);
        if(values.length === 1)
        {
            update_view_last_game_played(values[0]);
        }
        else{
            let date1 = new Date(values[0]["last_visit"]);
            let date2 = new Date(values[1]["last_visit"]);
            if (date1>date2)
            {
                update_view_last_game_played(values[0]);
            }
            else{
                update_view_last_game_played(values[1]);
            }
        }   
    }
    document.getElementById("welcome").innerText += " " + user;
}

function update_view_last_game_played(games_data){
    document.getElementById("play-image").setAttribute("src",games_data["image_path"]);
    if(games_data["image_path"].includes('tricky cups.png')){
        document.getElementById("play-image").classList.add("cups");
    }
    const d = new Date(games_data["last_visit"]);
    document.getElementById("play-date").innerText = format_date(d);
    document.getElementById("play-record").innerText = games_data["score"];
}

function format_date(date) {
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  }

  /**
 * 
 * @param {*} game_name 
 */
function get_game_results(game_name){
    let game_storage = localStorage.getItem(game_name);
    console.log(game_storage);
    let record = document.getElementById(game_name + '-record');
    console.log(record);
    if(!game_storage){
        record.innerText = 0;
        console.log('created new game record');
    }
    else {
        game_storage = JSON.parse(localStorage.getItem(game_name));
        record.innerText = game_storage["score"];
        console.log(game_name);
    }
}