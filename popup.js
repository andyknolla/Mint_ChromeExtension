
document.addEventListener('DOMContentLoaded', () => {
  // run instantly for testing
  chrome.tabs.executeScript(null, { file: 'findDuplicates.js' });

  document.getElementById('findDuplicates').addEventListener('click', () => {
    chrome.tabs.executeScript(null, { file: 'findDuplicates.js' });
  })

  document.getElementById('clearHighlights').addEventListener('click', () => {
    chrome.tabs.executeScript(null, { file: 'clearHighlights.js' });
  })
});
