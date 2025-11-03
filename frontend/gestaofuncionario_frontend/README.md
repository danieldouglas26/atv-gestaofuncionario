# Frontend - Sistema de Gestão de Funcionários

Este é o frontend do Sistema de Gestão de Funcionários, desenvolvido em Angular 19 e estilizado com a biblioteca de componentes PrimeNG.

## 1. Dependências Principais

O projeto utiliza as seguintes dependências e conceitos principais:

* **PrimeNG:** Biblioteca de componentes UI principal para tabelas, formulários, botões, modais e feedback visual.
* **@primeuix/themes:** Tema (Aura) para estilização centralizada do PrimeNG.
* **Angular HttpClient:** Para o consumo da API REST do backend via `HttpClient`.
* **Angular Forms (Reactive):** Para a criação de formulários reativos (`FormGroup`) com validações.
* **Angular Router:** Para a navegação entre as telas de listagem e formulários.
* **Angular Guards (CanActivate, CanDeactivate):** Para proteger rotas e prevenir perda de dados.

## 2. Fluxo de Autenticação e Guards

Este projeto implementa um fluxo de autenticação mock (simulado) utilizando `localStorage` e Route Guards do Angular para proteger o acesso às rotas.

### 2.1. Fluxo de Autenticação

1.  **Login**: O usuário acessa a rota `/login` (única rota pública).
2.  **Token**: Ao inserir um e-mail válido e clicar em "Entrar", um token mock e o e-mail são salvos no `localStorage` pelo `AuthService`.
3.  **Redirecionamento**: O usuário é redirecionado para a página `/departamentos` (ou outra rota privada).
4.  **Acesso Protegido**: O Header da aplicação é exibido, pois o usuário agora está autenticado.
5.  **Logout**: Uma função de logout (disponível via `AuthService`) limpa os dados do `localStorage` e redireciona o usuário de volta para `/login`.

### 2.2. Guards Utilizados

O controle de acesso é gerenciado por dois Guards funcionais:

#### `authGuard (CanActivate)`

* **O que faz**: Protege o acesso a rotas privadas.
* **Como funciona**: Ele é ativado *antes* da rota ser carregada. Ele injeta o `AuthService` e verifica se `isAuthenticated()` (ou seja, se existe um token no `localStorage`).
* **Se Autenticado**: Permite o acesso à rota (retorna `true`).
* **Se Não Autenticado**: Bloqueia o acesso e redireciona o usuário para `/login` (retorna `false`).
* **Onde é usado**: Aplicado a todas as rotas de Departamentos e Funcionários (listas e formulários) em `app.routes.ts`.

#### `unsavedChangesGuard (CanDeactivate)`

* **O que faz**: Previne que o usuário saia de um formulário com alterações não salvas.
* **Como funciona**: Ele é ativado *antes* do usuário sair da rota (seja clicando em "Voltar", fechando a aba ou navegando para outro link).
* **Verificação**: O Guard espera que o componente da rota (ex: `FuncionarioFormComponent`) implemente a interface `CanComponentDeactivate` e possua um método `hasUnsavedChanges()`.
* **Sem Alterações**: Se `hasUnsavedChanges()` retornar `false` (ou seja, `form.pristine`), o Guard permite a saída.
* **Com Alterações**: Se `hasUnsavedChanges()` retornar `true` (ou seja, `form.dirty`), o Guard exibe uma caixa de diálogo (`confirm()`) pedindo confirmação ao usuário antes de permitir a saída.
* **Onde é usado**: Aplicado nos componentes de formulário (`/novo` e `/:id`) de Departamentos e Funcionários em `app.routes.ts`.

## 3. Portas e Caminhos Utilizados

* **Porta da Aplicação (Frontend):** `http://localhost:4200` (Porta padrão do Angular CLI).
* **Porta do Backend (Consumida):** `http://localhost:8080` (O backend **deve** estar em execução para que o frontend funcione).

## 4. Passos para Execução

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
5.  Acesse a aplicação no seu navegador em `http://localhost:4200`. A aplicação irá redirecionar automaticamente para a tela de `/login`.

## 5. Link de Acesso ao Swagger UI (API)

Toda a documentação da API REST (que este frontend consome) está disponível no Swagger UI do backend. É essencial consultá-la para entender os contratos de dados.

**Acesse em:** [**http://localhost:8080/swagger-ui.html**](http://localhost:8080/swagger-ui.html)

## 6. Endpoints da API Consumidos

Abaixo estão os principais endpoints do backend que este frontend utiliza.

### 6.1 Endpoints de Funcionários

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/funcionarios` | Lista todos os funcionários. |
| `POST` | `/api/funcionarios` | Cadastra um novo funcionário (ou reativa um inativo). |
| `GET` | `/api/funcionarios/{id}` | Busca um funcionário específico pelo ID. |
| `PUT` | `/api/funcionarios/{id}` | Atualiza os dados de um funcionário ativo. |
| `PATCH` | `/api/funcionarios/{id}/inativar` | Inativa um funcionário (altera `ativo` para `false`). |

### 6.2 Endpoints de Departamentos

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/departamentos` | Lista todos os departamentos. |
| `GET` | `/api/departamentos/ativos` | Lista apenas os departamentos ativos (usado no Dropdown). |
| `POST` | `/api/departamentos` | Cria um novo departamento. |
| `GET` | `/api/departamentos/{id}` | Busca um departamento específico pelo ID. |
| `PUT` | `/api/departamentos/{id}` | Atualiza os dados de um departamento. |
| `PATCH` | `/api/departamentos/{id}/inativar` | Inativa um departamento (altera `ativo` para `false`). |
