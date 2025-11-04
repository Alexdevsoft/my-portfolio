const tabsContainer = document.getElementById("tabs");
const contentContainer = document.getElementById("content");
let openTabs = {};

// abre/fecha pasta
function toggleFolder(folder) {
    folder.classList.toggle("open");
    const icon = folder.querySelector(".folder-icon");
    icon.textContent = folder.classList.contains("open") ? "📂" : "📁";
}

// abre arquivo
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
    content.innerHTML = `<h2>${title}</h2><p>Conteúdo simulado para o arquivo <strong>${title}</strong>.</p>`;
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
        contentContainer.innerHTML = "<h2>Bem-vindo ao seu Portfólio!</h2><p>Selecione um arquivo no menu lateral para abrir.</p>";
    } else {
        const lastId = Object.keys(openTabs)[Object.keys(openTabs).length - 1];
        setActiveTab(lastId);
    }
}
