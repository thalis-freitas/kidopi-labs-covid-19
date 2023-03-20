let footer = document.querySelector('footer')
let loading = document.querySelector('.loading')
let lastDate = document.createElement('div')
let lastCountry = document.createElement('div')

displayDataInFooter()

async function displayDataInFooter(){
  let data = await ACCESSES.getLastAccess()

  loading.style.display = 'none'
  lastDate.innerHTML = `Data: ${formatValue(new Date(data.created_at))}`
  lastCountry.innerHTML = `País: ${data.country}`
  
  footer.appendChild(lastDate)
  footer.appendChild(lastCountry)
}

function hideFooterData(){
  lastDate.style.display = 'none'
  lastCountry.style.display = 'none'
  loading.innerHTML = 'Atualizando'
  loader = document.createElement('div')
  loader.classList.add('loader')
  loading.appendChild(loader)
  loading.style.display = 'inline-block'
}

function displayFooterData(data){
  loading.style.display = 'none'
  lastDate.innerHTML = `Data: ${formatValue(new Date(data.created_at))}`
  lastCountry.innerHTML = `País: ${data.country}`
  lastDate.style.display = 'inline-block'
  lastCountry.style.display = 'inline-block'
}