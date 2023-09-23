# Desafio de Desenvolvimento Backend Node.js: Sistema de Reserva de Viagens Espaciais

Neste desafio, você será encarregado de criar um sistema de reserva de viagens espaciais em Node.js que atenda a dois atores principais: o passageiro e o gerente. O sistema permitirá que os passageiros acessem, escolham viagens, selecionem no máximo duas cadeiras, recebam um cartão de confirmação e troquem ou cancelem a passagem. O gerente terá o poder de incluir novas viagens, cancelar ou remarcar viagens. Além disso, o sistema utilizará a moeda fictícia "Estalecas" ($∑) para processar os pagamentos. O prazo para a entrega do desafio é 25/09/2023.

Requisitos do Sistema:

## 1 - Autenticação:

- Os passageiros devem se autenticar para reservar viagens e acessar suas reservas.
- O gerente deve se autenticar para gerenciar viagens.

## 2 - Gerenciamento de Viagens:

### O gerente deve ser capaz de:

- Incluir novas viagens com informações como destino, data, horário de partida, horário de chegada, preço e quantidade - de assentos disponíveis.
- Cancelar viagens existentes.
- Remarcar viagens existentes.

## 3 - Reserva de Passagens:

### Os passageiros devem ser capazes de:

- Visualizar as viagens disponíveis com detalhes, incluindo o preço e a quantidade de assentos disponíveis.
- Reservar até no máximo duas cadeiras em uma viagem.
- Receber um cartão de confirmação após a reserva.

## 4 - Troca ou Cancelamento de Passagens:

### Os passageiros devem ser capazes de:

- Trocar a data ou destino da passagem, se houver disponibilidade.
- Cancelar a passagem, recebendo um reembolso adequado em Estalecas ($∑).

## 5 - Testes Unitários:

- Escreva testes unitários para garantir que todas as funcionalidades do sistema estejam funcionando corretamente.

Este é um desafio de desenvolvimento backend, e você não precisa se preocupar com o desenvolvimento de uma interface de usuário (frontend). Certifique-se de considerar casos de erro e implementar boas práticas de segurança.
