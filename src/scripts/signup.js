//Mobile  hamburgar menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.querySelector("form");

  signUpForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(signUpForm);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      alert("Sign up successful!");
      window.location.href = "./login.html";
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Sign up failed: ${error.message}`);
    }
  });
});
