$(document).ready(function(){
	var latitude = QueryString.latitude === undefined ? '54.864655' : QueryString.latitude;
	var longitude = QueryString.longitude === undefined ? '23.962950799999998' : QueryString.longitude;
	var location = latitude + ',' + longitude;
	console.log(location);
	
	loadWeather(location);
    setInterval(function(){loadWeather(location)}, 100000);
});

function loadWeather(location){
    $.simpleWeather({
        location: location,
        unit: 'C',
        success: function(weather){
            city = weather.city;
            temp = weather.temp + '&deg;';
            wcode = '<svg class="weathericon" src="images/weathericons/'+weather.code+'.svg">';
            wind = '<p>' + weather.wind.speed + weather.units.speed + '</p>';
            humidity = weather.humidity+' %';
            $(".location").text(city);
            $(".temperature").html(temp);
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
        },
        error: function(error){
            $(".error").html('<p>'+error+'</p>');
        }
        
    });
}




var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();