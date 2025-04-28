# Coderlab FullStack Challenge

## Como rodar a aplicação:

### 1 - Clone este repositório

```
$ git clone https://github.com/matheus-santos-da-silva/coderlab-fullstack-challenge
```
### 2 - Na pasta frontend: renomeie o arquivo .env.example para .env 

### 3 - Dentro de .env coloque esta variável:

```
VITE_BACKEND_URL=http://localhost:3000
```
### 4 - Na raiz do projeto rode o comando para o build:

```
docker compose up
```
### 5 - Após finalizar o build, acesse localmente pelo navegador pela url: localhost/product

## Arquitetura:

### Trabalhando com Use Cases

#### **Domain:**

A camada central e mais interna da aplicação é onde são definidas as regras de negócio, entidades e interfaces.

#### **Presentation:**

Essa camada é responsável pela interação com requisições externas, sendo a porta de entrada para os efeitos de um usuário, aplicativo ou uma mensagem terão no domínio da aplicação. Aqui, as solicitações são aceitas e as respostas são moldadas antes de serem exibidas ao usuário.

#### **Data:**

Camada responsável por implementar os protocolos dos casos de uso presentes na camada de domínio, nela são injetados os repositórios vindos da camada de infra para realizar a comunicação com banco de dados.

#### **Infra:**

Esta camada é a que acessa serviços externos, como banco de dados, sistemas de mensagens e serviços de e-mail.

## Tecnologias Utilizadas:

### Backend
- NodeJS
- Typescript
- NestJS
- Prisma
- PostgreSQL
- Multer
- Docker

### Frontend
- React
- SASS
- Shadcn/ui
- Chakra UI
- Zod

## Razão da escolha das tecnologias

### Prisma / PostgreSQL - 
Resolvi utilizar eles por entender a facilidade que o Prisma traz em trabalhar com o PostgreSQL, além de já ter familiaridade com ambos.
  
### Multer - 
Utilizei o Multer para lidar com o upload das imagens dos produtos vindas do front, também por já ter trabalhado com ele antes.
  
### Chakra UI / Shadcn UI -
Com relação a essas duas ferramentas resolvi utilizar para cumprir os requisitos, nunca tinha trabalhado com elas antes, mas achei incrível a forma que elas agilizam o desenvolvimento.

### Zod -
E resolvi utilizar o Zod para a validação de dados pela praticidade e segurança que ele traz.  
