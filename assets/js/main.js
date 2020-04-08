var userName = window.localStorage.getItem("userNAME")

document.getElementById("user-name").innerHTML = userName


var chat_data = []
var texts = []
var chatOpenCounter = []

var get_data = new XMLHttpRequest()
get_data.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        chat_data = JSON.parse(this.responseText)
        for(var i = 0; i < chat_data.people.length; i++){
            texts[i] = []
        }
        for(i=0; i < chat_data.people.length; i++){
            document.getElementById("chats").innerHTML += "<div class='single-chat' id='"+ i + "'" +"onclick='openChat(this.id)'>" + "<p>" + chat_data.people[i].firstName +"</p></div>"
            for(var j = 0; j < chat_data.people[i].messages.length ; j++){
                texts[i].push(chat_data.people[i].messages[j].message)
            }
        }
        for(var i = 0; i <texts.length; i++){
        chatOpenCounter[i] = texts[i].length 
        }
    }
}
get_data.open("GET","people.json" , true)
get_data.send()



var welcomePage
var load_data = new XMLHttpRequest()
load_data.onreadystatechange = function(){
    if(this.readyState ==4 && this.status == 200){
        welcomePage = this.response
        document.getElementById("right-bar").innerHTML = this.response
        document.getElementById("greeting-user").innerHTML = "Welcome, " + "<span>" +userName+ "</span>" 
        document.getElementById("tag-line").value = tagLine 
    }
}
load_data.open("GET", "welcome.html" , true)
load_data.send()

function editProfile(){
    document.getElementById("right-bar").innerHTML = welcomePage
    document.getElementById("greeting-user").innerHTML = "Welcome, " + "<span>" +userName+ "</span>" 
    document.getElementById("tag-line").value = tagLine
    document.getElementById("right-bar").classList.add("justify-content-center","align-items-center")
    dpDown()
}

var tagLine
tagLine = "Hey there, I'm using Groundpe"
document.getElementById("status").innerHTML = tagLine


function statusUpdate(){
    tagLine = document.getElementById("tag-line").value
    document.getElementById("status").innerHTML = tagLine
}

menuOpen = false
function dpDown(){
    if(menuOpen == false){
        document.getElementById("menu-dp-down").style.display = "block"
        menuOpen = true
    }
    else if(menuOpen == true){
        document.getElementById("menu-dp-down").style.display = "none"
        menuOpen = false
    }    
}

function singleCall(){
    if(menuOpen == false){
        document.getElementById("call-pop-up").style.display = "flex"
        document.getElementById("call-pop-content").innerHTML = "<i class='fa fa-phone'></i>" + "<h4>"+ chat_data.people[chat_tracker].firstName + "</h4>" +"<div class='cancel-call' onclick='singleCall()'>Cancel</div>"
        menuOpen = true
    }
    else if(menuOpen == true){
        document.getElementById("call-pop-up").style.display = "none"
        menuOpen = false
    }  
}

function startConv(){
    document.getElementById("pop-space").innerHTML = "<div id='pop-up'><div id='inner-pop'><div id='inner-top-pop'><h2>Contacts</h2><i id='close' class='fa fa-times' onclick='closeStartConv()'></i></div><div id='main-top-pop'></div></div></div>" 
    for ( i=0; i < chat_data.people.length; i++){
        document.getElementById("main-top-pop").innerHTML += "<a class='single-people' href='javascript:void(0)' onclick='openChat(this.id)' id='" + i + "'>" + "<p>" +chat_data.people[i].firstName + "</p></a>"
        }
}

function closeStartConv(){
    document.getElementById("pop-space").innerHTML = " "
}

var chat_tracker

function openChat(chat_id){
chat_tracker = chat_id
    for(var i = 0; i < texts.length; i++){
        console.log(chat_id)
        if(i == chat_id){
            var element = document.getElementById(chat_id)
            element.classList.add("opened-chat")
        }
        else{
            document.getElementById(i).classList.remove("opened-chat")
        }
    }

    var pull_data = new XMLHttpRequest()
    pull_data.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("right-bar").innerHTML = this.responseText
            document.getElementById("chat-person-name").innerHTML = chat_data.people[chat_id].firstName
            document.getElementById("last-online-status").innerHTML = chat_data.people[chat_id].lastOnline
            document.getElementById("right-bar").classList.remove("justify-content-center","align-items-center")

            displayChat(chat_id)

            //To send message via enter key
            var chatInput = document.getElementById("chat-message")
            chatInput.addEventListener("keyup", function(event){
            if(event.keyCode === 13){
            event.preventDefault();
            sendChat(chat_id)
            document.getElementById("chat-message").value = ""
            }
            }) 
        }
    }
    pull_data.open("GET", "chatPage.html" , true)
    pull_data.send()
    closeStartConv()
}

function displayChat(chat_id){
    document.getElementById("chat-middle-display").innerHTML = ""
    for(var i = 0; i < texts[chat_id].length; i++){
        if(i < chatOpenCounter[chat_id]){
            document.getElementById("chat-middle-display").innerHTML += "<div class='single-message'>" + texts[chat_id][i] +"</div>"
        }
        else{
            var node = document.createElement("DIV")
            node.setAttribute('class','sent-message')
            var textnode = document.createTextNode(texts[chat_id][i]);
            node.appendChild(textnode);
            document.getElementById("chat-middle-display").appendChild(node);

        }
    }
}
function sendChat(chat_id){
    var message = document.getElementById("chat-message").value
    texts[chat_id].push(message)
    displayChat(chat_id)
}

function logOut(){
    // window.localStorage.removeItem("userNAME")
    window.location.replace("../index.html")
}