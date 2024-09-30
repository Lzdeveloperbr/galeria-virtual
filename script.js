// Função para mostrar a data e hora atual no cabeçalho
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('date-time').textContent = now.toLocaleString('pt-BR', options);
}
setInterval(updateDateTime, 1000); // Atualiza a cada segundo

const gallery = document.getElementById('gallery');

// Função para adicionar imagem
function addImage(imageSrc, dateTime) {
    const container = document.createElement('div');
    container.classList.add('image-container');

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Imagem da galeria';

    const dateTimeDiv = document.createElement('div');
    dateTimeDiv.classList.add('date-time');
    dateTimeDiv.textContent = dateTime;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remover';
    removeButton.onclick = function() {
        gallery.removeChild(container);
        removeImageFromStorage(imageSrc); // Remove a imagem do localStorage
    };

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('download-button');
    downloadButton.textContent = 'Baixar';
    downloadButton.onclick = function() {
        const a = document.createElement('a');
        a.href = imageSrc;
        a.download = ''; // O nome do arquivo será o nome original
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Adicionando os elementos ao contêiner
    container.appendChild(img);
    container.appendChild(dateTimeDiv);
    container.appendChild(downloadButton);
    container.appendChild(removeButton);
    gallery.appendChild(container);
}

// Função para armazenar a imagem no localStorage
function saveImageToStorage(imageSrc, dateTime) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.push({ src: imageSrc, dateTime: dateTime });
    localStorage.setItem('images', JSON.stringify(images));
}

// Função para remover a imagem do localStorage
function removeImageFromStorage(imageSrc) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images = images.filter(image => image.src !== imageSrc);
    localStorage.setItem('images', JSON.stringify(images));
}

// Função para carregar imagens do localStorage
function loadImagesFromStorage() {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(image => addImage(image.src, image.dateTime));
}

// Função para fazer upload de imagens
function uploadImages() {
    const files = document.getElementById('image-upload').files;
    const dateTime = new Date().toLocaleString();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            addImage(e.target.result, dateTime);
            saveImageToStorage(e.target.result, dateTime); // Salva a imagem no localStorage
        };

        reader.readAsDataURL(file);
    }
}

// Carregar imagens do localStorage ao iniciar a página
window.onload = function() {
    loadImagesFromStorage();
};
