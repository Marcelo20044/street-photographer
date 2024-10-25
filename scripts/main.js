function loadTime() {
    const [navigation] = performance.getEntriesByType('navigation');
    const loadTime = navigation.domContentLoadedEventEnd - navigation.startTime;

    const footer = document.querySelector('footer')
    const p = document.createElement('p')
    p.textContent = `Скорость загрузки страницы: ${Math.round(loadTime)} мс.`
    footer.appendChild(p)
}

function updateNavActive() {
    let activeExists = false
    const menuItems = document.querySelectorAll('.menu-item')

    menuItems.forEach(item => {
        if (item.href === document.location.href) {
            item.classList.add('active')
            activeExists = true
        }
    });

    if (!activeExists) {
        document.querySelector('.main-menu-item').classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        loadTime()
    })
    updateNavActive()
});

