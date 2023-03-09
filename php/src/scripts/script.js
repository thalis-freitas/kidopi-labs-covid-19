"use strict";

APP.countries.forEach((country) => {
  let element = document.createElement('div')
  document.querySelector('#countries').appendChild(element)
  element.classList.add('country')
  element.textContent = country
  element.addEventListener('click', getCountryData)
})

async function getCountryData(){
  clearDataSection()

  let dataSection = document.createElement('section')
  dataSection.classList.add('data-section')
  document.querySelector('.container').appendChild(dataSection)

  let country = this.textContent
  let url = `https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${country}`
  await APP.getData(url)

  let countryInfo = document.createElement('p')
  dataSection.appendChild(countryInfo)

  let totalCasesInCountry = document.createElement('p')
  dataSection.appendChild(totalCasesInCountry)

  let totalDeathsInCountry = document.createElement('p')
  dataSection.appendChild(totalDeathsInCountry)

  countryInfo.innerHTML = `Dados do país: <b>${country}</b>`
  totalCasesInCountry.innerHTML = `Total de casos confirmados: ${APP.totalCases}`
  totalDeathsInCountry.innerHTML = `Total de mortes: ${APP.totalDeaths}`
}

function clearDataSection(){
  let dataSection = document.querySelector('.data-section')
  if(dataSection)
    document.querySelector('.data-section').remove()
}