// let data;

// fetch('/data/data.json').then(response => {
//   return response.json()
// }).then(body => {
//   data = body.data
//   console.log(data.login[0].email, 'oi sou o login')
// })

const getData = async () => {
  const response = await fetch('/data/data.json');
  const data = await response.json();
  return data;
}

export default getData;
