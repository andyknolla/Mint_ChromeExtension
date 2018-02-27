
document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.executeScript(null, { file: 'content_script.js' });
});
