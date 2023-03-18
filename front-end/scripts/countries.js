"use strict";

let container = document.querySelector('.container')

const MAIN_COUNTRIES = ['Australia', 'Brazil', 'Canada']
MAIN_COUNTRIES.forEach( country => {
  let element = document.createElement('div')
  document.querySelector('#countries').appendChild(element)
  element.classList.add('country')
  element.textContent = country
  element.addEventListener('click', displayDataByCountry)
})

async function displayDataByCountry(){
  if(!COUNTRIES_DATA.lockMode){
    COUNTRIES_DATA.lockMode = true
    clearDataSection()
    clearStatesSection()
    uncheckCountry()
    this.classList.add('selected-country')

    let country = this.textContent
    await ACCESSES.postCountry(country)
    let url = `https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${country}`
    let data = await COUNTRIES_DATA.getData(url)
    COUNTRIES_DATA.setCountryData(data)

    let elements = []
    let dataSection = await createDataSection()
    for(let i = 0; i < 3; i++){
      elements[i] = document.createElement('p')
      dataSection.appendChild(elements[i])
    }

    elements[0].innerHTML = `Dados do país: <b>${country}</b>`
    elements[1].innerHTML = `Total de casos confirmados: ${COUNTRIES_DATA.totalCases}`
    elements[2].innerHTML = `Total de mortes: ${COUNTRIES_DATA.totalDeaths}`

    COUNTRIES_DATA.getStatesData(data)
    let statesSection = await createStatesSection()
    displayDataByState(statesSection)
  }
  COUNTRIES_DATA.lockMode = false
}

function clearDataSection(){
  let dataSection = document.querySelector('.data-section')
  if(dataSection){
    document.querySelector('.data-section').remove()
  }
}

function uncheckCountry(){
  document.querySelectorAll('.country').forEach( c => {
    c.classList.remove('selected-country')
  })
}

async function createDataSection(){
  let dataSection = document.createElement('section')
  dataSection.classList.add('data-section')
  container.appendChild(dataSection)
  return dataSection
}
