# language: pt

@allure.label.parentSuite:Compra
Funcionalidade: Realizar compra de 3 produtos
  Como usuário registrado da Automation Test Store
  Quero adicionar 3 produtos ao carrinho
  E finalizar minha compra

  Contexto:
    Dado que acesso a home page da loja

  @compra @smoke
  Esquema do Cenário: Adicionar 3 produtos e checkout
    Dado que realizo cadastro com o cliente <clienteId>
    Quando adiciono os 3 primeiros produtos da página
    E acesso o carrinho para validar os produtos
    Então devo ver os 3 produtos adicionados no carrinho
    E clico em checkout para iniciar a finalização da compra

    Exemplos:
      | clienteId |
      | 1         |
      | 2         |
      | 3         |
