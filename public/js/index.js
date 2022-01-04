firebase.auth().onAuthStateChanged(function(firebaseUser) {
  console.log(firebaseUser);
  if (firebaseUser) {
    // document.getElementById('login-display').innerHTML = firebaseUser.email + ' 반가워요!';
  } else {
    // document.getElementById('login-display').innerHTML = '';
  }
});

const googleLogout = function() {
  firebase.auth().signOut();
};

const googleLogin = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};
