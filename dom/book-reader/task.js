document.addEventListener('DOMContentLoaded', function() {
    const bookElement = document.getElementById('book');
    
    const fontSizeControls = document.querySelectorAll('.font-size');
    fontSizeControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            
            fontSizeControls.forEach(item => {
                item.classList.remove('font-size_active');
            });
            
            this.classList.add('font-size_active');
            
            const size = this.dataset.size;
            
            bookElement.classList.remove('book_fs-small', 'book_fs-big');
            
            if (size === 'small') {
                bookElement.classList.add('book_fs-small');
            } else if (size === 'big') {
                bookElement.classList.add('book_fs-big');
            }
        });
    });
    
    const textColorControls = document.querySelectorAll('.text_color');
    textColorControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            
            textColorControls.forEach(item => {
                item.classList.remove('color_active');
            });
            
            this.classList.add('color_active');
            
            const color = this.dataset.textColor;
            
            bookElement.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
            
            if (color) {
                bookElement.classList.add(`book_color-${color}`);
            }
        });
    });
    
    const bgColorControls = document.querySelectorAll('.bg_color');
    bgColorControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            
            bgColorControls.forEach(item => {
                item.classList.remove('color_active');
            });
            
            this.classList.add('color_active');
            
            const color = this.dataset.bgColor;
            
            bookElement.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
            
            if (color) {
                bookElement.classList.add(`book_bg-${color}`);
            }
        });
    });
});