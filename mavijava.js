
// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

  var zoomLevel = 6.1;
  var minZoom = 5;
  var screenHeight = window.screen.height;
  if (screenHeight < 680) {
    zoomLevel = 4.7;
    minZoom = 4.7;
  }

//pk.eyJ1IjoibWF2aWhhcml0YW0iLCJhIjoiY2s5bnZqamQwMDJweDNsbjZncWZsM3h6cSJ9.wWaNmt1YUbF7rXhHkxVw4w
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF2aWhhcml0YW0iLCJhIjoiY2s5aW4zYmM2MDBhODNmc2FjZzRqdzRyYSJ9.I27OU2_08z8wvRI_HwpPPA';  
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/maviharitam/ck9prlt9n6lbx1iussvyj0wp8',
        center: [29.0, 39.00], // starting position
        zoom: zoomLevel, // starting zoom
        attributionControl: false
    });
    map.setMinZoom(minZoom);
    map.addControl(new mapboxgl.AttributionControl(), 'bottom-left');

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            fitBoundsOptions: {
              maxZoom: 10
            },
            trackUserLocation: true
        }),'bottom-right'
    );


    map.on('click', function(e) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');

  if (popUps[0]) popUps[0].remove();    // Check if there is already a popup on the map and if so, remove it

  var features = map.queryRenderedFeatures(e.point, {
    layers: ['maviharitam-v5-1'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

var feature = features[0];

// function setHighnessImage() {
//   var highnessImage = document.createElement("img");
//   highnessImage.src = "love.svg";
//   var love = document.getElementById("highnessID").appendChild(highnessImage);
//   love.classList.add('rateImg');  
// }


function setPriceImage() {
  var priceImage = document.createElement("img");
  priceImage.src = "tl.svg";
  var price = document.getElementById("priceID").appendChild(priceImage);
  price.classList.add('popUpImg'); 
}


function setPumpImage() {
  var pumpImage = document.createElement("img");
  if (feature.properties.pump === "1") {
    pumpImage.src = "icon_1.svg";  
  }
  else if (feature.properties.pump === "") {
    pumpImage.src = "icon_2.svg";  
  }
  else {
    pumpImage.src = "icon_0.svg"
  }
  var vacuum = document.getElementById("pumpID").appendChild(pumpImage);
  vacuum.className = "popUpImg";
}

function setWaterImage() {
  var waterImage = document.createElement("img");
  if (feature.properties.water === "1") {
    waterImage.src = "water1.svg";  
  }
  else if (feature.properties.water === "") {
    waterImage.src = "water2.svg";  
  }
  else {
    waterImage.src = "water0.svg"
  }
  var water = document.getElementById("waterAcID").appendChild(waterImage);
  water.className = "popUpImg2";
}

function setACImage() {
  var acImage = document.createElement("img");
  if (feature.properties.AC === "1") {
    acImage.src = "ac1.svg";  
  }
  else if (feature.properties.AC === "") {
    acImage.src = "ac2.svg";  
  }
  else {
    acImage.src = "ac0.svg"
  }
  var ac = document.getElementById("waterAcID").appendChild(acImage);
  ac.className = "popUpImg2";
}

// function setMarketImage() {
//   if (feature.properties.market === "1") {
//     var marketImage = document.createElement("img");
//     marketImage.src = "grocery.svg";
//     var market = document.getElementById("stuffID").appendChild(marketImage);
//     market.className = "image";
//     market.classList.add('stuffImg');  
//   }
// }

// function setPharmaImage() {
//   if (feature.properties.pharma === "1") {
//     var pharmaImage = document.createElement("img");
//     pharmaImage.src = "medic.svg";
//     var pharma = document.getElementById("stuffID").appendChild(pharmaImage);
//     pharma.className = "image";
//     pharma.classList.add('stuffImg');  
//   }
// }

// function setFoodImage() {
//   if (feature.properties.food === "1") {
//     var foodImage = document.createElement("img");
//     foodImage.src = "food.svg";
//     var food = document.getElementById("stuffID").appendChild(foodImage);
//     food.className = "image";  
//     food.classList.add('stuffImg');
//   }
// }


function setAddress() {
  var addressImage = document.createElement("img");
  addressImage.src = "address.svg";
  var addressImg = document.getElementById("addressImgID").appendChild(addressImage); 
  addressImg.className = "popUpImg";
}


function setContacts() {
  var contactsImage = document.createElement("img");
  contactsImage.src = "contacts.svg";
  var contactsImg = document.getElementById("contactsImgID").appendChild(contactsImage);
  contactsImg.className = "popUpImg"; 
}

function setVhf() {
  var vhfImage = document.createElement("img");
  vhfImage.src = "vhf.svg";
  var vhfImg = document.getElementById("vhfImgID").appendChild(vhfImage);
  vhfImg.className = "popUpImg";

}



//Coordinate Conversion
  var longDegrees = Math.floor(feature.geometry.coordinates[0]);
  var longMinutes = Math.floor((feature.geometry.coordinates[0] - Math.floor(feature.geometry.coordinates[0]))*60);
  var longSeconds = Math.round(((feature.geometry.coordinates[0] - Math.floor(feature.geometry.coordinates[0]))*60 - longMinutes)*60);
  var latDegrees = Math.floor(feature.geometry.coordinates[1]);
  var latMinutes = Math.floor((feature.geometry.coordinates[1] - Math.floor(feature.geometry.coordinates[1]))*60);
  var latSeconds = Math.round(((feature.geometry.coordinates[1] - Math.floor(feature.geometry.coordinates[1]))*60 - latMinutes)*60);


if ((feature.properties.pump === "1") || (feature.properties.pump === "2"))  {
  var pumpFlag = "Vakum pompası var"
} else if (feature.properties.pump === "0") {
  var pumpFlag = "Vakum pompası yok"
}
else {
  var pumpFlag = "Bilgi yok"
}

if (feature.properties.AC === "1") {
  var acFlag = "220V var"
} else if (feature.properties.AC === "0") {
  var acFlag = "220V yok"
}
else {
  var acFlag = "Bilgi yok"
}

if (feature.properties.water === "1") {
  var waterFlag = "Su var"
} else if (feature.properties.water === "0") {
  var waterFlag = "Su yok"
}
else {
  var waterFlag = "Bilgi yok"
}

if (feature.properties.price === "") {
  var priceFlag = "Bilgi yok"
}
else {
  var priceFlag = feature.properties.price;
}

if (feature.properties.contacts === "") {
  var contactsFlag = "Bilgi yok"
}
else {
  var contactsFlag = feature.properties.contacts;
}

if (feature.properties.vhf === "") {
  var vhfFlag = "Bilgi yok"
}
else {
  var vhfFlag = feature.properties.vhf;
}

var popup = new mapboxgl.Popup({ offset: [0, -15] })
  .setLngLat(feature.geometry.coordinates)
  .setHTML('<h3 id = "facilityName">' + feature.properties.facility + '</h3> ' 
   // + '<li class = "popUpWriting" id = "highnessID">' + '<p id = "hignessWriting">' + 'Memnuniyet:  ' + feature.properties.highness + '/5' + '</p>' + '</li>' 
    + '<div class="popUpContainer">' 
      + '<div class = "popUpImg" id = "pumpID">' + '</div>' + '<div class = "popUpWriting">' + pumpFlag + '</div>'
      + '<div class = "popUpImg2" id = "waterAcID">' + '</div>' + '<div class = "popUpWriting">' + waterFlag + ', ' + acFlag + '</div>'
      + '<div class = "popUpImg" id = "priceID">' + '</div>' + '<div class = "popUpWriting">' + priceFlag + '</div>'
    + '</div>'
    + '<div class = "spacer">' + '</div>'
    + '<div class="popUpContainer">' 
      + '<div class = "popUpImg" id = "addressImgID">' + '</div>' + '<div class = "popUpWriting">' + latDegrees + '°' + latMinutes + "'" + latSeconds + '"N '  + longDegrees + '°' + longMinutes + "'" + longSeconds + '"E' + '</div>'
      + '<div class = "popUpImg" id = "contactsImgID">' + '</div>' + '<div class = "popUpWriting">' + contactsFlag + '</div>'
       + '<div class = "popUpImg" id = "vhfImgID">' + '</div>' + '<div class = "popUpWriting">' + 'VHF: ' + vhfFlag + '</div>'
    + '</div>'
    + '<div id="shareInfoID" data-toggle="modal" data-target=".form">Bu işletme ile ilgili bilgi önerin' + '</div>'

   // + '<li class = "popup_li" id = "pumpID">' + '<p id = "pumpWriting">' + pumpFlag + '</p>' +  '</li>' + '<br>'
   // + '<li class = "popup_li" id = "waterAcID">' + '<p id = "waterAcWriting">' + waterFlag + ', ' + acFlag +'</p>' +  '</li>'
    // + '<li class = "popUpWriting popup_li" id = "priceID">' + '<p id = "priceWriting">' + priceFlag + '</p>' + '</li>'
    // + '<div class = "spacer">' + '</div>'
    // + '<li class = "singleImg popup_li" id = "addressImgID"></li>' 
    // + '<li class = "popup_li" id = "addressID">' + latDegrees + '°' + latMinutes + "'" + latSeconds + '"N '  + longDegrees + '°' + longMinutes + "'" + longSeconds + '"E' + '</li>' + '<br>' 
    // + '<li class = "singleImg popup_li" id = "contactsImgID"> </li>' + '<li class = "popup_li" id = "contactsID">' + contactsFlag + '</li>' + '<br>' 
    // + '<li class = "singleImg popup_li" id = "vhfImgID"> </li>'+ '<li class = "popup_li" id = "vhfID">' + 'VHF: ' + vhfFlag + '</li>'
    // + '<li class = "popup_li" id = "shareInfoID"> </li>'
    // + '<li class="popup_li" id="shareInfoID" data-toggle="modal" data-target=".form">Bu işletme ile ilgili bilgi önerin</li>'
    // + '</ul>'
    )
    .addTo(map);

  

  // setHighnessImage();
  setPumpImage();
  setWaterImage();
  setACImage();
  setPriceImage();
  setAddress();
  setContacts();
  setVhf();
  // setMarketImage();
  // setPharmaImage();
  // setFoodImage();
});

function flyToPoint(currentFeature) {
  map.flyTo({
    center: [currentFeature.geometry.coordinates[0],currentFeature.geometry.coordinates[1]-0.1],
    speed: 0.6,
    zoom: 10
  })
}

// Add an event listener for when a user clicks on the map
map.on('click', function(e) {
  // Query all the rendered points in the view
  features = map.queryRenderedFeatures(e.point, {layers: ['maviharitam-v5-1']});
  var clickedPoint = features[0];
  flyToPoint(clickedPoint);
});