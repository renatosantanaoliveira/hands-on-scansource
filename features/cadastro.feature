# language: pt

@allure.label.parentSuite:Cadastro
Funcionalidade: Cadastro de novos usuários
  Como usuário da Automation Test Store
  Quero realizar meu cadastro
  Para poder realizar compras na plataforma

  Contexto:
    Dado que acesso a home page da loja

  @features/cadastro.feature @smoke
  Esquema do Cenário: Realizar cadastro com sucesso
    Quando clico em "Login or register"
    E seleciono para registro de um novo cliente
    E preencho os dados obrigatórios do cliente <clienteId>
    E aceito os termos e condições
    E submeto o formulário de cadastro
    Então o cadastro deve ser realizado com sucesso

    Exemplos:
      | clienteId |
      | 1         |
      | 2         |
      | 3         |
