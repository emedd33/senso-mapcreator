
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      authUser = user
      document.getElementById("profile-container").style.display ="flex"
      document.getElementById("login-container").style.display ="none"
      document.getElementById("save-game-container").style.display = "flex"
      console.log(authUser)
      document.getElementById("authuser-email").innerHTML = user.displayName
      storage = firebase.storage();
    } else {
      document.getElementById("save-game-container").style.display = "none"
        document.getElementById("profile-container").style.display ="none"
      document.getElementById("login-container").style.display ="flex"
  }
});
