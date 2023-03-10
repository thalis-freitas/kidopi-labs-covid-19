"use strict";

let container = document.querySelector('.container')

APP.countries.forEach((country) => {
  let element = document.createElement('div')
  document.querySelector('#countries').appendChild(element)
  element.classList.add('country')
  element.textContent = country
  element.addEventListener('click', displayDataByCountry)
})

async function displayDataByCountry(){
  clearDataSection()
  clearStatesSection()
  uncheckCountry()
  this.classList.add('selected-country')

  let country = this.textContent
  let url = `https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${country}`
  let data = await APP.getData(url)
  APP.setCountryData(data)

  let elements = []
  let dataSection = await createDataSection()
  for(let i = 0; i < 3; i++){
    elements[i] = document.createElement('p')
    dataSection.appendChild(elements[i])
  } 

  elements[0].innerHTML = `Dados do país: <b>${country}</b>`
  elements[1].innerHTML = `Total de casos confirmados: ${APP.totalCases}`
  elements[2].innerHTML = `Total de mortes: ${APP.totalDeaths}`

  APP.getStatesData(data)
  let statesSection = await createStatesSection()
  displayDataByState(statesSection)
}

function clearDataSection(){
  let dataSection = document.querySelector('.data-section')
  if(dataSection)
    document.querySelector('.data-section').remove()
}

function uncheckCountry(){
  document.querySelectorAll('.country').forEach(c => {
    c.classList.remove('selected-country')
  })
}

async function createDataSection(){
  let dataSection = document.createElement('section')
  dataSection.classList.add('data-section')
  container.appendChild(dataSection)
  return dataSection
}