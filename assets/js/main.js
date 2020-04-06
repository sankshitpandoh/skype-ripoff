var userName = window.localStorage.getItem("userNAME")
// window.localStorage.removeItem("userNAME")

document.getElementById("user-name").innerHTML = userName
document.getElementById("greeting-user").innerHTML = "Welcome, " + "<span>" +userName+ "</span>"

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

var tagLine
tagLine = "Hey there, I'm using Groundpe"
document.getElementById("status").innerHTML = tagLine
document.getElementById("tag-line").value = tagLine


function statusUpdate(){
    tagLine = document.getElementById("tag-line").value
    document.getElementById("status").innerHTML = tagLine
}

function startConv(){
    document.getElementById("pop-space").innerHTML = "<div id='pop-up'><div id='inner-pop'><div id='inner-top-pop'><i id='close' class='fa fa-times' onclick='closeStartConv()'></i></div><div id='main-top-pop'></div></div></div>" 
    for ( i=0; i < chat_data.people.length; i++){
        document.getElementById("main-top-pop").innerHTML += "<a class='single-people' href='javascript:void(0)'>" + "<p>" +chat_data.people[i].firstName + "</p></a>"
        }
}

function closeStartConv(){
    document.getElementById("pop-space").innerHTML = " "
}

function openChat(chat_id){
    // console.log(chat_data.people[chat_id])
    var pull_data = new XMLHttpRequest()
    pull_data.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("right-bar").innerHTML = this.responseText
            document.getElementById("chat-person-name").innerHTML = chat_data.people[chat_id].firstName
        }
    }
    pull_data.open("GET", "chatPage.html" , true)
    pull_data.send()
}