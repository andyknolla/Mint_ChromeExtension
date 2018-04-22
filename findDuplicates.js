
var table = document.getElementById('transaction-list-body');
var transactions = table.getElementsByClassName('firstdate');





var unique = [];
unique.push(transactions[0]);

var duplicates = [];

var firstHalf = [];
var secondHalf = [];

groupDuplicates(transactions, duplicates, unique);

//splitDuplicates(duplicates, firstHalf, secondHalf);

//highlightElements(firstHalf, secondHalf);
highlightElements(duplicates);
attachDupeHandlers(duplicates);

dupeCheckComplete();

function dupeCheckComplete() {

}

//TODO is uniqueArray (unique) necessary?
function groupDuplicates(elementsArray, dupeArray, uniqueArray) {
  let arrLength = elementsArray.length;

  for(var i = 1; i < arrLength; i++) {

    let date = elementsArray[i].getElementsByClassName('date')[0].innerText;
    let price = elementsArray[i].getElementsByClassName('money')[0].innerText;

//TODO assign this differently. On 4.12 it is adding the first matched pair for each dupe it finds.

    let matchingPair = scanForDuplicates(uniqueArray, date, price)

    if( matchingPair.length > 0 ) {

      matchingPair.push(elementsArray[i]);
      dupeArray.push(matchingPair);
    } else {
      uniqueArray.push(elementsArray[i])
    }
  }
}

function scanForDuplicates(arrForUniques, date, price) {
  let arrayForPairingDuplicates = [];
  let arrLength = arrForUniques.length;
  const isDupe = (comparePrice, compareDate) => {
    return price != '$0.00' && comparePrice === price && compareDate === date;
  }

  for(var j = 0; j < arrLength; j++) {
    let dupePrice = arrForUniques[j].getElementsByClassName('money')[0].innerText;
    let dupeDate = arrForUniques[j].getElementsByClassName('date')[0].innerText;

    if( isDupe(dupePrice, dupeDate) ) {
      arrayForPairingDuplicates.push(arrForUniques[j]);
      arrForUniques.push(arrForUniques[j]);  //
    }
  }
  return arrayForPairingDuplicates;
}

function splitDuplicates(arrayOfDuplicates, firstSet, secondSet) {
  // TODO add some validation/error handling

  // if array length is not even number, there isn't a match for each item
  // if(arrayOfDuplicates.length % 2 != 0) throw new error() {
  //
  // }

  // this assumes that all matches are together in the array
  for(var i=0;i < arrayOfDuplicates.length; i++) {
    (i % 2 === 0) ? firstSet.push(arrayOfDuplicates[i]) : secondSet.push(arrayOfDuplicates[i]);
  }
}

function highlightElements(arrayOfDuplicatePairs) {

  // tell extension how many duplicates
  chrome.runtime.sendMessage({ message: 'dirka', numberOfDuplicates: arrayOfDuplicatePairs.length});
  let color = 'darkSeaGreen';

// TODO Refactor - less duplicate code

// using duplicates array full of array pairs of matches  //////////////
  for (var i = 0; i < arrayOfDuplicatePairs.length; i++) {
    let matchedPair = arrayOfDuplicatePairs[i]
    let first = matchedPair[0];
    let second = matchedPair[1];

    if( first.getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
      first.style.background = 'hsla(0,62%,21%,0.35)';
      second.style.background = 'hsla(91,66%,14%,0.3)';
    } else if (second.getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
      first.style.background = 'hsla(91,66%,14%,0.3)';
      second.style.background = 'hsla(0,62%,21%,0.35)';
    } else {
      first.style.background = 'hsla(0,46%,49%,1)';
      second.style.background = 'hsla(91,38%,58%,1)';
    }
  }

}

