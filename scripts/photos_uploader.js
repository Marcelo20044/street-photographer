const preloader = document.getElementById('preloader');
const photoContainer = document.getElementById('photo-container');
const maxPhotos = 32;

function fetchPhotos() {
    const randomAlbumId = Math.random() > 0.5 ? 1 : 2;

    preloader.style.display = 'block';
    photoContainer.hidden = true;

    fetch(`https://jsonplaceholder.typicode.com/albums/${randomAlbumId}/photos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            photoContainer.innerHTML = '';

            let addedPhotos = 0;

            for (const photo of data) {
                if (addedPhotos >= maxPhotos) break;

                const photoItem = document.createElement('div');
                photoItem.classList.add('photo-item');

                photoItem.innerHTML = `
                            <img src="${photo.url}" alt="${photo.title}">
                            <p class="photo_title">${photo.title}</p>
                        `;

                photoContainer.appendChild(photoItem);
                addedPhotos++;
            }

            preloader.style.display = 'none';

            if (addedPhotos === 0) {
                photoContainer.innerHTML = '<p>Нет доступных фотографий для отображения</p>';
            }

            photoContainer.hidden = false;
        })
        .catch(error => {
            preloader.style.display = 'none';
            photoContainer.innerHTML = '<p>Что-то пошло не так, попробуйте позже</p>';
            console.error('Ошибка при загрузке фотографий:', error);
        });
}

fetchPhotos();
