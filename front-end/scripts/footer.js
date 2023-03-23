"use strict";

let footer = document.querySelector('footer')
let loading = document.querySelector('.loading')
let lastDate = document.querySelector('.last-date')
let lastCountry = document.querySelector('.last-country')

displayFooter()

async function displayFooter(){
  let data = await ACCESSES.getLastAccess()
  if(data && loading.style.display !== 'none' && Object.keys(data).length !== 0){
    displayDataInFooter(data)
  }else if(!data){
    loading.innerHTML = 'Ops, ocorreu um erro ao carregar os dados'
  }else{
    loading.innerHTML = 'Nenhuma acesso encontrado'
  }
}

function displayDataInFooter(data){
  loading.style.display = 'none'
  lastDate.innerHTML = `Data: ${formatDateToDisplay(data.date_time)}`
  lastCountry.innerHTML = `País: ${data.country}`
  lastDate.style.display = 'block'
  lastCountry.style.display = 'block'
}

function hideFooterData(){
  lastDate.style.display = 'none'
  lastCountry.style.display = 'none'
}

function updateFooterData(country, date){
  hideFooterData()
  lastDate.innerHTML = `Data: ${formatValue(date)}`
  lastCountry.innerHTML = `País: ${country}`
  loading.style.display = 'none'
  lastDate.style.display = 'inline-block'
  lastCountry.style.display = 'inline-block'
}

function formatDateToDisplay(dateTime){
  let date = dateTime.split(' ')[0].split("-").reverse().join('/')
  let time = dateTime.split(' ')[1]
  return `${date}, ${time}`
}