//------------XMLHTTPREQUEST METHOD ---//
const userInput = document.getElementById('userInput');
const userBtn = document.getElementById('userBtn');
const userDetails = document.getElementById('userDetails');
const errorBox = document.getElementById('errorBox');

userBtn.addEventListener('click', loadUserDetails);

function loadUserDetails() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                const data = JSON.parse(this.responseText);
                console.log(`Data Received: ` , data);// Logs all data retrieved
                console.log(`Type of data received: `, typeof data);// Logs all datatype retrieved

                if(userInput.value === '' || userInput.value === null ) {
                    alert('Please enter a user full name');
                    errorBox.textContent = 'User name cannot be empty';
                }
                else {
                    const user = data.find(item => (item.firstName.toLowerCase() + ' ' + item.lastName.toLowerCase()) === userInput.value.toLowerCase());
                    if(user) {
                        console.log(user); // Logs the user data retrieved if found
                        userDetails.innerHTML = `
                            <p class="text-success text-center h4">First Name: ${user.firstName}</p>
                            <p class="text-success text-center h4">Last Name: ${user.lastName}</p>
                            <p class="text-success text-center h4">Age: ${user.age}</p>
                            <p class="text-success text-center h4">Year of Employment: ${user.yearOfEmployment}</p>
                            <p class="text-success text-center h4">Hobbies: ${user.hobbies.join(', ')}</p>
                            <p class="text-success text-center h4">Address: ${user.address.street}, ${user.address.city}, ${user.address.zipCode}, ${user.address.country}</p>
                            
                        `;
                        errorBox.textContent = '';
                    }
                    else {
                        userDetails.innerHTML = '';
                        errorBox.textContent = 'User not found';
                    }
                }
            }
            else {
                userDetails.innerHTML = '';
                errorBox.textContent = 'Error fetching user details';
            }
        }
    };



    xhr.open('GET', '../../database/employees.json', true);
    xhr.send()
}

/*

//------------- Use Fetch - This is the modern way to do this ------//

const userInput = document.getElementById('userInput');
const userBtn = document.getElementById('userBtn');
const userDetails = document.getElementById('userDetails');
const errorBox = document.getElementById('errorBox');

userBtn.addEventListener('click', loadUserDetails);

async function loadUserDetails() {
    try {
        const response = await fetch('../../database/employees.json');
        
        if (!response.ok) {
            throw new Error('Error fetching user details');
        }

        const data = await response.json();
        console.log(`Data Received: `, data);
        console.log(`Type of data received: `, typeof data);

        if (!userInput.value) {
            throw new Error('Please enter a user full name');
        }

        const fullName = userInput.value.toLowerCase().trim();
        const user = data.find(item => 
            `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()}` === fullName
        );

        if (user) {
            userDetails.innerHTML = `
                <p class="text-success text-center h4">First Name: ${user.firstName}</p>
                <p class="text-success text-center h4">Last Name: ${user.lastName}</p>
                <p class="text-success text-center h4">Age: ${user.age}</p>
                <p class="text-success text-center h4">Year of Employment: ${user.yearOfEmployment}</p>
                <p class="text-success text-center h4">Hobbies: ${user.hobbies.join(', ')}</p>
                <p class="text-success text-center h4">Address: ${user.address.street}, ${user.address.city}, ${user.address.zipCode}, ${user.address.country}</p>
            `;
            errorBox.textContent = '';
        } else {
            userDetails.innerHTML = '';
            throw new Error('User not found');
        }
    } catch (error) {
        console.error(error);
        // Catch and handle the error
        console.log('Error Name:', error.name);
        console.log('Error Message:', error.message);
        console.log('Stack Trace:', error.stack);
        errorBox.textContent = error.message;
    }
}
*/