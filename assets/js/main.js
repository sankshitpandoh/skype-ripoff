var userName = window.localStorage.getItem("userNAME")

document.getElementById("user-name").innerHTML = userName


var chat_data = []

var get_data = new XMLHttpRequest()
get_data.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        chat_data = JSON.parse(this.responseText)
        for(i=0; i < chat_data.people.length; i++){
            document.getElementById("chats").innerHTML += "<div class='single-chat' id='"+ i + "'" +"onclick='openChat(this.id)'>" + "<p>" + chat_data.people[i].firstName +"</p></div>"
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


function startConv(){
    document.getElementById("pop-space").innerHTML = "<div id='pop-up'><div id='inner-pop'><div id='inner-top-pop'><i id='close' class='fa fa-times' onclick='closeStartConv()'></i></div><div id='main-top-pop'></div></div></div>" 
    for ( i=0; i < chat_data.people.length; i++){
        document.getElementById("main-top-pop").innerHTML += "<a class='single-people' href='javascript:void(0)' onclick='openChat(this.id)' id='" + i + "'>" + "<p>" +chat_data.people[i].firstName + "</p></a>"
        }
}

function closeStartConv(){
    document.getElementById("pop-space").innerHTML = " "
}

function openChat(chat_id){
    var pull_data = new XMLHttpRequest()
    pull_data.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("right-bar").innerHTML = this.responseText
            document.getElementById("chat-person-name").innerHTML = chat_data.people[chat_id].firstName
            document.getElementById("last-online-status").innerHTML = chat_data.people[chat_id].lastOnline
            document.getElementById("right-bar").classList.remove("justify-content-center","align-items-center")
            // var chatInformation = []
            // for(var i = 0; i <= chat_data.people[chat_id].messages.length; i++){
            //     chatInformation[i] = chat_data.people[chat_id].messages[i].message
            // }
            // diplayChat(chatInformation)

            //To send message via enter key
            var chatInput = document.getElementById("chat-message")
            chatInput.addEventListener("keyup", function(event){
            if(event.keyCode === 13){
            event.preventDefault();
            // document.getElementById("send-chat").click()
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
// function displayChat(chatInformation){
//     document.getElementById("chat-middle-display").innerHTML += "<div class='single-message'>" + chat_data.people[chat_id].messages[i].message +"</div>"

// }

function sendChat(chat_id){
    var message = document.getElementById("chat-message").value
    chatInformation[chat_id][i].push(message)
    console.log(chatInformation)
    
}

function logOut(){
    window.localStorage.removeItem("userNAME")
    window.location.replace("../index.html")
}