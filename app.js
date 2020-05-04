var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var temp = document.querySelector(".temp");
var Time = document.getElementById("#t");
var desc = document.querySelector(".desc");
var clouds = document.getElementById("image");
var button = document.querySelector(".submit");
var longitude, latitude, timeHour, timeFull;

window.onload = startTime();
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('t').innerHTML = h + ":" + m + ":" + s;
  t = setTimeout(function() {
    startTime()
  }, 500);
}


button.addEventListener("click", function (name) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=c5d461ec14d6868706069b9ac6644910"
  )
    .then((response) => response.json())
    .then((data) => {
      var tempValue = data["main"]["temp"];
      var nameValue = data["name"];
      var descValue = data["weather"][0]["description"];
      weather1(descValue);
      longitude = data["coord"]["lon"];
      latitude = data["coord"]["lat"];
      
      tempValue = tempValue - 273.15;
      tempValue.toFixed(0);
      main.innerHTML = nameValue;
      desc.innerHTML = "Desc - " + descValue;
      temp.innerHTML = "Temp - " + parseInt(tempValue);
      input.value = "";
      
    });
});


function weather1(weather){
if(weather.indexOf("rain") >= 0) {
  clouds.src="rain.svg"
}

else if (weather.indexOf("sunny") >= 0) {
  clouds.src="sunny.svg"
}

else if (weather.indexOf("clear") >= 0) {
  if (timeHour >= 7 && timeHour < 20) {
   clouds.src="clear.svg"
  }

  else {
    clouds.src="night.svg"
  }		
}

else if (weather.indexOf("cloud") >= 0) {
  if (timeHour >= 7 && timeHour < 20) {
    clouds.src="cloudy.svg"
  }

  else {
    clouds.src="cloudy-night.svg"
  }	
}

else if (weather.indexOf("thunderstorm") >= 0) {
  clouds.src="thunderstorm.svg"
}

else if (weather.indexOf("snow") >= 0) {
  clouds.src="snow.svg"
}
}