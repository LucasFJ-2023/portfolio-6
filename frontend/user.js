//Lucas
//Show user information
function getUserInfo() {
    // Retrieve the username entered by the user from the input field
    const username = document.getElementById('usernameInput').value;

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
            document.getElementById('first-name').textContent = userData.firstName;
            document.getElementById('last-name').textContent = userData.lastName;
            document.getElementById('username').textContent = userData.userName;
            document.getElementById('email').textContent = userData.email;
            document.getElementById('location').textContent = userData.location;

            // Display the container with user information on the page
            document.getElementById('user-info-container').style.display = 'block';

            // Check if userData.favoriteCafe exists before updating the element
            if (userData.favoriteCafe) {
                document.getElementById('favorite-cafe').textContent = userData.favoriteCafe;
            }
        })
        .catch((err) => {
            // Handle errors, for example, display an error message to the user
            console.error('Fetch Error:', err);
        });
}

document.querySelector('.getUserInfo').addEventListener('click', getUserInfo);




//Victor, Lucas har tilføjet lidt til den.
//Mark as favorite
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cafeId = urlParams.get('id');
    const favoriteButton = document.querySelector('#favoriteButton');

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
                cafeInformationContainer.innerHTML = `<h2>${cafe[0].cafe_name}</h2> <p>Address: ${cafe[0].address}, ${cafe[0].city}</p><p>${cafe[0].description}</p>`;
                cafeDescriptionContainer.innerHTML = ``;
                wifiImage.src = cafe[0].wifi ? './img/istrue.png' : './img/isfalse.png';
                foodImage.src = cafe[0].serve_food ? './img/istrue.png' : './img/isfalse.png';

                // Attach a click event listener to the "Mark as Favorite" button
                favoriteButton.addEventListener('click', () => markAsFavorite(cafeId));
            }

        })
        .catch(err => {
            console.error('Error fetching cafe details:', err);
        });
});

// Function to handle marking a café as a favorite
function markAsFavorite(cafeId) {
    // Make a fetch request to your server to update the favorite status
    fetch(`http://localhost:3000/mark-favorite?cafeId=${cafeId}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to mark as favorite');
            }
            return response.json();
        })
        .then(data => {
            console.log('Café marked as favorite:', data);
            // You can update the UI here if needed
        })
        .catch(error => {
            console.error('Error marking as favorite:', error);
            // Handle the error, show a message to the user, etc.
        });
}







//Cafe img.
document.addEventListener('DOMContentLoaded', () => {
    const cafeImagesContainer = document.getElementById('cafeImages');
    fetch('http://localhost:3000/all/cafes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Not ok');
            }
            return response.json();
        })
        .then(cafes => {
            cafes.forEach(cafe => {
                const cafeDiv = document.createElement('div');
                const cafeImage = document.createElement('img');
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
                cafeImagesContainer.appendChild(cafeDiv);
            });
        })
        .catch(error => {
            console.error('cant fetch cafes:', error);
        });
});
