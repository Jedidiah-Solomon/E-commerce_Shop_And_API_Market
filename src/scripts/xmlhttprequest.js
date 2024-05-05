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