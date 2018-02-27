
let table = document.getElementById('transaction-list-body');
let transactions = table.getElementsByClassName('firstdate');

let unique = [];
unique.push(transactions[0]);

let duplicates = [];

let firstHalf = [];
let secondHalf = [];

groupDuplicates(transactions, duplicates, unique);

splitDuplicates(duplicates, firstHalf, secondHalf);

highlightElements(firstHalf, secondHalf);

function groupDuplicates(elementsArray, dupeArray, uniqueArray) {
  let arrLength = elementsArray.length;

  for(var i = 1; i < arrLength; i++) {
    let date = elementsArray[i].getElementsByClassName('date')[0].innerText;
    let price = elementsArray[i].getElementsByClassName('money')[0].innerText;

    let isDupe = scanForDuplicates(uniqueArray, date, price); // boolean

    isDupe ? dupeArray.push(elementsArray[i]) : uniqueArray.push(elementsArray[i]);

  }
}

function scanForDuplicates(arrForUniques, date, price ) {
  let arrLength = arrForUniques.length;
  for(var j = 0; j < arrLength; j++) {
    let dupePrice = arrForUniques[j].getElementsByClassName('money')[0].innerText;
    let dupeDate = arrForUniques[j].getElementsByClassName('date')[0].innerText;
    if( price != '$0.00' && price === dupePrice && date === dupeDate ) {

      duplicates.push(arrForUniques[j]);
      return true;
    }
  }
}

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

function highlightElements(arrayOfDuplicates, arrayOfDuplicates2) {
  let color = 'darkSeaGreen';

// TODO Refactor - less duplicate code
// using two matching arrays
  for (var i = 0; i < arrayOfDuplicates.length; i++) {
    if( arrayOfDuplicates[i].getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
      arrayOfDuplicates[i].style.background = '#9C5725';
      arrayOfDuplicates2[i].style.background = 'darkSeaGreen';

    } else if (arrayOfDuplicates2[i].getElementsByClassName('cat')[0].innerText === 'Duplicate' ) {
      arrayOfDuplicates[i].style.background = 'darkSeaGreen';
      arrayOfDuplicates2[i].style.background = '#9C5725';

    } else {
      arrayOfDuplicates[i].style.background = 'brown';
      arrayOfDuplicates2[i].style.background = 'darkKhaki';
    }
  }
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

// for testing...
let duplicateAmounts = duplicates.map( (element) => {
    return element.getElementsByClassName('money')[0].innerText;
})
debugger
