//* main.js by Randy Sincoular 16-Jan-17
//* 
//* Purpose:	Leaflet map for GEOG 575, Lab 1.
//*
//* History
//* 10-Feb-17	added proportional symbol capability
//* 10-Feb-17	changed 'mymap' variable to: 'map'
//* 25-Feb-17	Added layer control to switch between basemaps and turn on/off weather radar

"use strict";


//* Cottage Grove
//* var mymap = L.map('map').setView([43.076, -89.199], 7);

//* Fit Map to State of Wisconsin: Lower Right, Upper Left

//* -------------------------------
//* Add Saturday 25-Feb-17 2 layers
//* -------------------------------

var grayscale = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


var streets = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


//* Weather Radar
var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
});
/*
var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
}).addTo(map);
*/

//* comment out Saturday 25-Feb-17
/*
var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/

//* Option for Two Different Basemaps
var baseMaps = {
	"Grayscale": grayscale,
	"OSM Streets": streets
};

//* Weather Radar Overlay
var overlayMaps = {
	"WX Radar": nexrad
};

var mapBounds = new L.LatLngBounds(new 
	L.LatLng(41.473, -93.72),        //* Southwest Corner
	new L.LatLng(46.82, -84.95));	 //* Northeast Corner

var fitMap = new L.LatLngBounds(new L.LatLng(46.326, -92.37), new L.LatLng(42.501, -88.104));

var counties;					//* Holds County population data
var popup = L.popup();


var map = L.map('map', {
	'zoomDelta': .2,			//* Control amount of zoom
	'zoomSnap': .5,				//* Give more granularity when zooming
	'maxBounds': mapBounds,		//* Restrict map view to Wisconsin
	'layers': [grayscale], 		//* Layer and basemap option
	'zoomControl': false		//* Turn off zoom control
}).fitBounds(fitMap);			//* Sets initial map view

/* almost like setting a max zoom out */
map.setMinZoom(6);

//* Add Saturday: Add Layer Control to Map
L.control.layers(baseMaps,overlayMaps).addTo(map);


/*
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/


// var marker = L.marker([43.076, -89.199]).addTo(map);


//* Map Click to show latitude/longitude

/* function onMapClick(e) {popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
};

console.log(" onMapClick() set ...");

map.on('click', onMapClick);
*/



// Add Friday, 24-Feb-17
//* Custom control to add text in slider box

L.Control.myMessage = L.Control.extend({
	onAdd: function(map) {
		var mapMessage = L.DomUtil.create("mapMessage");
		
		// mapMessage.text = "test"
		mapMessage.innerHTML = "<p>1960 &nbsp&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 2015</p><p>Click along slider <br>bar to change year</p><p class='dataSource'>Data Source: U.S. Census</p>";
		
		return mapMessage;
	},
	onRemove: function(map) {
		
	}
});

L.control.mymsg = function(opts) {
	return new L.Control.myMessage(opts) 
}

L.control.mymsg({ position: 'bottomleft'}).addTo(map);
	

function myfunc() {


    var mydiv = document.getElementById("mydiv");

    //* This places text on the page
	//* mydiv.innerHTML = "Hello World jQuery Example";
	
} ;  // end myfunc()


//* Add Sunday P.M., 12-Feb-17 from temporal slider article
//* 
function createSliderUI(timestamps) {
	
	// Variables
	// timestamps[0]: Pop_1960
	// timestamps[5]: Pop_2010
	
	var sliderControl = L.control({ position: 'bottomleft'});
	
	
	//console.log(" #### In createSliderUI(): timestamps: ", timestamps);
	
	
	sliderControl.onAdd = function(map) {
		var slider = L.DomUtil.create("input", "range-slider");
		
		
		L.DomEvent.addListener(slider, 'mousedown', function(e) {
			L.DomEvent.stopPropagation(e);
			
		});
		

		
		
		$(slider)
			.attr({'type': 'range',
				   'max' : timestamps[timestamps.length -1],
				   'min' : timestamps[0],
				   'step': 1,
				   'value': String(timestamps[0])})
		
			//* This function fires whenever the slider is moved/clicked on
			//* -----------------------------------------------------------
			.on('input change', function(){
			
				// console.log(" **** Slider Clicked  **************");
			
			
				//* Get the new index value
				var index = $(this).val();
			
				// console.log(" Slider now at index: ", index);
			
				//* Get the index value
				var index = $('.range-slider').val();
				
				//* Set Time Slider to Correct Year
				if (index <= 1964) {
					index = 1960
				}
				else if (index >= 1965 && index <= 1974) {
					index = 1970
				}
				else if (index >= 1975 && index <= 1984) {
					index = 1980
				}
				else if (index >= 1985 && index <= 1994) {
					index = 1990
				}
				else if (index >= 1995 && index <= 2004) {
					index = 2000
				}
				else if (index >= 2005 && index <= 2010) {
					index = 2010
				}
				else if (index >= 2011) {
					index = 2015
				}
			
				// console.log(" *New index: ", index);
				// console.log(" Slider max: ", timestamps[timestamps.length-1]);
				// console.log(" Slider min: ", timestamps[0]);
			
				//* Add Wed 15-Feb-17 to try and fix slider position
			
				// console.log("  *Slider Position: ",this.value);
			
			
				//* Update slider
				$('.range-slider').val(index);
				
			
				// console.log(" ** $(this).val().toString(): ", $(this).val().toString() );
			
				// console.log("  $(this.value): ",this.value);
			
				// console.log(" String(timestamps[0]) : ",String(timestamps[0]));
			
			
			
				// add wed 15-feb-17
				updatePropSymbols2(index);
		
		 		
				$(".temporal-legend").text(this.value);
			
				// $(".temporal-legend").text("Year: ",+ this.value); // add 20-Feb-17
				
		});
		
		return slider;
		
	}
	
	sliderControl.addTo(map)
	
	createTemporalLegend(timestamps[0]);
	
};  // end createSliderUI()



