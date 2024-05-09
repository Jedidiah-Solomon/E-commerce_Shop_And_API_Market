//-----------------Github API-----------------------//

//--------------slider--------//
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalid = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalid = setInterval(nextSlide, 5000);
    console.log(intervalid);
  }
}

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
  clearInterval(intervalid);
  slideIndex--;
  showSlide(slideIndex);
}
function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

//-------------------Github--------------------//
document.getElementById("checkUserButton").addEventListener("click", () => {
  const username = document.getElementById("usernameInput").value.trim();
  if (username) {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User not found");
        }
      })
      .then((data) => {
        console.log("Data from GitHub API:", data); //For checkings
        document.getElementById("userAvatar").src = data.avatar_url;
        document.getElementById(
          "userName"
        ).textContent = `Username: ${data.login}`;
        document.getElementById(
          "twitterUsername"
        ).innerHTML = `Twitter Username: <a href="https://twitter.com/${
          data.twitter_username
        }">${data.twitter_username || "N/A"}</a>`;
        document.getElementById(
          "publicRepos"
        ).textContent = `Public Repositories: ${data.public_repos}`;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("User not found or an error occurred");
      });
  } else {
    alert("Please enter a valid username");
  }
});
