### Comandos utilizados no projeto
- npm i -g typeorm ==> instala o typeorm de forma global. Assim é possível gerar o projeto pela linha de comando pré configurado 

- typeorm init --name nome_do_projeto --database nome_do_banco ==> gera o projeto com as pré configurações do typeorm com o banco desejado
    - typeorm init --name authenticator --database mongodb ==> comando utilizado para gerar esse projeto

- npm i express cors morgan email-validator jsonwebtoken
    - express ==> biblioteca responsável pelas rotas e configurações da api
    - cors ==> pacote de configuração do CORS da api
    - morgan ==> pacote para log detalhados
    - email-validator ==> pacote de validação de e-mails
    - jsonwebtoken ==> pacote para o uso do JWT

- npm i -D nodemon @types/express @types/jsonwebtoken @types/mongodb
    - nodemon ==> pacote para o hot reload da aplicação
    - @types/express ==> pacote de tipagem do express
    - @types/jsonwebtoken ==> pacote de tipagem do jsonwebtoken
    - @types/mongodb ==> pacote de tipagem do mongodb