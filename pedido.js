class Pedido {
    constructor() {
        this.itens = [];
        this.status = 'Pendente';
        this.taxaEntrega = 5.00;
        this.desconto = 0.0;
    }

    adicionarItem(nome, preco, quantidade) {
        if (!nome) {
            throw new Error('Nome do item é obrigatório.');
        }
        if (!preco || preco <= 0) {
            throw new Error('Preço do item deve ser maior que zero.');
        }
        if (!quantidade || quantidade <= 0) {
            throw new Error('Quantidade do item deve ser maior que zero.');
        }
        this.itens.push({ nome, preco, quantidade });
    }

    calcularTotal() {
        const subtotal = this.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
        const desconto = subtotal * (this.desconto / 100);
        return subtotal - desconto + this.taxaEntrega;
    }

    aplicarDesconto(codigoPromocional) {
        const descontos = {
            'PROMO10': 10,
            'PROMO20': 20
        };
        if (!descontos[codigoPromocional]) {
            throw new Error('Código promocional inválido.');
        }
        this.desconto = descontos[codigoPromocional];
    }

    confirmar() {
        if (this.itens.length === 0) {
            throw new Error('Não é possível confirmar um pedido vazio.');
        }
        this.status = 'Confirmado';
    }

    cancelar() {
        this.status = 'Cancelado';
    }
}

module.exports = Pedido;