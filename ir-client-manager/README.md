# EasyCont v1

EasyCont é um sistema CRM desenvolvido para auxiliar contadores no gerenciamento de clientes de **Imposto de Renda (IR)**.

O sistema permite organizar clientes, acompanhar o status das declarações, gerenciar documentos enviados, controlar pagamentos e visualizar pendências de forma rápida.

O objetivo é centralizar o fluxo de trabalho do contador em um único painel simples e eficiente.

---

# Funcionalidades atuais

## Dashboard inicial
A página inicial apresenta um **painel de controle do escritório**, mostrando:

- clientes cadastrados
- clientes em andamento
- clientes aguardando documentos
- clientes com pagamento pendente

Também exibe **pendências clicáveis**, permitindo abrir diretamente o perfil do cliente.

---

## Gerenciamento de clientes

O sistema possui um **CRUD completo de clientes**.

Cada cliente possui:

- Nome
- CPF
- Email
- Telefone
- Data de nascimento
- Valor cobrado pelo serviço

O cadastro pode ser **editado a qualquer momento**.

Também é possível **excluir o cliente** com confirmação via modal.

---

## Perfil do cliente

Cada cliente possui um painel próprio contendo:

### Informações pessoais
Dados básicos do cliente com edição rápida.

### Status da declaração

Fluxo atual:

- Aguardando documentos
- Em andamento
- Declaração enviada
- Finalizado

Existe uma **barra de progresso visual** baseada no status.

---

### Controle de pagamento

O sistema permite marcar o pagamento como:

- Pago
- Pendente

O status aparece como **badge visual** no painel.

---

### Upload de documentos

É possível anexar documentos ao cliente.

Cada documento pode ser:

- baixado
- removido

Os arquivos ficam armazenados localmente (localStorage) nesta versão.

---

### Timeline de atividades

Toda ação relevante gera um evento automático:

Exemplos:

- Cliente criado
- Status alterado
- Documento enviado
- Pagamento recebido

Isso cria um histórico completo do cliente.

---

## Financeiro

O sistema calcula automaticamente:

- valores cobrados
- pagamentos recebidos
- pendências

Permitindo controle simples do faturamento.

---

## Relatórios

Área destinada para relatórios com base em filtros.

Exemplos possíveis:

- clientes finalizados
- clientes em andamento
- clientes sem pagamento

---

## Dark Mode

O sistema possui **modo claro e modo escuro**, com alternância nas configurações.

O tema escolhido é salvo no `localStorage` e carregado automaticamente ao abrir o sistema.

---

## Interface

O layout atual utiliza:

- React
- Vite
- Bootstrap
- Sidebar estilo SaaS

Navegação lateral:

```
Home
Dashboard
Clientes
Financeiro
Relatórios
Configurações
```

---

# Estrutura do projeto

```
src
 ├ components
 │   ├ Sidebar
 │   └ Layout
 │
 ├ pages
 │   ├ Home
 │   ├ Dashboard
 │   ├ Clientes
 │   ├ NovoCliente
 │   ├ ClienteDetalhe
 │   ├ Financeiro
 │   ├ Relatorios
 │   └ Configuracoes
 │
 ├ services
 │   └ clientService
 │
 ├ styles
 │   └ home.css
 │
 ├ App.tsx
 └ main.tsx
```

---

# Tecnologias utilizadas

- React
- TypeScript
- Vite
- Bootstrap 5
- React Router
- UUID
- LocalStorage (temporário)

---

# Roadmap de desenvolvimento

## V1.1 — Checklist de documentos
Adicionar lista de documentos obrigatórios por cliente.

Exemplo:

```
Documentos necessários

☐ Informe de rendimentos
☐ Informe bancário
☐ Informe de investimentos
☐ Recibos médicos
☐ Declaração anterior
```

Benefícios:

- controle do que falta
- integração com pendências da Home
- progresso de documentação

---

## V1.2 — Upload organizado por categoria

Organizar arquivos por tipo:

```
Informes de rendimento
Recibos médicos
Extratos bancários
Investimentos
```

Melhora a organização para declaração.

---

## V1.3 — Integração com Google Drive

Cada cliente terá uma pasta automática no Drive:

```
EasyCont
 ├ Cliente 1
 │   ├ Informes
 │   ├ Bancos
 │   └ Recibos
```

Uploads feitos no sistema serão enviados diretamente ao Drive.

Benefícios:

- backup automático
- armazenamento ilimitado
- compartilhamento fácil

---

## V1.4 — Login com Google

Usuários poderão entrar usando:

```
Login com Google
```

O sistema utilizará o Drive da conta conectada para armazenamento.

---

# Possível evolução do produto

O EasyCont pode evoluir para um **SaaS para contadores**.

Possível modelo de negócio:

Plano Básico  
até 100 clientes

Plano Profissional  
clientes ilimitados + Google Drive

---

# Objetivo do projeto

Criar um sistema simples e eficiente para gestão de clientes de imposto de renda, com potencial de evolução para uma plataforma profissional utilizada por contadores.

---

# Autor

Projeto desenvolvido por **Rafael Oliveira**.