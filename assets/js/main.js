var userName = window.localStorage.getItem("userNAME")
// window.localStorage.removeItem("userNAME")

document.getElementById("user-name").innerHTML = userName
var tagLine
tagLine = "Hey there, I'm using Groundpe"
document.getElementById("status").innerHTML = tagLine
document.getElementById("tag-line").value = tagLine
document.getElementById("greeting-user").innerHTML = "Welcome, " + "<span>" +userName+ "</span>"
function statusUpdate(){
    tagLine = document.getElementById("tag-line").value
    document.getElementById("status").innerHTML = tagLine
}