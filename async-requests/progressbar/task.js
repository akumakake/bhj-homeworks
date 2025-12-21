document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const sendButton = document.getElementById('send');
    const progressBar = document.getElementById('progress');
    const fileNameDisplay = document.querySelector('.input__wrapper-desc');
    
    let selectedFile = null;
    
    const statusContainer = document.createElement('div');
    statusContainer.className = 'status-message';
    form.parentNode.insertBefore(statusContainer, form.nextSibling);
    
    const fileInfoContainer = document.createElement('div');
    fileInfoContainer.className = 'file-info';
    form.parentNode.insertBefore(fileInfoContainer, form);
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            
            fileNameDisplay.textContent = selectedFile.name;
            
            fileInfoContainer.innerHTML = `
                <span class="file-name">${selectedFile.name}</span>
                <span class="file-size">(${formatFileSize(selectedFile.size)})</span>
            `;
            fileInfoContainer.style.display = 'block';
            
            sendButton.disabled = false;
            
            progressBar.value = 0;
            
            hideStatusMessage();
        } else {
            selectedFile = null;
            fileNameDisplay.textContent = 'Имя файла...';
            fileInfoContainer.style.display = 'none';
            sendButton.disabled = true;
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedFile) {
            showStatusMessage('Пожалуйста, выберите файл для загрузки', 'error');
            return;
        }
        
        uploadFile(selectedFile);
    });

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', function(e) {
            if (e.lengthComputable) {
                const progress = e.loaded / e.total;
                
                progressBar.value = progress;
                
                const percent = Math.round(progress * 100);
                showStatusMessage(`Загрузка файла: ${percent}%`, 'loading');
            }
        });
        
        xhr.addEventListener('load', function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                showStatusMessage('Файл успешно загружен!', 'success');
                sendButton.disabled = true;
                
                setTimeout(() => {
                    resetForm();
                }, 3000);
            } else {
                showStatusMessage(`Ошибка при загрузке: ${xhr.status}`, 'error');
                sendButton.disabled = false;
            }
        });
        
        xhr.addEventListener('error', function() {
            showStatusMessage('Ошибка сети при загрузке файла', 'error');
            sendButton.disabled = false;
        });
        
        xhr.addEventListener('abort', function() {
            showStatusMessage('Загрузка файла отменена', 'error');
            sendButton.disabled = false;
        });
        
        showStatusMessage('Начинаем загрузку файла...', 'loading');
        sendButton.disabled = true;
        sendButton.textContent = 'Загрузка...';
        
        xhr.open('POST', form.action, true);
        xhr.send(formData);
    }
    
    function showStatusMessage(message, type) {
        statusContainer.textContent = message;
        statusContainer.className = 'status-message';
        
        switch(type) {
            case 'loading':
                statusContainer.classList.add('status-loading');
                break;
            case 'success':
                statusContainer.classList.add('status-success');
                break;
            case 'error':
                statusContainer.classList.add('status-error');
                break;
        }
        
        statusContainer.style.display = 'block';
    }
    
    function hideStatusMessage() {
        statusContainer.style.display = 'none';
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function resetForm() {
        form.reset();
        selectedFile = null;
        fileNameDisplay.textContent = 'Имя файла...';
        fileInfoContainer.style.display = 'none';
        progressBar.value = 0;
        sendButton.disabled = false;
        sendButton.textContent = 'Отправить';
        hideStatusMessage();
    }
    
    sendButton.disabled = true;
});