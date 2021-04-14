auth.onAuthStateChanged(user => {
    const logout = document.querySelector('#logout-btn');
    const login = document.querySelector('#login-btn');
    if (user){
        console.log("user logged in: ", user.email);
        login.style.display = 'none';
        logout.style.display = 'block';
    }else{
        console.log("user logged out");
        logout.style.display = 'none';
        login.style.display = 'block';
    }
})

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
        signupForm.reset();
    });
});

//logout

const logout = document.querySelector('#logout-btn');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});



//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#logModal');
        //M.Modal.getInstance(modal).close;
        loginForm.reset();
    });
});

//google
const signupGoogle = document.getElementById('google-btn')
signupGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(cred => {
        console.log(cred);
    })
})

//fb
const signupFacebook = document.getElementById('fb-btn')
signupFacebook.addEventListener('click', (e) => {
    e.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider).then(cred => {
        console.log(cred);
    })
})