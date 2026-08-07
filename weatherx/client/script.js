const searchbtn = document.getElementById('btn')
const cityInput = document.getElementById('city')
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feels = document.getElementById("feels");

const weatherIcon = document.getElementById("weather-icon");
searchbtn.addEventListener("click" , getweather)
const momMessage = document.getElementById("mom-message");
const speakBtn = document.getElementById("speak-btn");
let currentMessage = "";

async function getweather() {

    try {
    const city = cityInput.value.trim();
    



const response = await fetch(
    `http://localhost:5000/weather?city=${city}`
);

const data = await response.json();
cityName.innerText = data.name;

temp.innerText = `${Math.round(data.main.temp)}°C`;

condition.innerText = data.weather[0].main;

humidity.innerText = `${data.main.humidity}%`;

wind.innerText = `${data.wind.speed} km/h`;

feels.innerText = `${Math.round(data.main.feels_like)}°C`;

weatherIcon.src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

weatherIcon.alt = data.weather[0].description;

console.log(data);
const message = getMomMessage(data);
currentMessage = message;
momMessage.innerText = message;
speak(message);
}


    catch(error){

        console.log(error);}

        function getMomMessage(data){
const temp = data.main.temp;
const weather = data.weather[0].main;
if(weather === "Rain"){

    return "छाता लेकर जाना। बीमार पड़े तो सबसे पहले मुझे ही याद करोगे।";

}

if(temp > 35){

   return  "इतनी गर्मी में भी अगर पानी नहीं पियोगे, तो फिर मत कहना बताया नहीं।";

}

if(temp < 15){
return "स्वेटर पहन लो। स्टाइल बाद में करना, पहले सेहत संभालो।";

}

return "चलो बेटा... मौसम तो देख लिया। अब ज़रा पढ़ाई भी देख लो।";
}
function speak(text){
    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";

    speech.rate = 1;

    speech.pitch = 1;

    speechSynthesis.speak(speech);

}
speakBtn.addEventListener("click", () => {

    speak(currentMessage);

});
// speechSynthesis.onvoiceschanged = () => {

//     const voices = speechSynthesis.getVoices();

//     voices.forEach((voice) => {
//         console.log(voice.name, "-", voice.lang);
//     });

// };
}

