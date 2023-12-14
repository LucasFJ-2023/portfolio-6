let storedUserId = localStorage.getItem("userId")
console.log(storedUserId);


// victor - Display all cafes in HTML #cafeImages
//

// Opret cafe liste med links
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



// Victor
// Redirect client when image is pressed
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

function fetchAndDisplayCafes(query) {
    const cafeImagesContainer = document.querySelector('#cafeImages');
    const limit = 21;

    const fetchCafes = () => {
        const url = `http://localhost:3000/cafes?limit=${limit}${query}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Not ok');
                }
                return response.json();
            })
            .then(cafes => {
                cafeImagesContainer.innerHTML = '';
                cafes.forEach((cafe, index) => {
                    const cafeLink = createCafeLink(cafe);
                    if (cafes) {
                        cafeImagesContainer.appendChild(cafeLink);
                    } else {
                        cafeLink.style.display = 'none';
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching cafes:', error);
            });
    };

    fetchCafes();
}


document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCafes('');

    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = document.querySelector('#cityDropdown').value;
        const wifi = document.querySelector('#wifiCheckbox').checked ? '1' : '';
        const food = document.querySelector('#foodCheckbox').checked ? '1' : '';

        const query = `&city=${city}&wifi=${wifi}&food=${food}`;
        fetchAndDisplayCafes(query);
    });
});


////////////////////////////////////////////////////////////////////
