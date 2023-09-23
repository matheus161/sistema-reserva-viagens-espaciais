# Desafio de Desenvolvimento Backend Node.js: Sistema de Reserva de Viagens Espaciais

Neste desafio, você será encarregado de criar um sistema de reserva de viagens espaciais em Node.js que atenda a dois atores principais: o passageiro e o gerente. O sistema permitirá que os passageiros acessem, escolham viagens, selecionem no máximo duas cadeiras, recebam um cartão de confirmação e troquem ou cancelem a passagem. O gerente terá o poder de incluir novas viagens, cancelar ou remarcar viagens. Além disso, o sistema utilizará a moeda fictícia "Estalecas" ($∑) para processar os pagamentos. O prazo para a entrega do desafio é 25/09/2023.

Requisitos do Sistema:

## 1 - Autenticação:

- Os passageiros devem se autenticar para reservar viagens e acessar suas reservas.
- O gerente deve se autenticar para gerenciar viagens.

## 2 - Gerenciamento de Viagens:

### O gerente deve ser capaz de:

- Incluir novas viagens com informações como destino, data, horário de partida, horário de chegada, preço e quantidade - de assentos disponíveis.
- Cancelar viagens existentes.
- Remarcar viagens existentes.

## 3 - Reserva de Passagens:

### Os passageiros devem ser capazes de:

- Visualizar as viagens disponíveis com detalhes, incluindo o preço e a quantidade de assentos disponíveis.
- Reservar até no máximo duas cadeiras em uma viagem.
- Receber um cartão de confirmação após a reserva.

## 4 - Troca ou Cancelamento de Passagens:

### Os passageiros devem ser capazes de:

- Trocar a data ou destino da passagem, se houver disponibilidade.
- Cancelar a passagem, recebendo um reembolso adequado em Estalecas ($∑).

## 5 - Testes Unitários:

- Escreva testes unitários para garantir que todas as funcionalidades do sistema estejam funcionando corretamente.

Este é um desafio de desenvolvimento backend, e você não precisa se preocupar com o desenvolvimento de uma interface de usuário (frontend). Certifique-se de considerar casos de erro e implementar boas práticas de segurança.

# Sumário

1. [Pré-Requisitos](#pré-requisitos)
2. [Configuração](#configuração)
3. [Scripts](#scripts)
4. [Estrutura](#estrutura)
5. [Dependências](#dependências)

## Pré-requisitos

- [Git](https://git-scm.com/)
- MongoDB Service: [Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) - [Mac](https://www.ge.com/digital/documentation/meridium/Help/V43050/Default/Subsystems/ModuleDeployment/Content/ConfigureAWindowsServiceForMongoDB.htm) - [Windows](https://www.ge.com/digital/documentation/meridium/Help/V43050/Default/Subsystems/ModuleDeployment/Content/ConfigureAWindowsServiceForMongoDB.htm)
- [Node.js](https://nodejs.org/en/)

## Configuração

1. Clone o repositório e instale as dependências.

```sh
# Clonando o repositório
git clone https://github.com/matheus161/sistema-reserva-viagens-espaciais.git

# Navegando para a pasta raiz
cd sistema-reserva-viagens-espaciais

# Instalando as dependências do projeto
npm i
```

2. Crie um arquivo chamado `.env` na pasta raiz do projeto e preencha ele tomando como base o arquivo `.env.example`.

## Scripts

Para executar um script, rode `npm run <nome_do_script>` na pasta raiz do projeto.

- **build:** Transpila o código de ES6 para CommonJS utilizando o Babel.
- **start:** Roda o script build e executa o código que acabou de ser transpilado.
- **dev:** Transpila o código em tempo de execução, iniciando a aplicação instantaneamente.
- **test:** Executa os testes.

## Estrutura

### Pastas

- Em `controllers/`, ficam as classes responsáveis por implementar a lógica de negócio, expondo CRUDs e outras funcionalidades.
- Em `middlewares/`, ficam, bem... os [middlewares](https://expressjs.com/pt-br/guide/using-middleware.html). Se sua aplicação tem uma lógica que se repete por vários endpoints, considere mover essa responsabilidade para um middleware. Não se repita!
- Em `models/`, ficam os modelos de dados da aplicação, isto é - o formato de cada entidade, contendo seus atributos e respectivos tipos, além de funções de validação.
- Em `routes/`, ficam os arquivos responsáveis por expor as rotas da aplicação - eles ligam cada endpoint a seus respectivos métodos em algum controller, além de definir quais middlewares serão utilizados.
- Em `utils/`, ficam funções utilitárias, que fogem ao escopo dos demais diretórios. Esses métodos costumam ser acessados por diferentes arquivos.

### Arquivos de inicialização

- `database.js` cria uma interface de comunicação com o banco de dados, definindo métodos para abrir e fechar a conexão.
- `router.js` cria um Router contendo todos os endpoints expostos pelos arquivos em `routes/`.
- `app.js` cria o servidor, injetando nele os middlewares, endpoints, e um objeto de banco de dados.
- `index.js` é o ponto de entrada da aplicação. Ele chama as rotinas de inicialização, pondo o servidor de pé e iniciando a conexão com o banco de dados. Ele também é responsável por garantir que a aplicação [feche graciosamente](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html).

## Dependências

### Produção

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [carrier](https://www.npmjs.com/package/carrier)
- [compression](https://www.npmjs.com/package/compression)
- [cors](https://www.npmjs.com/package/cors)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [helmet](https://www.npmjs.com/package/helmet)
- [joi](https://www.npmjs.com/package/joi)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [morgan](https://www.npmjs.com/package/morgan)

### Desenvolvimento

- [babel](https://www.npmjs.com/package/babel)
- [chai](https://www.npmjs.com/package/chai)
- [eslint](https://www.npmjs.com/package/eslint)
- [husky](https://www.npmjs.com/package/eslint)
- [mocha](https://www.npmjs.com/package/mocha)
- [lint-staged](https://www.npmjs.com/package/lint-staged)
- [rewire](https://www.npmjs.com/package/rewire)
- [sinon](https://www.npmjs.com/package/sinon)
