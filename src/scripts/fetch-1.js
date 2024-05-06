document.getElementById('userForm').addEventListener('submit', submitForm);

async function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const age = formData.get('age');
  const employedDate = formData.get('employedDate');
  const hobbies = Array.from(formData.getAll('hobby'));

  // Retrieve address fields
  const street = formData.get('street');
  const city = formData.get('city');
  const zipCode = formData.get('zipCode');
  const country = formData.get('country');

 
  // Extract year from employedDate using Date object
  const employmentYear = new Date(employedDate).getFullYear();

  const user = {
    firstName,
    lastName,
    age,
    yearOfEmployment: employmentYear,
    hobbies,
    address: {
      street,
      city,
      zipCode,
      country
    }
  };
  console.log('User data:', user); // Log the user object to inspect data before sending
  try {
    const response = await fetch('/updateEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      alert('User details added successfully!');
      // Reset the form after successful submission
      event.target.reset();
    } else {
      throw new Error('Failed to add user details');
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('Failed to add user details');
  }
}


/*
//--------------------Using JSONBIN.IO -------------//

document.getElementById('userForm').addEventListener('submit', submitForm);

async function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const age = formData.get('age');
  const employedDate = formData.get('employedDate');
  const hobbies = Array.from(formData.getAll('hobby'));

  // Retrieve address fields
  const street = formData.get('street');
  const city = formData.get('city');
  const zipCode = formData.get('zipCode');
  const country = formData.get('country');

  // Extract year from employedDate using Date object
  const employmentYear = new Date(employedDate).getFullYear();

  const user = {
    firstName,
    lastName,
    age,
    yearOfEmployment: employmentYear,
    hobbies,
    address: {
      street,
      city,
      zipCode,
      country
    }
  };

  console.log('User data:', user); // Log the user object to inspect data before sending

  try {
    
    const binId = '6638db6dacd3cb34a843c6f2'; // Replace with your bin ID
    const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;
    const apiKey = '$2a$10$B9sUREv0OBvAnbJCqELq6OlWS6/TQFTirrF3JzKmlyTrrBTorjWYS';



    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      alert('User details added successfully!');
      // Reset the form after successful submission
      event.target.reset();
    } else {
      throw new Error('Failed to add user details');
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('Failed to add user details');
  }
}
*/

//----------------------------------End---------------------//