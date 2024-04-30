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
  
  