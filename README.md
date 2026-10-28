# SenaiFlix

App mobile de catálogo de filmes inspirado em plataformas de streaming, feito com React Native, Expo e TypeScript.

## Telas

| Tela | O que faz |
|---|---|
| Início | Apresentação do app com botão para entrar |
| Catálogo | Lista de filmes vinda da API, com puxar para atualizar e tratamento de erro |
| Detalhes | Pôster, ano, duração, classificação, sinopse, gênero e direção do filme |

## Tecnologias

React Native, Expo, Expo Router (rotas baseadas em arquivos) e TypeScript.

## Estrutura

A pasta `SenaiFlix/src` está organizada em `app` (telas), `components` (cartão de filme e estados de carregamento/erro), `services` (acesso à API) e `constants` (paleta de cores).

## Como rodar

1. Entre na pasta do app: `cd SenaiFlix`
2. Instale as dependências: `npm install`
3. Em `src/services/filmes.ts`, ajuste a constante `BASE` para o endereço da sua API de filmes (o app espera `GET /filmes` e `GET /filmes/{id}`).
4. Inicie o projeto: `npx expo start`
