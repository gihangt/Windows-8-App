// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    //Declare appbar button
    var homeButton;
    var AddButton;
    var DeleteButton;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
               
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;



            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {

                var appbar = document.getElementById("appbar").winControl;

                //initialise home button
                homeButton = appbar.getCommandById("cmdHome");
                AddButton = appbar.getCommandById("cmdAdd");
                DeleteButton = appbar.getCommandById("cmdDelete");

                WinJS.Navigation.addEventListener("navigated", navigateHander, false);

                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    //Set Navigation handler
    function navigateHander(eventInfo) {
        if (eventInfo.detail.location === "/pages/home/home.html") {
            homeButton.disabled = true;
            AddButton.disabled = false;
            DeleteButton.disabled = false;

        } else if (eventInfo.detail.location === "/pages/add/add.html") {
            homeButton.disabled = false;
            AddButton.disabled = true;
            DeleteButton.disabled = true;
        } else if (eventInfo.detail.location === "/pages/details/details.html") {
            homeButton.disabled = false;
            AddButton.disabled = false;
            DeleteButton.disabled = true;
        }
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
