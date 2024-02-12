let user = JSON.parse(localStorage.getItem("current_user")).username;

document.addEventListener("DOMContentLoaded", () => {
    
    //console.log((document.cookie))
    add_gamesData("RPS",5,new Date(),"../Media/rock paper scissors.png");
    add_gamesData("TC",30,new Date(),"../Media/tricky cups.png");
    last_game_played();

})

function fill_dataBase(){
    /* * */
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
    document.getElementById("play-date").innerText = d.toUTCString().replace("GMT","");
    document.getElementById("play-record").innerText = games_data["score"];
}