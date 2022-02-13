const FLASK_API = "https://block-dodger.azurewebsites.net/"



var socket = io(FLASK_API, { cors: {
    origin: "*",
}
  });
socket.on('connect', function() {
    socket.send("Hello-client is connected!");
});

socket.on('score', (data) => {
    objs = JSON.parse(data)
    populateHighScoreData(objs["data"]);
})

socket.on(username, (data) => {
    console.log("called")
    console.log(data)
    document.getElementById("highScorePosition").innerHTML =  data + 'st'
})






// function loadXMLDoc_GETHIGHSCORE(){
//     var xmlHttp = new XMLHttpRequest ();
//     xmlHttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200){
//             var responseText =  xmlHttp.responseText;
//             refreshHighScoreData(responseText);
//         }
//     };
//     xmlHttp.open ( "GET", "http://" + FLASK_API + "/HighScores/Get", true);
//     xmlHttp.setRequestHeader('Content-Type', 'application/json');
//     xmlHttp.send();
// }

function loadXMLDoc_GETHIGHSCOREPOSITION (username, currentScore){
    socket.emit("requestScorePosition", {username, currentScore})
    // var xmlHttp = new XMLHttpRequest ();

    // var data = JSON.stringify({"score": currentScore});
    // xmlHttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200){
    //         document.getElementById("highScorePosition").innerHTML =  xmlHttp.responseText + 'st'
    //     }
    // }
    // xmlHttp.open ( "POST", "http://" + FLASK_API + "/HighScores/GetPosition", true);
    // xmlHttp.setRequestHeader('Content-Type', 'application/json');
    // xmlHttp.send(data);
}	

function loadXMLDoc_PUSHTOHIGHSCOREDATABASE(username, score){
var data = JSON.stringify({"username": username, "score": score});
    var xmlhttp = new XMLHttpRequest ();
    
xmlhttp.open ( "POST", FLASK_API + "/HighScores/Add", false);
    xmlhttp.setRequestHeader('content-type', 'application/json');
    xmlhttp.send(data);
    return xmlhttp.responsetext;
}