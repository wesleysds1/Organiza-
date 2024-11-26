document.addEventListener("DOMContentLoaded", () => {
    setupEditProductPage();
    setupDeleteProductButton();
});

// Configuração inicial da página de edição do produto
function setupEditProductPage() {
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("unit_price");
    const totalValueInput = document.getElementById("total_price");

    if (quantityInput && priceInput && totalValueInput) {
        console.log("Campos encontrados. Registrando eventos...");
        quantityInput.addEventListener("input", updateTotal);
        priceInput.addEventListener("input", updateTotal);

        // Aplica formatação de moeda no campo de preço ao carregar
        priceInput.value = formatCurrency(parseFloat(priceInput.value.replace(/\D/g, "")) / 100 || 0);
        updateTotal(); // Atualiza o valor total inicialmente
    } else {
        console.error("Campos necessários não encontrados na página.");
    }
}

// Função para formatar valores como moeda brasileira (R$)
function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

// Atualiza o valor total automaticamente
function updateTotal() {
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("unit_price");
    const totalValueInput = document.getElementById("total_price");

    const quantity = parseFloat(quantityInput.value) || 0;
    const unitPrice = parseFloat(priceInput.value.replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
    const totalPrice = quantity * unitPrice;

    // Atualiza o campo de valor total formatado
    totalValueInput.value = formatCurrency(totalPrice);
}

// Adiciona validação e formatação ao campo de preço
document.getElementById("unit_price").addEventListener("blur", (event) => {
    const input = event.target;
    const value = parseFloat(input.value.replace(/\D/g, "")) / 100 || 0;
    input.value = formatCurrency(value);
});

function setupDeleteProductButton() {
    const deleteButton = document.getElementById("delete-product-btn");
    const deleteForm = document.getElementById("delete-product-form");

    if (deleteButton && deleteForm) {
        console.log("Botão e formulário de exclusão encontrados."); // Depuração
        deleteButton.addEventListener("click", () => {
            const confirmation = confirm("Tem certeza de que deseja excluir este produto?");
            if (confirmation) {
                console.log("Confirmação recebida. Submetendo o formulário."); // Depuração
                deleteForm.submit();
            } else {
                console.log("Ação de exclusão cancelada."); // Depuração
            }
        });
    } else {
        console.error("Botão ou formulário de exclusão não encontrado.");
    }
}
