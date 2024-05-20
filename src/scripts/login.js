//Mobile  hamburgar menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      // Save session data to localStorage
      const expirationTime = new Date().getTime() + 60 * 60 * 1000; //This is what is used
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("expirationTime", expirationTime);
      localStorage.setItem("userEmail", email); //Just for adding sake no use for now.

      console.log("Login successful, expirationTime:", expirationTime); // Debugging log

      alert("Login successful!");
      loginForm.reset();
      setTimeout(() => {
        window.location.href = "/home.html";
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  });
});
