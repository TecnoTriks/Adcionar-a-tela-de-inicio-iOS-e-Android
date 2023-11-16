<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@1.4/dist/add-to-homescreen.min.css">
<script src="h_add.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function () {

window.AddToHomeScreenInstance = new window.AddToHomeScreen(
{
appName: 'TecnoTriks',                                   // Name of the app
appIconUrl: 'http://app.tecnotriks.com.br/wp-content/uploads/2023/08/122.png',                       // App icon link (square, at least 40 x 40 pixels)
assetUrl: 'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@1.4/dist/assets/img/',  // Link to directory of library image assets 
showErrorMessageForUnsupportedBrowsers: true,          // Should we prompt users on non-compliant browsers (like IOS Firefox) to switch to compliant one (like Safari) Default: true.
allowUserToCloseModal: false,                           // Allow user to close the 'Add to Homescreen' message? Not allowing will increase installs. Default: false.
maxModalDisplayCount: -1                                // If set, the modal will only show this many times.
                                                        // Default is -1 (no limit).  (Debugging: Use this.clearModalDisplayCount() to reset the count)
}
);
         
ret = window.AddToHomeScreenInstance.show();             // show "add-to-homescreen" instructions to user, or do nothing if already added to homescreen
});
</script>
