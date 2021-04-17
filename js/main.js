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
