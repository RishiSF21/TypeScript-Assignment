//Close Functions
function CloseMainPages() {
    var showsignin = document.getElementById("signInForm");
    showsignin.style.display = "none";
}
//Displaying Pages
//DisplaySignIn
function DisplaySignIn() {
    CloseMainPages();
    var showsignin = document.getElementById("signInForm");
    showsignin.style.display = "block";
}
