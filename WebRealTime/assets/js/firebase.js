// Initialize Firebase
var config = {
  apiKey: "AIzaSyCk_P9M-wREfr100p9OMafbiVYripukhl8",
  authDomain: "cash-login.firebaseapp.com",
  databaseURL: "https://cash-login.firebaseio.com",
  storageBucket: "cash-login.appspot.com",
  messagingSenderId: "288160664366"
};
firebase.initializeApp(config);

(function() {
      var app = document.querySelector('#app');
      /*app.signIn = function() {
        var email = app.email;
        var password = app.password;
        if (!email || !password) {
          return console.log('email and password required');
        }
        // Sign in user
        firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('signIn error', error);
            // ...
          });
      };*/

  })();
