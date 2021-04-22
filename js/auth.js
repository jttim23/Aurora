const signupForm = document.getElementById('signup-form'); // przypisanie do zmiennej elementu o danym id
signupForm.addEventListener('submit', (e) => { // dodanie funkcji przy submicie
    e.preventDefault(); // zapobiegnięcie odświeżeniu strony

    const email = signupForm['singup-email'].value; // przypisanie wartości do zmiennej
    const password = signupForm['singup-password'].value;
    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password).then(cred => { // utworzenie usera, then - kod wykona się po utworzeniu, cred - obiekt tego usera
        const modal = document.getElementById('signupModal'); // w sumie to nie potrzebe już.xd
        window.location.href="./main.html";
        signupForm.reset();
    }).catch((e) => {
        displayErrors(e, 'error-signup'); //funkcja do wyświetlania errorów

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
    var provider = new firebase.auth.GoogleAuthProvider(); //nowy obiekt autoryzacji przy pomocy google

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
    modal.innerText = " "; // czyszczenie poprzedniego komunikatu
    message.innerText = error.message; // wyświetlenie komunikatu
    message.style.textAlign = "center";
    message.style.marginTop = "5%";
    modal.appendChild(message); // dodanie diva "message" do pojemnika "modal"
    navigator.vibrate([300, 100, 300]); // 2 szybkie wybracje, 100 - brak wibracji
    console.log(error);
}

