
let table = document.getElementById('transaction-list-body');
let transactions = table.getElementsByClassName('firstdate');

let unique = [];
unique.push(transactions[0]);

let duplicates = [];

let firstHalf = [];
let secondHalf = [];

groupDuplicates(transactions, duplicates, unique);

//splitDuplicates(duplicates, firstHalf, secondHalf);

//highlightElements(firstHalf, secondHalf);
highlightElements(duplicates);
attachDupeHandlers(duplicates);

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

// preserve...
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

// split the duplicates array into two matching arrays so we can differentiate
// between pairs that have been marked as duplicate and those that haven't

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

function highlightElements(arrayOfDuplicates) {
  let color = 'darkSeaGreen';

// TODO Refactor - less duplicate code
// using two matching arrays

// using duplicates array full of array pairs of matches  //////////////
for (var i = 0; i < arrayOfDuplicates.length; i++) {
  let matchedPair = arrayOfDuplicates[i]
  let first = matchedPair[0];
  let second = matchedPair[1];



  if( first.getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
    first.style.background = '#9C5725';
    second.style.background = 'darkSeaGreen';
  } else if (first.getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
    first.style.background = 'darkSeaGreen';
    second.style.background = '#9C5725';
  } else {
    first.style.background = 'brown';
    second.style.background = 'darkKhaki';
  }




  // find elements already marked as duplicate
  // let markedDuplicate = matchedPair.find((element, index) => {
  //   return element.getElementsByClassName('cat')[0].innerText === 'Duplicate'
  // });
  // debugger
  //
  // if(markedDuplicate.length > 0) {
  //   markedDuplicate[0].style.background = '#9C5725';
  //   //mark the other one...
  // }
  // else, highlight w/ different colors
  //.style.background = 'darkSeaGreen';
}

////////////////////////

  // for (var i = 0; i < arrayOfDuplicates.length; i++) {
  // // let marked = some boolean expression
  //   if( arrayOfDuplicates[i].getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
  //     arrayOfDuplicates[i].style.background = '#9C5725';
  //     arrayOfDuplicates2[i].style.background = 'darkSeaGreen';
  //
  //   } else if (arrayOfDuplicates2[i].getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
  //     arrayOfDuplicates[i].style.background = 'darkSeaGreen';
  //     arrayOfDuplicates2[i].style.background = '#9C5725';
  //
  //   } else {
  //     arrayOfDuplicates[i].style.background = 'brown';
  //     arrayOfDuplicates2[i].style.background = 'darkKhaki';
  //   }
  // }

// using one array:
  // arrOfDuplicates.map( (element) => {
  //   color = 'darkSeaGreen';
  //   if(element.getElementsByClassName('cat')[0].innerText === 'Duplicate') {
  //     color = '#9C5725';
  //   }
  //
  //
  //   element.style.background = color;
  // })
}

function attachDupeHandlers(arrayOfDuplicates) {
  let dupeCheckbox = document.getElementById('txnEdit-dup'); // <input>
  debugger
  dupeCheckbox.addEventListener('change', () => {
    console.log('dupe!'); // works!

    let txnId = document.getElementById('txnEdit-txnId').value.substr(0,10);
    let matchingTr = arrayOfDuplicates.find( (element) => {
      let txnNumber = element.id.substr(12);
      return txnId === txnNumber
    });

    if(dupeCheckbox.checked) {
      matchingTr.style.background = '#9C5725';
    }
    debugger
  })
}


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
let duplicateAmounts = duplicates.map( (element) => {
    return element.getElementsByClassName('money')[0].innerText;
})
