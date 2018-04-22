
var dupeCheckResult;

function respondToMessage(message) {
  console.log('message.content is ', message.content, 'number of dupes is ', message.numberOfDuplicates);
  dupeCheckResult = message.numberOfDuplicates;

};

chrome.runtime.onMessage.addListener( respondToMessage );



document.addEventListener('DOMContentLoaded', () => {

// run instantly for testing
// console.log(window);
//chrome.tabs.executeScript(null, { file: 'findDuplicates.js' });
// ^ comment out after testing


  document.getElementById('findDuplicates').addEventListener('click', () => {
    var legend = document.getElementById('legend');

    legend.style.display = 'block';

    chrome.tabs.executeScript(null, { file: "jquery-3.3.1.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: "findDuplicates.js" });
    });


    var highlightNotification = document.getElementById('highlightNotification');


    // Change text in highlightNotification, based on message from content_script

    var notificationText = 'No duplicates found';
    if( dupeCheckResult > 0 ) {
      notificationText = `${dupeCheckResult} duplicates highlighted!`
    }
    highlightNotification.innerHTML = notificationText;


    fadeIn(highlightNotification);

    window.setTimeout( () => {
      fadeOut(highlightNotification);
    }, 3000)


  })

// For clearing highlights
  document.getElementById('clearHighlights').addEventListener('click', () => {
    chrome.tabs.executeScript(null, { file: "jquery-3.3.1.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: "clearHighlights.js" });
    });
  })
});

// fade out

function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
       requestAnimationFrame(fade);
    }
  })();
}

// fade in

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
