# HBURGER API COM NESTJS

Modelo que deverá ser implementado: [HBurguer](https://hburger-9a4f7.web.app/)

## Primeiros passos:

Clone este projeto em seu computador:

    https://github.com/griel-hcodelab/hburger-api.git

Instale as dependências do projeto:

    npm install

Altere os usuários e senhas do MySQL local:

**No arquivo .env:**
Linha 3: Nome de usuário do seu MySQL Local
Linha 4: Senha do seu usuário MySQL local

**No arquivo ormconfig.json:**
Linha 2: Nome de usuário do seu MySQL Local
Linha 3: Senha do seu usuário MySQL local

---

## Repositório no Git

Para melhor organização do projeto, crie uma branch com seu nome e envie todas as suas alterações para ela. Dessa forma as suas mudanças não irão entrar em conflito direto com as mudanças de outro membro do grupo.

    git checkout -b SeuNome

Commite todas as suas alterações, mesmo que seja pequena!

---

## Scripts pré-definidos:

    npm run dev
Executa o projeto
 
--

    npm run migrate:create -- -n Nome
Cria uma migration

--

    npm run migrate:up
Cria as tabelas e atualiza o banco de dados

--

    npm run migrate:down
Reverte a última alteração no banco de dados

--

    npx prisma generate

Atualiza o arquivo schema.prisma, após alguma alteração neste arquivo

---

# Todo:

## Usuários:
- Criar a autenticação, com e-mail e senha e gerar um JWT
- Upload da foto 
- Alteração da senha
- Alteração dos dados cadastrais
- Esqueci a senha com e-mail enviado ao usuário e o link de recuperação [(Aula de Referência)](https://www.youtube.com/watch?v=KC0ZuLhBPf4&list=PL7mik6do621Nl3qx9IOsEf2xtfw3Ym7i5&index=42)

## Hamburgers:
- Listagem de lanches (Nome, ingredientes, valor)
- Listagem dos pães (Nome, descrição e valor)
- Listagem de carnes (Nome e valor)

## Bandeja:
- Salvar o lanche escolhido na conta do usuário (Lanche, pão, carne e valor total)
- Retornar a quantidade total de lanches na bandeja
- Exibir o valor total dos lanches escolhidos

## Pedidos:
- Listar todos os pedidos do usuário, com o número do pedido, data da compra, valor total e itens
- Não permitir a exclusão de pedidos com mais de 1 dia de criação