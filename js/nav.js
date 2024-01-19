function navToggle() {
    let navBtn = document.getElementById('navBtn');
    let mainNav = document.getElementById('mainNav');

    navBtn.onclick = function () {
        if (mainNav.classList.contains('nav-hidden')) {
            mainNav.classList.remove('nav-hidden');
            mainNav.style.maxHeight = mainNav.scrollHeight + 'px';
        } else {
            mainNav.style.transition = 'max-height 0.4s ease';
            mainNav.style.maxHeight = '0';
            setTimeout(function() {
                mainNav.classList.add('nav-hidden');
                mainNav.style.transition = '';
            }, 400);
        }
    }

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("DOMContentLoaded", resizeHandler);

    function resizeHandler() {
        if (document.documentElement.clientWidth >= 1024) {
            mainNav.classList.remove('nav-hidden');
            mainNav.style.maxHeight = 'none';
        } else {
            if (mainNav.classList.contains('nav-hidden')) {
                mainNav.style.maxHeight = '0';
            } else {
                mainNav.style.maxHeight = mainNav.scrollHeight + 'px';
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    navToggle();
});
