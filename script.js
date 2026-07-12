const apiKey = "b3095c4926efec443b474ca4faf5051e";

// ==========================
// Live Date & Time
// ==========================

function updateDateTime() {
    const now = new Date();

    document.getElementById("dateTime").innerHTML =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }) +
        "<br>" +
        now.toLocaleTimeString();
}

setInterval(updateDateTime, 1000);
updateDateTime();


// ==========================
// Search on Enter Key
// ==========================

document.getElementById("city").addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        getWeather();
    }

});


// ==========================
// Search Weather by City
// ==========================

async function getWeather(){

    const city=document.getElementById("city").value.trim();

    if(city===""){
        alert("Please enter a city name.");
        return;
    }

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);

}



// ==========================
// Current Location Weather
// ==========================

function getLocationWeather(){

    if(!navigator.geolocation){

        alert("Geolocation is not supported.");
        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position){

            const lat=position.coords.latitude;
            const lon=position.coords.longitude;

            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(url);

        },

        function(){

            alert("Unable to retrieve your location.");

        }

    );

}



// ==========================
// Fetch Weather
// ==========================

async function fetchWeather(url){

    try{

        const response=await fetch(url);

        const data=await response.json();

        if(data.cod!=200){

            alert("City not found!");
            return;

        }

        displayWeather(data);

    }

    catch(error){

        alert("Something went wrong.");

    }

}



// ==========================
// Display Weather
// ==========================

function displayWeather(data){

    document.getElementById("weather").style.display="block";

    document.getElementById("cityName").innerHTML=
    data.name+", "+data.sys.country;

    document.getElementById("temp").innerHTML=
    Math.round(data.main.temp)+"°C";

    document.getElementById("description").innerHTML=
    capitalize(data.weather[0].description);

    document.getElementById("feelsLike").innerHTML=
    Math.round(data.main.feels_like)+"°C";

    document.getElementById("humidity").innerHTML=
    data.main.humidity+"%";

    document.getElementById("wind").innerHTML=
    Math.round(data.wind.speed)+" m/s";

    document.getElementById("pressure").innerHTML=
    data.main.pressure+" hPa";

    document.getElementById("icon").src=
    "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";

    changeBackground(data.weather[0].main);

}



// ==========================
// Capitalize Text
// ==========================

function capitalize(text){

    return text.replace(/\b\w/g,function(letter){

        return letter.toUpperCase();

    });

}



// ==========================
// Change Background
// ==========================

function changeBackground(weather){

    switch(weather){

        case "Clear":

            document.body.style.background=
            "linear-gradient(135deg,#f6d365,#fda085)";
            break;

        case "Clouds":

            document.body.style.background=
            "linear-gradient(135deg,#89f7fe,#66a6ff)";
            break;

        case "Rain":

            document.body.style.background=
            "linear-gradient(135deg,#4b79a1,#283e51)";
            break;

        case "Drizzle":

            document.body.style.background=
            "linear-gradient(135deg,#4b79a1,#283e51)";
            break;

        case "Thunderstorm":

            document.body.style.background=
            "linear-gradient(135deg,#232526,#414345)";
            break;

        case "Snow":

            document.body.style.background=
            "linear-gradient(135deg,#e6dada,#274046)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":

            document.body.style.background=
            "linear-gradient(135deg,#bdc3c7,#2c3e50)";
            break;

        default:

            document.body.style.background=
            "linear-gradient(135deg,#4facfe,#00f2fe)";

    }

}