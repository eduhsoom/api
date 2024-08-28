## LINUX
- inicilamente no terminal, tem que utilizar esse comando no terminal
1. sudo rm -rf node_modules
- em seguida :
1. npm install

## para criar um servidor

1. terminal  
2. npm init -y (Enter)


## para adicionar um framework, para poder ser possível realizar request e response

- npm instal express --save
- 
## se vc por engano apagar a pasta node_modules, é possivel instaar de novo
-npm install

## criar primeiro arquivo da API e utilizar o express
-criar pasta src
dentro da pasta, cria serve.js
- criar arquivo para importar o express. écomo se vc pegasse todas as funçoes do express e colocasse em uma constante
- criar outra constante para inicializar o express
- criar uma constante a qual vai poder atender as requisições(requests) (PORT)
- É Oendereço de onde a API vai ficar observando as request e devolvendo as response
- crie uma funçaõ onde a aplicação vai ficar observando o Port, e toda vez que o o servidor for executado, executa a funçao console.log
```js
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
```

# pode ser simplificado essa experiencia execuçaõ da aplicação
-no arquivo package.json, tem uma sessão script, e nal pode ser criado o script que a gente quizer.
- apaga o "test": "echo \"Error: no test specified\" && exit 1", e escreva "start": "node ./src/serve.js"
- no terminal pare a execução do servidor (crtl + c)
- no terminal, npm start


### ROTAS
>O QUE É UMA ROTA ?
-é cominho entre o ponto a para o ponto b, por ex: o caminho do site para o servidor.
- há alguns padroes para a API  saber como se comportar, que são os metodos de requisiçoes
- Get -> leitura
- POST -> CRIAÇÃO
- PUT -> atualização 
- DELETE -> deleção
- PATCH -> atualização parcial
- 
> é por meio do request que nós obtemos informações que estão sendo envidades para a API 
# Route Params (parametros da rota)
- É uma estratégia em que nos conseguimos passar determinado valor/informação como parametro para a nossa rota
-  tem o endereço(url) / a rota da API(recursos)/ (parametro)
- o params é essa estratégia de colocar esse parametro na rota
- é utilizado para informações mais simples, como id de um produto

``` js
app.get('/message/:id/:user', (request, response) => {

  const {id, user} =  request.params

  response.send(`id da mensagem: ${id}. 
  nome do usuário: ${user}.`)
})
/* implementação do método get para realizar a leitura do servidor

entre os ('') do get, deve colocar o endereço da rota, a / significaser a raiz da api. em seguida da , coloca uma arrow function, em que consegui extrair 2 informações importantes(request, response). assim pode utilizar o respose para devolver/enviar uma mensagem para quem solicitou

/:id , o /: significa que vem um parametro em seguida(umvalor vai ser passado), e o id é o parametro

${request.params.id} = como recuperar uma informação da pagina
*/


```

# Querys Params
-Estrutura
-endereço(url)/users(recurso, rota)?(significa que o q vem pela frente é um query params) page (nome do query params) =2 (valor desse query)&(para passar outro query params) limit=10

- diferença entre query params e route params
- >quando utiliza o route os valores dos parametrossão obrigatórios
- >ja o query não é obrigatorio, mesmo que vc não coloque os query params, o servidor vai funcionar

```js
app.get('/users', (request, response) => {
  const { page, limit } = request.query

  response.send(`
  Pagina: ${page}.
  Mostrar:${limit}.`)
})
```

# Implementação do método get 
- metodo utilizado p fazer leitura
- 
# recurso para que o sevidor reinicie de forma automatica
- no terminal:
- npm install nodemon --save-dev
- o nodemon so vai ser utilizado ento estiver desenvolvendo a aplicação
- no arquivo package.json, na parte de scripts, apos o start, escreva : "dev": "nodemon ./src/serve.js"
- quando for inicializar a aplicação no terminal, escrever: npm run dev
- 
# para utilizar os outros metodos, é necessario abri no programa INSOMNIA

# como enviar informações para uma api
- o POST pode ser utilizado quando vcquer enviar um cadastro de um usuario um nome e senha de um usuário, 
- EX:
```js
const { Router } = require('express');
// para importar o router de dentro do express

const usersRoutes = Router ()
// cria uma constante para inicializar o Router do express

usersRoutes.post('/', (request, response) => {

  const {name, email, password} = request.body
  response.json({name, email, password}) //ara devolver uma response pelo formato json, esse é o padrão utilizado

  //response.send(`Usuário: ${name}. Email: ${email}. Senha${password}`) //para devolver uma response pelo formato html
})

```
> Insonima
- no body seleciona o tipo de arquivo que vc quer enviar as requisições, e seleciona o json. no arquivo abre a chave e escreva os valores
- EX:
``` json
{
	"name": "Beatriz",
	"email": "beatrizmcoutinho23@gmail.com",
	"password": "123"
}

```

