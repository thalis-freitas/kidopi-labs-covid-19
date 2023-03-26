# Kidopi Labs - Covid 19

Uma aplicação web que possibilita ao usuário obter informações sobre os casos de mortes por Covid desenvolvida para processo seletivo da Kidopi.

## Sumário

  * [Tarefas](#tarefas)
  * [Tecnologias utilizadas](#tecnologias-utilizadas)
  * [Configurações necessárias](#configurações-necessárias)
  * [Passo a passo para rodar o projeto](#passo-a-passo-para-rodar-o-projeto)
  * [Documentação da API de acessos](#documentação-da-api-de-acessos)
  * [Comando para rodar os testes da API](#comando-para-rodar-os-testes-da-api)
  * [Comando para derrubar a app](#comando-para-derrubar-a-app)

## Tarefas
<div align="justify">

- [x] 1 - Criar uma página que permita escolher entre três países (Brazil, Canada ou Australia) e se comunique com a API-Covid-19. Ela também deverá mostrar o número total de casos confirmados e mortes do país selecionado. Ao selecionar um país, a página também deve exibir os dados de cada estado.

- [x] 2 - Armazenar em um banco de dados (MySQL) a data e hora de todos os acessos que o script fez à API-Covid-19, bem como qual o país escolhido para a consulta.

- [x] 3 - A página deve ser criada utilizando HTML, CSS e JS. Deve exibir no rodapé da página, a data e o país procurado no último acesso à API-Covid-19.

- [x] Bônus - Criar uma interface web local em que o usuário possa escolher dois países diferentes. Obter os dados de covid desses países escolhidos e mostrar na interface a diferença da taxa de morte entre esses países selecionados (taxa de morte do país todo). Para esse cálculo da diferença utilize de subtração simples (TaxaPais1 - TaxaPais2). A taxa de morte pode ser calculada pela fórmula: Taxa de morte = Mortes / Confirmados.
</div>

<h4 align="center">
:construction: Em desenvolvimento...
</h4>

## Tecnologias Utilizadas

* PHP
* MySQL
* Laravel
* Docker
* HTML
* CSS
* Javascript

## Configurações necessárias

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [PHP 8.1](https://www.php.net/)
- [Laravel 10.3](https://laravel.com/docs/10.x)
- [Composer 2.5.4](https://getcomposer.org/)


## Passo a passo para rodar o projeto

1. Clone o projeto:

```
 git clone git@github.com:Thalis-Freitas/kidopi-labs-covid-19.git
```

2. Entre na pasta back-end do projeto:

```
 cd kidopi-labs-covid-19/back-end/
```

3. Renomeie o arquivo `.env.example` para `.env`:

```
 mv .env.example .env
```

4. Instale as dependências:

```
 composer install
```

5. Execute o comando para configurar o alias do shell que permitirá executar os comandos do Sail com mais facilidade:

```
 alias sail="./vendor/bin/sail"
```

6. Com o Docker Desktop rodando, inicie a app:

```
 sail up -d
```


7. Gere uma nova chave `APP_KEY` que será utilizada no arquivo `.env`:

```
 sail artisan key:generate
```

8. Execute as migrations:

```
 sail artisan migrate
```

9. Abra a página front-end/index.html em um navegador para visualizar o projeto

## Documentação da API de acessos

O caminho para consultar a API de acessos localmente é http://localhost

### Obter último acesso

**Endpoint: GET /api/accesses/last**

#### Retorno `200` (Sucesso)

```json
{
  "id":17,
  "country":"Australia",
  "date_time":"2023-03-20 16:21:15"
}
```

### Registrar um acesso

**Endpoint: POST /api/accesses**

#### Os dados para a criação de um acesso devem ser enviados no seguinte formato:

```json
{
  "country":"Brazil",
  "date_time":"2023-03-20 17:15:20"
}
```

#### Retorno `200` (Sucesso)

```json
{
  "message":"Acesso registrado com sucesso!",
  "data":{
    "country":"Brazil",
    "date_time":"2023-03-20 17:15:20",
    "id":18
  }
}
```

#### Cenário de erro com parâmetros inválidos:

```json
{
  "country":"",
  "date_time":"20-03-2023 17:20:34"
}
```

#### Retorno `422` (Unprocessable Entity)

```json
{
  "message": "O campo país não pode ficar em branco. (and 1 more error)",
  "errors": {
    "country": [
      "O campo país não pode ficar em branco."
    ],
    "date_time": [
      "O campo data deve estar no formato Y-m-d H:i:s."
    ]
  }
}
```

## Comando para rodar os testes da API

```
 sail artisan test
```

## Comando para derrubar a app

```
 sail down
```