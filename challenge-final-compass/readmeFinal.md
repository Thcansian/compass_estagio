# Sobre Mim

Meu nome é thomas cansian dos santos, tenho 22 anos, sou estudante de Ciência da Computação no [IFSul - Campus Passo Fundo](https://www.pf.ifsul.edu.br/), atualmente iniciando o segundo semestre. Durante as tardes, atuo como estagiário na [Compass UOL](https://compass.uol), onde estou aprimorando minhas habilidades em tecnologia e resolução de problemas.

### Experiência Profissional

- **Aplicação de Películas:** 1 ano de experiência, com atenção aos detalhes e foco na qualidade.
- **Venda de Carros:** 1 ano e meio, desenvolvendo habilidades de negociação e atendimento ao cliente, área que continuo explorando como hobby.

### Paixões e Hobbies

Sou apaixonado por música e pelo universo automotivo. Quando não estou estudando ou trabalhando, gosto de ouvir musicas e ver coisas sobre carros.

### Estatísticas

- **Altura:** 1,75 m
- **Peso:** 65 kg
- **Características Físicas:** Pele branca, olhos castanhos, cabelo curto e barba rasa.

## Contatos

- **LinkedIn:** [LinkedIn](www.linkedin.com/in/thomas-cansian-56758b219)
- **GitLab:** [gitlab](https://gitlab.com/th.cansian)
- **E-mail pessoal:** [email](mailto:thomascansian@hotmail.com)
- **E-mail empresarial:** [email](mailto:thomas.cansian.pb@compasso.com.br)

Sinta-se à vontade para entrar em contato! 

# como executar o projeto: 

### 1° Clone o repositorio da api de cinema:
 
  `````bash
  git clone https://github.com/juniorschmitz/nestjs-cinema.git
  `````
 
  ### 2° Abra o terminal com o VS CODE e digite:
  `````bash
  npm start
  `````
  ### 3° Faça um clone do repositorio dos testes:
  ```` bash
  git clone https://gitlab.com/th.cansian/challenge-final-compass
  ````
  ### 4° Deve ser feito uma confirguração do docker para que a API seja executada dentro do container local: 
  `````bash
  docker build -t cinema .
  `````
  ### 5° para rodar os testes não funcionais no k6 utiliza-se o comando:
  `````bash
    k6 run nomeDaPasta.js 
  `````
  ### 6° para rodar os testes funcionais no postman:
  deve ser configurado de forma correta, com campos obrigatórios e verbo correto, com link para API (nesse caso para porta local utilizada) e enviar a requisição. 

# Planejamento de Testes - API de Filmes e Tickets

## 1. Introdução
Este documento detalha o planejamento de testes para validar as funcionalidades da API de Filmes e Tickets e testes não funcionais de performance, considerando os endpoints `/movies` e `/tickets` com operações CRUD completas para movies e tickets apenas criação do ticket.

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

- **Relatório pós testes:**
  - filme criado com sucesso, retorna status code 201, porém não apresenta body com ID.

- **Cenário 2**: Criar um filme sem preencher campos obrigatórios.
  - Enviar requisição `POST /movies` com campos obrigatórios ausentes.
  - Esperado: Retorno `400 Bad Request` com mensagem de erro.

- **Relatório pós testes:**
  - filme não criado, status code 400 bad request, teste ok, conforme esperado.

- **Cenário 3**: Criar um filme com título duplicado.
  - Enviar requisição `POST /movies` com título já existente.
  - Esperado: Retorno `409 Conflict` com mensagem de erro.

  - **Relatório pós testes:**
  - filme criado, status code 201 created, é possivel criar varios filmes iguais sem que de erro. 

#### 2. Obter lista de filmes
- **Cenário 1**: Obter todos os filmes cadastrados.
  - Enviar requisição `GET /movies`.
  - Esperado: Retorno `200 OK`.

- **Relatório pós testes:**
  - status code 200 OK, gera a lista de filmes correta, com os campos corretos.

- **Cenário 2**: Obter lista quando não há filmes cadastrados.
  - Enviar requisição `GET /movies`.
  - Esperado: Retorno `200 OK` com lista vazia.

- **Relatório pós testes:**
  - Restorna status code 200 OK, com lista vazia.

#### 3. Obter detalhes de um filme por ID
- **Cenário 1**: Consultar um filme existente.
  - Enviar requisição `GET /movies/{id}`.
  - Esperado: Retorno `200 OK` com detalhes do filme. 

- **Relatório pós testes:**
  - Retorna status code 200 OK, com os detalhes do filme buscado. 

- **Cenário 2**: Consultar um filme inexistente.
  - Enviar requisição `GET /movies/{id_inexistente}`.
  - Esperado: Retorno `404 Not Found`.

- **Relatório pós testes:**
  - Restorna status code 404 not found, com mensagem: "message": "Movie not found","error": "Not Found", "statusCode": 404. 

#### 4. Atualizar um filme
- **Cenário 1**: Atualizar um filme existente com dados válidos.
  - Enviar requisição `PUT /movies/{id}` com novos dados válidos.
  - Esperado: Retorno `200 OK` com detalhes atualizados.

- **Relatório pós testes:**
  - Restorna status code 200 OK, com corpo da resposta editado.

- **Cenário 2**: Atualizar um filme inexistente. 
  - Enviar requisição `PUT /movies/{id_inexistente}`.
  - Esperado: Retorno `404 Not Found`.

- **Relatório pós testes:**
  - Restorna status code 404 Not Found, com corpo da resposta: {"message": "Movie not found or not updated","error": "Not Found","statusCode": 404}

#### 5. Excluir um filme
- **Cenário 1**: Excluir um filme existente.
  - Enviar requisição `DELETE /movies/{id}`.
  - Esperado: Retorno `204 No Content`.

- **Relatório pós testes:**
  - Restorna status code 200 OK, sem corpo de resposta, conferindo no get o filme realmente é deletado.

- **Cenário 2**: Excluir um filme inexistente.
  - Enviar requisição `DELETE /movies/{id_inexistente}`.
  - Esperado: Retorno `404 Not Found`.

- **Relatório pós testes:**
  - Restorna status code 404 Not Found, com corpo da resposta: {"message": "Movie not found","error": "Not Found","statusCode": 404}

#### 6. Criar um novo ticket
- **Cenário 1**: Criar um ticket com dados válidos.
  - Enviar requisição `POST /tickets` com informações do ticket.
  - Esperado: Retorno `201 Created` com ID do ticket.

- **Relatório pós testes:**
  - Restorna status code 201 created, corpo de resposta contendo dados especificados para criação de ticket e mais o id do ticket. 

- **Cenário 2**: Criar um ticket sem dados obrigatórios.
  - Enviar requisição `POST /tickets` com campos obrigatórios ausentes.
  - Esperado: Retorno `400 Bad Request` com mensagem de erro.

- **Relatório pós testes:**
  - Restorna status code 400 Not Found, com corpo da resposta: {"message": ["Preço deve ser menor ou igual a 60","Preço deve ser maior ou igual a 0","price must be a number conforming to the specified constraints","Preço do ingresso é mandatório"],"error": "Bad Request","statusCode": 400} 

- **Cenário 3**: Criar um ticket com valores maiores que permitidos nos campos acentos e preço.
  - Enviar requisição `POST /tickets` com campos obrigatórios ausentes.
  - Esperado: Retorno `400 Bad Request` com mensagem de erro mostrando que valores estão incorretos.

- **Relatório pós testes:**
  - Restorna status code 400 Not Found, com corpo da resposta mostrando valores que deveriam ser aceitos.

### 3.2 Testes de Permissão ( não são possiveis de serem realizados pois não é fornecido uma criação ou login de usuario para ter esse controle )
- **Cenário 1**: Usuário não administrador tentando criar, atualizar ou excluir filmes.
  - Esperado: Retorno `403 Forbidden`.

- **Cenário 2**: Usuário comum consultando filmes e tickets.
  - Esperado: Retorno `200 OK`.

### 3.3 Testes de Performance

- **Teste de Carga**
  - Objetivo: Avaliar o desempenho da API sob carga esperada.

  - **Cenário 1:** Criar um filme
    - Enviar requisição POST /movies com dados válidos.
    - Simular 50 requisições POST /movies por segundo.
    - Esperado: Retorno 201 Created e tempo de resposta menor que 200ms.

- **Relatório pós testes:** 
  - Teste de carga foi executado corretamente com mais de 209 mil requisições corretas.

- **Teste de Estresse**
  - Objetivo: Determinar o limite da API antes da falha.

- **Cenário 1:** Listar filmes
  - Enviar requisição GET /movies sob carga de 50 requisições por segundo.
  - Esperado: API deve responder em menos de 100ms.

- **Relatório pós testes:**
  - teve um bom percentual de aprovações, falhando em algumas requisições no tempo limite.

- **Teste de Pico**
  - Objetivo: Avaliar como a API lida com um aumento repentino de requisições.

- **Cenário 1:** Atualizar 100 filmes repentinamente.
  - enviar requisições PUT /movies/{id}.

- **Relatório pós testes:** 
  - teste de pico no put não houve falhas, com mais de 15 mil requisições, todas OK.

- **Teste de Estabilidade**
  - Objetivo: Verificar o comportamento da API sob carga contínua por um longo período.

- **Cenário 1:** Listagem contínua de filmes por ID
  - Simular 50 requisições GET /movies/{ID} por segundo durante 20 minutos.
  - Esperado: API deve manter estabilidade e tempo de resposta menor que 100ms.

- **Relatório pós testes:**
  - a API aguentou bem o teste de estabilidade em get ID, com um total de mais de 2 milhões de requisições durante 20 minutos, com apenas 1 falha no teardown ( vale ressaltar que o teste possuiu apenas 1 id especifico para as mais de 2 milhoes de requisições )

## 4. Automação de Testes Funcionais ( não foi possivel realizar, testes no newman foram executados todos com erros )

A automação de testes funcionais será realizada utilizando:

Postman para criação e execução dos testes.

Newman para execução automatizada dos testes via linha de comando.

Os scripts automatizados cobrirão todos os cenários de teste descritos na seção de Testes Funcionais, garantindo que as funcionalidades da API sejam verificadas continuamente e de forma eficiente.

## 5. Ferramentas Utilizadas
- **Postman**: Testes manuais e automação básica.
- **K6**: Testes de carga e desempenho.
- **Newman**: Automação de testes via Postman.
- **docker**: Rodar a API localmente.

## 6. Critérios de Aceitação
- Todos os cenários de teste devem passar com os status HTTP esperados.
- Testes de performance devem atender aos limites definidos.

## 7. Considerações Finais
Este planejamento cobre os principais casos para garantir que a API de Filmes e Tickets funcione conforme esperado. Testes adicionais podem ser incluídos conforme novas funcionalidades sejam adicionadas.

# Mapa Mental de Organização: 

![image mapa mental](challenge-final-compass/mapa_mental/mapaMental.png)

# agradecimentos: 
ricardo, lucas, jean, bruno, felipe.