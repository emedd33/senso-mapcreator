document.getElementById("login-button").addEventListener("click", ()=>{
    login("eskild.emedd33@gmail.com", "123qweasd")
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.replace("./index.html")
  } 
});
