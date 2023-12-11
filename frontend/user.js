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
        })
        .catch((err) => {
            // Handle errors, for example, display an error message to the user
            console.error('Fetch Error:', err);
        });
}

document.querySelector('.getUserInfo').addEventListener('click', getUserInfo);

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
