
/*auth.onAuthStateChanged(user => {
    const logout = document.getElementById('logout-btn');
    const login = document.getElementById('login-btn');
    if (user){
        console.log("user logged in: ", user.email);
      //  login.style.display = 'none';
       // logout.style.display = 'block';
    }else{
        console.log("user logged out");
     //   logout.style.display = 'none';
      //  login.style.display = 'block';

    }
}) */

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

   // const name = signupForm['singup-name'].value;
   // const lastname = signupForm['singup-lastname'].value;
    const email = signupForm['singup-email'].value;
    const password = signupForm['singup-password'].value;
    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#signupModal');
       // M.Modal.getInstance(modal).close();
        window.location.href="./main.html";
        signupForm.reset();
    }).catch((e) => {
        displayErrors(e);
    });
});


//login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#logModal');
       // M.Modal.getInstance(modal).close;
        window.location.href="./main.html";
        loginForm.reset();
    }).catch((e) => {
        displayErrors(e);
    });
});

//google
const signupGoogle = document.getElementById('google-btn')
signupGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(cred => {
        console.log(cred);
        window.location.href="./main.html";
    }).catch((e) => {
        displayErrors(e);
    });
})

//fb
const signupFacebook = document.getElementById('fb-btn')
signupFacebook.addEventListener('click', (e) => {
    e.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider).then(cred => {
        console.log(cred);
        window.location.href="./main.html";
    }).catch((e) => {
        displayErrors(e);
    });
})

function displayErrors(error){
    const modal = document.querySelector('#error-message');
    const message = document.createElement("div");
    modal.innerText = " ";
    message.innerText = error.message;
    message.style.textAlign = "center";
    modal.appendChild(message);
    navigator.vibrate([300, 100, 300]);
    console.log(error);
}

