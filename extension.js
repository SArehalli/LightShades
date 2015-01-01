$(document).ready(function() {
  
  var love = "<a class='modified' style='display: inline ;color: green;'> Lover </a>";
  var hate = "<a class='modified' style='display: inline ;color: red;'> Hater </a>";
  var switzerland = "<a class='modified' style='display: inline ;color: grey;'> Neutral </a>";
 
  var completed = 0;
  // Run on initial page
  sendNames(document.getElementsByClassName("username js-action-profile-name"));
  
  // Create Observer
  var observer = new MutationObserver(function(mutations) {
    sendNames(document.getElementsByClassName("username js-action-profile-name"));
  });
 
  // config details
  var config = { attributes: false, childList: true, characterData: false };

  // Observe some things
  observer.observe($( "#stream-items-id" )[0], config);
  
  // Function to run on page
  function sendNames(names) {
    data = [];
    for (var i = completed; i < names.length; i++) {
      data.push(names[i].textContent.slice(1));
    }
    var setNames = function(rData, stat) {
      rData = JSON.parse(rData)
      if (stat === "success") {
        for (var i = 0; i < rData.length; i++) {
          if (Number(rData[i]) < -0.1) { 
            names[completed + i].innerHTML += hate; 
          }
          else if (Number(rData[i]) > 0.1) {
            names[completed + i].innerHTML += love; 
          }
          else {
            names[completed + i].innerHTML += switzerland;
          }
          bindLink();
        }
        completed = names.length;
      }
    }
    $.post("//suhasarehalli.me/python/shades", JSON.stringify({ usernames: data, isChart: false }), setNames);
  }  
});


