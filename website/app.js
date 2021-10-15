/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=1731763d663158ea57ed1e516d10bca2";

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Posts all data to client side.
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData
    }
    catch(error) {
    console.log("error", error);
    }
}

// Queries website's API and gets weather data through fetch.
const getWeatherData = async (baseURL, zipCode, key) => {
    const response = await fetch(baseURL+zipCode+key)
    try {
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log("error", error);
    }
}

// Listens for a click on button with ID of "generate"
document.getElementById("generate").addEventListener("click", saveInput);

// Updates UI dynamically.
const updateUI = async() => {
    const request = await fetch("/allData");
    try {
        const receivedData = await request.json();
        document.querySelector("#date").innerHTML = `Today's date is ${receivedData.date}`;
        document.querySelector("#temp").innerHTML = `The temperature is ${receivedData.temperature}`;
        document.querySelector("#content").innerHTML = `Today I feel ${receivedData.feeling}`;
    }
    catch(error) {
        console.log("error",error);
    }
}

/* Calls function to retrieve weather data, then posts this data + user input to server using postData function,
then updates UI dynamically */
function saveInput(e) {

    // Saves zip code and user input into values.
    const zipCode = document.querySelector("#zip").value;
    const feeling = document.querySelector("#feelings").value;

    // Gets wheather data from external API.
    getWeatherData(baseURL,zipCode,key)

    // Posts weather data + user input to server using postData function.
    .then(function(data) {
        console.log(data);
        postData("/addData", {date:newDate, temperature:data.main.temp, feeling:feeling})
    })
    // Updates UI dynamically.
    .then(updateUI())

};

