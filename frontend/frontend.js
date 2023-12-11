//Lucas
//Create user
const firstNameInputField = document.getElementById('register-firstName');
const lastNameInputField = document.getElementById('register-lastName');
const emailInputField = document.getElementById('register-email');
const passwordInputField = document.getElementById('register-password');
const usernameInputField = document.getElementById('register-username');
const locationInputField = document.getElementById('register-location')
const registerButton = document.querySelector(".register-button")

//Login
const emailLogin = document.getElementById('login-email');
const passwordLogin = document.getElementById('login-password');
const loginButton = document.querySelector(".login-button")

//Create a new café
const cafeNameInputField = document.getElementById('register-cafeName');
const addressInputField = document.getElementById('register-address');
const cityInputField = document.getElementById('register-city');
const descriptionInputField = document.getElementById('register-description');
const wifiInputField = document.getElementById('register-wifi');
const serveFoodInputField = document.getElementById('register-serveFood');
const registerCafeButton = document.querySelector(".registerCafe-button");



// victor - Display all cafes in HTML #cafeImages
document.addEventListener('DOMContentLoaded', () => {
    const cafeImagesContainer = document.querySelector('#cafeImages');
    fetch('http://localhost:3000/all/cafes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Not ok');
            }
            return response.json();
        })
        .then(cafes => {
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            cafeImagesContainer.appendChild(rowDiv);

            cafes.forEach((cafe, index) => {
                if (index > 0 && index % 3 === 0) {
                    rowDiv = document.createElement('div');
                    rowDiv.classList.add('row');
                    cafeImagesContainer.appendChild(rowDiv);
                }

                const cafeLink = document.createElement('a');
                const cafeDiv = document.createElement('div');
                const cafeImage = document.createElement('img');

                cafeLink.href = `cafe.html?cafeId=${cafe.id}`;
                cafeLink.classList.add('cafe-link');

                cafeImage.src = cafe.img_url;
                cafeImage.alt = cafe.cafe_name;
                cafeImage.classList.add('cafe-image');

                const cafeDetails = document.createElement('div');
                cafeDetails.innerHTML = `
                    <h3>${cafe.cafe_name}</h3>
                    <p>Address: ${cafe.address}, ${cafe.city}</p>
                    <p>Description: ${cafe.description}</p>
                `;
                cafeDetails.classList.add('cafe-details');

                cafeDiv.classList.add('cafe-container');
                cafeDiv.appendChild(cafeImage);
                cafeDiv.appendChild(cafeDetails);

                cafeLink.appendChild(cafeDiv); // Append the whole structure to the link
                rowDiv.appendChild(cafeLink); // Append the link to the row
            });
        })
        .catch(error => {
            console.error('Error fetching cafes:', error);
        });
});



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


// Get elements related to the registration functionality
const registerCafeCheckbox = document.getElementById('new-cafe'); // Get the "Create new café" checkbox
const registerCafeForm = document.querySelector('.registerCafe-form'); // Get the café registration form


// Toggle display of café register form based on checkbox change
registerCafeCheckbox.addEventListener('change', function () {
    if (registerCafeCheckbox.checked) {
        registerCafeForm.style.display = 'block'; // Display the café registration form
    } else {
        registerCafeForm.style.display = 'none'; // Hide the café registration form
    }
});




// Victor
// google maps
// Initialize and add the map
let map;

async function initMap() {
    // The location of Uluru
    const position = { lat: -25.344, lng: 131.031 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
        zoom: 4,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    // The marker, positioned at Uluru
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Uluru",
    });
}
initMap();
