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

/*----------Open Weather Map ---------------*/
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".myCard");
const apiKey = "9651c06390184465d41761ed6b77b758";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  console.log(response);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);

  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  card.appendChild(cityDisplay);

  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  card.appendChild(tempDisplay);

  humidityDisplay.textContent = `Humidity: ${humidity}`;
  card.appendChild(humidityDisplay);

  descDisplay.textContent = description;
  card.appendChild(descDisplay);

  weatherEmoji.textContent = getWeatherEmoji(id);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌧";
    case weatherId >= 300 && weatherId < 400:
      return "⛈";
    case weatherId >= 500 && weatherId < 600:
      return "⛈";
    case weatherId >= 600 && weatherId < 700:
      return "❄";
    case weatherId >= 700 && weatherId < 800:
      return "🌫";
    case weatherId === 800:
      return "☀";
    case weatherId >= 801 && weatherId < 810:
      return "☁";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
