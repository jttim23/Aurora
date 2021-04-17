if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./js/sw.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
};

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
}); */

//logout
const logout = document.getElementById('logout-btn');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.href="./index.html";
    })
});