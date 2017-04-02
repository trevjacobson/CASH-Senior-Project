console.log('this');

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(showPosition);
}

else {
    alert("Geolocation is not supported by this browser");
}

/*<!--code from https://www.youtube.com/watch?v=vw7MXBnScVk-->*/

function showPosition(position) {


    var latti=position.coords.latitude;
    latti=latti.toPrecision(5);
    var longi= position.coords.longitude;

    longi=longi.toPrecision(6);
    document.getElementById("latti").innerHTML=latti
    document.getElementById("longi").innerHTML=longi
    var weathertime=new XMLHttpRequest();
    weathertime.open("GET", "http://api.wunderground.com/api/b163089817d8ac3b/forecast/geolookup/conditions/q/"+latti+","+longi+".json", false);
    weathertime.send(null);
    var r = JSON.parse(weathertime.response);
    var weathertime = "Current location: " +r.current_observation.display_location.full + "<br />";
    var temp=r.current_observation.temperature_string + "<br />";
    var wind = r.current_observation.wind_string + "<br / >";
    var press = r.current_observation.pressure_in + "<br / >";
    var humi = r.current_observation.relative_humidity + "<br / >";

    var altit = r.current_observation.observation_location.elevation;
    if(altit<0){var altit = r.current_observation.observation_location.elevation + " below sea level<br / >";}
    else{var altit = r.current_observation.observation_location.elevation+ " above sea level<br / >";}
    document.getElementById("weathertime").innerHTML = weathertime;
    document.getElementById("temp").innerHTML = temp;
    document.getElementById("wind").innerHTML = wind;
    document.getElementById("press").innerHTML = press;
    document.getElementById("humi").innerHTML = humi;
    document.getElementById("altit").innerHTML = altit;
};

function parseTimestamp(timestamp) {
    var d = new Date(timestamp);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    var msec = d.getMilliseconds();
    return day + "." + month + "." + year + " " + hour + ":" + mins + ":" + secs + "," + msec;
}