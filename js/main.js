// Conteúdo de dist-static-ja-main.txt

document.addEventListener('DOMContentLoaded', function () {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        const title = item.querySelector('.project-title');

        title.addEventListener('click', function () {
            // Fecha todos os outros projetos
            projectItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Alterna o projeto atual
            item.classList.toggle('active');
        });
    });
});