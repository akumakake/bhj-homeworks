function checkReveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                // Элемент появляется, когда его верхняя граница находится в поле зрения
                if (elementTop < windowHeight - 100) {
                    element.classList.add('reveal_active');
                }
            });
        }

        // Проверяем при загрузке страницы
        window.addEventListener('load', checkReveal);
        
        // Проверяем при прокрутке
        window.addEventListener('scroll', checkReveal);