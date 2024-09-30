// Função para mostrar a data e hora atual no cabeçalho
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('date-time').textContent = now.toLocaleString('pt-BR', options);
}
setInterval(updateDateTime, 1000); // Atualiza a cada segundo

const gallery = document.getElementById('gallery');

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
    };

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('download-button'); // Adicionado a classe download-button
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
    container.appendChild(downloadButton); // Botão de baixar fica acima do de remover
    container.appendChild(removeButton); // Botão de remover abaixo do de baixar
    gallery.appendChild(container);
}

function uploadImages() {
    const files = document.getElementById('image-upload').files;
    const dateTime = new Date().toLocaleString();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            addImage(e.target.result, dateTime);
        };

        reader.readAsDataURL(file);
    }
}