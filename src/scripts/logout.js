document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("userEmail");
      alert("You have been logged out.");
      window.location.href = "/src/pages/login.html";
    });
  }
});
