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
    var memo = {};
    for (var i = 0; i < names.length; i++) { 
      if (names[i].getElementsByClassName("modified").length == 0) {
        var callback = function(data, status) {
          console.log(this.i);
          if ( status == "success" ) {
            memo[names[this.i].textContent] = data;
            if (Number(data) < -0.1) { 
              names[this.i].innerHTML += "<div class='modified' style='display: inline ;color: red;'> Hater </div>";
            }
            else if (Number(data) > 0.1) {
              names[this.i].innerHTML += "<div class='modified' style='display: inline ;color: green;'> Lover </div>";
            }
            else {
              names[this.i].innerHTML += "<div class='modified' style='display: inline ;color: grey;'> Neutral </div>";
            } 
          }
        };
        if (names[i] in memo) {
          if (Number(memo[names[i].textContent]) < -0.1) { 
            names[i].innerHTML += "<div class='modified' style='display: inline ;color: red;'> Hater </div>";
          }
          else if (Number(memo[names[i].textContent]) > 0.1) {
            names[i].innerHTML += "<div class='modified' style='display: inline ;color: green;'> Lover </div>";
          }
          else {
            names[i].innerHTML += "<div class='modified' style='display: inline ;color: grey;'> Neutral </div>";
          } 
        }
        else { 
          $.post("//suhasarehalli.me/python/shades", { username: names[i].textContent.slice(1) }, callback.bind({i:i}));
        }
      }
    }
  }
});
