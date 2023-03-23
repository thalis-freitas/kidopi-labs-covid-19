const ACCESSES = {
  postCountry: async(country_name, date) => {
    let data = { country: country_name, date_time: formatDateForPost(date) }
    return await fetch('http://localhost/api/accesses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
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

formatDateForPost = (dateTime) => {
  dateTime = dateTime.toLocaleString().replace(',','')
  let date = dateTime.split(' ')[0].split("/").reverse().join('-')
  let time = dateTime.split(' ')[1]
  return `${date} ${time}`
}