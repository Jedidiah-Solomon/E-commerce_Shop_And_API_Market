//Mobile Hamburgar Menu
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

/* Welcome Message */
const welcomeMessage = document.getElementById("welcome-message");

// Check if the welcome message is visible
const isWelcomeMessageVisible = () => {
  return welcomeMessage.style.display !== "none";
};

if (!sessionStorage.getItem("welcomeDisplayed")) {
  welcomeMessage.style.display = "block";

  sessionStorage.setItem("welcomeDisplayed", true);

  setTimeout(() => {
    if (isWelcomeMessageVisible()) {
      welcomeMessage.style.display = "none";
    }
  }, 7000);
} else {
  welcomeMessage.style.display = "none";
}

/*  Nav bar */
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

/* Light and Dart Theme toggle */
$(function () {
  // Cache the selectors
  const modeIcon = $("#modeIcon");
  const body = $("body");
  const mainElement = $("main");
  const footerElement = $("footer");

  // Store the image paths
  const moonImg = "../../public/img/dark-theme-icon/moon.png";
  const sunImg = "../../public/img/dark-theme-icon/sun.png";

  // Add click event listener to the mode icon
  modeIcon.on("click", function () {
    body.toggleClass("dark-theme");
    const iconSrc = body.hasClass("dark-theme") ? sunImg : moonImg;
    modeIcon.attr("src", iconSrc);

    // Add or remove the class based on dark theme state
    //You can just add each box individually
    if (body.hasClass("dark-theme")) {
      mainElement.addClass("white-bg");
      footerElement.addClass("white-bg");
    } else {
      mainElement.removeClass("white-bg");
      footerElement.removeClass("white-bg");
    }
  });
});

/* Drop down menu */
document.addEventListener("DOMContentLoaded", () => {
  const dropdownMenu = document.querySelector(".dropdown_menu");
  const subMenu = dropdownMenu.querySelector(".dropdown");
  const caretIcon = dropdownMenu.querySelector(".myFas");
  subMenu.style.display = "none";
  caretIcon.style.transform = "rotate(0deg)";

  // Toggle the submenu on click
  dropdownMenu.addEventListener("click", () => {
    if (subMenu.style.display === "none") {
      subMenu.style.display = "block";
      caretIcon.style.transform = "rotate(180deg)";
    } else {
      subMenu.style.display = "none";
      caretIcon.style.transform = "rotate(0deg)";
    }
  });
});

// Handle Newsletter form and Reset Form on submission | Sends user to home page
$(function () {
  $("#form").on("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    $.ajax({
      url: "https://formspree.io/f/xrgnjzpb",
      method: "POST",
      dataType: "json",
      data: $(this).serialize(),
      success: function (response, status, xhr) {
        console.log("XHR status:", xhr.status);
        console.log("XHR statusText:", xhr.statusText);
        console.log("XHR responseText:", xhr.responseText);

        $("#form")[0].reset();
        alert("Thank you for signing up!");
        window.location.href = "../../index.html"; // Redirect to the home page
      },
      error: function (xhr, status, error) {
        console.log(xhr); // Log the xhr object to inspect the error
        console.error(error); // Log the error object to inspect the error
        console.log("XHR status:", xhr.status);
        console.log("XHR statusText:", xhr.statusText);
        console.log("XHR responseText:", xhr.responseText);

        alert("Oops! Something went wrong. Please try again.");
      },
    });
  });
});

//-----------------Google Web Page ranslate---------------------//

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en" },
    "google_translate_element"
  );
}

//------------------------------Cookie Wrapper------------------------//

