/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=e719b3cfc9bc0dc764647927b3ec6a15';
const generateBtn = document.getElementById('generate');
let feelingsArea = document.getElementById('feelings');
let zipArea = document.getElementById('zip');
let dateArea = document.getElementById('date');
let tempArea = document.getElementById('temp');
let contentArea = document.getElementById('content');
let cityArea = document.getElementById('city');
let countryArea = document.getElementById('country');
let countryCodeArea = document.getElementById('country-box');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },     
      body: JSON.stringify(data),
    });
      try {
        const newData = await response.json();
        return newData;
      }
      catch(error) {
      console.log("error", error);
      }
}


const retrieveData = async (url='') => { 
  const request = await fetch(url);
  try {
  const allData = await request.json()
  console.log(allData)
  return allData;
  }
  catch(error) {
    console.log("error", error);
  }
}


const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json()
    dateArea.innerHTML = 'Date : ' + allData.date;
    countryArea.innerHTML = 'Country : ' + allData.country;
    cityArea.innerHTML = 'City : ' + allData.city;
    tempArea.innerHTML = 'Temperature : ' + (allData.temperature - 273.15).toFixed(2) + '°C';  // Converts from Kelvin to Celsius and rounds at 2 decimal points
    contentArea.innerHTML = 'User Response : ' + allData.userResponse;
  }
  catch(error) {
    console.log('error', error);
  }
}


generateBtn.addEventListener('click', function(){
    retrieveData(baseUrl+zipArea.value+','+countryCodeArea.value+apiKey)  // Fetches data from API
    .then(function(allData){
      postData('/add', {                          // Posts data fecthed from API to the server
        temperature : allData.main.temp,
        date: newDate,
        userResponse : feelingsArea.value,
        name: allData.name,
        country : allData.sys.country
      })
      updateUI();                 // Fetches data posted to the server and uses it to update the page
    })
})