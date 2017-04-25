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
    var kwh=new XMLHttpRequest();
			kwh.open("GET", "http://developer.nrel.gov/api/utility_rates/v3.json?api_key=8pvz4NoEeIyNMVOTGI7u3BDh3gL7jryUfSkAU2ZV&lat="+latti+"&lon="+longi+"", false);
			
			kwh.send(null);
			var k = JSON.parse(kwh.response);
			var resid=k.outputs.residential+ "<br />";
			var comc=k.outputs.commercial+ "<br />";
			var ind=k.outputs.industrial+ "<br />";
			
			
			document.getElementById("resid").innerHTML = resid;
			document.getElementById("comc").innerHTML = comc;
			document.getElementById("ind").innerHTML = ind;
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