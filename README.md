# Kidopi Labs - Covid 19

Uma aplicação web que possibilita ao usuário obter informações sobre os casos de mortes por Covid desenvolvida para processo seletivo da Kidopi.

## Tecnologias Utilizadas

* Docker
* PHP
* MySQL
* Javascript
* HTML
* CSS

## Tarefas
<div align="justify">

- [x] 1 - Criar uma página que permita escolher entre três países (Brazil, Canada ou Australia) e se comunique com a API-Covid-19. Ela também deverá mostrar o número total de casos confirmados e mortes do país selecionado. Ao selecionar um país, a página também deve exibir os dados de cada estado.

- [ ] 2 - Armazenar em um banco de dados (MySQL) a data e hora de todos os acessos que o script fez à API-Covid-19, bem como qual o país escolhido para a consulta.

- [ ] 3 - A página deve ser criada utilizando HTML, CSS e JS. Deve exibir no rodapé da página, a data e o país procurado do último acesso à API-Covid-19.

- [ ] Bônus - Criar uma interface web local em que o usuário possa escolher dois países diferentes. Obter os dados de covid desses países escolhidos e mostrar na interface a diferença da taxa de morte entre esses países selecionados (taxa de morte do país todo). Para esse cálculo da diferença utilize de subtração simples (TaxaPais1 - TaxaPais2). A taxa de morte pode ser calculada pela fórmula: Taxa de morte = Mortes / Confirmados.
</div>

<h4 align="center">
:construction: Em desenvolvimento...
</h4>

## Requisitos

Para rodar este projeto, é necessário que você possua o Docker instalado na máquina que será utilizada. Caso ainda não possua, você pode seguir as instruções da documentação oficial para fazer a instalação: [Docker-Desktop](https://www.docker.com/products/docker-desktop/)

## Passo a passo para rodar o projeto

<p align = "justify"> 1. Clone o projeto: </p>

```
 git clone git@github.com:Thalis-Freitas/kidopi-labs-covid-19.git
```

<p align = "justify"> 2. Entre na pasta do projeto: </p>

```
 cd kidopi-labs-covid-19
```

<p align = "justify"> 3. Com o Docker Desktop rodando, inicie a app: </p>

```
 docker compose up
```

<p> 4. Acesse <a href="http://localhost:8000/"> http://localhost:8000/</a></p>

#### Você pode finalizar a execução da app quando desejar, para isso pressione CTRL+C no terminal