//Mobile Hamburgar Menu
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if(bar) {
  bar.addEventListener('click', () => {
      nav.classList.add('active');
  });
};
 
if(close) {
  close.addEventListener('click', () => {
      nav.classList.remove('active');
  });
};
 


/* Light and Dart Theme toggle */
  $(function() {
    // Cache the selectors
    const modeIcon = $('#modeIcon');
    const body = $('body');
    const mainElement = $('main'); 
    const footerElement = $('footer'); 
  
  
    // Store the image paths
    const moonImg = '../../public/img/dark-theme-icon/moon.png';
    const sunImg = '../../public/img/dark-theme-icon/sun.png';
  
    // Add click event listener to the mode icon
    modeIcon.on('click', function() {
      body.toggleClass('dark-theme');
      const iconSrc = body.hasClass('dark-theme') ? sunImg : moonImg;
      modeIcon.attr('src', iconSrc);
  
      // Add or remove the class based on dark theme state
      //You can just add each box individually
      if (body.hasClass('dark-theme')) {
        mainElement.addClass('white-bg'); 
        footerElement.addClass('white-bg'); 
      } else {
        mainElement.removeClass('white-bg'); 
        footerElement.removeClass('white-bg'); 
      }
    });
  });
  


  /* Drop down menu */
  document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.querySelector('.dropdown_menu');
    const subMenu = dropdownMenu.querySelector('.dropdown');
    const caretIcon = dropdownMenu.querySelector('.myFas');
    subMenu.style.display = 'none';
    caretIcon.style.transform = 'rotate(0deg)';

    // Toggle the submenu on click
    dropdownMenu.addEventListener('click', () => {
        if (subMenu.style.display === 'none') {
            subMenu.style.display = 'block';
            caretIcon.style.transform = 'rotate(180deg)';
        } else {
            subMenu.style.display = 'none';
            caretIcon.style.transform = 'rotate(0deg)';
        }
    });
});

  
  
  // Handle Newsletter form and Reset Form on submission | Sends user to home page
  $(function() {
    $('#form').on('submit', function(e) {
      e.preventDefault(); // Prevent the form from submitting normally

      $.ajax({
        url: 'https://formspree.io/f/xrgnjzpb',
        method: 'POST',
        dataType: 'json',
        data: $(this).serialize(),
        success: function(response, status, xhr) {
          console.log('XHR status:', xhr.status);
          console.log('XHR statusText:', xhr.statusText);
          console.log('XHR responseText:', xhr.responseText);
  
          $('#form')[0].reset();
          alert('Thank you for signing up!');
          window.location.href = '../../index.html'; // Redirect to the home page
        },
        error: function(xhr, status, error) {
          console.log(xhr); // Log the xhr object to inspect the error
          console.error(error); // Log the error object to inspect the error
          console.log('XHR status:', xhr.status);
          console.log('XHR statusText:', xhr.statusText);
          console.log('XHR responseText:', xhr.responseText);
  
          alert('Oops! Something went wrong. Please try again.'); 
        }
      });
    });
  });
  

  //-----------------Google Web Page ranslate---------------------//

  function googleTranslateElementInit(){
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}


//------------------------------Cookie Wrapper------------------------//

document.addEventListener("DOMContentLoaded", function() {
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
