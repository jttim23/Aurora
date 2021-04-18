const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['singup-email'].value;
    const password = signupForm['singup-password'].value;
    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.getElementById('signupModal');
        window.location.href="./main.html";
        signupForm.reset();
    }).catch((e) => {
        displayErrors(e, 'error-signup');

    });
});


//login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.getElementById('logModal');
        window.location.href="./main.html";
        loginForm.reset();
    }).catch((e) => {
        displayErrors(e, 'error-message');
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
        displayErrors(e, 'error-message');
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
        displayErrors(e, 'error-message');
    });
})

function displayErrors(error, div){
    const modal = document.getElementById(div);
    const message = document.createElement("div");
    modal.innerText = " ";
    message.innerText = error.message;
    message.style.textAlign = "center";
    message.style.marginTop = "5%";
    modal.appendChild(message);
    navigator.vibrate([300, 100, 300]);
    console.log(error);
}

