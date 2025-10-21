# Frontend - Sistema de Gestão de Funcionários

Este é frontend do Sistema de Gestão de Funcionários, desenvolvido em Angular 19.

## 1. Dependências Principais

O projeto utiliza os seguintes módulos e conceitos principais do Angular:

* **Angular HttpClient:** Para o consumo da API REST do backend via `HttpClient`.
* **Angular Forms (Reactive):** Para a criação de formulários reativos (`FormGroup`) com validações (Requisito 5.2.2).
* **Angular Router:** Para a navegação entre as telas de listagem (`/funcionarios`) e formulário (`/funcionarios/novo`).
* **Angular Signals:** Para gerenciamento de estado reativo nos componentes (ex: `isLoading`, `funcionarios()`).
* **Angular Common:** Para diretivas estruturais (`@if`, `@for`) e pipes (`CurrencyPipe`).

## 2. Portas e Caminhos Utilizados

* **Porta da Aplicação (Frontend):** `http://localhost:4200` (Porta padrão do Angular CLI).
* **Porta do Backend (Consumida):** `http://localhost:8080` (O backend **deve** estar em execução para que o frontend funcione).

## 3. Passos para Execução

1.  Certifique-se de que o **Backend** esteja em execução na porta `http://localhost:8080`.
2.  Abra um terminal na raiz deste projeto frontend.
3.  Instale as dependências do Node.js (caso seja a primeira vez):
    ```bash
    npm install
    ```
4.  Execute o servidor de desenvolvimento do Angular:
    ```bash
    ng serve
    ```
5.  Acesse a aplicação no seu navegador em `http://localhost:4200`.

## 4. Link de Acesso ao Swagger UI (API)

Toda a documentação da API REST (que este frontend consome) está disponível no Swagger UI do backend. É essencial consultá-la para entender os contratos de dados.

**Acesse em:** [**http://localhost:8080/swagger-ui.html**](http://localhost:8080/swagger-ui.html)

## 5. Endpoints da API Consumidos

Abaixo estão os principais endpoints do backend que este frontend utiliza.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/funcionarios` | Lista todos os funcionários (com filtros opcionais). |
| `POST` | `/api/funcionarios` | Cadastra um novo funcionário (ou reativa um inativo). |
| `GET` | `/api/funcionarios/{id}` | Busca um funcionário específico pelo ID. |
| `PUT` | `/api/funcionarios/{id}` | Atualiza os dados de um funcionário ativo. |
| `PATCH` | `/api/funcionarios/{id}/inativar` | Inativa um funcionário (altera `ativo` para `false`). |
