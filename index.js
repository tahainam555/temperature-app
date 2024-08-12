/*
       <h1 class="cityDisplay"></h1>
        <p class="tempDisplay"></p>
        <p class="humidityDisplay"></p>
        <p class="descDisplay"></p>
        <p class="weatherEmoji"></p>
        <p class="errorDisplay"></p>
*/

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "5d98d18aa3396e07010e225e3865cb25";
const cityDisplay = document.getElementById("cityDisplay");
const tempDisplay = document.getElementById("tempDisplay");
const humidityDisplay = document.getElementById("humidityDisplay");
const descDisplay = document.getElementById("descDisplay");
const weatherEmoji = document.getElementById("weatherEmoji");
const errorDisplay = document.getElementById("errorDisplay");


weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city!");
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch Data!");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    let {name: city, 
           main:{temp, humidity},
           weather:[{description, id}]} = data ;

//    card.textContent = "" ;
    card.style.display = "flex";
    cityDisplay.textContent = city ;
    temp = (temp-273.15).toFixed(1);
    tempDisplay.textContent = `${temp} °C` ;
    humidityDisplay.textContent =`Humidity: ${humidity}`;
    descDisplay.textContent = description ;
    weatherEmoji.textContent = getWeatherEmoji(id);
    errorDisplay.textContent="";
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId>800):
            return "☁️";
            break;
        case (weatherId===800):
            return "☀️";
        case (weatherId>=700):
            return "🌫";
            break;
        case (weatherId>600):
            return "❄️";
            break;
        case (weatherId>=500):
            return "⛈";
            break;
        case (weatherId>=300):
            return "🌧";
            break;
        case (weatherId>=200):
                return "🌩";
                break;    
    
    }
}


/*
    ☀️
    🌤️
    ☁️
    ⛅
    🌧
    🌬
    ⚡
    🌩
    ⛈
    ❄️
    🌫
*/

function displayError(message){
    errorDisplay.textContent = message ;
    card.style.display = "flex";
}