
// victor
document.addEventListener('DOMContentLoaded', () => {
    const cafeImagesContainer = document.getElementById('cafeImages');
    fetch('http://localhost:3000/randomcafes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Not ok');
            }
            return response.json();
        })
        .then(cafes => {
            cafes.forEach(cafe => {
                const cafeElement = document.createElement('div');
                cafeElement.innerHTML = `
                    <img src="${cafe.img_url}">
                    <h3>${cafe.cafe_name}</h3>
                    <p>Address: ${cafe.address}, ${cafe.city}</p>
                    <p>Description: ${cafe.description}</p>
                    
                `;
                cafeImagesContainer.appendChild(cafeElement);
            });
        })
        .catch(error => {
            console.error('cant fetch cafes:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cafeId = urlParams.get('id');
    fetch(`http://localhost:3000/cafe/${cafeId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(cafe => {
            const cafeDetailsContainer = document.getElementById('cafeDetails');
            if (cafe) {
                cafeDetailsContainer.innerHTML = `
                        <img src="${cafe[0].img_url}">
                        <h2>${cafe[0].cafe_name}</h2>
                        <p>Address: ${cafe[0].address}, ${cafe[0].city}</p>
                        <p>Description: ${cafe[0].description}</p>

                    `;
            }
        })
        .catch(error => {
            console.error('Error fetching cafe details:', error);
        });
});