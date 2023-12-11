//Lucas
//Show user information
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.getUserInfo').addEventListener('click', getUserInfo);


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

            // Check if userData.favoriteCafe exists before updating the element
            if (userData.favoriteCafes) {
                document.getElementById('favorite-cafe').textContent = userData.favoriteCafes;
            }
            // Display the container with user information on the page
            document.getElementById('user-info-container').style.display = 'block';

        })
        .catch((err) => {
            // Handle errors, for example, display an error message to the user
            console.error('Fetch Error:', err);
        });
}
})

