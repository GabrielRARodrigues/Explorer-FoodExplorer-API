<h1 align="center"> 🍽️ Food Explorer - API </h1>

<br>

# 📋 Índice

- [📋 Índice](#-índice)
- [💻 Sobre o Projeto](#-sobre-o-projeto)
- [⚒️ Tecnologias](#️-tecnologias)
- [📦 Pré-requisitos](#-pré-requisitos)
- [▶️ Instalação e Execução](#️-instalação-e-execução)
- [🚀 Deploy](#-deploy)
- [🌐 Front-End](#-front-end)
- [📝 Licença](#-licença)

<br>

# 💻 Sobre o Projeto

O Food Explorer é uma Aplicação Web SPA (*Single Page Application*) que consome dados de uma API própria e simula um cardápio virtual, como um menu interativo para um restaurante fictício.

No contexto deste projeto, existem duas personas: o usuário comum e o admin.

O admin tem as responsabilidades de gerenciar e administrar o restaurante, portanto, ele pode criar, visualizar, editar e apagar pratos a qualquer momento. Cada prato deve pertencer a uma categoria de três possíveis, sendo elas: **Refeição**, **Sobremesa** e **Bebida**. Cada prato possui uma imagem, um nome, um preço, uma breve descrição (opcional) e uma lista de ingredientes (opcional). 

O usuário comum poderá visualizar todos os pratos registrados e, ao clicar no nome de um prato, será redirecionado para uma nova página contendo informações mais detalhadas sobre o mesmo.

<br>

# ⚒️ Tecnologias

As principais tecnologias usadas nesse projeto foram:

- **[NodeJS](https://nodejs.org)**
- **[Express](https://expressjs.com)**
- **[Express Async Errors](https://www.npmjs.com/package/express-async-errors)**
- **[Bcryptjs](https://www.npmjs.com/package/bcryptjs)**
- **[Knex](https://knexjs.org)**
- **[Multer](https://www.npmjs.com/package/multer)**
- **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)**
- **[Cors](https://www.npmjs.com/package/cors)**
- **[Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
- **[Sqlite](https://www.sqlite.org/index.html)**

<br>

# 📦 Pré-requisitos

Pré-requisitos necessários para a utilização do projeto:

- [NodeJS](https://nodejs.org/) - Versão 18.7.1 ou superior.
- [npm](https://www.npmjs.com/) - Versão 10.1.0 ou superior. Ou [Yarn](https://yarnpkg.com/)

<br>

# ▶️ Instalação e Execução

Siga os seguintes passos para instalar e executar a aplicação na sua máquina:  

1. **Clone este repositório:**

   ```bash
     git clone https://github.com/GabrielRARodrigues/explorer-final-task_api.git
   ```

   Ou utilizando a Github CLI:
    
   ```bash
     gh repo clone GabrielRARodrigues/explorer-final-task_api
   ```
   
3. **Navegue até o diretório gerado:**

    ```bash
      cd explorer-final-task_api
    ```

3. **Instale as dependências:**

    ```bash
      npm install
    ```
    
    Ou
  
    ```bash
      npm i
    ```

Por fim

4. **Execute a aplicação:**

    ```bash
      npm run dev
    ```

Após esses passos a **API** do **Food Explorer** está instalada, configurada e em execução na sua maquina. Você pode usá-la para testes e desenvolvimento.
    
<br>

# 🚀 Deploy

**Para acessar o deploy e testar todas as funcionalidades, basta clicar no link abaixo:**

**[Food Explorer - Deploy ](https://foodexplorerfront.netlify.app/)**

- Para acessar a conta de administrador, utilize as seguintes credenciais:
  
    - Email:
  
      ```text
         admin@foodexplorer.com
      ```

   - Senha:

      ```text
       j5suk8TRoN&p
      ```
      
- Para acessar a conta de usuário, basta clicar em Criar Conta > Preencher as informações > Clicar em cadastrar
- Após realizar os passos acima, utilize a conta cadastrada para entrar como usuário.

<br>

# 🌐 Front-End

**Para acessar o repositório do código Front-End, clique no link abaixo:**

 **[Food Explorer - Front-End](https://github.com/GabrielRARodrigues/explorer-final-task_web)**

<br>

# 📝 Licença

Esse projeto está sob a licença MIT. Isso significa que você pode usar, modificar e distribuir o código deste repositório livremente, desde que inclua a declaração de direitos autorais e a licença MIT em qualquer cópia ou parte dela.
  