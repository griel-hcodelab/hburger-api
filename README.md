# HBURGER API COM NESTJS

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