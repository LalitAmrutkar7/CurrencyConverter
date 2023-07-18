// apiService1.js
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

export const getApi1Url = () => {
  return apiUrl;
};

export const fetchApi1Data = () => {
  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching API 1 data:', error);
    });
};

