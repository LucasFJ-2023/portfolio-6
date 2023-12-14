//Lucas
//Show user information
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.getUserInfo').addEventListener('click', getUserInfo);


function getUserInfo() {
    // Retrieve the username entered by the user from the input field
    const username = document.querySelector('#usernameInput').value;

    // Make a fetch request to the server endpoint for user information using the provided username
    fetch(`http://localhost:3000/user-info?username=${username}`)
        .then((response) => {
            // Check if the fetch request was successful (status code 200-299)
            if (!response.ok) {
                throw new Error("Error fetching user information");
            }
            // Parse the response as JSON
            return response.json();
        })
        .then((userData) => {
            // Update HTML elements with the retrieved user data
            document.querySelector('#first-name').textContent = userData.first_name;
            document.querySelector('#last-name').textContent = userData.last_name;
            document.querySelector('#username').textContent = userData.username;
            document.querySelector('#email').textContent = userData.email;
            document.querySelector('#location').textContent = userData.location;

            // Check if userData.favoriteCafe exists before updating the element
            if (userData.favoriteCafe) {
                document.querySelector('#favorite-cafe').textContent = userData.favoriteCafe;
            }
        })
        .catch((err) => {
            // Handle errors, for example, display an error message to the user
            console.error('Fetch Error:', err);
        });
}
})



//Lucas
//Create a new café
const cafeNameInputField = document.querySelector('#register-cafeName');
const addressInputField = document.querySelector('#register-address');
const cityInputField = document.querySelector('#register-city');
const descriptionInputField = document.querySelector('#register-description');
const wifiInputField = document.querySelector('#register-wifi');
const serveFoodInputField = document.querySelector('#register-serveFood');
const registerCafeButton = document.querySelector(".registerCafe-button");


//Lucas
//Create a new Café
registerCafeButton.addEventListener("click", () => {
    let cafeName = cafeNameInputField.value;
    let address = addressInputField.value;
    let city = cityInputField.value;
    let description = descriptionInputField.value;
    let wifi = wifiInputField.value;
    let serveFood = serveFoodInputField.value;

    // Create an object with user data
    const userData = {
        cafeName: cafeName,
        address: address,
        city: city,
        description: description,
        wifi: wifi,
        serveFood: serveFood,
    };

    // Send a POST request to your server
    fetch('http://localhost:3000/new/cafe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        //Handle server response
        .then(response => response.json())
        .then(data => {
            // Handle the response data as needed
            console.log("Cafe registered:", data);
        })
        //Error handling
        .catch(error => {
            if (error.status === 400 && error.message === "Cafe Already Exists") {
                alert("Cafe Already Exists");
                console.error(error.message);
            }
        });
});


// Get elements related to the registration functionality
const registerCafeCheckbox = document.querySelector('#new-cafe'); // Get the "Create new café" checkbox
const registerCafeForm = document.querySelector('.registerCafe-form'); // Get the café registration form


// Toggle display of café register form based on checkbox change
registerCafeCheckbox.addEventListener('change', function () {
    if (registerCafeCheckbox.checked) {
        registerCafeForm.style.display = 'block'; // Display the café registration form
    } else {
        registerCafeForm.style.display = 'none'; // Hide the café registration form
    }
});