### ESTRUTURA INICIAL DO PROJETO

[pasta] SCR => serve.js
            routes
            controllers
            utils
            database - sqlite - migrations

# criação da arquivos userscontrollers, para criar, atualizar,mostrar e deletar usuários 


# CODIGOS HTTP - STATUS CODES, ELES ADICIONAM UMA NUMERAÇÃO NAS RESPOSTAS, E ESSA NUMERAÇÃO REPRESENTA UMA ESTADO DA RESPOSTA, OS QUAIS ESTÃO AGRUPADOS POR FAIXAS

- 100 [INFORMATIVO: A SOLICITAÇÃO FOI ACEITA OU UM PROCESSAMENTE CONTINUA EM ADAMENTO][102-Processando]
- 200 [SUCESSO][200-Requisição bem sucedida; 201-Criado - geralmente para POST APÓS UMA INSERÇÃO]
- 300 [REDIRECIONAMENTO][301-Movido permanentemente; 302-Movido]
- 400 [ERRO DO CLIENTE][400-Bad request; 401-Unauthorized; 404 - Not Found]
- 500 [ERRO NO SERVIDOR - o servidor falhou ao concluir a solicitação][500-Erro interno]
- 
## Middleware
- é uma funçaõ que consegue interceptar a requisição, tem acessoa a requisição antes do seu destino
- Middleware são funções que tem acesso ao objeto solicitado (requisição), oobjeto (resposta), e a proxima função de middleware no ciclo solicitação-resposta do aplicativo.
- A proxima função middleware é comumente denotada por uma variável chamada next.
- next:o destino da requisição que foi interceptada pelo middleware
## Middleware podem:
>Executar qualquer código.
>Fazer mudanças nos objetos de solicitação e resposta.
>encerrar o ciclo de solicitação-resposta
>Chamar o proximo middleware na pilha.

## Instalação do async-errors
-npm instal express-async-errors --save

## importação do async-errors noservidor

``` js

require('express-async-errors')
//importação do async-errors

const AppError = require('./utils/AppError')
// importaç~so do AppError

```

### O que é um banco de dados?
- coleçãode dados

### ESTRUTURA DE UM BANCO DE DADOS
Banco de dados loja -> Tabela de clientes -> cliente 1
                                          -> cliente 2
                                          -> cliente 3
                    -> Tabela de Produtos -> Produto 1
                                          -> Produto 2
                                          -> Produto 3
                    -> Tabela de vendas -> Venda 1
                                        -> Venda 2
                                        -> Venda 3

- cada dado tem um tipo [vachar(texto), int(inteiro), date]
- tabela de dados, quando os dados são organizados por meio de tabelas, é chamado de banco de dados relacional

# SQLite - SQL
- é um banco de dados relacional
- npm install sqlite3 sqlite --save
  
## para a criação no Beekeeper studio
- sempre separar por virgula, utilizar o _ para nomes compostos
- letras maiusculas dos atributos próprios do banco de dados. 
- nome da coluna / tipo de dado      
- 
# SQL -Structured Query Language, ou Linguagem de Consuta Estruturada.
- é a linguagem padrão para banco de dados relacionais     
- 
# SQL - Comandos DDL / Data Definition Language
- CREATE-> CRIAR
- DROP -> DELETAR
- ALTER -> ATUALIZAR
- 
- 
# SQL - ComandsDML - Data Manipulation Language
- CREATE -> INSERT
- READ -> SELECT
- UPDATE -> UPDATE
- DELETE -> DELETE
- 
# criptografia de password
- npm install bcryptjs --save

# QUERY bUILDER
-query builder é um construtor de consulta.
-o query buider permite que você construa instruções sql independente do banco de dados utilizados
-gerar o codigo sql p o banco de dados utilizados

# instalação knex.js
- npm install knex --save
- npm install pg
- npm install pg-native
- npm install sqlite3
- npm install better-sqlite3
- npm install mysql
- npm install mysql2
- npm install oracledb
- npm install tedious

### configurações p o knex possa se comunicar com o banco de dados
-npm knex init

> surge um arquivo knex.js
>dentro desse arquivo configure-o dessa forma:
``` js
const path = require('path')
//importação do path
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path(__dirname, 'src', 'datbase', 'database.db')
    },
    useNullAsDefault: true,
  migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    }

  }

};
```
> emseguida crie dentro da pasta database, crie uma pasta knex, e  dentro dessa pasta crie um arquivo index.js
>configure-o dessa forma: 
``` js
const config = require('../../knexfile')

const knex = require('knex')

const connection = knex(config.development)

module.exports = connection

```

