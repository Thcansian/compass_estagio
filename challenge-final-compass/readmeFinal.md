# Planejamento de Testes - API de Filmes e Tickets

## 1. Introdução
Este documento detalha o planejamento de testes para validar as funcionalidades da API de Filmes e Tickets, considerando os endpoints `/movies` e `/tickets` com operações CRUD completas para movies e tickets apenas criação do ticket.

## 2. Escopo
Os testes abrangem:
- Funcionalidades do CRUD para filmes e criação de tickets.
- Validação de permissões de usuários.
- Requisitos não funcionais de desempenho.
- Identificação e relatório de erros nos endpoints.

## 3. Tipos de Testes
### 3.1 Testes Funcionais
#### 1. Criar um novo filme
- **Cenário 1**: Criar um filme com dados válidos.
  - Enviar requisição `POST /movies` com dados válidos.
  - Esperado: Retorno `201 Created` e ID do filme.

- **Cenário 2**: Criar um filme sem preencher campos obrigatórios.
  - Enviar requisição `POST /movies` com campos obrigatórios ausentes.
  - Esperado: Retorno `400 Bad Request` com mensagem de erro.

- **Cenário 3**: Criar um filme com título duplicado.
  - Enviar requisição `POST /movies` com título já existente.
  - Esperado: Retorno `409 Conflict` com mensagem de erro.

#### 2. Obter lista de filmes
- **Cenário 1**: Obter todos os filmes cadastrados.
  - Enviar requisição `GET /movies`.
  - Esperado: Retorno `200 OK` com lista de filmes paginada (máx. 20 por página).

- **Cenário 2**: Obter lista quando não há filmes cadastrados.
  - Enviar requisição `GET /movies`.
  - Esperado: Retorno `200 OK` com lista vazia.

#### 3. Obter detalhes de um filme por ID
- **Cenário 1**: Consultar um filme existente.
  - Enviar requisição `GET /movies/{id}`.
  - Esperado: Retorno `200 OK` com detalhes do filme.

- **Cenário 2**: Consultar um filme inexistente.
  - Enviar requisição `GET /movies/{id_inexistente}`.
  - Esperado: Retorno `404 Not Found`.

#### 4. Atualizar um filme
- **Cenário 1**: Atualizar um filme existente com dados válidos.
  - Enviar requisição `PUT /movies/{id}` com novos dados válidos.
  - Esperado: Retorno `200 OK` com detalhes atualizados.

- **Cenário 2**: Atualizar um filme inexistente. 
  - Enviar requisição `PUT /movies/{id_inexistente}`.
  - Esperado: Retorno `404 Not Found`.

#### 5. Excluir um filme
- **Cenário 1**: Excluir um filme existente.
  - Enviar requisição `DELETE /movies/{id}`.
  - Esperado: Retorno `204 No Content`.

- **Cenário 2**: Excluir um filme inexistente.
  - Enviar requisição `DELETE /movies/{id_inexistente}`.
  - Esperado: Retorno `404 Not Found`.

#### 6. Criar um novo ticket
- **Cenário 1**: Criar um ticket com dados válidos.
  - Enviar requisição `POST /tickets` com informações do ticket.
  - Esperado: Retorno `201 Created` com ID do ticket.

- **Cenário 2**: Criar um ticket sem dados obrigatórios.
  - Enviar requisição `POST /tickets` com campos obrigatórios ausentes.
  - Esperado: Retorno `400 Bad Request` com mensagem de erro.

### 3.2 Testes de Permissão ( não são possiveis de serem realizados pois não é fornecido uma criação ou login de usuario para ter esse controle )
- **Cenário 1**: Usuário não administrador tentando criar, atualizar ou excluir filmes.
  - Esperado: Retorno `403 Forbidden`.

- **Cenário 2**: Usuário comum consultando filmes e tickets.
  - Esperado: Retorno `200 OK`.

### 3.3 Testes de Performance
- **Criar tickets**:
  - Simular 50 requisições `POST /tickets` por segundo.
  - Garantir tempo médio de resposta ≤ 300ms.
- **Obter lista de tickets**:
  - Simular 100 requisições `GET /tickets` por segundo.
  - Garantir tempo médio de resposta ≤ 150ms.


## 4. Automação de Testes Funcionais

A automação de testes funcionais será realizada utilizando:

Postman para criação e execução dos testes.

Newman para execução automatizada dos testes via linha de comando.

Os scripts automatizados cobrirão todos os cenários de teste descritos na seção de Testes Funcionais, garantindo que as funcionalidades da API sejam verificadas continuamente e de forma eficiente.

## 5. Ferramentas Utilizadas
- **Postman**: Testes manuais e automação básica.
- **K6**: Testes de carga e desempenho.
- **Newman**: Automação de testes via Postman.

## 6. Critérios de Aceitação
- Todos os cenários de teste devem passar com os status HTTP esperados.
- Testes de performance devem atender aos limites definidos.

## 7. Considerações Finais
Este planejamento cobre os principais casos para garantir que a API de Filmes e Tickets funcione conforme esperado. Testes adicionais podem ser incluídos conforme novas funcionalidades sejam adicionadas.

# Mapa Mental de Organização: 

![image mapa mental](challenge-final-compass/mapa_mental/mapaMental.png)