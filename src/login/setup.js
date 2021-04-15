document.getElementById("login-button").addEventListener("click", ()=>{
    login("eskild.emedd33@gmail.com", "123qweasd")
})
authUser = firebase.auth()
console.log(authUser)