/* main.js by Randy Sincoular 16-Jan-17 */

"use strict";

/* -------------------    */
/* jQuery                  */
/* -------------------    */

/* Leaflet Mapping Example   */

console.log("L: ",L);

//* Cottage Grove
//* var mymap = L.map('mapid').setView([43.076, -89.199], 7);

//* Central Wisconsin
// var mymap = L.map('mapid').setView([44.461, -89.835], 7);

//* Fit Map to State of Wisconsin: Lower Right, Upper Left
var mymap = L.map('mapid').fitBounds([
    [42.54,-92.87],
    [46.67,-86.87]
]);


var popup = L.popup();


/*
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);
*/

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

/*
//* Weather Radar
var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
}).addTo(mymap);
*/


console.log(" done ...");

var marker = L.marker([43.076, -89.199]).addTo(mymap);


var popup = L.popup()
    .setLatLng([43.08, -89.2])
    .setContent("I am a standalone popup.")
    .openOn(mymap);


// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");


function onMapClick(e) {popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
};

mymap.on('click', onMapClick);


function myfunc() {


    var mydiv = document.getElementById("mydiv");

    mydiv.innerHTML = "Hello World jQuery Example";
} ;  // end myfunc()


window.onload = myfunc();



function Iterate(data)
{
  console.log(" Iterate() ...");

    jQuery.each(data, function (index, value) {
        if (typeof value == 'object') {
          console.log(" *type: ", typeof value, " found!.  Calling Iterate() recursively ... Index: ",index);
            Iterate(value);
        }
        else {
             console.log(" type: ", typeof value," Index: ",index + " : " + value);
             // console.log(index + " : " + value);

             $('#results').append("<strong>"+index+"</strong> :- "+value+"<br/><br/>");
        }
    });
};  // end Iterate()

//define AJAX function
function jQueryAjax(){

// Read the geoJSON file
// -----------------------------
/* $.getJSON("data/map.geojson",readCities);  */   /* 2-Feb-17 comment out while I get leaflet working */

}; // end jQueryAjax()

// -----------------------------------------
// Callback Function
// Parse the geoJSON data (Cities)
// -----------------------------------------
function readCities(jsonData){
console.log(" in readCities() ...");
console.log("data: ",jsonData);

  var infoHTML = '';

  console.log("++++++++++ test ++++++++++++");
  console.log(" length: ", jsonData.length);

for (var i = 0; i < jsonData.length;i++)
{
  console.length("length: ", jsonData.length);
  console.log(" jsonData:",jsonData[i]);
}

  console.log("++++++++++ test 2++++++++++++");

  for ( var key in jsonData){
    var myString = key;
    var myValue = jsonData[key];
    console.log(" myString: ", myString,"  myValue: ", myValue);

  };
console.log("starting 2nd each() loop");

console.log("++++++++++++++++++++++");

//* Read through the JSON data
//* --------------------------------------
/* Iterate(jsonData); */  /* 2-Feb-17 comment out for testing while I get the leaflet map working */

console.log("+++++++++++++");
console.log(jsonData);


  // loop through each object in the JSON data
  $.each(jsonData,function(city,cityInfo)
  {
    console.log("City Info: ",cityInfo);   // FeatureCollection

    console.log(" starting inner loop ...");

    if (typeof cityInfo == 'object') {
      console.log(" Object: ",city)
    }
    else {
      console.log(" Results: ",cityInfo)
    }

    console.log(" City: ",cityInfo[1].properties);

    console.log("City 2: ", cityInfo[2].properties);
    console.log("City 2a: ,city:")
  //  console.log("City 1a:", cityInfo[2][0].properties);  // error

    console.log("City 3:", cityInfo[3].properties);
  //    console.log("City 3a:", cityInfo[3][0].properties);  // error

    console.log(" --------------------------");

  });  // end each()

console.log("+++++++++++++ Final Test  2 ++++++++++++")
var cityName = jsonData.features[2].properties.City;
console.log(" cityName: ", cityName);

};  // end readCities()


// Similar to console.log()
// $(document).ready(jQueryAjax);

window.onload = jQueryAjax();
