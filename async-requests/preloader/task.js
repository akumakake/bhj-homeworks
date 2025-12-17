document.addEventListener('DOMContentLoaded', function() {
            const loader = document.getElementById('loader');
            const itemsContainer = document.getElementById('items');
            const errorMessage = document.getElementById('error');
            const lastUpdate = document.getElementById('last-update');
            
            const API_URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
            
            loader.classList.add('loader_active');
            
            function formatNumber(num) {
                return num.toFixed(4).replace('.', ',');
            }
            
            function formatDate(dateString) {
                const date = new Date(dateString);
                return date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
            
            function createCurrencyItem(charCode, value) {
                const item = document.createElement('div');
                item.className = 'item';
                
                const codeDiv = document.createElement('div');
                codeDiv.className = 'item__code';
                codeDiv.textContent = charCode;
                
                const valueDiv = document.createElement('div');
                valueDiv.className = 'item__value';
                valueDiv.textContent = formatNumber(value);
                
                const currencyDiv = document.createElement('div');
                currencyDiv.className = 'item__currency';
                currencyDiv.textContent = 'руб.';
                
                item.appendChild(codeDiv);
                item.appendChild(valueDiv);
                item.appendChild(currencyDiv);
                
                return item;
            }
            
            function showError() {
                errorMessage.classList.add('error-message_active');
                lastUpdate.textContent = '';
            }
            
            async function loadCurrencyData() {
                try {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const response = await fetch(API_URL);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    
                    if (!data.response || !data.response.Valute) {
                        throw new Error('Некорректный формат данных');
                    }
                    
                    itemsContainer.innerHTML = '';
                    
                    const valutes = data.response.Valute;
                    
                    const sortedValutes = Object.values(valutes).sort((a, b) => {
                        return a.CharCode.localeCompare(b.CharCode);
                    });
                    
                    sortedValutes.forEach(valute => {
                        const item = createCurrencyItem(valute.CharCode, valute.Value);
                        itemsContainer.appendChild(item);
                    });
                    
                    if (data.response.Date) {
                        lastUpdate.textContent = `Обновлено: ${formatDate(data.response.Date)}`;
                    }
                    
                    loader.classList.remove('loader_active');
                    
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                    
                    loader.classList.remove('loader_active');
                    
                    showError();
                }
            }
            
            loadCurrencyData();
            
            window.refreshData = function() {
                loader.classList.add('loader_active');
                errorMessage.classList.remove('error-message_active');
                loadCurrencyData();
            };
        });