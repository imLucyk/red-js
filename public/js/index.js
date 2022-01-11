let firebaseUser;
firebase.auth().onAuthStateChanged(function(_firebaseUser) {
  console.log(_firebaseUser);
  if (_firebaseUser) {
    firebaseUser = _firebaseUser
    document.getElementById('guest').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('hello').style.display = 'block';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('name').innerHTML = _firebaseUser.displayName || 'guest';
  } else {
    document.getElementById('guest').style.display = 'block';
    document.getElementById('login').style.display = 'block';
    document.getElementById('hello').style.display = 'none';
    document.getElementById('logout').style.display = 'none';
    firebaseUser = {};
  }
  if (window.location.pathname === '/groceries.html') {
    groceriesRead();
  } else if (window.location.pathname === '/items.html') {
    itemsRead();
  } else if (window.location.pathname === '/index.html') {
    axios.get('https://red-js-default-rtdb.firebaseio.com/' + firebaseUser.uid + '/items.json').then(function(response) {
      let count = 0;
      for (let k in response.data) {
        if (response.data[k].expire < moment().add(3, 'days').format('YYYY-MM-DD')) {
          count++;
        }
      }
      const counter = document.getElementById('menu-items-counter');
      counter.innerHTML = count;
    });
    // itemsRead();
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
