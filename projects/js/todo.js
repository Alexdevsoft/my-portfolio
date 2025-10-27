// Conteúdo de todo-js.txt

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function updateStats() {
    const total = tasks.length;
    const pending = tasks.filter(task => !task.completed).length;
    const completed = total - pending;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('completedTasks').textContent = completed;
}

function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (tasks.length === 0) {
        tasksList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📝</div>
                        <p>Nenhuma tarefa adicionada ainda.</p>
                        <p>Adicione sua primeira tarefa acima!</p>
                    </div>
                `;
        clearAllBtn.style.display = 'none';
    } else if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <p>Nenhuma tarefa encontrada neste filtro.</p>
                    </div>
                `;
        clearAllBtn.style.display = 'block';
    } else {
        tasksList.innerHTML = filteredTasks.map((task, index) => {
            const originalIndex = tasks.indexOf(task);
            return `
                        <div class="task-item ${task.completed ? 'completed' : ''}">
                            <input 
                                type="checkbox" 
                                class="task-checkbox" 
                                ${task.completed ? 'checked' : ''} 
                                onclick="toggleTask(${originalIndex})"
                            >
                            <span class="task-text">${task.text}</span>
                            <div class="task-actions">
                                <button class="btn-delete" onclick="deleteTask(${originalIndex})">🗑️</button>
                            </div>
                        </div>
                    `;
        }).join('');
        clearAllBtn.style.display = 'block';
    }

    updateStats();
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (!text) {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    tasks.push({
        text: text,
        completed: false,
        id: Date.now()
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function filterTasks(filter) {
    currentFilter = filter;

    // Remove a classe 'active' de todos os botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Adiciona a classe 'active' ao botão clicado
    // Verifica se o evento está disponível ou se o botão foi acionado via código
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Fallback para quando o filtro é setado via código
        document.querySelector(`.filter-btn[onclick="filterTasks('${filter}')"]`).classList.add('active');
    }

    renderTasks();
}

function clearAllTasks() {
    if (confirm('Tem certeza que deseja excluir TODAS as tarefas?')) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Inicializa a renderização e o filtro
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o botão 'Todas' esteja ativo na inicialização
    document.querySelector('.filter-btn.active') || document.querySelector('.filter-btn[onclick="filterTasks(\'all\')"]').classList.add('active');
    renderTasks();
});