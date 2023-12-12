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

//Create a new café
const cafeNameInputField = document.querySelector('#register-cafeName');
const addressInputField = document.querySelector('#register-address');
const cityInputField = document.querySelector('#register-city');
const descriptionInputField = document.querySelector('#register-description');
const wifiInputField = document.querySelector('#register-wifi');
const serveFoodInputField = document.querySelector('#register-serveFood');
const registerCafeButton = document.querySelector(".registerCafe-button");



// victor - Display all cafes in HTML #cafeImages
//



// Victor
// Få fat i en specific cafe
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cafeId = urlParams.get('cafeId');
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
            const cafeDescriptionContainer = document.querySelector('.cafe-description');
            const wifiImage = document.querySelector('.true-or-false-wifi');
            const foodImage = document.querySelector('.true-or-false-food');

            if (cafe) {
                cafeImageContainer.innerHTML = `<img src="${cafe[0].img_url}">`;
                cafeInformationContainer.innerHTML = `<h2>${cafe[0].cafe_name}</h2><p>Address: ${cafe[0].address}, ${cafe[0].city}</p><p>${cafe[0].description}</p>`;
                cafeDescriptionContainer.innerHTML = ``;
                wifiImage.src = cafe[0].wifi ? './img/istrue.png' : './img/isfalse.png';
                foodImage.src = cafe[0].serve_food ? './img/istrue.png' : './img/isfalse.png';
            }
        })
        .catch(err => {
            console.error('Error fetching cafe details:', err);
        });
});

// Victor - Show more
document.addEventListener('DOMContentLoaded', () => {
    const cafeImagesContainer = document.querySelector('#cafeImages');
    const displayedCafeIds = new Set(); // Set to keep track of displayed cafe IDs
    const limit = 6; // Define the initial limit here
    let offset = 0;

    const fetchCafes = () => {
        fetch(`http://localhost:3000/all/cafes?limit=${limit}&offset=${offset}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Not ok');
                }
                return response.json();
            })
            .then(cafes => {
                cafes.forEach(cafe => {
                    if (!displayedCafeIds.has(cafe.id)) {
                        const cafeLink = createCafeLink(cafe);
                        if (displayedCafeIds.size < limit) {
                            cafeImagesContainer.appendChild(cafeLink);
                            displayedCafeIds.add(cafe.id);
                        } else {
                            cafeLink.style.display = 'none';
                            cafeImagesContainer.appendChild(cafeLink);
                            displayedCafeIds.add(cafe.id);
                        }
                    }
                });

                if (cafes.length > 0) {
                    const showMoreLink = document.createElement('a');
                    showMoreLink.textContent = 'Show more pictures';
                    showMoreLink.id = 'showMoreLink';
                    cafeImagesContainer.appendChild(showMoreLink);

                    showMoreLink.addEventListener('click', () => {
                        offset += limit;
                        fetchCafes(); // Fetch more cafes when 'Show more' is clicked
                        showMoreLink.remove(); // Remove the 'Show more' link
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching cafes:', error);
            });
    };

    fetchCafes();
});



// Create cafe links
function createCafeLink(cafe) {
    const cafeLink = document.createElement('a');
    cafeLink.href = `cafe.html?cafeId=${cafe.id}`;
    cafeLink.classList.add('cafe-link');

    const cafeDiv = document.createElement('div');
    cafeDiv.classList.add('cafe-container-show-more');

    const cafeImage = document.createElement('img');
    cafeImage.src = cafe.img_url;
    cafeImage.alt = cafe.cafe_name;
    cafeImage.classList.add('cafe-image');

    const cafeDetails = document.createElement('div');
    cafeDetails.classList.add('cafe-details');
    cafeDetails.innerHTML = `
        <h2>${cafe.cafe_name}</h2>
        <p>Address: ${cafe.address}, ${cafe.city}</p>
        <p>${cafe.description}</p>
    `;

    cafeDiv.appendChild(cafeImage);
    cafeDiv.appendChild(cafeDetails);

    cafeLink.appendChild(cafeDiv);
    return cafeLink;
}






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
        //Handle server response
        .then(response => response.json())
        .then(data => {
            // Handle the response data as needed
            console.log("User registered:", data);
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

            // Redirect users to the next page (forside.html)
            window.location.href = 'forside.html';
        })
        .catch((error) => {
            console.error(error.message);
            alert("Invalid email or password");
        });
});



//Lucas
// This function executes when the DOM content is fully loaded and ready to be manipulated
document.addEventListener('DOMContentLoaded', function() {
    // Get elements related to the login functionality
    const loginCheckbox = document.querySelector('#already-user'); // Get the "Log-in" checkbox
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
    const registerCheckbox = document.querySelector('#new-user'); // Get the "Create user" checkbox
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