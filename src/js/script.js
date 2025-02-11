const apiKey= "7e366773e06843a5b4fd2ef902f9e7a3";
const apiCountryUrl = "https://countryflagsapi.netlify.app/flag/country_code.svg";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');


//funçoes
const getWeatherData = async(city) =>{
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json();

    return data
}


const showWeatherData = async(city)=>{
    let data = await getWeatherData(city);

    cityElement.innerHTML= data.name;
    tempElement.innerHTML= parseInt(data.main.temp)
    descElement.innerHTML= data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    //countryElement.setAttribute("src", apiCountryUrl + data.sys.country);
    umidityElement.innerHTML=`${data.main.humidity}%`;
    windElement.innerHTML= `${data.wind.speed}km/h`;

    weatherContainer.classList.remove('hide')
}





//eventos
searchBtn.addEventListener('click',(event)=>{
    event.preventDefault()

    const city = cityInput.value;
    //alert(city)

    showWeatherData(city);

})


//funcionar com o ENTER

cityInput.addEventListener("keyup", (e)=>{
    if(e.code === "Enter"){
        const city = e.target.value

        showWeatherData(city);
    }
})