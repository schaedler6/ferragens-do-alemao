document.addEventListener('DOMContentLoaded', function () {
    const botoesComprar = document.querySelectorAll('.btn.comprar');

    botoesComprar.forEach(botao => {
        botao.addEventListener('click', function () {
            alert('Produto adicionado ao carrinho!');
        });
    });
});