function updatePropSymbols2(timestamp) {
	
	// Example for record #10 (Clark County)
	// props[timestamp]:	31527		*population for 1960
	// timestamp:			Pop_1960	*current population header being used
	
	counties.eachLayer(function(layer) {
		
		
		
		//* Information on each County Population Field, ex County name, Area, Pop_2015, Area, etc
		//* props.Pop_2015 = the population count for year 2015
		
		var props = layer.feature.properties;
		
		// console.log(" props: ", layer.feature.properties);
		// console.log(" timestamp: ", timestamp);
		
		// console.log(" props[timestamp]: ", props[timestamp]);
				
		var radius = calcPropRadius2(props[timestamp]);
				
		
		// console.log(" radius: ", radius);

		
		//* props[timestamp] = County Name, ex: Adams
		//* timestamp = "County",   ex. "County"

		// console.log(" props.County: ", String(props.County));
		// console.log(" props.Pop_2015: ", props[timestamp]);
		
		var myYear = 2010
					
		// console.log(" props.Pop_2010: ", props[myYear]);

		
		
		// add bolding and commas in number
		var popupContent = "<b>" + String(props.County) + " County Population: " + "</b>" + String(props[timestamp].toLocaleString());

		
		layer.setRadius(radius);
		layer.bindPopup(popupContent, {offset: new L.Point(0,-radius)});
		
	});
	
	
}; // end updatePropSymbols2()

function calcPropRadius2(attributeValue) {
	
	
	var scaleFactor = .00000001;
	var area = attributeValue + scaleFactor;
	
	return Math.sqrt(area/Math.PI) * .1;
	
}; // end calcPropRadius()



function createPropSymbols2(timestamps, data) {
	
	//* timestamps = an array that contains the county 
	//* population values from 1960 to 2015 for each county
	
	
	counties = L.geoJson(data, {
		
		pointToLayer: function(feature, latlng) {
			
			return L.circleMarker(latlng, {
				fillColor: "green",
				color: "black",
				weight: 1,
				fillOpacity: .5
			}).on({
				
				mouseover: function(e) {
					this.openPopup();
					this.setStyle({color: 'yellow'});
				},

				mouseout: function(e) {
					this.closePopup();
					this.setStyle({color: "blue"});
				}
			});
		}
	}).addTo(map);
	
	//* Send the first date in the time series
	// console.log(" ** timestamps[0]: ", timestamps[0]);
	
	//* Send first Date. ex. 1960
	updatePropSymbols2(timestamps[0]);
	
};  // end createPropSymbols2()



//* --------------------------------
//* Add Sunday Night - from article
//* --------------------------------

