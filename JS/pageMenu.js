function createPageMenu() {
    const navMenu = document.createElement('nav');
    navMenu.id = 'page-menu';
    navMenu.className = 'hidden';

    const ul = document.createElement('ul');

    const links = [
        { text: 'Home', href: '/' },
        { text: 'Projects', href: 'projects' },
        { text: 'README', href: 'README' },
        { text: 'Links', href: 'links' }
    ];

    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = link.text;
        a.href = link.href;
        li.appendChild(a);
        ul.appendChild(li);
    });

    navMenu.appendChild(ul);

    document.body.prepend(navMenu);

    if (document.querySelector('.title')) {
        document.addEventListener('scroll', function () {
            var menu = document.querySelector('#page-menu');
            var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && !isHovered) {
                menu.classList.add('hidden');
            } else if (!isHovered) {
                menu.classList.remove('hidden');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
        });

        document.querySelectorAll('#page-menu, .title').forEach(el => {
            el.addEventListener('mouseenter', function () {
                isHovered = true;
                document.querySelector('#page-menu').classList.remove('hidden');
                document.querySelector('.title').style.marginTop = '40px';
            });

            el.addEventListener('mouseleave', function () {
                isHovered = false;
                document.querySelector('#page-menu').classList.add('hidden');
                document.querySelector('.title').style.marginTop = '20px';
            });
        });
    }
    else {
        document.querySelector('#page-menu').classList.remove('hidden');
        document.body.children[1].style.marginTop = '40px';
    }
}