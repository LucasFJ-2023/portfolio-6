//Lucas
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cafeId = urlParams.get('cafeId');
    const stjerneButton = document.querySelector('#stjerne');
    const storedUserId = localStorage.getItem("userId");

    stjerneButton.addEventListener('click', () => {
        console.log("button clicked");

        // Make a request to toggle the cafe in and out of favorites
        fetch('http://localhost:3000/toggle-favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: storedUserId, cafeId }),
        })
            .then((response) => {
                console.log('Server response status:', response.status);

                if (!response.ok) {
                    throw new Error("Failed to update cafe status");
                }
                return response.json();
            })
            .then((result) => {
                // Handle success if needed
                console.log('Cafe status updated:', result);
                alert(result.message);
            })
            .catch((error) => {
                console.error('Fetch error:', error.message);
                // Handle error if needed
                alert('Failed to update cafe status.');
            });
    });
});
