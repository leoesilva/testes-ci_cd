const assert = require("assert");
const Pedido = require("../pedido");

describe("Sistema de Pedidos", function () {
    let pedido;

    this.beforeEach(function () {
        pedido = new Pedido();
    });

    it("Deve adicionar itens ao pedido", function () {
        pedido.adicionarItem("Hambúrger", 10.5, 2);
        pedido.adicionarItem("Fritas M", 5, 1);
        assert.strictEqual(pedido.itens.length, 2);
    })

    it("Deve calcular o total do pedido corretamente", function () {
        pedido.adicionarItem("Hambúrger", 10.5, 2);
        pedido.adicionarItem("Fritas M", 5, 1);
        const total = pedido.calcularTotal();
        assert.strictEqual(total, 31.0);
    })

    it("Deve aplicar desconto corretamente", function () {
        pedido.adicionarItem("Hambúrger", 10.5, 2);
        pedido.adicionarItem("Fritas M", 5, 1);
        pedido.aplicarDesconto("PROMO10");
        const total = pedido.calcularTotal();
        assert.strictEqual(total, 28.4);
    })

    it("Deve confirmar o pedido", function () {
        pedido.adicionarItem("Hambúrger", 10.5, 2);
        pedido.confirmar();
        assert.strictEqual(pedido.status, "Confirmado");
    })

    it("Deve cancelar o pedido", function () {
        pedido.adicionarItem("Hambúrger", 10.5, 2);
        pedido.cancelar();
        assert.strictEqual(pedido.status, "Cancelado");
    })

    it("Deve lançar erro ao adicionar item sem nome", function () {
        assert.throws(() => {
            pedido.adicionarItem("", 10.5, 2);
        }, /Nome do item é obrigatório./);
    })

    it("Deve lançar erro ao adicionar item com preço inválido", function () {
        assert.throws(() => {
            pedido.adicionarItem("Hambúrger", -10.5, 2);
        }, /Preço do item deve ser maior que zero./);
    })

    it("Deve lançar erro ao adicionar item com quantidade inválida", function () {
        assert.throws(() => {
            pedido.adicionarItem("Hambúrger", 10.5, -2);
        }, /Quantidade do item deve ser maior que zero./);
    })

    it("Deve lançar erro ao aplicar código promocional inválido", function () {
        assert.throws(() => {
            pedido.aplicarDesconto("INVALIDO");
        }, /Código promocional inválido./);
    })

})