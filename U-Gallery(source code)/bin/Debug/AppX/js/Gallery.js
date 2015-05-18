//Define Global object.
var GalleryP = GalleryP || {};
var imageurl = [];
var count = 1;
var secondConter = 0;
var playCounter = 0;

var setAutopaly;
//Create photo object
var photo = WinJS.Class.define(function (src, displayName,name,path,dateCreated) {
    var that = {};
    //that.url = img;
    //that.title = title;

    that.src = src;
    that.displayName;
    that.name;
    that.path;
    that.dateCreated;

    return that;
});

//Initialise photo source and create photo array
GalleryP.init = function () {

    //Initialise button
    document.getElementById("pauseButton").addEventListener("click", GalleryP.Pause);
    document.getElementById("playButton").addEventListener("click", GalleryP.Play);
    
    //Image read
   // GalleryP.ReadPhotoFile();

    //Add first display image
    var allContainer = document.getElementById("photoContainer");
    var img = document.createElement('img');
    var image = new photo();
    img.src = "images/db/autumn.jpg";
    img.width = 900;
    img.height = 570;

    //Set click event.
    img.onclick = GalleryP.clickEvent;

    //display image.
    allContainer.appendChild(img);
    
    var photos = [
        new photo("images/db/autumn.jpg", "autumn","HH","",""),
        new photo("images/db/dark.jpg", "dark", "HH", "", ""),
        new photo("images/db/dirty.jpg", "dirty", "HH", "", ""),
        new photo("images/db/land.jpg", "land", "HH", "", ""),
        new photo("images/db/landscape.jpg", "land", "HH", "", ""),
        new photo("images/db/mountain.jpg", "land", "HH", "", ""),
        new photo("images/db/mountains.jpg", "land", "HH", "", ""),
        new photo("images/db/umbrellas.jpg", "land", "HH", "", ""),
        new photo("images/db/weather.jpg", "land", "HH", "", ""),
        new photo("images/db/ginkgo.jpg", "land", "HH", "", ""),
        new photo("images/db/autumns.jpg", "land", "HH", "", ""),
        
    ];
    if (imageurl.length > 0) {
        //Read session 
    } else {
        for (var i = 0; i < photos.length; i++) {

            imageurl.push(photos[i].src);
        }
    }
    
   

    //Initialise new photo array object.
    GalleryP.photoList = new GalaeryList(photos);

    //Initialise all photo container
    readAllImage(photos);
    //autopaly
    GalleryP.Play();
   
}

//Bind photo array to list
var GalaeryList = WinJS.Class.define(function (photoarray) {
    var that = {};
    that.photos = new WinJS.Binding.List(photoarray);
    return that;
});

//Add image list

var readAllImage = function (photolist) {
    var allContainer = document.getElementById("allPhoto");
    for (var i = 0; i < imageurl.length; i++) {
        
        //Declare image tag.
        var img = document.createElement('img');
        var image = new photo();
        img.src = imageurl[i];
        img.width = 175;
        img.height = 175;

        //Set click event.
        
        img.setAttribute('onclick', 'GalleryP.clickEvent("' +img.src+ '")');
        //display image.
        allContainer.appendChild(img);
    }

}

//Image onclick fuction
GalleryP.clickEvent = function (image) {
        GalleryP.Pause();
        
        var allContainer = document.getElementById("photoContainer");
        allContainer.innerHTML = "";
        var img = document.createElement('img');
        img.src = image;
        img.width = 900;
        img.height = 570;
        allContainer.appendChild(img);
        
        //count++;
        //if (count > imageurl.length - 1) {
        //    count = 0;
        //}
       
       //Set autoplay function.
        //if (secondConter == 0) {
        //    setAutopaly = setInterval(function () { newfuctiontime() }, 1500);
        //}
    // secondConter++;
        var j = 0;
        var p = 0;
        for (var i = 0; i < imageurl.length; i++) {
            j++
            if ("ms-appx://c75f16b7-aeac-428a-a3e2-081afcf56080/" + imageurl[i] == image) {
                var p = j;
                break;
            }
        }
       
            count = j;
            GalleryP.Play();
       
        
   
}

