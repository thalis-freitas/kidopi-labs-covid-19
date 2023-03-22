"use strict";

let footer = document.querySelector('footer')
let loading = document.querySelector('.loading')
let lastDate = document.createElement('div')
let lastCountry = document.createElement('div')

displayDataInFooter()

async function displayDataInFooter(){
  let data = await ACCESSES.getLastAccess()
  if(data){
    loading.style.display = 'none'
    lastDate.innerHTML = `Data: ${formatDateToDisplay(data.date_time)}`
    lastCountry.innerHTML = `País: ${data.country}`
    footer.appendChild(lastDate)
    footer.appendChild(lastCountry)
  }else{
    loading.innerHTML = 'Ops, ocorreu um erro ao carregar os dados'
  }
}

function hideFooterData(){
  lastDate.style.display = 'none'
  lastCountry.style.display = 'none'
  loading.innerHTML = 'Atualizando'
  let loader = document.createElement('div')
  loader.classList.add('loader')
  loading.appendChild(loader)
  loading.style.display = 'inline-block'
}

function updateFooterData(data){
  if(data){
    lastDate.innerHTML = `Data: ${formatDateToDisplay(data.date_time)}`
    lastCountry.innerHTML = `País: ${data.country}`
    loading.style.display = 'none'
    lastDate.style.display = 'inline-block'
    lastCountry.style.display = 'inline-block'
  }else{
    loading.innerHTML = 'Ops, ocorreu um erro ao atualizar os dados'
  }
}

function formatDateToDisplay(dateTime){
  let date = dateTime.split(' ')[0].split("-").reverse().join('/')
  let time = dateTime.split(' ')[1]
  return `${date}, ${time}`
}