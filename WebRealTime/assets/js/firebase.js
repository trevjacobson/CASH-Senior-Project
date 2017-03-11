var app = document.querySelector('form.login-form');
console.log(app);

function google_login_in(){
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/plus.login');
    //provider.addScope('profile');
    //provider.addScope('email');
    //provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
    }).catch(function(error) {
        var errorCode     = error.code;
        var errorMessage  = error.message;
        var email         = error.email;
        var credential    = error.credential;
    });
}

//Logout
function log_out() {
    firebase.auth().signOut();
    console.log("logged out");
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("User is signed In");
        user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: "+profile.providerId);
            console.log("  Provider-specific UID: "+profile.uid);
            console.log("  Name: "+profile.displayName);
            console.log("  Email: "+profile.email);
            console.log("  Photo URL: "+profile.photoURL);
        });
    } else {
        console.log("user signed out");
        // No user is signed in.
    }
});
