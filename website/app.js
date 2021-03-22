/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=e719b3cfc9bc0dc764647927b3ec6a15';
const generateBtn = document.getElementById('generate');
let feelingsArea = document.getElementById('feelings')


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }


  const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

//   retrieveData(baseUrl+feelingsArea.value+apiKey);


  generateBtn.addEventListener('click', function(){
      postData('/add', {userResponse : feelingsArea.value});
      retrieveData(baseUrl+feelingsArea.value+apiKey);
  })