
//Define globle objec.
var instantPhotoApp = instantPhotoApp || {};

//Initialise subfolder variable.
instantPhotoApp.customFolder = null;

//Initialise function.
instantPhotoApp.init = function () {
    //initialise button.
    document.getElementById("containerclick").addEventListener("click", instantPhotoApp.takePicture);
}

//take photo.
instantPhotoApp.takePicture = function () {

    

    // Create instance for the camera.
    try {
        var dialog = new Windows.Media.Capture.CameraCaptureUI();
        var aspectRatio = { width: 12, height: 9 };
        dialog.photoSettings.croppedAspectRatio = aspectRatio;
        dialog.photoSettings.format = Windows.Media.Capture.
        CameraCaptureUIPhotoFormat.jpeg;
        dialog.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo)
        .then(
        function (file) {
            if (file) {
                var viewer = document.getElementById("imgPhoto");
                viewer.src = URL.createObjectURL(file);

                //Save photo in sub-folder
                var msg = new Windows.UI.Popups.MessageDialog("Do you want to save this photo?");
               
                // Add commands and set their CommandIds
                msg.commands.append(new Windows.UI.Popups.UICommand("Yes", null, 1));
                msg.commands.append(new Windows.UI.Popups.UICommand("No", null, 2));
                msg.showAsync().done(function (command) {
                    if (command) {
                        if (command.id == 1) {
                            file.copyAsync(instantPhotoApp.customFolder);
                            var msg = new Windows.UI.Popups.MessageDialog("Save Successfully!!");
                           
                            //Call map location display.
                            latLongApp.init();
                          //  msg.showAsync();
                        } else {
                            //Call map location display.
                            latLongApp.init();
                        }
                       
                    }
                });
                
            } else {
                // No photo captured, but no error returned
            }
        },
        function (err) {
            // User canceled the operation.
        }
        );
    }
    catch (err) {
        // error message.
    }
}


//Create sub-folder
var picturesFolder = Windows.Storage.KnownFolders.picturesLibrary;
     picturesFolder.createFolderAsync("Instant Photo",
      Windows.Storage.CreationCollisionOption.
     openIfExists).then(function (folder) {
    instantPhotoApp.customFolder = folder;
});