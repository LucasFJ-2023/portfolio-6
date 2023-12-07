const firstNameInputField = document.getElementById('register-firstName');
const lastNameInputField = document.getElementById('register-lastName');
const emailInputField = document.getElementById('register-email');
const passwordInputField = document.getElementById('register-password');
const usernameInputField = document.getElementById('register-username');
const locationInputField = document.getElementById('register-location')
const registerButton = document.querySelector(".register-button")

const emailLogin = document.getElementById('login-email');
const passwordLogin = document.getElementById('login-password');
const loginButton = document.querySelector(".login-button")


// victor - LAV OM TIL ALLE CAFEER
document.addEventListener('DOMContentLoaded', () => {
    const cafeImagesContainer = document.getElementById('cafeImages');
    fetch('http://localhost:3000/randomcafes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Not ok');
            }
            return response.json();
        })
        .then(cafes => {
            cafes.forEach(cafe => {
                const cafeElement = document.createElement('div');
                cafeElement.innerHTML = `
                    <img src="${cafe.img_url}">
                    <h3>${cafe.cafe_name}</h3>
                    <p>Address: ${cafe.address}, ${cafe.city}</p>
                    <p>Description: ${cafe.description}</p>
                    
                `;
                cafeImagesContainer.appendChild(cafeElement);
            });
        })
        .catch(error => {
            console.error('cant fetch cafes:', error);
        });
});

// Få fat i en specific cafe
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cafeId = urlParams.get('id');
    fetch(`http://localhost:3000/cafe/${cafeId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(cafe => {
            const cafeImageContainer = document.querySelector('#cafeImageContainer');
            const cafeInformationContainer = document.querySelector('#cafeInformationContainer');
            const wifiImage = document.querySelector('.true-or-false-wifi');
            const foodImage = document.querySelector('.true-or-false-food');

            if (cafe) {
                cafeImageContainer.innerHTML = `<img src="${cafe[0].img_url}">`;
                cafeInformationContainer.innerHTML = `<h2>${cafe[0].cafe_name}</h2> <p>Address: ${cafe[0].address}, ${cafe[0].city}</p><p>Description: ${cafe[0].description}</p>`;
                wifiImage.src = cafe[0].wifi ? './img/istrue.png' : './img/isfalse.png';
                foodImage.src = cafe[0].serve_food ? './img/istrue.png' : './img/isfalse.png';
            }

        })
        .catch(error => {
            console.error('Error fetching cafe details:', error);
        });
});





// Forside til login og registrere bruger.
//Lucas
registerButton.addEventListener("click", () => {
    let firstName = firstNameInputField.value;
    let lastName = lastNameInputField.value;
    let username = usernameInputField.value;
    let email = emailInputField.value;
    let location = locationInputField.value;
    let password = passwordInputField.value;

    // Create an object with user data
    const userData = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        location: location,
        password: password
    };

    // Send a POST request to your server
    fetch('http://localhost:3000/new/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data as needed
            console.log("User registered:", data);
        })
        .catch(error => {
            if (error.status === 400 && error.message === "User Already Exists") {
                alert("User Already Exists");
            } else if (error.status === 400 && error.message === "Password is not valid") {
                alert("Password is not valid");
            } else {
                console.error(error.message);
            }
        });
});






// Lucas
// How to login
loginButton.addEventListener("click",() => {
    let email = emailLogin.value;
    let password = passwordLogin.value;
    fetch('http:localhost:3000/user')
        .then((response) => {
            // User logged in successfully
            console.log("User logged in:", userCredential.user);

            window.location.href = 'forside.html'; //Brugere bliver videresendt til næste side (forside.html)
        })
        .catch((error) => {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                alert("Invalid email or password");
            } else {
                console.error(error.message);
            }
        });
});





//Lucas
// This function executes when the DOM content is fully loaded and ready to be manipulated
document.addEventListener('DOMContentLoaded', function() {
    // Get elements related to the login functionality
    const loginCheckbox = document.getElementById('already-user'); // Get the "Log-in" checkbox
    const loginForm = document.querySelector('.login-form'); // Get the login form

    // Toggle display of login form based on checkbox change
    loginCheckbox.addEventListener('change', function() {
        if (loginCheckbox.checked) {
            loginForm.style.display = 'block'; // Display the login form
        } else {
            loginForm.style.display = 'none'; // Hide the login form
        }
    });



    // Get elements related to the registration functionality
    const registerCheckbox = document.getElementById('new-user'); // Get the "Create user" checkbox
    const registerForm = document.querySelector('.register-form'); // Get the registration form

    // Toggle display of register form based on checkbox change
    registerCheckbox.addEventListener('change', function() {
        if (registerCheckbox.checked) {
            registerForm.style.display = 'block'; // Display the registration form
        } else {
            registerForm.style.display = 'none'; // Hide the registration form
        }
    })
});
