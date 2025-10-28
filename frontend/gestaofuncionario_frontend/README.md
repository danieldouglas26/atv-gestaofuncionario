# Frontend - Sistema de Gestão de Funcionários

Este é o frontend do Sistema de Gestão de Funcionários, desenvolvido em Angular 19 e estilizado com a biblioteca de componentes PrimeNG.

## 1. Dependências Principais

O projeto utiliza as seguintes dependências e conceitos principais:

* **PrimeNG:** Biblioteca de componentes UI principal para tabelas, formulários, botões, modais e feedback visual.
* **@primeuix/themes:** Tema (Aura) para estilização centralizada do PrimeNG.
* **Angular HttpClient:** Para o consumo da API REST do backend via `HttpClient`.
* **Angular Forms (Reactive):** Para a criação de formulários reativos (`FormGroup`) com validações.
* **Angular Router:** Para a navegação entre as telas de listagem e formulários.

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

### 5.1 Endpoints de Funcionários

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/funcionarios` | Lista todos os funcionários. |
| `POST` | `/api/funcionarios` | Cadastra um novo funcionário (ou reativa um inativo). |
| `GET` | `/api/funcionarios/{id}` | Busca um funcionário específico pelo ID. |
| `PUT` | `/api/funcionarios/{id}` | Atualiza os dados de um funcionário ativo. |
| `PATCH` | `/api/funcionarios/{id}/inativar` | Inativa um funcionário (altera `ativo` para `false`). |

### 5.2 Endpoints de Departamentos

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/departamentos` | Lista todos os departamentos. |
| `GET` | `/api/departamentos/ativos` | Lista apenas os departamentos ativos (usado no Dropdown). |
| `POST` | `/api/departamentos` | Cria um novo departamento. |
| `GET` | `/api/departamentos/{id}` | Busca um departamento específico pelo ID. |
| `PUT` | `/api/departamentos/{id}` | Atualiza os dados de um departamento. |
| `PATCH` | `/api/departamentos/{id}/inativar` | Inativa um departamento (altera `ativo` para `false`). |
