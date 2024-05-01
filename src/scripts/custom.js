/* Light and Dart Theme toggle */
  $(function() {
    // Cache the selectors
    const modeIcon = $('#modeIcon');
    const body = $('body');
    // Store the image paths
    const moonImg = '../../public/img/dark-theme-icon/moon.png';
    const sunImg = '../../public/img/dark-theme-icon/sun.png';
    
    // Add click event listener to the mode icon
    modeIcon.on('click', function() {
      body.toggleClass('dark-theme');
      const iconSrc = body.hasClass('dark-theme') ? sunImg : moonImg;
      modeIcon.attr('src', iconSrc);
    });
  });


  /* Drop down menu */
  document.addEventListener('DOMContentLoaded', () => {
    const dropdownMenu = document.querySelector('.dropdown_menu');
    const subMenu = dropdownMenu.querySelector('.dropdown');
    const caretIcon = dropdownMenu.querySelector('.myFas');
    subMenu.style.display = 'none';
    caretIcon.style.transform = 'rotate(0deg)';

    dropdownMenu.addEventListener('mouseenter', () => {
      subMenu.style.display = 'block';
      caretIcon.style.transform = 'rotate(180deg)';
    });
    
    dropdownMenu.addEventListener('mouseleave', () => {
      subMenu.style.display = 'none';
      caretIcon.style.transform = 'rotate(0deg)';
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
  

  // Google Web Page ranslate

  function googleTranslateElementInit(){
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}