function navToggle() {
    let navBtn = document.getElementById('navBtn');
    let mainNav = document.getElementById('mainNav');

    navBtn.onclick = function () {
        if (mainNav.classList.contains('nav-hidden')) {
            mainNav.classList.remove('nav-hidden');
            mainNav.style.maxHeight = mainNav.scrollHeight + 'px';
        } else {
            mainNav.style.transition = 'max-height 0.4s ease'; // Добавляем правило перехода перед изменением max-height
            mainNav.style.maxHeight = '0';
            setTimeout(function() {
                mainNav.classList.add('nav-hidden');
                mainNav.style.transition = ''; // Сбрасываем transition после анимации
            }, 400); // 400 миллисекунд - это значение, соответствующее продолжительности transition
        }
    }

    window.addEventListener("resize", resizeHandler, false);

    function resizeHandler() {
        if (document.documentElement.clientWidth >= 1024) {
            mainNav.classList.remove('nav-hidden');
            mainNav.style.maxHeight = 'none'; // Reset max-height for larger screens
        } else {
            if (mainNav.classList.contains('nav-hidden')) {
                mainNav.style.maxHeight = '0';
            } else {
                mainNav.style.maxHeight = mainNav.scrollHeight + 'px';
            }
        }
    }
}

navToggle()