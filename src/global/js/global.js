let data;

fetch('.data.jason').then(response => {
  return response.json()
}).then(body => {
  data = body.data
})
