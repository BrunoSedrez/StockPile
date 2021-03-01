# StockPile

StockPile é uma plataforma para gerenciamento de pequenos negócios, focada no estoque e automatização de tarefa. 

## Instalação

Foi utilizado MongoDB como o banco de dados, então precisa ser instalado para o projeto funcionar. Além disso, utilizamos o Node.js que precisa ser instalado também.

1. Link para download do Node.Js:
   - https://nodejs.org/en/download/;

2. Link para download do MongoDB:** 

   - https://www.mongodb.com/try/download/community.


**Dentro de "C:" crie uma pasta "data" e dentro desta crie a pasta "db".  

 - Após fazer as devidas instalações e baixar o arquivo do projeto, abra o Prompt de comando no caminho do arquivo e utilize o pacote de gerenciamento do Node.js (NPM), executando o comando "npm i" para instalar as dependências do projeto (lembrando que o comando já citado deve ser feito dentro da pasta stock-pile e também na pasta geral do projeto). 

## Uso

Dentro do Prompt de comando, depois de todas as instalações feitas, execute o comando "npm run dev" para inicializar o projeto por completo.

 Vale ressaltar que o cadastro de usuários não está em funcionamento, a não ser que cadastre manualmente dentro do shell do MongoDB.

  - Para fazer isso, siga os passos:
Abra o Prompt de comando dentro do caminho onde se encontra MongoDB, entre nas pastas na sequência:  >server>4.4(Ou a versão que tiver instalada)>bin.

  - Posteriormente a isso digite o comandos na sequência "mongo", "use projeto final" e o comando para inserir manualmente o usuário é o seguinte: 
 - db.usuario.insertOne({"email_user" : "cliente1@gmail.com", "senha_user" : "2021" })

## Contribuindo
 O projeto é público a fim de atingir contribuições, quando ocorrer, deixe claro quais são as mudanças colocadas em prática! 

## Licença
[MIT] (c)2021 Bruno Sedrez / Guilherme A. H. M. Borges / Italo Ramon Silva Pereira / Yuri Toniolli Vieira