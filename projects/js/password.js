// Conteúdo de password-js.txt

let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];

const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function updateLength() {
    const value = document.getElementById('lengthSlider').value;
    document.getElementById('lengthValue').textContent = value;
}

function generatePassword() {
    const length = parseInt(document.getElementById('lengthSlider').value);
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
        alert('Por favor, selecione pelo menos um tipo de caractere!');
        return;
    }

    let chars = '';
    if (useUppercase) chars += charset.uppercase;
    if (useLowercase) chars += charset.lowercase;
    if (useNumbers) chars += charset.numbers;
    if (useSymbols) chars += charset.symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('passwordOutput').textContent = password;
    updateStrength(password);
    addToHistory(password);
}

function updateStrength(password) {
    let strength = 0;
    const length = password.length;

    if (length >= 8) strength++;
    if (length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()]/.test(password)) strength++;

    let strengthText = 'Muito Fraca';
    let color = '#dc3545'; // Red
    let width = 10;

    if (strength >= 2) {
        strengthText = 'Fraca';
        color = '#ffc107'; // Yellow
        width = 30;
    }
    if (strength >= 4) {
        strengthText = 'Média';
        color = '#28a745'; // Green
        width = 60;
    }
    if (strength >= 6) {
        strengthText = 'Forte';
        color = '#17a2b8'; // Blue
        width = 100;
    }

    document.getElementById('strengthText').textContent = strengthText;
    const fill = document.getElementById('strengthFill');
    fill.style.width = width + '%';
    fill.style.backgroundColor = color;
}

function copyPassword() {
    const password = document.getElementById('passwordOutput').textContent;
    if (password === 'Clique em Gerar Senha' || password === 'Nenhuma Senha Gerada') {
        alert('Nenhuma senha para copiar!');
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.textContent;
        btn.textContent = '✅ Copiado!';

        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

function addToHistory(password) {
    passwordHistory.unshift(password);
    if (passwordHistory.length > 10) {
        passwordHistory = passwordHistory.slice(0, 10);
    }
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');

    if (passwordHistory.length === 0) {
        historyList.innerHTML = '<div class="history-empty">Nenhuma senha gerada ainda</div>';
        return;
    }

    historyList.innerHTML = passwordHistory.map(password => `
                <div class="history-item">
                    <span>${password}</span>
                    <button class="btn-copy" onclick="copyHistoryPassword('${password}')">📋</button>
                </div>
            `).join('');
}

function copyHistoryPassword(password) {
    navigator.clipboard.writeText(password).then(() => {
        alert('Senha copiada!');
    });
}

function clearHistory() {
    if (confirm('Tem certeza que deseja limpar o histórico?')) {
        passwordHistory = [];
        localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
        renderHistory();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateLength();
    renderHistory();
});