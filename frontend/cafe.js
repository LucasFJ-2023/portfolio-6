let storedUserId = localStorage.getItem("userId")
console.log(storedUserId);



document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cafeId = urlParams.get('cafeId');
    const stjerneButton = document.querySelector('#stjerne');

    // Retrieve user ID from localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error('User ID not available');
        // Handle the case where user ID is not available
        return;
    }

    stjerneButton.addEventListener('click', () => {
        console.log("button clicked")
        // Make a request to add the cafe to favorites
        fetch('http://localhost:3000/add-favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, cafeId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add cafe to favorites");
                }
                return response.json();
            })
            .then((result) => {
                // Handle success if needed
                console.log('Cafe added to favorites:', result);
                alert('Cafe added to favorites!');
            })
            .catch((error) => {
                console.error(error.message);
                // Handle error if needed
                alert('Failed to add cafe to favorites.');
            });
    });
});
