// Initiate dupe highlight with click of the extension icon (browserAction)
// This is alternative to automatically injecting the content script (in manifest, change from delete content_scripts field and use permissions instead ... programatic injection instead of match-based auto-injection)
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('browserAction');
  chrome.tabs.executeScript(null, { file: 'content-script.js' });
});
