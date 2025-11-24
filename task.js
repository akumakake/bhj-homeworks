document.addEventListener('DOMContentLoaded', function() {
            const dropdown = document.querySelector('.dropdown');
            const dropdownValue = dropdown.querySelector('.dropdown__value');
            const dropdownList = dropdown.querySelector('.dropdown__list');
            const dropdownItems = dropdown.querySelectorAll('.dropdown__item');
            
            dropdownValue.addEventListener('click', function() {
                dropdownList.classList.toggle('dropdown__list_active');
            });
            
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const selectedValue = this.querySelector('.dropdown__link').textContent.trim();
                    dropdownValue.textContent = selectedValue;
                    dropdownList.classList.remove('dropdown__list_active');
                });
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdownList.classList.remove('dropdown__list_active');
                }
            });
        });