function attachDupeHandlers(arrayOfMatchedPairs) {
  if( arrayOfMatchedPairs.length === 0 ) return

  let dupeCheckbox = document.getElementById('txnEdit-dup'); // <input>
  debugger
  dupeCheckbox.addEventListener('change', () => {

    var txnId = document.getElementById('txnEdit-txnId').value.substr(0,10);
    var txnNumber, txnNumber2;

    var relatedMatchedPair = arrayOfMatchedPairs.find( (matchedPair) => {

      txnNumber = matchedPair[0].id.substr(12);
      txnNumber2 = matchedPair[1].id.substr(12);
      return txnId === txnNumber || txnId === txnNumber2;
    });

    if( dupeCheckbox.checked ) {

      if( txnNumber === txnId ) {
        relatedMatchedPair[0].style.background = 'hsla(0,62%,21%,0.35)';
        relatedMatchedPair[1].style.background = 'hsla(91,66%,14%,0.3)';
      } else if ( txnNumber2 === txnId ){
        relatedMatchedPair[0].style.background = 'hsla(91,66%,14%,0.3)';
        relatedMatchedPair[1].style.background = 'hsla(0,62%,21%,0.35)';
      }

    } else if (!dupeCheckbox.checked) {

      if( txnNumber === txnId ) {
        relatedMatchedPair[0].style.background = 'hsla(0,46%,49%,1)';
        relatedMatchedPair[1].style.background = 'hsla(91,38%,58%,1)';
      } else if ( txnNumber2 === txnId ){
        relatedMatchedPair[0].style.background = 'hsla(91,38%,58%,1)';
        relatedMatchedPair[1].style.background = 'hsla(0,46%,49%,1)';
      }

    }
    debugger
  });
};

// document.getElementById('txnEdit-submit').addEventListener('click', () => {
//     let dupeCheckbox = document.getElementById('txnEdit-dup'); // <input>
//
//
// }



//TODO Watch unmarked duplicates, change highlight color if user marks-as-duplicate
// The Edit Details dropdown is a div that is always on the page. It shows up and is positioned based on which transaction is in focus

// *location of the dupe checkbox:
  // after the main transactions table... div#txnEdit > #txnEdit-form > div > div.buttons > label > input#txnEdit-dup

// Implementation:
  // Attach click handler (or other appropriate handler... watch for "checked"?) to the dupe checkbox inside of the details div
  // if it's value changes, get the txn id (input w/ id="txnEdit-txnId"),
  // * can check if you're dealing w/ a dupe...the details div will have class="duplicate"
  // Check to see if current txn is a dupe...match up with the <tr>s in my duplicates array(s?)

  // if the current txn is a dupelicate and gets marked as a duplicate, change the corresponding <tr> background color, and its match to the other color


// for testing...
// let duplicateAmounts = duplicates.map( (element) => {
//     return element.getElementsByClassName('money')[0].innerText;
// })


// preserve...

// preserve
// function groupDuplicates(elementsArray, dupeArray, uniqueArray) {
//   let arrLength = elementsArray.length;
//
//   for(var i = 1; i < arrLength; i++) {
//     let date = elementsArray[i].getElementsByClassName('date')[0].innerText;
//     let price = elementsArray[i].getElementsByClassName('money')[0].innerText;
//
//     let isDupe = scanForDuplicates(uniqueArray, date, price); // boolean
//
//     isDupe ? dupeArray.push(elementsArray[i]) : uniqueArray.push(elementsArray[i]);
//
//   }
// }

// function scanForDuplicates(arrForUniques, date, price ) {
//   let arrLength = arrForUniques.length;
//   for(var j = 0; j < arrLength; j++) {
//     let dupePrice = arrForUniques[j].getElementsByClassName('money')[0].innerText;
//     let dupeDate = arrForUniques[j].getElementsByClassName('date')[0].innerText;
//     if( price != '$0.00' && price === dupePrice && date === dupeDate ) {
//       duplicates.push(arrForUniques[j]);
//       return true;
//     }
//   }
// }