document.addEventListener("DOMContentLoaded", function () {
  const cookieBox = document.querySelector(".wrapper");
  const acceptBtn = document.getElementById("acceptBtn");
  const declineBtn = document.getElementById("declineBtn");

  const executeCodes = () => {
    // Check if the cookie contains "jedybrownStores" to decide whether to show the banner
    if (document.cookie.includes("jedybrownStores")) {
      cookieBox.classList.remove("show");
    } else {
      cookieBox.classList.add("show");
    }
  };

  // Function to set cookie with expiration time (in seconds)
  const setCookie = (name, value, maxAge) => {
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
  };

  // Function to set cookie with specific expiration date and path
  const setCustomCookie = (name, value, expiresDate) => {
    document.cookie = `${name}=${value}; Expires=${expiresDate.toUTCString()}; path=/`;
  };

  // Add event listener to accept button
  acceptBtn.addEventListener("click", () => {
    cookieBox.classList.remove("show");
    setCookie("jedybrownStores", "Welcome to our store", 30 * 24 * 60 * 60); // Cookie expires in 30 days
    const paymentModeExpires = new Date("2030-05-15T12:00:00+01:00"); // Create a date object for the expiration
    setCustomCookie("paymentMode", "cash or transfer", paymentModeExpires);
  });

  // Add event listener to decline button
  declineBtn.addEventListener("click", () => {
    cookieBox.classList.remove("show");
  });

  executeCodes();
});

//-----------------------Pop up Ad----------------//

//--------------------Slide from top--------------//
$(function () {
  const $popUpAd = $("#popUp-ad");

  const showPopUpAd = () => {
    $popUpAd.addClass("ad-show");
  };

  setTimeout(showPopUpAd, 2000);
});

//------------------Pop up Image---------------//
const ad1 = "../../public/img/ad/1.jpg";
const ad2 = "../../public/img/ad/2.jpg";
const ad3 = "../../public/img/ad/3.jpg";
const ad4 = "../../public/img/ad/4.jpg";
const ad5 = "../../public/img/ad/5.jpg";
const ad6 = "../../public/img/ad/6.jpg";
const ad7 = "../../public/img/ad/7.jpg";
const ad8 = "../../public/img/ad/8.jpg";
const ad9 = "../../public/img/ad/9.jpg";
const ad10 = "../../public/img/ad/10.jpg";

const cards = [ad1, ad2, ad3, ad4, ad5, ad6, ad7, ad8, ad9, ad10];
let currentIndex = 0;
const popupImage = document.getElementById("popup-image");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomNum]] = [array[randomNum], array[i]];
  }
}

function updateImage() {
  try {
    if (currentIndex >= cards.length) {
      currentIndex = 0;
      shuffle(cards);
    }
    popupImage.src = cards[currentIndex++];
    console.log(cards);
  } catch (error) {
    console.error("Error updating image:", error);
  }
}

// Call updateImage initially to set the first image
updateImage();

// Set interval to update image source every 1 second
setInterval(updateImage, 5000);

//--------------------------------------//

// Countdown Timer for June 16, 2024

// Define a function to update the countdown clock
const updateClock = function () {
  // Set the target date and time (June 16, 2030, midnight)
  const targetDate = new Date("2030-06-16T00:00:00");
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = targetDate.getTime() - now.getTime();

  // If the target time has already passed, stop the clock and display a message
  if (timeDiff <= 0) {
    clearInterval(intervalId);
    document.getElementById("clock").textContent = "Offer Expired!";
    return;
  }

  // Convert the time difference to days, hours, minutes, and seconds
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  // Format the time string
  const timeString = `${days}D : ${hours
    .toString()
    .padStart(2, "0")}H : ${minutes.toString().padStart(2, "0")}M : ${seconds
    .toString()
    .padStart(2, "0")}S`;
  document.getElementById("clock").textContent = timeString;
};

// Invoke the function immediately
updateClock();

// Update the clock every second
const intervalId = setInterval(updateClock, 1000);

//----------------Hide Times Icon for pop up------------//
$(function () {
  let closeIcon = $(".close-icon");

  // Hide the #popUp-ad div when the close icon is clicked
  closeIcon.on("click", function () {
    $("#popUp-ad").hide();
  });
});
