const preloader = document.getElementById('preloader');
const photoContainer = document.getElementById('photo-container');
const maxPhotos = 28;

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
            while (photoContainer.firstChild) {
                photoContainer.removeChild(photoContainer.firstChild);
            }

            let addedPhotos = 0;

            for (const photo of data) {
                if (addedPhotos >= maxPhotos) break;

                const photoItem = document.createElement('div');
                photoItem.classList.add('photo-item');

                const imgElement = document.createElement('img');
                imgElement.src = photo.url;
                imgElement.alt = photo.title;

                const titleElement = document.createElement('p');
                titleElement.classList.add('photo_title');
                titleElement.textContent = photo.title;

                photoItem.appendChild(imgElement);
                photoItem.appendChild(titleElement);

                photoContainer.appendChild(photoItem);
                addedPhotos++;
            }

            preloader.style.display = 'none';

            if (addedPhotos === 0) {
                const noPhotosMessage = document.createElement('p');
                noPhotosMessage.textContent = 'Нет доступных фотографий для отображения';
                photoContainer.appendChild(noPhotosMessage);
            }

            photoContainer.hidden = false;
        })
        .catch(error => {
            preloader.style.display = 'none';

            // Очищаем контейнер
            while (photoContainer.firstChild) {
                photoContainer.removeChild(photoContainer.firstChild);
            }

            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Что-то пошло не так, попробуйте позже';
            photoContainer.appendChild(errorMessage);

            console.error('Ошибка при загрузке фотографий:', error);
        });
}

fetchPhotos();
