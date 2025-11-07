const tabsContainer = document.getElementById("tabs");
const contentContainer = document.getElementById("content");
let openTabs = {};

// abre/fecha pasta
function toggleFolder(folder) {
    folder.classList.toggle("open");
    if (folder.textContent.trim().startsWith("▶")) {
        folder.textContent = folder.textContent.replace("▶", "▼");
    } else if (folder.textContent.trim().startsWith("▼")) {
        folder.textContent = folder.textContent.replace("▼", "▶");
    }

}

function openPage(id, title) {
    if (openTabs[id]) {
        setActiveTab(id);
        return;
    }

    const tab = document.createElement("div");
    tab.classList.add("tab");
    tab.dataset.id = id;
    tab.innerHTML = `${title} <span class="close" onclick="closeTab('${id}', event)">×</span>`;
    tab.onclick = () => setActiveTab(id);
    tabsContainer.appendChild(tab);

    const content = document.createElement("div");

    // 🔹 Se for a aba inicial, mostra o conteúdo real do index.html
    if (id === "index") {
        content.innerHTML = `
            <h2>Bem vindo ao meu Portfólio</h2>
            <h3>Portfólio ainda em desenvolvimento 04/11/2025</h3>
            <h3>Selecione um ítem no menu lateral para abrir</h3><br><br>
            <div class="perfil-card">
                <div><img class="icons" src="https://i.postimg.cc/4N6P1RV1/alex-java.png"></div>
                <div><img class="icons-react" src="https://i.postimg.cc/R0Nwyk6y/alex-react.png"></div>
                <div><img class="icons-html" src="https://i.postimg.cc/Twn5XfR7/alex-html.png"></div>
                <div><img class="icons-css" src="https://i.postimg.cc/wv5MG2Vn/alex-css.png"></div>
                <div><img class="icons-javascript" src="https://i.postimg.cc/N0mjKDWL/alex-javascript.png"></div>
                <div><img class="icons-postman" src="https://i.postimg.cc/Hn3DLcD2/postman.png"></div>
                <div><img class="icons-spring" src="https://i.postimg.cc/h4yjj4Hy/spring-boot.webp"></div>
                <div><img class="icons-sql" src="https://i.postimg.cc/8kh2KZb8/sql.png"></div>
                <div><img class="icons-git" src="https://i.postimg.cc/Nj7LQ8YX/git.png"></div>
                <div><img class="icons-docker" src="https://i.postimg.cc/BvB73nmb/docker.png"></div>
                <div><img class="icons-cypress" src="https://i.postimg.cc/PJDT2DMW/cypress.png"></div>
                <div class="profile-image">
                    <img src="https://i.postimg.cc/cJqK6kPK/alexholo.jpg" alt="Alexsandro Almeida">
                </div>
                <div class="profile-info">
                    <h3>Alexsandro Almeida<br>45 anos<br>Analista Desenvolvimento de Sistemas</h3>
                </div>
            </div>
        `;
    }
    else if (id === "projetos") {
        content.innerHTML = `
        <h2>My projects</h2>
            <div class="projects-list">
                <div class="project-item" data-project="calculadora">
                    <h3 class="project-title">Calculadora Básica</h3>
                    <div class="project-content">
                        <iframe src="/projects/calculadora.html"></iframe>
                    </div>
                </div>

                <div class="project-item" data-project="crud">
                    <h3 class="project-title">CRUD</h3>
                    <div class="project-content">
                        <iframe src="/projects/crud.html"></iframe>
                    </div>
                </div>

                <div class="project-item" data-project="todo">
                    <h3 class="project-title">Lista de Tarefas (TO DO LIST)</h3>
                    <div class="project-content">
                        <iframe src="/projects/todo.html"></iframe>
                    </div>
                </div>

                <div class="project-item" data-project="snake">
                    <h3 class="project-title">Jogo Snake</h3>
                    <div class="project-content">
                        <iframe src="/projects/snake.html"></iframe>
                    </div>
                </div>

                <div class="project-item" data-project="password">
                    <h3 class="project-title">Gerador de Senhas</h3>
                    <div class="project-content">
                        <iframe src="/projects/password.html"></iframe>
                    </div>
                </div>
            </div>`;

        const projectItems = content.querySelectorAll(".project-item");
        projectItems.forEach(item => {
            const title = item.querySelector(".project-title");
            const contentDiv = item.querySelector(".project-content");
            contentDiv.style.display = "none";

            title.addEventListener("click", () => {
                const isVisible = contentDiv.style.display === "block";
                contentDiv.style.display = isVisible ? "none" : "block";
            });
        });
    } else {
        // Conteúdo padrão para os outros arquivos
        content.innerHTML = `<h2>${title}</h2><p>Conteúdo simulado para o arquivo <strong>${title}</strong>.</p>`;
    }

    openTabs[id] = { tab, content };
    setActiveTab(id);
}


function setActiveTab(id) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tabsContainer.querySelector(`[data-id="${id}"]`).classList.add("active");

    contentContainer.innerHTML = "";
    contentContainer.appendChild(openTabs[id].content);
}

function closeTab(id, event) {
    event.stopPropagation();
    const { tab } = openTabs[id];
    tab.remove();
    delete openTabs[id];

    if (!Object.keys(openTabs).length) {
        contentContainer.innerHTML = "<h2>Bem-vindo ao meu Portfólio!</h2><p>Selecione um arquivo no menu lateral para abrir.</p>";
    } else {
        const lastId = Object.keys(openTabs)[Object.keys(openTabs).length - 1];
        setActiveTab(lastId);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    openPage("index", "index.html");
});

document.getElementById("content").addEventListener("click", (e) => {
    le
    const title = e.target.closest(".project-title");
    if (!title) return; // não é clique em título de projeto, ignora

    const projectItem = title.closest(".project-item");
    if (!projectItem) return;

    const projectContent = projectItem.querySelector(".project-content");
    if (!projectContent) return;

    const isOpen = projectItem.classList.contains("open");
    if (isOpen) {
        projectItem.classList.remove("open");
        projectContent.style.maxHeight = null; // fecha
    } else {
        projectItem.classList.add("open");
        projectContent.style.maxHeight = projectContent.scrollHeight + "px"; // abre
    }
});

