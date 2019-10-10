# API - DISCIPLINA DE PROG WEB 2

Esse projeto foi criado com o objetivo de ser o trabalho 1 da disciplina de Programação Web 2 ministrada pelo professor Leonardo Moreira no semestre letivo 2019.2 do curso Sistemas e Mídias Digitais da Univerdade Federal do Ceará. 


#### Responsáveis pelo Projeto:

  - [Matrícula: 397874] Rafaelly Freitas Ferreiras


## O que é necessário instalar?

  - Ruby versão 2.2.6
  - Rails versão 5.2.3
  - PostgreSQL
  
  
*DICA: O site a seguir possue todos os componentes necessários para a instalação https://gorails.com/setup/ubuntu/16.04*
  
## Executando pela primeira vez:

#### 1. Baixando o Projeto

Baixe o projeto clicando no botão verde escrito "Clone or download" e escolha a forma que seja executar a operação.

#### 2. Criando o Banco de Dados

<<<<<<< HEAD
* ...
# drive_progweb2
=======

Na interface do PostgreSQL crie uma database com o nome **desenv** e dentro dela um schema com o nome de **api_web2**

*Obs: é necessário que o usuário e senha de acesso ao banco postgreSQL sejam alterados no arquivo database.yml*


Após baixar ter baixado a aplicação na sua máquina e criado o Banco de Dados, usando o **prompt de comando** entre na pasta do projeto e continue com os passos a seguir:

#### 3. Intalando as dependências do projeto

> bundle install
   
Com o comando acima você estatá instalando a lista de dependências que são necessárias para esse projeto rodar.


#### 4. Criando as tabelas no Banco de Dados

> rake db:migrate

Após rodar esse comando você vai ter criado todas as tabelas do seu projeto no schema que você no tópico anterior.

#### 5. Subindo o servidor

> rails s 

Usando esse comando você sobe o projeto no servidor local e sua aplicação já esta pronta pra uso na url http://localhost:3000/

## Executando mais vezes:

Segue abaixo como você deve executar o projeto após a primeira instalação:

> rails s 

Basta subir o servidor normalmente e acessar a url http://localhost:3000/
>>>>>>> 336feeeab484d987cf781d309ec563f1771330a1
# drive_progweb2
