// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/details/details.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
           var current = WinJS.Navigation.state;
           var containe = document.getElementById("currentPhoto");
            //Chear container.
           containe.innerHTML = "";

            //Declare image tag.
           var img = document.createElement('img');

            //Set image url and size.
           img.src = current;
           img.width = 500;
           img.height = 380;
           img.id = "photo";
           containe.appendChild(img);

            //Set the details
           var details = document.getElementById("details");
           var image = new Image();
          
           image.src = current;
           var height = image.height;
           var width = image.width;
           var location = current;
           details.innerHTML = "Details <hr/>" + "<br\>" + "Height  :  " + height + "<br\> " + "Width  :  " + width +
               "<br\>" + "Image Location  :  " + location;

           //var jpeg = new JpegMeta.JpegFile("", current);
           


        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });
})();
