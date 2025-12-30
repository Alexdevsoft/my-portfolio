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
            <h3>Portfólio ainda em desenvolvimento</h3>
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
    }
    else if (id === "sobre") {
        content.innerHTML = `
<pre style="color: #dcdcaa; font-family: Consolas, monospace; font-size: 14px;">
{
  <span style="color:#9cdcfe;">"nome"</span>: <span style="color:#ce9178;">"Alexsandro Almeida"</span>,
  <span style="color:#9cdcfe;">"idade"</span>: <span style="color:#b5cea8;">45</span>,
  <span style="color:#9cdcfe;">"profissão"</span>: <span style="color:#ce9178;">"Analista e Desenvolvedor de Sistemas"</span>,
  <span style="color:#9cdcfe;">"resumo"</span>: <span style="color:#ce9178;">"Sou desenvolvedor fullstack e analista de qualidade de software, com mais de 2 anos de experiência em Java, React, Spring Boot e automação de testes."</span>,
  <span style="color:#9cdcfe;">"skills"</span>: [<span style="color:#ce9178;">"Java"</span>, <span style="color:#ce9178;">"Spring Boot"</span>, <span style="color:#ce9178;">"JavaScript"</span>, <span style="color:#ce9178;">"React"</span>, <span style="color:#ce9178;">"Selenium"</span>, <span style="color:#ce9178;">"MySQL"</span>, <span style="color:#ce9178;">"Docker"</span>],
  <span style="color:#9cdcfe;">"softSkills"</span>: [<span style="color:#ce9178;">"Comunicação"</span>, <span style="color:#ce9178;">"Trabalho em equipe"</span>, <span style="color:#ce9178;">"Aprendizado contínuo"</span>],
  <span style="color:#9cdcfe;">"localização"</span>: <span style="color:#ce9178;">"Brasil"</span>,
  <span style="color:#9cdcfe;">"hobbies"</span>: [<span style="color:#ce9178;">"Escrever livros"</span>, <span style="color:#ce9178;">"Viajar"</span>, <span style="color:#ce9178;">"Cinema"</span>, <span style="color:#ce9178;">"Tecnologia"</span>],
  <span style="color:#9cdcfe;">"linkedin"</span>: <span style="color:#ce9178;">"http://www.linkedin.com/in/alexsandro-j-a-almeida"</span>,
  <span style="color:#9cdcfe;">"github"</span>: <span style="color:#ce9178;">"https://github.com/Alexdevsoft"</span>
}
</pre>
<p style="color:#6a9955;">// Criado por Alexsandro Almeida - Analista Desenvolvimento de Sistemas</p>

    `;
    }
    else if (id === "experiencias") {
        content.innerHTML = `
            <style>
                .exp-container { font-family: 'Segoe UI', sans-serif; max-width: 800px; }
                .exp-item {
                    border-left: 2px solid #3c3c3c;
                    padding-left: 20px;
                    margin-bottom: 30px;
                    position: relative;
                }
                .exp-item::before {
                    content: '';
                    position: absolute;
                    left: -6px;
                    top: 0;
                    width: 10px;
                    height: 10px;
                    background: #007acc;
                    border-radius: 50%;
                }
                .exp-header { margin-bottom: 10px; }
                .exp-company { color: #4ec9b0; font-weight: bold; font-size: 1.1em; }
                .exp-role { color: #dcdcaa; font-weight: bold; }
                .exp-date { color: #569cd6; font-size: 0.9em; font-family: Consolas, monospace; }
                .exp-desc ul { margin: 0; padding-left: 20px; }
                .exp-desc li { color: #cccccc; margin-bottom: 5px; list-style-type: disc; }
            </style>
            <h2>Experiência Profissional</h2>
            <div class="exp-container">
                <div class="exp-item">
                    <div class="exp-header">
                        <span class="exp-company">Serasa Experian</span> | <span class="exp-role">Analista e Desenvolvedor de Software</span>
                        <br>
                        <span class="exp-date">const period = "Jan 2023 – Mai 2024";</span>
                    </div>
                    <div class="exp-desc">
                        <ul>
                            <li>Desenvolvi e mantive scripts de automação de testes para portais de varejo de alto tráfego, garantindo a confiabilidade das entregas.</li>
                            <li>Atuei na sustentação de sistemas, diagnosticando e corrigindo bugs complexos em aplicações Java e JavaScript, impactando diretamente a experiência do usuário final.</li>
                            <li>Elaborei documentação técnica detalhada e roteiros de testes funcionais, facilitando o onboarding de novos membros e a manutenção futura.</li>
                            <li>Colaborei em rituais ágeis (Scrum), garantindo entregas pontuais e alinhadas aos requisitos de negócio.</li>
                        </ul>
                    </div>
                </div>

                <div class="exp-item">
                    <div class="exp-header">
                        <span class="exp-company">Casa O Toureiro (Supermercado)</span> | <span class="exp-role">Desenvolvedor Full Stack Júnior</span>
                        <br>
                        <span class="exp-date">const period = "Fev 2020 – Abr 2021";</span>
                    </div>
                    <div class="exp-desc">
                        <ul>
                            <li>Atuei na manutenção crítica dos sistemas de fluxo de caixa e PDV (Supermercados e Farmácias), utilizando Java para backend e garantindo a integridade das transações financeiras.</li>
                            <li>Projetei e implementei módulos web institucionais (Página de Currículos/Trabalhe Conosco) para o site da empresa.</li>
                            <li>Realizei a modelagem e configuração de bancos de dados relacionais e não-relacionais para suportar novas funcionalidades do sistema interno.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    else if (id === "contato") {
        content.innerHTML = `
            <style>
                .contact-form { max-width: 500px; display: flex; flex-direction: column; gap: 15px; }
                .contact-input {
                    background-color: #3c3c3c;
                    border: 1px solid #252526;
                    color: #fff;
                    padding: 10px;
                    font-family: Consolas, monospace;
                    outline: none;
                }
                .contact-input:focus { border-color: #007acc; }
                .contact-btn {
                    background-color: #0e639c;
                    color: white;
                    border: none;
                    padding: 10px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .contact-btn:hover { background-color: #1177bb; }
                .social-links a { color: #4ec9b0; text-decoration: none; margin-right: 15px; font-size: 1.1em; }
                .social-links a:hover { text-decoration: underline; color: #9cdcfe; }
            </style>
            <h2>Contato</h2>
            <p style="color: #6a9955;">// Envie uma mensagem ou conecte-se comigo</p>
            
            <div class="social-links">
                <a href="https://linkedin.com/in/alexsandro-j-a-almeida" target="_blank">LinkedIn</a>
                <a href="https://github.com/Alexdevsoft" target="_blank">GitHub</a>
                <a href="mailto:alexhavilla2022@gmail.com">Email</a>
            </div>
            <br>

            <form class="contact-form" onsubmit="event.preventDefault(); alert('Mensagem simulada enviada!');">
                <input class="contact-input" type="text" placeholder="const nome = 'Seu Nome';" required>
                <input class="contact-input" type="email" placeholder="const email = 'seu@email.com';" required>
                <textarea class="contact-input" rows="5" placeholder="// Digite sua mensagem aqui..." required></textarea>
                <button class="contact-btn" type="submit">Enviar Mensagem.execute()</button>
            </form>
        `;
    }

    else {
        content.innerHTML = `<style>
                /* Estilos exclusivos para a aba de Habilidades */
                .skills-section h3 {
                    color: #9cdcfe; /* Cor azul clara estilo VS Code */
                    margin-top: 20px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #3c3c3c;
                    padding-bottom: 5px;
                }
                .skills-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                .skill-card {
                    background-color: #252526;
                    border: 1px solid #3c3c3c;
                    padding: 10px;
                    border-radius: 5px;
                    text-align: center;
                    width: 80px;
                    transition: transform 0.2s;
                }
                .skill-card:hover {
                    transform: scale(1.05);
                    background-color: #2a2d2e;
                    border-color: #007acc;
                }
                .skill-card img {
                    width: 40px;
                    height: 40px;
                    object-fit: contain;
                    margin-bottom: 5px;
                }
                .skill-card span {
                    display: block;
                    font-size: 12px;
                    color: #cccccc;
                }
            </style>
        <<h2>${title}</h2>
            
            <div class="skills-section">
                <h3>Back-end & Banco de Dados</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/4N6P1RV1/alex-java.png" alt="Java">
                        <span>Java</span>
                    </div>
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/h4yjj4Hy/spring-boot.webp" alt="Spring">
                        <span>Spring</span>
                    </div>
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/8kh2KZb8/sql.png" alt="SQL">
                        <span>SQL</span>
                    </div>
                    </div>

                <h3>Front-end</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/R0Nwyk6y/alex-react.png" alt="React">
                        <span>React</span>
                    </div>
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/N0mjKDWL/alex-javascript.png" alt="JavaScript">
                        <span>JavaScript</span>
                    </div>
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/Twn5XfR7/alex-html.png" alt="HTML5">
                        <span>HTML5</span>
                    </div>
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/wv5MG2Vn/alex-css.png" alt="CSS3">
                        <span>CSS3</span>
                    </div>
                </div>

                <h3>QA & Testes</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/PJDT2DMW/cypress.png" alt="Cypress">
                        <span>Cypress</span>
                    </div>
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/Hn3DLcD2/postman.png" alt="Postman">
                        <span>Postman</span>
                    </div>
                    </div>

                <h3>DevOps & Ferramentas</h3>
                <div class="skills-grid">
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/Nj7LQ8YX/git.png" alt="Git">
                        <span>Git</span>
                    </div>
                    <div class="skill-card">
                        <img src="https://i.postimg.cc/BvB73nmb/docker.png" alt="Docker">
                        <span>Docker</span>
                    </div>
                </div>
            </div>`;
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

    const title = e.target.closest(".project-title");
    if (!title) return;

    const projectItem = title.closest(".project-item");
    if (!projectItem) return;

    const projectContent = projectItem.querySelector(".project-content");
    if (!projectContent) return;

    const isOpen = projectItem.classList.contains("open");
    if (isOpen) {
        projectItem.classList.remove("open");
        projectContent.style.maxHeight = null;
    } else {
        projectItem.classList.add("open");
        projectContent.style.maxHeight = projectContent.scrollHeight + "px";
    }
});

