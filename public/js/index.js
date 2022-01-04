firebase.auth().onAuthStateChanged(function(firebaseUser) {
  console.log(firebaseUser);
  if (firebaseUser) {
    document.getElementById('guest').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('hello').style.display = 'block';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('name').innerHTML = firebaseUser.displayName || 'guest';
  } else {
    document.getElementById('guest').style.display = 'block';
    document.getElementById('login').style.display = 'block';
    document.getElementById('hello').style.display = 'none';
    document.getElementById('logout').style.display = 'none';
  }
});

const googleLogout = function() {
  firebase.auth().signOut();
};

const googleLogin = function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const emailSignup = function() {
  const email = 'guest@red-js.web.app'
  const password = 'guestguest'
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    console.error(error);
    alert(error.message);
  });
};

const emailSignin = function() {
  const email = 'guest@red-js.web.app'
  const password = 'guestguest'
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    console.error(error);
    alert(error.message);
  });
};
