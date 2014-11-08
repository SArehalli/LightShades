$(document).ready(function() {
  // Run on initial page
  setNames(document.getElementsByClassName("username js-action-profile-name"));
  
  // Create Observer
  var observer = new MutationObserver(function(mutations) {
    console.log("hey");
    mutations.forEach( function(mutation) {
      setNames(mutation.addedNodes);
      mutation.addedNodes.forEach( function(node) {
        setNames(node.getElementsByClassName("username js-action-profile-name"));
      });
    });
  });
  
  var config = { attributes: false, childList: true, characterData: false };

  observer.observe(document, config);

  // Function to run on page
  function setNames(names) {
    for (var i = 0; i < names.length; i++) { 
       names[i].textContent += " Hater?";
    }
  }
});
