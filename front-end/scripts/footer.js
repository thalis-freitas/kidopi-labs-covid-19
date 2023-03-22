"use strict";

let footer = document.querySelector('footer')
let loading = document.querySelector('.loading')
let lastDate = document.querySelector('.last-date')
let lastCountry = document.querySelector('.last-country')

displayDataInFooter()

async function displayDataInFooter(){
  let data = await ACCESSES.getLastAccess()
  if(data){
    loading.style.display = 'none'
    lastDate.innerHTML = `Data: ${formatDateToDisplay(data.date_time)}`
    lastCountry.innerHTML = `País: ${data.country}`
    lastDate.style.display = 'block'
    lastCountry.style.display = 'block'
  }else{
    loading.innerHTML = 'Ops, ocorreu um erro ao carregar os dados'
  }
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