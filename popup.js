
document.addEventListener('DOMContentLoaded', () => {
  // run instantly for testing
  console.log(window);
  chrome.tabs.executeScript(null, { file: 'findDuplicates.js' });

  document.getElementById('findDuplicates').addEventListener('click', () => {

    var legend = document.getElementById('legend');
    var alert = document.getElementById('alert');

    fadeIn(alert);

    // alert.style.display = 'block';
    legend.style.display = 'block';

//TODO uncomment after testing
    window.setTimeout( () => {
      fadeOut(alert);
      // alert.style.display = 'none';
    }, 3000)

    chrome.tabs.executeScript(null, { file: 'findDuplicates.js' });
  })

  document.getElementById('clearHighlights').addEventListener('click', () => {
    chrome.tabs.executeScript(null, { file: 'clearHighlights.js' });
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
