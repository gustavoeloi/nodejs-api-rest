# :computer: Criando uma API Rest com NodeJS

Repositório de estudos: Estou estudando o desenvolvimento backend com NodeJS e com isso estou aprofundando em diversas tecnologias utilizada nesse ecossistema JS.

**Fastify:** é um micro framework do NodeJS popular com uma API semelhante ao `express`, sendo mais atual, mais perfomática e mais atualizad que o `express`. 

- Extremamente performático.
- Integrado ao TypeScript
- Desenvolvimento amigável

**SQLite:** é um banco de dados relacional, excelente para aprendizagem. Todos os dados são salvos em arquivos físicos, sem a necessidade de instalação de softwares. 

- As querys no banco de dados, são semelhantes aos outros banco de dados relacionais como MySql, PostgreSQL.
- Existem várias estratégias para a conexão com banco de dados
    - Drivers nativos (bibliotecas de baixo nível) → as query serão buscadas da maneira menos abstrada possível.
    - Query Builders (Construtor de Querys) → Não é necessário conhecimento profundo em banco de dados, o foco é mais na linguagem de desenvolvimento. Mistura código JavaScript com o banco de dados.
        
        ```jsx
        knex('users'.where({ // Isso aqui será convertido para um query na liguagem SQL
        	first_name: 'Test',
        	last_name: 'User'
        }).select('id')
        ```
        
    - ORM (Object Relational Mapper) → é uma técnica utilizada no desenvolvimento de software que permite mapear objetos em um sistema orientado a objetos para tabelas em um banco de dados.
    
    **Knex:** é um construtor de consultas para o banco de dados que ele se conecta. Fornece um conjunto de funcionalidades básicas para relizar qualquer tipo de operação no banco de dados.
    
    **Zod:** É uma biblioteca usada para a validação de qualquer tipo de dados, para validar criação de usuários, variáveis de ambientes e etc.
