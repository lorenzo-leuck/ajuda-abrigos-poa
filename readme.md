# Início do Projeto

Ideia inicial: ajudar os abrigos na organização de doações e voluntários.

## Escolha do stack

Entrega rápida - MVP
Minimum viable product  

MERN

Mongo, Express, React e Node

muito utilizado da indústria, portanto bastante documentação

## Uso de IA

Gpt engineer
Gpt pilot

Não deram certo para setar o prjeto.

Contudo,ChatGPT com instruções claras foi muito bom para geração de códigos 

# Frontend 

Comecei desenhando as telas no meu caderninho

Então setei o front para testar conceitos

vite + material design

# Backend

Feito em javascript

Desvantagens
- Risco de segurança
- Problemas de memória
- Dificulta a vida do desenvolvedor (no começo dá agilidade, mas depois atrapalha o debug e a compreensão do código)

Escolhi mongo pela praticidade
e tambem porque o mongo te da um banco gratuito de 512mb

Uma boa alternativa seria usar usar Nest para melhor desenvolvimento e escalabilidade

# Infraestrutura

Dockerfiles 
Docker-compose

Tem que setar network para os containers se conversarem

## AWS

Má escolha: Amazon Linux
Documentacao oficial do docker nao funciona

tive que usar sudo yum docker

micro.t2
8gb hd e 1gb ram

configurar security group, e abrir os ports

atribuir o dns no route 53

port default 5173 do vite não funcionou porque tem que ser porta 80
