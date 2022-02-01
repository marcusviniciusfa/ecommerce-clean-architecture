## E-Commerce com Arquitetura Limpa

Um sistema de vendas online com a possibilidade de realizar pedidos com múltiplos itens, cada um deles com uma quantidade variável, calculando o frete, os impostos, aplicando um cupom de desconto e ainda interagindo com o estoque. Além disso teremos ainda fluxos de pagamento e cancelamento do pedido realizado

### Cenários

#### Parte 1

- [x] Não deve fazer um pedido com cpf inválido
- [x] Deve fazer um pedido com 3 itens (com descrição, preço e quantidade)
- [x] Deve fazer um pedido com cupom de desconto (percentual sobre o total do pedido)

#### Parte 2

Para o cálculo do frete considerar a [Fórmula de Cálculo do Frete](fórmula-de-cálculo-do-frete)

- [x] Não deve aplicar cupom de desconto expirado
- [x] Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg)
- [x] Deve retornar o preço mínimo, de 10 reais, de frete caso ele seja superior ao valor calculado

#### Fórmula de Cálculo do Frete

Preço do Frete(R$) = distância(km) \* volume(m3) \* (densidade(kg/m3)/100)

Considerando a compra

- 1x Guitarra
- 1x Amplificador
- 3x Cabos

##### Exemplos de volume ocupado (cubagem)

Volume(m3) = largura(cm) \* altura(cm) \* profundidade(cm)

- Guitarra: (100/100) \* (30/100) \* (10/100) = 0,03
- Amplificador: (100/100) \* (50/100) \* (50/100) = 0,25
- Cabo: (10/100) \* (10/100) \* (10/100) = 0,001

##### Exemplos de densidade

Densidade(kg/m3) = peso(kg) / volume(m3)

- Guitarra: 3 / 0,03 = 100
- Amplificador: 20 / 0,25 = 80
- Cabo: 0,9 / 0,001 = 900

##### Exemplos

- Guitarra

  - distância: 1000 (fixo)
  - volume: 0,03
  - densidade: 100
  - preço: (1000 \* 0,03 \* (100 / 100)) = R$30,00

- Amplificador

  - distância: 1000 (fixo)
  - volume: 0,25
  - densidade: 80
  - preço: (1000 \* 0,25 \* (80 / 100)) = R$200,00

- Cabo

  - distância: 1000 (fixo)
  - volume: 0,001
  - densidade: 900
  - preço: (1000 \* 0,001 \* (900 / 100)) = R$9,00 = R$10,00(frete mínimo) \* 3(quantidade de cabos) = R$30,00
