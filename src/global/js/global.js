const getFileData = async () => {
  const response = await fetch('/data/data.json');
  const data = await response.json();
  return data;
}

const DATA_KEY = '@biblioteca:data';

const getData = () => {
  const data = localStorage.getItem(DATA_KEY);
  return data ? JSON.parse(data) : {};
}

const saveBooks = (data) => {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export {
  getFileData,
  getData,
  saveBooks
}
