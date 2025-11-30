function checkReveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('reveal_active');
                }
            });
        }

        window.addEventListener('load', checkReveal);
        
        window.addEventListener('scroll', checkReveal);