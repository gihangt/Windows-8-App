//Declare Global object;
var latLongApp = latLongApp || {};

//Initialise location.
var geolocator = null;

//Initialise latitude and longitude
var loastPostition = null;


//Initialise all fuction.
latLongApp.init = function () {
    //Initialise share button
    document.getElementById("buttonshare").addEventListener('click', latLongApp.
        shareClick);
    latLongApp.getPosition();
    latLongApp.GPS();
}

//Get latitude and longitude.
latLongApp.getPosition = function () {
    geolocator = new Windows.Devices.Geolocation.Geolocator();
    var position = geolocator.getGeopositionAsync().then(latLongApp.display,
    latLongApp.error);
    loastPostition
}

//Display longitude and latitude.
latLongApp.display = function (location) {
    document.getElementById("latitude").innerHTML =
        "<h3><b>Location Details</b></h3><hr/><br/>" + "<b>Latitude    : </b>" +
        location.coordinate.latitude;
    document.getElementById("longitude").innerHTML = "<b>Longitude  : </b>"+location.coordinate.longitude;
}

latLongApp.GPS = function () {
    var gl = new Windows.Devices.Geolocation.Geolocator();
    gl.getGeopositionAsync().done(
        function (position) {
            loastPostition = { latitude: position.coordinate.latitude, longitude: position.coordinate.longitude }
            callFrameScript(document.frames["map"], "pinLocation", [position.coordinate.latitude, position.coordinate.longitude]);

        }, function (err) {
            var dlg = new Windows.UI.Popups.MessageDialog(err.message, "Location Error")
            dlg.showAsync();
        }
        );
}

function callFrameScript(frame, targetFunction, args) {
    var message = { functionName: targetFunction, args: args };
    frame.postMessage(JSON.stringify(message), "ms-appx-web://" + document.location.host);
}

//Declare share function
latLongApp.shareClick = function () {
    Windows.ApplicationModel.DataTransfer.DataTransferManager.showShareUI();
}