## MIGRATIONS
- é uma forma de vercionar a base de dados
- migrations trabalha na manipulaçõa da basede dados: criando, alterando, ou removendo.
- 
# métodos de uma migrations 
-UP: método por criar ou alterar algo no banco de dados.
DOWN: responsável pelo rollback. ou seja as alterações realizadas pela migration

# para criar uma migration no knex de forma automática
- npx knex migrate:make createNotes 
- 
#  p rodar uma migration
 npx knex migrate:latest

# NPM - NODE PACKAGE MANAGER
- É gerenciador de pacotes padrão para node.js
- os pacotes e modulos necessários no projeto node são instalados usando npm
- E também utilizamos o npm para executar scripts e bibliotecas instaladas
- npm é uma ferramenta para instalar pacotes
# NPX-NODE PACKAGE EXECUTE
-vem com o npmacima da versão 5.2
- é um executador de pacotesnpm que pode executar qualquerpacote que você quiser do registro npm sem sequer instalar esse pacote
- npx é uma ferramenta para executar pacotes
- 
# chave primaria - Primary Key
- é o identificador unicodentro da tabela
- o objetivo dellaé identificar os registros, p que cada registrotenho oseu proprio identificador
- a base de uma chave primaria é garantir queesse valor não se repita, que esse valor não seja dublicado
# chave estrangeira - Foreign Key 
- temo objetivo/utilidade de conectar tabelas, quando vc quer vincular o registro com alguma outra informação
- 
# cardinalidade
- é a frequencia  que entidade/tabela se relaciona com uma outra
- 
# Inner Join
- serve p unir tabelas, permite selecionar duas tabelas e exibiros reseultados de forma unificados , em uma unica consulta, registro em comun entreduas tabelas
- no codigo é necessário três informações
- table, primary_key, e foreign_key
- 
# playCode
https://playcode.io/
- é uma site que auxiolia nautilização do map() e filter()
# map()
-é uma função utilizada para percorrer cada elemento que existe dentro de um array
- o map devolve um outro array
- dentro do map(), coloca-se uma arow-function
- o map serve p vc manipular um array, e poder retornar umnovo array
````js
const tags = [
  {id: 1, name: 'node', note_id: 1},
  {id: 2, name: 'express', note_id: 1},
  {id: 3, name: 'react', note_id: 1},
  {id: 4, name: 'javascript', note_id: 2},
  {id: 5, name: 'frontend', note_id: 2}
]

const newArray = tags.map(tag => {
  return {
    name: tag.name
  }
}) // para retornar um objeto como 
//a aprtir de tags, eu percorrir cada item, e retorna um objeto só com a propriedade name dentro de tag
// a tag é uma variável auxiliar que vai armazenar o conteudo de cada elemento

const newArray2 = tags.map( tag => tag.name)// retorna um vetor simples que só contem os names

const newArray2 = tags.map( tag => tag) // retorna a tag por ela mesma 

const newArray = tags.map(tag => {
  return {
...tag,
date: new Date()
  }
}) // com o sprad operator, vc despeja/coloca toads as informações que existe no array citado, e em seguida adciona a nova propriedade, em cada um dos itens


console.log(newArray)

````

# filter()
-significa que vc quer filtrar o conteudo de um array
- retorna um novo array, só que de forma filtrada, a qual foi definida pelo desenvolvedor
- 
````js
const tags = [
  {id: 1, name: 'node', note_id: 1},
  {id: 2, name: 'express', note_id: 1},
  {id: 3, name: 'react', note_id: 1},
  {id: 4, name: 'javascript', note_id: 2},
  {id: 5, name: 'frontend', note_id: 2}
]

const newArray = tags.filter(tag => tag.note_id === 1 )
// retor somente as tags com a propriedade node_id que seja iqual a 1
// === compara se o tipo e o valor

console.log(newArray)
````

# JWT
> O que é?
- é um padrao e mercado que define 
- 
# instalação do multer
- npm install multer
- 
# instalação do cors(cross-origin resource sharing)
> biblioteca que conecta o back-end com o front-end
- npm install cors
- 
# instalação do Axios
-npm install axios
> é uma biblioteca que trabalha com requisiçoes http

# instalação dotenv
>biblioteca para proteger dados sensíveis
- npm dotenv
- 
# instalação de pm2
>inicializador de um servidor
-npx pm2 init //para instalar na maquina
- npm install pm2 //para instalar no projeto
- 
- substituir no arquivo packagejson, "start": "pm2-runtime start ecosystem.config.js --env production"
- ssubstituir no arquivo ecosystem.config.js, script: "./src/serve.js",