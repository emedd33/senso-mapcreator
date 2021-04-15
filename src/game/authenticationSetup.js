
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      authUser = user
      document.getElementById("profile-container").style.display ="flex"
      document.getElementById("login-container").style.display ="none"
      console.log(authUser)
      document.getElementById("authuser-email").innerHTML = user.displayName
  } else {
        document.getElementById("profile-container").style.display ="none"
      document.getElementById("login-container").style.display ="flex"
  }
});
