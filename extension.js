$(document).ready(function() {
  // Run on initial page
  setNames(document.getElementsByClassName("username js-action-profile-name"));
  
  // Create Observer
  var observer = new MutationObserver(function(mutations) {
    setNames(document.getElementsByClassName("username js-action-profile-name"));
  });
 
  // config details
  var config = { attributes: false, childList: true, characterData: false };

  // Observe some things
  observer.observe($( "#stream-items-id" )[0], config);

  // Function to run on page
  function setNames(names) {
    for (var i = 0; i < names.length; i++) { 
       if (names[i].getElementsByClassName("modified").length == 0) {
         names[i].innerHTML += "<div class='modified' style='display: inline ;color: red;'> Hater? </div>";
       }
    }
  }
});
