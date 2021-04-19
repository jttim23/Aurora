if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js").then(
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
}

// pokazanie nazwy zalogowanego usera
auth.onAuthStateChanged(user => {
    const logout = document.getElementById('logout-btn');
    if (user) {
      console.log("user logged in: ", user.email);
      logout.innerHTML += " " +user.email;
    }
});

function enableFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
  // poniżej wyjątki gdyby przeglądarki miały swoje zabezpieczenia
  else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

//logout
const logout = document.getElementById("logout-btn");
if (document.body.contains(logout)) {
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      window.location.href = "./index.html";
    });
  });
}

const carouselImages = document.querySelectorAll("[data-fullscreen]");
for (const carouselImage of carouselImages.values()) {
  carouselImage.addEventListener(
    "click",
    function () {
      enableFullscreen(carouselImage);
    },
    false
  );
}
