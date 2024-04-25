# 👨‍💻 Criando API REST com NodeJS

# Requisitos Funcionais

- [X] O usuário deve poder criar uma nova transação
- [X] O usuário deve poder obter um resumo da sua conta (rota que retorna o valor total entre as transações)
- [X] O usuário deve poder listar todas as transações que já ocorreram
- [X] O usuário deve poder visualizar uma transação única

# Regras de Negócios

- [X] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
- [ ] Deve ser possível identificarmos o usuário entre as requisições
- [ ] O usuário só pode visualizar transações o qual ele criou

# Regras Não Funcionais

- [ ] ...

🕸️ **Fastify:** é um micro framework do NodeJS popular com uma API semelhante ao `express`, sendo mais atual, mais perfomática e mais atualizad que o `express`. 

- Extremamente performático.
- Integrado ao TypeScript
- Desenvolvimento amigável

## 💽 Banco de Dados

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
    
    🤖 **Knex:** é um construtor de consultas para o banco de dados que ele se conecta. Fornece um conjunto de funcionalidades básicas para relizar qualquer tipo de operação no banco de dados.
    
    🦴 **Zod:** É uma biblioteca usada para a validação de qualquer tipo de dados, para validar criação de usuários, variáveis de ambientes e etc.
    
    🌐 **Insomnia:** É um fremework Open Source para desenvolvimento/teste de API Clientes. Com ele podemos fazer requisições Rest, SOAP, GraphQ e GRPC. Ao utilizar essa ferramenta, é possível fazer requisições para API’s.
    
    🍪 **Cookies:** Basicamente são formas de manter contexto entre requisições, são muito utilizados em redes sociais, é obrigado pela LGPD (Lei Geral de Proteção de Dados) que seja perguntado ao usuário se ele aceita salvar os cookies naquela aplicação. Esse “ID” salvo pelos cookies, é usada para conseguir validar se a mesma pessoa, baseada no ID que está salvo nos cookies, fez requisições e e etc.
    
    ## 🔬 Testes Automatizados
    
    **Testes Automatizados:** É uma maneira de controlar a execução de teste de software, a comparação com dos resultados esperados com os resultados reais. Nada mais é que automarizar um processo manual conduzido por humanos afim de revisar e validar determinado produto. Grande parte dos projetos que utilizam de desenvolvimentos ágeis e DevOps, incluem testes automatizados desde o ínicio.
    
    Existem diversos tipos de testes: 
    
    - **Unitários**: testam uma pequena unidade da aplicação,  uma pequena parte de forma isolada, como uma função por exemplo, esses testes unitários confirma se a entradada esperada para uma função corresponde à saída.
    - **Integração:** Uma unidade do código pode fazer uma chamada externa para um serviço de terceiros (Uma API por exemplo), e o código que está sendo testado não terá acesso ao código desta API por exemplo, então o testes de integração envolvem simular essas dependências de terceiros  ou comunicação entre duas ou mais unidades e confirma que o código que tem interface com elas se comporta como esperado. São semelhantes aos testes unitários na forma como são escritos e em relação às ferramentas.
    - **Testes de Ponta a Ponta (E2E):** São testes que simulam uma experiência de nível de usuário, as ferramentas de E2E capturam e reproduzem ações do usuário, de modo que os planos de testes passam a ser gravações dos principais fluxos e experiência do usuário
    
    **Pirâmide de Testes:** é uma forma gráfica de demonstrar de maneira simples os tipos de testes, seus níves, velocidade de implementação e complexidade dos testes realizados. Isso pode ser feito para nos ajudar a chegar ao custo de implementação e a manutenção de cada nível de teste, além de nos fornecer informações de qual nível devemos testar primeiro.
    
    A divisão mais comum é representada por três níveis
    
    - Base: Testes de unidades
    - Meio: Testes de Integração
    - Topo: Testes de Ponta a Ponta (E2E, UI ou Testes de Interfaces)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/650c2987-9124-4ff9-904d-373e85470c0a/d7e59733-b11c-49c9-a3ec-c7c95e88a61f/Untitled.webp)
    
    A ideia no final é que tenha poucos testes E2E, muitos testes de integração e mais ainda testes unitários
    
    ### **Ferramenta de Testes**
    
    Em ambientes JavaScript, o comum é usar ferramentas de terceiros para fazer os testes. O Node tem uma API de testes mas é recente e ainda experimental, o que não faz sentido utilizar por agora.
    
    **[JestJS](https://jestjs.io/pt-BR/):** é um poderoso framework de testes em JavaScript com foco na simplicidade, provavelmente o mais famoso em JavaScript, funciona em Babel, Typescript, Node, React, Angular , Vue e etc. 
    
    **[Vitest](https://vitest.dev/):**  Por baixo dos panos, utiliza o ESBUILD (mesma ferramenta utilizada pelo TSX, Vite), um bundler escrito em TypeScript para converter os códigos em JavaScript, sem a necessidade de configurações como é no JestJS que usa o Babel por exemplo. O Vitest é compátivel com o Jest, sendo o código igual e a diferença sendo o que acontece por trás dos panos.
    
    Arquivos de testes:
    
    `example.spec.ts` or `example.test.ts` 
    
    Estrutura do arquivo teste
    
    ```jsx
    import { test } from 'vitest'
    
    test('o usuário consegue  criar uma nova transação', () => {
    	
    })
    ```
    
    <aside>
    💡 Todo teste deve, obrigatoriamente, se excluir de qualquer contexto.
    
    </aside>
    
    Não posso escrever um teste que depende de outro teste, se um teste depende de outro, eles deveriam ser o mesmo teste.
    
    Para essa aplicação, eu utilizei o Vitest e pude finalmente entender os conceitos de testes, como resumi acima e implementei testes E2E (ponta a ponta), aqui vai um trecho do código, você pode olhar melhor na pasta /test/transaction.spec.ts 
    
    ```jsx
      it('should be able to list a specific transaction by id', async () => {
        const createTransactionResponse = await request(app.server)
          .post('/transactions')
          .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
          })
          .expect(201)
    
        const cookies = createTransactionResponse.get('Set-Cookie')!
    
        const listTransactionsResponse = await request(app.server)
          .get('/transactions')
          .set('Cookie', cookies)
          .expect(200)
    
        const transactionID = listTransactionsResponse.body.transactions[0].id;
    
        const transaction = await request(app.server)
          .get(`/transactions/${transactionID}`)
          .set('Cookie', cookies)
    
        expect(transaction.body).toEqual(expect.objectContaining({
          title: 'New transaction',
          amount: 5000
        }))
      })
    ```
    
    Aqui é um teste para testar se o usuário está conseguindo pegar uma transação pelo ID daquela transação.

    ### 🖥️Deploy


  Arquiteturas de deploy é a maneira como você disponibiliza sua aplicação ao usuário final, existem diversas abordagem e tecnologias para isso e aqui vão algumas:
  - **Deploy Tradicional em Servidores Físicos ou Virtuais:** você configura um servidor físico/virtual, configura e instala todos os componentes necessários para executar seu aplicativo. Exemplos que incluem a máquina virtual: Azure, AWS e Google Cloud.
  - **Contâiners Dockers**: Você empacota seu aplicativo e todas as suas dependências em container docker. Gerando um unidade isolada de software que pode ser executada em qualquer ambiente que tenha o Docker instalado, garantindo portabilidade e consistência. Exemplos: Kubernetes para a orquestrações de containers.
  - **Serverless (Computação sem servidor)**: Nesse modelo, você não precisa se preocupar com infraestrutura subjacente. Você apenas carrega seu código, a plataforma em que você está trabalhando se encarrega de escalonar e gerenciar a execução conforme necessário. Exemplos: AWS Lambda, Google Cloud Functions e Azure Functions.
  - **Plataformas de Hospedagem de Aplicativos (PaaS):** Fornecem um ambiente completo para construir, implantar e gerenciar seus aplicativos sem se preocupar com a infraestutura subjacente. Exemplos: Heroku, Google App Engine e Microsoft Azure App Service.
  - **Arquiteturas baseada em Micro-serviços:** Neste estilo arquitetural, um aplicativo é construído em conjunto com serviços pequenos e indepentendes, cada um executando um processo específico e se comunicando  através de APIs. Isso permite uma escalabilidade e manutenção. Netflix, Uber e Spotify utilizam dessa arquitetura.