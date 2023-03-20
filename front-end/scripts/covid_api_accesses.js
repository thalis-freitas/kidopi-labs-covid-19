const ACCESSES = {
  postCountry: async(country_name) => {
    let country = { country: country_name }
    return await fetch("http://localhost/api/accesses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify(country),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data.data
    })
    .catch((error) => {
      console.error(error)
    })
  },
  getLastAccess: async() => {
    return await fetch('http://localhost/api/accesses/last')
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.log(`Ops, ocorreu um erro ${error}`)
    })
  }
}