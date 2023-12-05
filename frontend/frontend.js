
// victor
document.addEventListener('DOMContentLoaded', () => {
    const cafeImagesContainer = document.getElementById('cafeImages');

    fetch('/cafe/:id')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cafes => {
            cafes.forEach(cafe => {
                const cafeElement = document.createElement('div');
                cafeElement.innerHTML = `
                    <h3>${cafe.cafe_name}</h3>
                    <p>Address: ${cafe.address}, ${cafe.city}</p>
                    <p>Description: ${cafe.description}</p>
                `;
                cafeImagesContainer.appendChild(cafeElement);
            });
        })
        .catch(error => {
            console.error('Error fetching random cafes:', error);
        });
});





