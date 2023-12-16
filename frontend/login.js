//Lucas
//Create user
const firstNameInputField = document.querySelector('#register-firstName');
const lastNameInputField = document.querySelector('#register-lastName');
const emailInputField = document.querySelector('#register-email');
const passwordInputField = document.querySelector('#register-password');
const usernameInputField = document.querySelector('#register-username');
const locationInputField = document.querySelector('#register-location')
const registerButton = document.querySelector(".register-button")

//Login
const emailLogin = document.querySelector('#login-email');
const passwordLogin = document.querySelector('#login-password');
const loginButton = document.querySelector(".login-button")


//Lucas
// Forside til login og registrere bruger.
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
        //Handle server response
        .then(response => response.json())
        .then(data => {
            // Handle the response data as needed
            console.log("User registered:", data)
            alert("User created, now login");
        })
        //Error handling
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
loginButton.addEventListener("click", () => {
    let email = emailLogin.value;
    let password = passwordLogin.value;

    // Send a request to your server for user authentication
    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Invalid email or password");
            }
            // The server sends back user data upon successful login
            return response.json();
        })
        .then((userData) => {
            // User logged in successfully
            console.log("User logged in:", userData);
            localStorage.setItem("userId",userData) // Gemmer userID på brugeren der er logget ind


            // Redirect users to the next page (forside.html)
            window.location.href = 'forside.html';
        })
        .catch((error) => {
            console.error(error.message);
            alert("Invalid email or password");
        });
});




//Lucas
//Login Checkbox
const loginCheckbox = document.querySelector('#already-user'); // Get the "Log-in" checkbox
const loginForm = document.querySelector('.login-form'); // Get the login form

loginCheckbox.addEventListener("click",() => {

    if (loginCheckbox.checked) {
        loginForm.style.display = "block"
    } else {
        loginForm.style.display = "none"
    }
})



//Lucas
//Register Checkbox
const registerCheckbox = document.querySelector('#new-user'); // Get the "Create user" checkbox
const registerForm = document.querySelector('.register-form'); // Get the registration form


registerCheckbox.addEventListener('click', function () {
                if (registerCheckbox.checked) {
                    registerForm.style.display = 'block'; // Display the registration form
                } else {
                    registerForm.style.display = 'none'; // Hide the registration form
                }
            })

