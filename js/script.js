
const ul = document.querySelector("ul");
const random = (min, max) => Math.random() * (max - min) + min;
const randomColors = ["#8400ff", "#2bff00", "#eaff00"];

for (let i = 0; i < 50; i++) {
    const li = document.createElement("li");
    const size = Math.floor(random(50, 120));
    const position = random(1, 94);
    const delay = random(1, 5);
    const duration = random(10, 40);

    li.style.width = `${size}px`;
    li.style.height = `${size}px`;
    li.style.background = randomColors[Math.floor(random(0, 3))];
    li.style.left = `${position}%`;
    li.style.animationDelay = `${delay}s`;
    li.style.animationDuration = `${duration}s`;
    li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

    ul.appendChild(li);
}


document.getElementById('formularioCadastro').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Pega os valores dos campos de entrada
    const usuario = document.getElementById('usuarioCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;
    
    const userData = {
        usuario: usuario,
        email: email,
        senha: senha
    };
    
    try {
        const response = await fetch('http://localhost/Cypher_Tech/src/php/apiUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        
        if (result.status === 1) {
            alert('Usuário cadastrado com sucesso!');
            document.getElementById('formularioCadastro').reset();
        } else {
            alert('Falha ao cadastrar usuário: ' + result.status_message);
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário: ' + error.message);
    }
});


document.getElementById('formularioLogin').addEventListener('submit', async function(event) {
event.preventDefault(); 

// Validação Pega os valores dos campos de entrada
const usuario = document.getElementById('usuarioLogin').value;
const senha = document.getElementById('senhaLogin').value;

const loginData = {
    usuario: usuario,
    senha: senha
};

try {
    const response = await fetch('http://localhost/Cypher_Tech/src/php/apiLogin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    const result = await response.json();

    if (response.ok && result.status === 1) {
        alert('Login bem-sucedido!');
        // Redirecionar para a página produtos.html após o login bem-sucedido
        window.location.href = 'produtos.html';
    } else {
        alert('Falha no login usuário ou senha incorretos');
    }
} catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Erro ao fazer login: ' + error.message);
}
});