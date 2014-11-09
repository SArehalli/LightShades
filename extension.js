$(document).ready(function() {
  
  var love = "<a class='modified' style='display: inline ;color: green;'> Lover </a>";
  var hate = "<a class='modified' style='display: inline ;color: red;'> Hater </a>";
  var switzerland = "<a class='modified' style='display: inline ;color: grey;'> Neutral </a>";
 
  var completed = {"":""};
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
      var isMatch = false;
      for (j = 0; j < completed.length; j++ ) {
        isMatch = isMatch || names[i].isSameNode(completed[j]);
      }
      if (!isMatch) {
        completed[i] = names[i];
        var callback = function(data, status) {
          console.log(this.i);
          if ( status == "success" ) {
            memo[names[this.i].textContent] = data;
            if (Number(data) < -0.1) { 
              names[this.i].innerHTML += hate; 
            }
            else if (Number(data) > 0.1) {
              names[this.i].innerHTML += love; 
            }
            else {
              names[this.i].innerHTML += switzerland;
            } 
          }
          bindLink();
        };
        if (names[i] in memo) {
          if (Number(memo[names[i].textContent]) < -0.1) { 
            names[i].innerHTML += hate; 
          }
          else if (Number(memo[names[i].textContent]) > 0.1) {
            names[i].innerHTML += love; 
          }
          else {
            names[i].innerHTML += switzerland; 
          }   
        }
        else { 
          $.post("//suhasarehalli.me/python/shades", { username: names[i].textContent.slice(1), isChart: false }, callback.bind({i:i}));
        }
      }
    }
  }
});
