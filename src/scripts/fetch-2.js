/*

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-queries');
  const firstNameInput = document.getElementById('firstNameInput');
  const userDetailsContainer = document.getElementById('user-details-box');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = firstNameInput.value.trim();

    if (!firstName) {
      alert('Please enter a first name.');
      return;
    }

    try {
      const response = await fetch(`/getUserByFirstName?firstName=${firstName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const user = await response.json();
      console.log(user);

      if (user) {
        // Display user details
        userDetailsContainer.innerHTML = `
          <h3>User Details</h3>
          <p>First Name: ${user.firstName}</p>
          <p>Last Name: ${user.lastName}</p>
          <p>Age: ${user.age}</p>
          <p>Employment Year: ${user.yearOfEmployment}</p>
          <p>Address: ${user.address.street}, ${user.address.city}, ${user.address.zipCode}, ${user.address.country}</p>
        `;
      } else {
        // Display message if user not found
        userDetailsContainer.innerHTML = `<p>User not found.</p>`;
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details.');
    }
  });
});
*/











document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-queries');
    const firstNameInput = document.getElementById('firstNameInput');
    const userDetailsContainer = document.getElementById('user-details-box');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const firstName = firstNameInput.value.trim();
  
      if (!firstName) {
        alert('Please enter a first name.');
        return;
      }
  
      const binId = '6638db6dacd3cb34a843c6f2'; // Replace with your bin ID
      const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;
  
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'X-Master-Key': '$2a$10$B9sUREv0OBvAnbJCqELq6OlWS6/TQFTirrF3JzKmlyTrrBTorjWYS'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
  
        // Check if user with the provided first name exists
        const user = data.record.find(user => user.firstName === firstName);
  
        if (user) {
          // Display user details
          userDetailsContainer.innerHTML = `
            <h3>User Details</h3>
            <p>First Name: ${user.firstName}</p>
            <p>Last Name: ${user.lastName}</p>
            <p>Age: ${user.age}</p>
            <p>Employment Year: ${user.yearOfEmployment}</p>
            <p>Address: ${user.address.street}, ${user.address.city}, ${user.address.zipCode}, ${user.address.country}</p>
          `;
        } else {
          userDetailsContainer.innerHTML = `<p>User not found.</p>`;
        }
      } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to fetch user details.');
      }
    });
  });
  