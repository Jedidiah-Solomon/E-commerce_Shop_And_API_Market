document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mc-embedded-subscribe-form');
    const successMessage = document.getElementById('success-message');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      const mailchimpEndpoint = 'https://webbrainees.us14.list-manage.com/subscribe/post?u=fd596490f33b374b61086a819&id=e4a452051c&f_id=0006f8e0f0';
  
      fetch(mailchimpEndpoint, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            successMessage.textContent = 'Thank you for your message! I will get back to you.';
            setTimeout(() => {
              window.location.href = '../../index.html';
            }, 2000);
  
            
            form.reset();
          } else {
            successMessage.textContent = 'Oops! Something went wrong. Please try again.';
          }
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          successMessage.textContent = 'Oops! Something went wrong. Please try again.';
        });
    });
  });
  