//Timer fuction.
var myVar = function () {
    var d = new Date();
    document.getElementById("photoContainer").innerHTML = d.toLocaleTimeString();
}

//Declare seperate funtion for autopaly.
function newfuctiontime() {

    //Initialize photo container.
    var allContainer = document.getElementById("photoContainer");

    //Chear container.
    allContainer.innerHTML = "";

    //Declare image tag.
    var img = document.createElement('img');

    //Set image url and size.
    img.src = imageurl[count];
    img.width = 900;
    img.height = 570;
    img.id = "photo";
    allContainer.appendChild(img);

    //refresh counter.
    count++;
    if (count > imageurl.length - 1) {
        count = 0;
    }

}

//Pause autoplay
GalleryP.Pause = function () {
    clearTimeout(setAutopaly);
}

//Start autopaly
GalleryP.Play = function () {
 clearTimeout(setAutopaly);
 setAutopaly = setInterval(function () { newfuctiontime() }, 1500);
}

//image zoomer
GalleryP.zoomImage = function () {

    //Initialize element.
    var container = document.getElementById("photoContainer");
    var slider = document.getElementById("zoom-slider");
    var img = document.getElementById("photoContainer");
    var label = document.getElementById("zoom-level");

    // Do some calculation
    var w = container.clientWidth;
    var h = container.clientHeight;
    var zoom = slider.value;
    var offset = ((w * zoom) - w) / 2;

    // Refresh the user interface
    img.style.zoom = zoom;
    container.scrollLeft = offset;
    container.scrollTop = offset;
    label.innerHTML = zoom;
}


//Navigation to details page.
GalleryP.detailsNavi = function () {
    GalleryP.Pause();
    var currenturl = imageurl[count-1];
    WinJS.Navigation.navigate("/pages/details/details.html", currenturl);
}

//Navigate to add page.
GalleryP.addNavi = function () {
    WinJS.Navigation.navigate("/pages/add/add.html");
}

//Navigate to Home page.
GalleryP.homeNavi = function () {
    WinJS.Navigation.navigate("/pages/home/home.html");
}

//Delete photo
GalleryP.deletefile = function () {
    //Pause animation
    GalleryP.Pause();
}

var photoObject =
    {
        src: null,
        displayName: null,
        name: null,
        path: null,
        dateCreated: null
    };

GalleryP.ReadPhotoFile = function () {
    var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
    openPicker.suggestedStartLocation =Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
    openPicker.viewMode =Windows.Storage.Pickers.PickerViewMode.thumbnail;

    openPicker.fileTypeFilter.clear();
    openPicker.fileTypeFilter.append(".bmp");
    openPicker.fileTypeFilter.append(".png");
    openPicker.fileTypeFilter.append(".jpeg");
    openPicker.fileTypeFilter.append(".jpg");

    openPicker.pickSingleFileAsync().done(
       function (file) {

            if (file) {
                photoObject.displayName = file.displayName;
                photoObject.name = file.name;
                photoObject.path = file.path;
                photoObject.dateCreated = file.dateCreated;
                var imageBlob = URL.createObjectURL(file, { oneTimeOnly: false });
                photoObject.src = imageBlob;

                var allContainer = document.getElementById("allPhoto");


                //Declare image tag.
                var img = document.createElement('img');
                var image = new photo();
                image = photoObject;
                img.src = photoObject.src;
                img.width = 175;
                img.height = 175;
                imageurl.push(photoObject.src);


                //Set click event.
                img.setAttribute('onclick', 'GalleryP.clickEvent("' + img.src + '")');


                //display image.
                allContainer.appendChild(img);

            }
           
           
           
               
            }
     );
  }




