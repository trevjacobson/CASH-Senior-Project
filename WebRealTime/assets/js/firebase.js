var app = document.querySelector('form.login-form');
console.log(app);
var config = {
    apiKey: "AIzaSyCk_P9M-wREfr100p9OMafbiVYripukhl8",
    authDomain: "cash-login.firebaseapp.com",
    databaseURL: "https://cash-login.firebaseio.com",
    storageBucket: "cash-login.appspot.com",
    messagingSenderId: "288160664366"
};
firebase.initializeApp(config);
function google_login_in(){
    // Initialize Firebase


         const text=document.getElementById("text");
        const password=document.getElementById("password");
        const loginClk=document.getElementById("loginClk");

    //to login
         const auth=firebase.auth();
         const em=text.value;
         const pass = password.value;
         //autherizaton below
    firebase.auth().signInWithEmailAndPassword(em, pass)
       .catch(function(error) {
        var errorCode     = error.code;
        var errorMessage  = error.message;
        if(errorCode==='auth/wrong-password'){alert("Wrong Password");}
        else{alert(errorMessage);}
        console.log(error);
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
			window.location.replace("components/CASH.html#omgitsworking");
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
