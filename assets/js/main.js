var userName = window.localStorage.getItem("userNAME")
// window.localStorage.removeItem("userNAME")

document.getElementById("user-name").innerHTML = userName
document.getElementById("greeting-user").innerHTML = "Welcome, " + "<span>" +userName+ "</span>"

var tagLine
tagLine = "Hey there, I'm using Groundpe"
document.getElementById("status").innerHTML = tagLine
document.getElementById("tag-line").value = tagLine

function statusUpdate(){
    tagLine = document.getElementById("tag-line").value
    document.getElementById("status").innerHTML = tagLine
}