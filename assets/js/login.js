var load_data = new XMLHttpRequest()
load_data.onreadystatechange = function(){
    if(this.readyState ==4 && this.status == 200){
        logInDisplay(this)
    }
}
load_data.open("GET", 'serverfiles/log-in.html' , true)
load_data.send()

function logInDisplay(load_data){
    document.getElementById("intro-box").innerHTML = load_data.responseText
} 

//If user opts for sign up
function signUp(url, targetFunction){
    var load_data = new XMLHttpRequest()
    load_data.onreadystatechange = function(){
        if(this.readyState ==4 && this.status == 200){
            targetFunction(this)
        }
    }
    load_data.open("GET", url, true)
    load_data.send()
}

function signUpDisplay(load_data){
    document.getElementById("intro-box").innerHTML = load_data.responseText
}

var userName
var password

//sign up form validation
function validateSignUp(){
    userName = document.forms["sign-up-form"]["user-name"].value;
    password = document.forms["sign-up-form"]["user-password"].value;
    var re_password = document.forms["sign-up-form"]["user-re-password"].value;
    if (userName.length == 0 || userName == " ") {
        alert("Name must be filled out")
        return false
    }
    if(password.length <= 5){
        alert("password should atleast be 6 or more characters long")
        return false
    }
    if(password != re_password){
        alert("Your passwords don't match")
        return false
    }
    else{
        alert("Account sucessfully created, taking you to login page")
        document.getElementById("intro-box").innerHTML = load_data.responseText
    }  

}

//log-in 
function validateLogIn(){
    var user = document.forms["log-in-form"]["username"].value;
    var pass = document.forms["log-in-form"]["password"].value;
    if(user.length == 0 || user ==" "){
        document.getElementById("log-err-msg").innerHTML = "User name can't be empty"
        return false
    }
    if(pass.length == 0){
        document.getElementById("log-err-msg").innerHTML = "Password field is empty"
        return false
    }
    if(user === userName && pass === password ){
        storeName(user)
    }
    else{
        document.getElementById("log-err-msg").innerHTML = "User doesn't exist"
        return false
    }
}
function storeName(user){
    window.localStorage.setItem("userNAME", user)
}