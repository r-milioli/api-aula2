document.getElementById('clienteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    if (nome === '' || cpf === '') {
        alert('Preencha todos os campos!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3002/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, cpf })
        });

        if (response.ok) {
            mostrarMensagem('Dados enviados com sucesso!', 'success');
            document.getElementById('clienteForm').reset();
            carregarClientes();
        } else {
            const errorData = await response.json();
            mostrarMensagem('Erro: ' + errorData.erro, 'error');
        }
    } catch (erro) {
        console.error('Erro ao enviar dados:', erro);
        mostrarMensagem('Erro ao enviar dados. Tente novamente.', 'error');
    }
});

// Função para carregar clientes na tabela
        async function carregarClientes() {
            try {
                const response = await fetch('http://localhost:3002/cliente');
                const clientes = await response.json();
                
                const tbody = document.getElementById('clientesTableBody');
                tbody.innerHTML = '';
                
                clientes.forEach(cliente => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${cliente.id}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.cpf}</td>
                        <td class="actions">
                        <button class="btn btn-danger" onclick="deletarCliente(${cliente.id})">Excluir</button>
                        <button class="btn btn-warning" onclick="abrirModalEdicao(${cliente.id}, '${cliente.nome}', '${cliente.cpf}')"> Editar </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            } catch (error) {
                console.log('Erro ao carregar clientes:', error);
            }
        }
        
        // Carrega os clientes quando a página carrega
        carregarClientes();


// Função para deletar cliente
async function deletarCliente(id){
    if (confirm('Você tem certeza que deseja excluir este cliente?')){
        try {
            const response = await fetch(`http://localhost:3002/cliente/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                mostrarMensagem('Cliente deletado com sucesso!', 'success');
                carregarClientes();
            } else {
                const errorData = await response.json();
                mostrarMensagem('Erro: ' + errorData.erro, 'error');
            }
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            mostrarMensagem('Erro ao deletar cliente. Tente novamente.', 'error');
        }
    }
}


// Função para mostrar mensagens - VERSÃO MAIS SIMPLES
function mostrarMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById('alertMessage');
    mensagemDiv.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
    
    setTimeout(() => {
        mensagemDiv.innerHTML = '';
    }, 3000);
}


// Função para abrir modal de edição
function abrirModalEdicao(id, nome, cpf) {
    document.getElementById('modalClienteId').value = id;
    document.getElementById('modalNome').value = nome;
    document.getElementById('modalCpf').value = cpf;
    document.getElementById('modalEdicao').style.display = 'block';
}

// Função para fechar modal
function fecharModal() {
    document.getElementById('modalEdicao').style.display = 'none';
    document.getElementById('formEdicao').reset();
}

// Event listener para fechar modal com X
document.querySelector('.close').addEventListener('click', fecharModal);

// Event listener para fechar modal clicando fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modalEdicao');
    if (event.target === modal) {
        fecharModal();
    }
});

// Event listener para o formulário de edição
document.getElementById('formEdicao').addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = document.getElementById('modalClienteId').value;
    const nome = document.getElementById('modalNome').value.trim();
    const cpf = document.getElementById('modalCpf').value.trim();

    if (nome === '' || cpf === '') {
        alert('Preencha todos os campos!');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3002/cliente/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, cpf })
        });

        if (response.ok) {
            mostrarMensagem('Cliente atualizado com sucesso!', 'success');
            fecharModal();
            carregarClientes();
        } else {
            const errorData = await response.json();
            mostrarMensagem('Erro: ' + errorData.erro, 'error');
        }
    } catch (erro) {
        console.error('Erro ao atualizar cliente:', erro);
        mostrarMensagem('Erro ao atualizar cliente. Tente novamente.', 'error');
    }
});
