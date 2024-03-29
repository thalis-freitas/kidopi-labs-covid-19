"use strict";

let container = document.querySelector('#container')

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
    clearAllData()
    this.classList.add('selected-country')
    let country = this.textContent
    let data = await prepareCountryDataForDisplay(country)
    prepareStatesDataForDisplay(data)
    let currentTime = new Date()
    updateFooterData(country, currentTime)
    postAccessIfCovidApiAccessIsSuccessful(data, country, currentTime)
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

function setCountryElements(elements, country){
  elements[0].innerHTML = `Dados do país: <b>${country}</b>`
  elements[1].innerHTML = `Total de casos confirmados: ${formatValue(COUNTRIES_DATA.totalCases)}`
  elements[2].innerHTML = `Total de mortes: ${formatValue(COUNTRIES_DATA.totalDeaths)}`
  return elements
}

function addElementsToDataSection(elements, dataSection){
  dataSection.appendChild(elements[0])
  dataSection.appendChild(elements[1])
  dataSection.appendChild(elements[2])
}

function clearAllData(){
  clearDataSection()
  clearStatesSection()
  uncheckCountry()
}

async function prepareCountryDataForDisplay(country){
  let data = await COUNTRIES_DATA.getData(country)
  if(data){
    COUNTRIES_DATA.setCountryData(data)
    let dataSection = await createDataSection()
    let elements = createElements('p')
    elements = setCountryElements(elements, country)
    addElementsToDataSection(elements, dataSection)
    return data
  }else{
    let dataSection = await createDataSection()
    let errorMessage = document.createElement('p')
    errorMessage.innerHTML = `Ops, ocorreu um erro ao carregar os dados do país ${country}`
    dataSection.appendChild(errorMessage)
  }
}

async function prepareStatesDataForDisplay(data){
  COUNTRIES_DATA.getStatesData(data)
  let statesSection = await createStatesSection()
  displayDataByState(statesSection)
}

async function postAccessIfCovidApiAccessIsSuccessful(data, country, date){
  if(data){
    await ACCESSES.postCountry(country, date)
  }else{
    lastDate.style.display = 'inline-block'
    lastCountry.style.display = 'inline-block'
  }
}

function formatValue(value) {
  return value.toLocaleString('pt-BR')
}