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

