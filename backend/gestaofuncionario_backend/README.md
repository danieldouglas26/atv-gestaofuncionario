# Backend - Sistema de Gestão de Funcionários 

Este é o backend do Sistema de Gestão de Funcionários, desenvolvido em Java 21 com Spring Boot 3.

## 1. Dependências Principais

O projeto utiliza as seguintes dependências obrigatórias do Spring Boot:

* **Spring Web:** Para a criação de controladores REST.
* **Spring Data JPA:** Para persistência de dados e comunicação com o banco.
* **Spring Validation:** Para validação dos dados de entrada (DTOs).
* **H2 Database (em arquivo):** Banco de dados SQL utilizado para desenvolvimento e persistência real.
* **Springdoc OpenAPI (Swagger UI):** Para documentação automática da API REST.

## 2. Portas e Caminhos Utilizados

* **Porta da Aplicação:** `http://localhost:8080`
* **Console H2 (Banco de Dados):** `http://localhost:8080/h2-console`
    * **JDBC URL (para login):** `jdbc:h2:file:./data/db-api`
    * **Usuário:** `sa`
    * **Senha:** (em branco)
* **Documentação Swagger UI:** `http://localhost:8080/swagger-ui.html`
* **Documentação OpenAPI (JSON):** `http://localhost:8080/api-docs`

## 3. Passos para Execução

Existem duas formas principais de executar o backend:

### Opção 1: Via Maven (Recomendado)

1.  Abra um terminal na raiz do projeto (`gestaofuncionario_backend`).
2.  Execute o comando Maven para iniciar o Spring Boot:
    ```bash
    mvn spring-boot:run
    ```

### Opção 2: Via IDE (Ex: IntelliJ ou VS Code)

1.  Abra o projeto na sua IDE de preferência.
2.  Localize a classe principal: `src/main/java/com/fatesg/csoftware/gestaofuncionario/GestaofuncionarioApplication.java`.
3.  Execute o método `main()` desta classe (normalmente clicando com o botão direito e "Run" ou "Debug").

A aplicação estará disponível em `http://localhost:8080` após a inicialização.

## 4. Link de Acesso ao Swagger UI

Toda a documentação da API, incluindo todos os endpoints, modelos de dados e regras de negócio, está disponível e pode ser testada interativamente através do Swagger UI.

**Acesse em:** [**http://localhost:8080/swagger-ui.html**](http://localhost:8080/swagger-ui.html)

## 5. Endpoints da API

Abaixo estão os principais endpoints definidos pela API.

### 5.1 Endpoints de Funcionários

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/funcionarios` | Lista todos os funcionários (com filtros opcionais). |
| `POST` | `/api/funcionarios` | Cadastra um novo funcionário (ou reativa um inativo). |
| `GET` | `/api/funcionarios/{id}` | Busca um funcionário específico pelo ID. |
| `PUT` | `/api/funcionarios/{id}` | Atualiza os dados de um funcionário ativo. |
| `PATCH` | `/api/funcionarios/{id}/inativar` | Inativa um funcionário (altera `ativo` para `false`). |

### 5.2 Endpoints de Departamentos

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/departamentos` | Lista todos os departamentos. |
| `GET` | `/api/departamentos/ativos` | Lista apenas os departamentos ativos. |
| `POST` | `/api/departamentos` | Cria um novo departamento. |
| `GET` | `/api/departamentos/{id}` | Busca um departamento específico pelo ID. |
| `PUT` | `/api/departamentos/{id}` | Atualiza os dados (nome e sigla) de um departamento. |
| `PATCH` | `/api/departamentos/{id}/inativar` | Inativa um departamento (altera `ativo` para `false`). |
