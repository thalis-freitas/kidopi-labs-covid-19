const ACCESSES = {
  postCountry: async(country_name) => {
    let currentTime = formatDateForPost()
    let data = { country: country_name, date_time: currentTime }
    return await fetch("http://localhost/api/accesses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify(data),
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
  },
}

formatDateForPost = () => {
  let currentTime = new Date().toLocaleString().replace(',','')
  let date = currentTime.split(' ')[0].split("/").reverse().join('-')
  let time = currentTime.split(' ')[1]
  return `${date} ${time}`
}