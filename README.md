# Dupe-highlighter
## A Chrome extension that finds and highlights duplicate transactions on Mint.com's Transactions page.

### Development:
#### How to run locally
* Go to [chrome://extensions/](chrome://extensions/)
* Turn on 'Developer mode' if it's not already (switch in top right corner).
* Click "load unpacked".
* Navigate to your project in your file system and select it.
* This loads it in your local Chrome browser. You should see the favicon in your toolbar and in the //extensions page you'll see a card for your extension.
* Load changes by clicking the reload icon. Do this every time you save in your text editor and want to see the changes in the browser.

#### Making and test changes
* To update, in chrome://extensions, click refresh on the individual extension card. You may need to refresh the browser too.
* All of the functional code for this app is in content_script.js.

#### View dev tools for the extension environment?

* More notes in my Apple notepad

#### Work Notes:

##### Clearing highlights, especially on pagination
* Pagination element is a <ul> w/ id 'transaction-paging'
* Test commit
