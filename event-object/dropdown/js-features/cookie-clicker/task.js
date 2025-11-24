class CookieClicker {
    constructor() {
        this.clickCount = 0;
        this.clickSpeed = 0;
        this.lastClickTime = null;
        this.isCookieSmall = false;
        
        this.cookieElement = document.getElementById('cookie');
        this.counterElement = document.getElementById('clicker__counter');
        this.speedElement = this.createSpeedElement();
        
        this.init();
    }
    
    init() {
        this.cookieElement.addEventListener('click', () => this.handleClick());
    }
    
    handleClick() {
        this.clickCount++;
        this.updateCounter();
        
        this.toggleCookieSize();
        
        this.calculateClickSpeed();
    }
    
    updateCounter() {
        this.counterElement.textContent = this.clickCount;
    }
    
    toggleCookieSize() {
        if (this.isCookieSmall) {
            this.cookieElement.style.width = '200px';
        } else {
            this.cookieElement.style.width = '180px';
        }
        
        this.isCookieSmall = !this.isCookieSmall;
    }
    
    calculateClickSpeed() {
        const currentTime = new Date();
        
        if (this.lastClickTime) {
            const timeDiff = (currentTime - this.lastClickTime) / 1000; 
            
            if (timeDiff > 0) {
                this.clickSpeed = (1 / timeDiff).toFixed(2);
                this.updateSpeedDisplay();
            }
        }
        
        this.lastClickTime = currentTime;
    }
    
    createSpeedElement() {
        const speedContainer = document.createElement('div');
        speedContainer.className = 'clicker__status';
        speedContainer.innerHTML = `Скорость клика: <span id="clicker__speed">0</span> в секунду`;
        
        this.counterElement.parentNode.after(speedContainer);
        
        return document.getElementById('clicker__speed');
    }
    
    updateSpeedDisplay() {
        if (this.speedElement) {
            this.speedElement.textContent = this.clickSpeed;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CookieClicker();
});