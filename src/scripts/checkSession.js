document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const expirationTime = localStorage.getItem("expirationTime");

  console.log(
    "Checking session, isLoggedIn:",
    isLoggedIn,
    "expirationTime:",
    expirationTime
  ); // Debugging log

  if (!isLoggedIn || !expirationTime) {
    console.log("User is not logged in or expirationTime not set"); // Debugging log

    redirectToLogin();
  } else {
    const currentTime = new Date().getTime();
    console.log("Current time:", currentTime); // Debugging log

    if (currentTime > expirationTime) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("expirationTime");
      redirectToLogin();
    }
  }

  function redirectToLogin() {
    console.log("Redirecting to login page"); // Debugging log
    window.location.href = "/src/pages/login.html";
  }
});
