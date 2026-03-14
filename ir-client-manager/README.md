# EasyCont

EasyCont é um sistema CRM desenvolvido para auxiliar contadores no gerenciamento de clientes de **Imposto de Renda (IRPF)**.

O sistema permite organizar clientes, acompanhar o status das declarações, gerenciar documentos enviados, controlar pagamentos e visualizar pendências de forma rápida.

Projeto desenvolvido inicialmente para uso real em escritório contábil.

---

# Demonstração

https://easycont.vercel.app

---

# Objetivo do projeto

O objetivo do EasyCont é simplificar o fluxo de trabalho do contador durante a temporada de Imposto de Renda, centralizando:

- informações dos clientes
- documentos enviados
- status da declaração
- controle de pagamentos
- histórico de eventos

---

# Principais funcionalidades

### Cadastro de clientes

Permite registrar:

- nome
- CPF
- telefone
- email
- data de nascimento

---

### Status da declaração

Fluxo de acompanhamento:

- Aguardando documentos
- Em andamento
- Declaração enviada
- Finalizado

---

### Checklist de documentos

Cada cliente possui um checklist configurável de documentos necessários.

Exemplo:

- Informe de rendimentos
- Informe bancário
- Recibos médicos
- Investimentos

O progresso é exibido visualmente através de barra de progresso.

---

### Upload de documentos

Os documentos podem ser enviados diretamente no perfil do cliente.

Os arquivos são armazenados no **Google Drive do contador**, organizados automaticamente.

Estrutura no Drive:

EasyCont  
Clientes  
Nome do cliente  
Documentos

---

### Visualização e download

Dentro do CRM é possível:

- visualizar documento
- baixar documento
- excluir documento

---

### Timeline de eventos

Cada ação gera um registro no histórico do cliente.

Exemplos:

- alteração de status
- confirmação de pagamento
- envio de documento

---

### Controle de pagamento

Cada cliente pode ser marcado como:

- pago
- pendente

---

### Dashboard

O painel principal exibe informações importantes:

- prazo do IRPF
- documentos pendentes
- pagamentos pendentes
- clientes com documentação completa

---

### Backup automático

O sistema gera backup automático dos dados no Google Drive do usuário.

Arquivo:

easycont_backup.json

---

# Tecnologias utilizadas

Frontend

- React
- TypeScript
- Vite
- Bootstrap

Armazenamento

- Google Drive API
- LocalStorage

Autenticação

- Google Login (OAuth)

Deploy

- Vercel

---

# Estrutura do projeto

Principais módulos

auth → login e autenticação  
services → integração com Google Drive  
pages → telas do sistema  
components → layout e elementos reutilizáveis  

---

# Status do projeto

Versão atual: **v1 (MVP funcional)**

O sistema já está em uso real por um contador para testes.

---

# Próximos fixes (curto prazo)

### 1. Corrigir login duplo

Hoje o sistema realiza:

Login Google  
Autorização Google Drive

Fluxo será simplificado para apenas um login.

---

### 2. Melhorar experiência mobile

Ajustes necessários:

- sidebar responsiva
- botões maiores
- melhor organização de cards
- menu mobile

---

### 3. Tornar backup mais visível

Adicionar indicador na Home:

Último backup realizado  
Botão para backup manual

---

### 4. Melhorar fluxo de upload

Evitar duplicação de arquivos e melhorar feedback visual ao enviar documentos.

---

### 5. Melhorar mensagens de erro

Adicionar mensagens mais claras para:

- falha de upload
- falha de backup
- erro de autenticação

---

# Próximos updates (roadmap)

## V1.1

Melhorias de usabilidade.

- layout mobile melhorado
- indicador de backup na home
- melhorias na barra lateral
- feedback visual ao salvar alterações
- melhorias na timeline

---

## V1.2

Automação de fluxo de documentos.

- geração de link para envio de documentos
- cliente envia arquivos diretamente
- documentos aparecem automaticamente no CRM

---

## V1.3

Ferramentas para contadores.

- filtro de clientes
- busca por nome ou CPF
- relatório de clientes pendentes
- relatório de pagamentos

---

## V2.0

Transformação do sistema em plataforma multi-contador.

- múltiplos usuários
- separação de contas
- controle de permissões
- painel administrativo

---

# Contribuição

Este projeto ainda está em fase inicial de desenvolvimento.

Sugestões de melhoria e feedback são bem-vindos.

---

# Licença

Projeto em desenvolvimento.