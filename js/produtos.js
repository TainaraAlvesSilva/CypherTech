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
document.addEventListener('DOMContentLoaded', () => {

    function mostrarPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(function(){
    popup.style.display = "none";
  }, 3000); // 3 segundos
}
    
    const botoesCompra = document.querySelectorAll('.botao');
    
    // Adiciona um event listener de clique a cada botão de compra
    botoesCompra.forEach(botao => {
        botao.addEventListener('click', async (event) => {
            // Evita o comportamento padrão do botão (por exemplo, recarregar a página)
            event.preventDefault();
            
            // Encontra o elemento do produto mais próximo do botão clicado
            const produtoElement = event.target.closest('.produto');
            
            // Extrai os dados do produto e remove espaços e quebras de linha desnecessárias
            const nome = produtoElement.querySelector('.nomeprod').innerText.trim();
            const descricao = produtoElement.querySelector('.paragrafotec1').innerText.trim();
            let preco = produtoElement.querySelector('.preco').innerText.trim();
            
            // Remove os dois primeiros caracteres do preço
            preco = preco.substring(2);
    
            // Cria o objeto com os dados do produto
            const produtoData = {
                nome,
                preco,
                descricao
            };

            try {
                console.log(produtoData);
                // Faz a requisição para o backend
                const response = await fetch('http://localhost/Cypher_Tech/src/php/apiProdutos.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(produtoData)
                });

                // Alerta de sucesso
                mostrarPopup()
            } catch (error) {
                // Exibe erros no console
                console.error('Erro ao adicionar ao carrinho:', error);
                
                // Alerta de erro
                alert(`Erro ao adicionar ao carrinho: ${error.message}`);
            }
        });
    });
});