// Conteúdo de crud-js.txt

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editingId = null;

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function renderContacts() {
    const contactsList = document.getElementById('contactsList');

    if (contacts.length === 0) {
        contactsList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📭</div>
                        <p>Nenhum contato cadastrado ainda.</p>
                        <p>Adicione seu primeiro contato acima!</p>
                    </div>
                `;
        document.querySelector('.btn-add').style.display = 'block';
        return;
    }

    contactsList.innerHTML = contacts.map((contact, index) => `
                <div class="contact-card">
                    <div class="contact-info">
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-email">📧 ${contact.email}</div>
                        <div class="contact-phone">📱 ${contact.phone}</div>
                    </div>
                    <div class="contact-actions">
                        <button class="btn-edit" onclick="editContact(${index})">✏️ Editar</button>
                        <button class="btn-delete" onclick="deleteContact(${index})">🗑️ Excluir</button>
                    </div>
                </div>
            `).join('');
}

function addContact() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }

    contacts.push({ name, email, phone });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    clearForm();
    renderContacts();
}

function editContact(index) {
    const contact = contacts[index];
    editingId = index;
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;

    document.querySelector('.btn-add').style.display = 'none';
    document.querySelector('.btn-update').style.display = 'block';
    document.querySelector('.btn-cancel').style.display = 'block';
}

function updateContact() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }

    contacts[editingId] = { name, email, phone };
    localStorage.setItem('contacts', JSON.stringify(contacts));

    cancelEdit();
    renderContacts();
}

function deleteContact(index) {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
    }
}

function cancelEdit() {
    editingId = null;
    clearForm();
    document.querySelector('.btn-add').style.display = 'block';
    document.querySelector('.btn-update').style.display = 'none';
    document.querySelector('.btn-cancel').style.display = 'none';
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

// Inicializa a renderização dos contatos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
    document.querySelector('.btn-update').style.display = 'none';
    document.querySelector('.btn-cancel').style.display = 'none';
});