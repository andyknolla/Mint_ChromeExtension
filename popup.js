
function tryStuff() {
  console.log('popup.js')

}

document.addEventListener('DOMContentLoaded', () => {
  tryStuff();
  console.log('browserAction');
  chrome.tabs.executeScript(null, { file: 'content_script.js' });
});

// document.addEventListener('click', () => {
//   console.log('browserAction');
//   chrome.tabs.executeScript(null, { file: 'content-script.js' });
// });
