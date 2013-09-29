

$(document).ready(function() {
	
	
	$("#fetch").click(function(){
		var searchInput = $("#searchTextField").val();
		
		if(searchInput=="")
			{
				alert("Please enter location");
			}
		else
			{
			loadWeatherWebService(searchInput);
			}
		
	});
	
	$("#intro").click(function(){
		var htmlString = "<div class='hellomsg'>Hey Thanks! <br /><br />Just click the button to get your location & weather...</b>? <br />";
		htmlString = htmlString+ "<b>Go on now, Try me.</b></div>";
		$("#container").html(htmlString);
		$("#map").hide();
	});

});

function getCurrentCity(latitude, longitude)
{
	console.log("Entered getCurrenCity function");
	var apiUrl = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=false";	
	$.ajax({url:apiUrl,dataType:'json',}).done(function(result){
		console.log(result.results[5].formatted_address);
		var currentLoc = result.results[5].formatted_address;		
		loadWeatherWebService(currentLoc);
	}).fail(function(){
		
	});
	
}



function loadWeatherWebService(location)
{
	var htmlString="";
	$("#container").html("Updating weather details, please standby...");
	var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&units=metric";	
	console.log(apiUrl);
	$.ajax({url:apiUrl,dataType:'jsonp',}).done(function(result){
		
		console.log(result);
		if(result.cod==200)
		{
		$('#statusMsg').text('Success!');
		$('#statusMsg').fadeIn('slow');
		var city = result.name;
		var country = result.sys.country;
		var humidity  = result.main.humidity;
		var temp = result.main.temp;
		htmlString = htmlString + "<div id='location'>"+city +", "+ country+"</div>";
		htmlString = htmlString + "<div class='weatherData'> <b> Humidity: "+ humidity + " </div>";
		htmlString = htmlString + "<div class='weatherData'> <b> Current Temperature: "+temp  + " </div>";
		htmlString = htmlString + "<div class='weatherData'> <b> Max Temperature: "+  result.main.temp_max + " </div>";
		htmlString = htmlString + "<div class='weatherData'> <b> Min Temperature: "+  result.main.temp_min + " </div>";
		$("#container").html(htmlString);
		}
		else
			{
			$("#container").html("No data found.. Please check the city name and try again..");
			$('#statusMsg').css("background-color","rgba(176, 40, 26, 1)");
			$('#statusMsg').text('Sorry, no information found about that city, please try again!');
			$('#statusMsg').fadeIn('slow');
			}
		
		
		setTimeout(function() {			
		    $('#statusMsg').fadeOut('fast');
		}, 3000); 
	}).fail(function(){
		console.log("Error occured");
		$("#container").html("Internal Error occured. Please try again.");
				
	});	

}

