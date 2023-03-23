"use strict";

let compareButton = document.querySelector('#compare-countries')
let compareCountriesContainer = document.querySelector('#compare-countries-container')
let option1 = document.querySelector('#country1')
let option2 = document.querySelector('#country2')
let resultContainer = document.querySelector('.result')
let country1 = {}
let country2 = {}

compareButton.addEventListener('click', compareCountries)

async function compareCountries() {
  if(container.style.display == 'none'){
    displayHome()
  }else{
    displayCountriesComparison()
    await displayOptions()
    await setCountry(country1)
    await setCountry(country2)
    displayResult(country1, country2)
  }
}

function displayHome(){
  container.style.display = 'block'
  compareButton.innerHTML = 'Comparar taxas'
  compareCountriesContainer.style.display = 'none'
}

function displayCountriesComparison(){
  container.style.display = 'none'
  compareButton.innerHTML = 'Voltar'
  compareCountriesContainer.style.display = 'block'
}

async function displayOptions(){
  let allCountries = await COUNTRIES_DATA.getAllCountries()

  allCountries.forEach(country => {
    option1.options[option1.options.length] = new Option(country, country)
    option2.options[option2.options.length] = new Option(country, country)
  })
  option2.options[1].setAttribute('selected', 'selected')
  country1.name = option1.value
  country2.name = option2.value
}

option1.addEventListener('change', async function() {
  country1.name = option1.value
  await setCountry(country1)
  displayResult(country1, country2)
})

option2.addEventListener('change', async () => {
  country2.name = option2.value
  await setCountry(country2)
  displayResult(country1, country2)
})

async function setCountry(country){
  let data = await COUNTRIES_DATA.getData(country.name)
  let currentTime = new Date()
  updateFooterData(country.name, currentTime)
  postAccessIfCovidApiAccessIsSuccessful(data, country.name, currentTime)
  COUNTRIES_DATA.setCountryData(data)
  country.cases = COUNTRIES_DATA.totalCases
  country.dead = COUNTRIES_DATA.totalDeaths
  country.deathRate = (country.dead/country.cases)
}

function displayResult(country1, country2){
  resultContainer.innerHTML = ''
  resultContainer.style.display = 'block'
  if(country1.name != country2.name){
    let elements = createElements('p')
    let result = calculateResult()
    setResultElements(elements, result)
    addElementsToDataSection(elements, resultContainer)
  }else{
    resultContainer.innerHTML = 'Por favor escolha países diferentes para a comparação.'
  }
}

function setResultElements(elements, result){
  elements[0].innerHTML = `Taxa de morte ${country1.name}: ${country1.deathRate}`
  elements[1].innerHTML = `Taxa de morte ${country2.name}: ${country2.deathRate}`
  elements[2].innerHTML = `Diferença entre os países: <b class="result-text">${result}</b>`
}

function calculateResult(result){
  if(country1.deathRate > country2.deathRate){
    result = (country1.deathRate - country2.deathRate)
  }else{
    result = (country2.deathRate - country1.deathRate)
  }
  return result
}