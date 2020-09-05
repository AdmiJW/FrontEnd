
//  Default Location. Set to Malaysia
const defaultLocation = {
    lat: 3.1390,
    lng: 101.6869
}
const defaultInformation = {
    Latitude: defaultLocation.lat,
    Longitude: defaultLocation.lng,
    Name: 'Kuala Lumpur',
    Description: 'Capital of Malaysia'
}

//  Constants. Either is user's location or search location
const MODES = {
    USER_LOCATION: "USER_LOCATION",
    SEARCH_LOCATION: "SEARCH_LOCATION"
}





//============================================================================
//  Functions to manipulate the map ==========================================
//============================================================================

//  Takes in the marker instance and latLng object, set the position and animation of marker
//  Depending on the mode set, will set the respective icon or the label to the marker
const setUserMarker = (marker, latLng, mode) => {
    marker.setPosition( latLng );
    marker.setAnimation( google.maps.Animation.BOUNCE );

    marker.setIcon(null);
    marker.setLabel(null);
    if (mode === MODES.USER_LOCATION) {
        marker.setIcon('https://raw.githubusercontent.com/AdmiJW/Items/master/Misc/middle-finger%20(1).png');
    } else if (mode === MODES.SEARCH_LOCATION ) {
        marker.setLabel('S');
    }

    setTimeout(() => {
        marker.setAnimation( null );
    }, 2000);
}

//  Takes in the map and latLng object, set the map to it
//  Will take in a zoom level. By default is 17, which zooms in pretty big
const setCenterMap = (map, latLng, zoom=17 ) => {
    map.setCenter( latLng );
    map.setZoom( zoom );
}

//  Takes in the infowindow and a JSON containing the information of pinned place, sets the content of info window
//  to the key value pair in divs in infoJSON
const setInfoWindow = (infoWindow, infoJSON) => {
    let txt = '';
    for (let key in infoJSON) {
        txt += `<div>${key}: ${infoJSON[key]}</div>`;
    }

    infoWindow.setContent(txt);

}

//  Callback function called when the user device's latLng is obtained
//  Set the map to it, set the marker to point to user's location (Mid finger XD)
//  Then also the infowindow to contain the LMAO information
const onUserLocationObtained = (map, marker, infoWindow, data) => {
    const userLatLng = { lat: data.coords.latitude, lng: data.coords.longitude };
    
    const userInformation = {
        Latitude: userLatLng.lat,
        Longitude: userLatLng.lng,
        Name: 'YOU',
        Description: 'THIS IS WHERE YOU LIVE'
    }

    setCenterMap( map, userLatLng );
    setUserMarker( marker, userLatLng, MODES.USER_LOCATION );
    setInfoWindow( infoWindow, userInformation );
    
    setTimeout(() => {
        window.alert('Suspect Located. Ready to engage!\n-FBI');
    }, 1000);
}


//  Callback function called when the GeoCoding result is returned with result(s).
//  Will get the first result, set the map to it along with the marker and the info window
const onFetchGeoCoding = (map, marker, infoWindow, result) => {
    const firstRes = result.results[0];
    const zoomIn = firstRes['address_components'].length * 2;

    const resultInfo = {
        Address: firstRes['formatted_address'],
        Latitude: firstRes.geometry.location.lat,
        Longitude: firstRes.geometry.location.lng
    }

    const latLng = {
        lat: resultInfo.Latitude,
        lng: resultInfo.Longitude
    }
    
    setCenterMap(map, latLng, zoomIn );
    setUserMarker( marker, latLng, MODES.SEARCH_LOCATION );
    setInfoWindow( infoWindow, resultInfo );

}



//  Runs when the Google map API is loaded. This is the start of the whole program
function initMap() {

    //  Initialize the map at Malaysia as center
    const mapHTML = document.getElementById('map');

    //  Initial Map Settings. 
    const mapProp = {
        center: new google.maps.LatLng( defaultLocation ),
        zoom: 6
    }

    //  The map, marker and info window is created here
    const myMap = new google.maps.Map( mapHTML, mapProp);
    const myMarker = new google.maps.Marker( { map: myMap} );
    setUserMarker( myMarker, defaultLocation );
    const myInfoWindow = new google.maps.InfoWindow();
    setInfoWindow( myInfoWindow, defaultInformation );


    //  Set up the event listener for the get user position button
    const findMyLocationBtn = document.getElementById('pinLocation__findMe');

    findMyLocationBtn.addEventListener('click', ()=> {
        window.navigator.geolocation.getCurrentPosition( (data) => {
            onUserLocationObtained(myMap, myMarker, myInfoWindow, data);
        }, (error) => {
            if (error.code === 1)
                window.alert("I think you blocked me from accessing your location. Go to settings and allow me to access "
                    + "your location\n\nYours Sincerely\nFBI");
            else
                window.alert("Unknown error in obtaining user location");
        } );
    });


    //  Set up the event listener for the marker so that when clicked, shows the info window
    myMarker.addListener('click', () => {
        myInfoWindow.open( myMap, myMarker );
    });


    //  The search button and search field
    const search_btn = document.getElementById('pinLocation__search__btn');
    const search_field = document.getElementById('pinLocation__search__field')

    //  Set up the event listener so when the enter key is pressed when search field is focused, 
    //  it is equivalent to clicking the search button
    search_field.addEventListener('keydown', (e)=> {
        if (e.key === 'Enter') {
            search_btn.click();
        }
    });

    //  When the search button is clicked, perform search by using fetch API and my key
    search_btn.addEventListener('click', ()=> {
        const searchQuery = search_field.value;

        if ( !searchQuery ) {
            window.alert('Please enter something to search for');
            return;
        }
        const apiKey = 'AIzaSyAVs70eupM8lbTofW-nQxzwZoSk13X0CvA';
        const apiAddress = 'https://maps.googleapis.com/maps/api/geocode/json?key=' + apiKey + '&address='
                + encodeURI(searchQuery);

        fetch(apiAddress)
        .then(response => response.json() )
        .then(resJSON => {
            if (resJSON.status === 'OK') {
                onFetchGeoCoding( myMap, myMarker, myInfoWindow, resJSON );
            } else if (resJSON.status === 'ZERO_RESULTS') {
                window.alert('Oops. The given address didn\'t return any results');
            } else {
                window.alert('Unable to fetch the address');
            }
        })
        .catch(err => {
            window.alert(err);
        });
    });



}