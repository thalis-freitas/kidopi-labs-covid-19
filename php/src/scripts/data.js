const COUNTRIES_DATA = {
  lockMode: false,
  totalCases: 0,
  totalDeaths: 0,
  states: [],

  getData: async(url) => {
    return await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {  
      console.log(`Ops, ocorreu um erro ${error}`)
    })
  },

  setCountryData: function(data){
    this.totalCases = 0
    this.totalDeaths = 0
    for(let i = 0; i < Object.keys(data).length; i++ ){
      this.totalCases += data[i].Confirmados
      this.totalDeaths += data[i].Mortos
    }
  },

  getStatesData: function(data){
    this.states = []
    for(let i = 0; i < Object.keys(data).length; i++ ){
      this.states[i] = { state: data[i].ProvinciaEstado,
                         confirmed: data[i].Confirmados,
                         dead: data[i].Mortos}
    }
  }
}