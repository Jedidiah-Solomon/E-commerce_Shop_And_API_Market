const modeIcon = document.getElementById('modeIcon');

modeIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        modeIcon.src = '../../public/img/dark-theme-icon/sun.png';
    } else {
        modeIcon.src = '../../public/img/dark-theme-icon/moon.png';
    }
});