function processData(data) {
	
		// attribute:				Pop_1960	*First pass through
		// properties[attribute]:	7566		*1960 population value for first record

		var timestamps = [];
		var min = Infinity;
		var max = -Infinity;

		//* feature: 0 = the first record
		//* feature: 1 = 2nd record
	
		//* Properties = the entire object
		//*    ex. County: Adams, State: Wisconsin, Pop_2015: 20148
	
		//* Attribute = the individual fields for each record
		//*    ex. attribute: County
		//*        attribute: State
	
		//* Loop through each record in the JSON file
		//* ------------------------------------------
		for (var feature in data.features) {

			// console.log(" feature: ", feature);

			var properties = data.features[feature].properties;

			// console.log(" properties: ", properties);
			
			//* Loop through each field in the current record
			//* ---------------------------------------------
			for (var attribute in properties) {
				
				// console.log(" attribute: ", attribute);

				//* Do Not include the columns listed below:
				
				if ( attribute != 'County' &&
				  	 attribute != 'State' &&
				   	 attribute != 'FIPS' &&
					 attribute != 'Long' &&
					 attribute != 'Lat' &&
				  	 attribute != 'ID' ) {
						
					// 
					// This passes in the first year of the first record
					// if ( $.inArray(properties[attribute],timestamps) === -1) {
					
					if ( $.inArray(attribute,timestamps) === -1) {
						
						timestamps.push(attribute);	
						// console.log(" pushed attribute: ", attribute);
						// console.log(" properties[attribute]: ",properties[attribute]);
					}

					if (properties[attribute] < min) {	
						min = properties[attribute];
						// console.log(" set min value: ", properties[attribute]);
					}
						
					if (properties[attribute] > max) {
						max = properties[attribute];
						// console.log(" set max value: ", properties[attribute]);
					};
				};
			};
		}; // end for()

		return {
			timestamps : timestamps,
			min : min,
			max : max
		}
	};  // end processData()

function createTemporalLegend(startTimestamp) {
		
	var temporalLegend = L.control ({position: 'bottomleft'});
	
	
	temporalLegend.onAdd = function(map) {
		
		var output = L.DomUtil.create("output","temporal-legend");
		
		var sliderText = L.DomUtil.create("slider_text","temporal-legend");
		
		$(sliderText).text("This is a message");
		
		//* Use jQuery to set Title for the Time Slider of the 'output' element
		
		$(output).text(startTimestamp);  // comment out 19-Feb-17
		
		var mydiv = document.getElementById("mydiv");
					
		
		$(sliderText).text("Click a point along the slider to change Year");
		
		// $(output).text("<h2 id='slider_text'>" + startTimestamp + "</h2>");
		

		


		//* end changes 19-feb-17
		
		
		return output;
		
	}
	
	
	//* Add the legend control to the map
	temporalLegend.addTo(map);
	
}; // end createTemporalLegend()

//* Create the Circle Legend

function createLegend(min, max) {
	if (min < 10) {
		min = 10;
	};
	
	
	function roundNumber(inNumber) {
		return (Math.round(inNumber/10) * 10);
	}
	
	//* Set Location of the Legend: bottomright
	var legend = L.control ({position: 'bottomright'});
	
	legend.onAdd = function(map) {
	var legendContainer = L.DomUtil.create("div", "legend");
	var symbolsContainer = L.DomUtil.create("div","symbolsContainer");
	var classes = [roundNumber(min), roundNumber((max-min)/2), roundNumber(max)];
	var legendCircle;
	var lastRadius = 0;
	var currentRadius;
	var margin;
		
	L.DomEvent.addListener(legendContainer, 'mousedown', function(e) {
		L.DomEvent.stopPropagation(e);
	});
	
	//* Title of circle legend
	$(legendContainer).append("<h2 id='legendTitle'>County Population</h2>");
	
	for (var i = 0; i <= classes.length-1; i++) {
		legendCircle = L.DomUtil.create("div","legendCircle");
		
		currentRadius = calcPropRadius2(classes[i]);
		
		
		margin = -currentRadius - lastRadius -2;
		
		$(legendCircle).attr("style", "width: " + currentRadius*2 + "px; height: " + currentRadius*2 + "px; margin-left: " + margin + "px" );
		
		$(legendCircle).append("<span class='legendValue'>" + classes[i] +"</span>");
		
		$(symbolsContainer).append(legendCircle);
		
		lastRadius = currentRadius;
		
	}; // end for()
		
	$(legendContainer).append(symbolsContainer);
		

	return legendContainer;
		
	};  // end function(map)
	
	//* Add the legend to the map
	legend.addTo(map);
	
}; // end createLegend()


//* Import GeoJSON data
function getData(map){
	
	
			
	$.getJSON("data/map.geojson")
		.done(function(data) {
		
		
			var info = processData(data);
		
			
			createPropSymbols2(info.timestamps,data);
				
			createLegend(info.min, info.max);
			
			createSliderUI(info.timestamps);
				
		
	}) // end function()
	
	.fail(function() { alert("An error occurred loading the geoJSON data: ", "data/map.geojson")});
	
	
 }; // end getData()
  	



window.onload = myfunc();


getData(map);



