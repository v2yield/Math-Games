function GameStart() {
    alert("Games start!");
    clearCookie();
    checkCookie();
    window.location.href = "./level1.html";
}
//Determine if you can go to the next level
function checkLevel() {
    var passedLevel = parseInt(getCookie("level"));
    var title = document.title;
    var level = title.substring(title.length - 1, title.length);
    var currentLevel = parseInt(level);
    if (passedLevel >= currentLevel) {
        return true;
    } else {
        return false;
    }
}
//Go to next level
function NextLevel() {
    if (checkLevel()) {     
        var title = document.title;
        var level = title.substring(title.length - 1, title.length);
        var currentLevel = parseInt(level);
        if (currentLevel == 3) {
            alert("Congratulations on completing the game!");
            window.location.href = "./index.html";
        } else {
            window.location.href = "./level" + (currentLevel + 1) + ".html";
        }
    } else {
        alert("You have not passed this level,please try again!");
    }
}
//Return to the previous level and record the player's status at the same time
function Back() {
    var title = document.title;
    var level = title.substring(title.length - 1, title.length);
    var currentLevel = parseInt(level);
    if (currentLevel == 1) {
        window.location.href = "./index.html";
    } else {
        var nextLevel = currentLevel - 1;
        window.location.href = "./level" + nextLevel + ".html";
    }
}
//Read player's score from the cookie
function ShowScores() {
    var scores = getCookie("scores");
    if (scores == "") { 
        scores = 0;//Reset scores to 0 if the cookie is empty
    } else {
        scores = parseInt(getCookie("scores"));
    }
    document.getElementById("scores").innerHTML = scores;
}
//get answer from player
function GetAnswer() {
    var answer = document.getElementById("answer").value;
    if (answer == "") {
        alert("The input is empty, please re-enter the answer!");
    } else {
        if (parseInt(answer) == parseInt(document.getElementById("correct_answer").innerHTML)) {
            alert("Correct answer!");
            //Haven't passed the level yet
            if (!checkLevel()) {
                var title = document.title;
                var level = title.substring(title.length - 1, title.length);
                var currentLevel = parseInt(level);
                var scores = parseInt(getCookie("scores"));
                var scores = scores + 5 * currentLevel;
                document.getElementById("scores").innerHTML = scores;
                setCookie("scores", scores, 1);
                setCookie("level", currentLevel, 1);

            }
        } else {
            alert("Wrong answer!");
        }
    }
}
//设置cookie,username,scores,exdays(cookie expiration),level
function setCookie(element, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));//24*60*60*1000,Convert milliseconds to 1 day
    var expires = "expires=" + d.toGMTString();
    document.cookie = element + "=" + value + ";" + expires;
}
function getCookie(element) {
    var name = element + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();//Remove spaces from both ends of a string
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        var user = window.prompt("Please enter your name:");
        if (user != null && user != "") {
            alert("Weclome " + user + "!");
        } else {
            user = 'V2yield';
            alert("Weclome " + user + "(default)!");
        }
        setCookie("username", user, 1);
        setCookie("scores", 0, 1);
        setCookie("level", 0, 1);
    }
}
function clearCookie() {
    setCookie("username", "",-1);
    setCookie("scores", "", -1);
    setCookie("level", "", -1);
    alert("Cleared successfully!");
}