const APP = {
  countries: ['Australia', 'Brazil', 'Canada'],
  totalCases: 0,
  totalDeaths: 0,

  getData: async function(url){
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      this.totalCases = 0
      this.totalDeaths = 0
      for(let i = 0; i < Object.keys(data).length; i++ ){
        this.totalCases += data[i].Confirmados
        this.totalDeaths += data[i].Mortos
      }})
    .catch((error) => {  
      console.log(`Ops, ocorreu um erro ${error}`)
    })
  }
}