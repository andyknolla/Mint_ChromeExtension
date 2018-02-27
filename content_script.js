
let table = document.getElementById('transaction-list-body');
let transactions = table.getElementsByClassName('firstdate');

let unique = [];
unique.push(transactions[0]);

let duplicates = [];

for(var i = 1; i < transactions.length; i++) {
  let date = transactions[i].getElementsByClassName('date')[0].innerText;
  let price = transactions[i].getElementsByClassName('money')[0].innerText;

  let isDupe = false;

  for(var j = 0; j < unique.length; j++) {
    let dupePrice = unique[j].getElementsByClassName('money')[0].innerText;
    let dupeDate = unique[j].getElementsByClassName('date')[0].innerText;
    if( price != '$0.00' && price === dupePrice && date === dupeDate ) {
      // change background color of dupePrice row
      unique[j].style.background = 'bisque';
      isDupe = true;
      break
    }
  }

  isDupe ? duplicates.push(transactions[i]) : unique.push(transactions[i]);

}

highlightDupes(duplicates);

// go through duplicates, change background color for each

function highlightDupes(arr) {
  arr.map( (element) => {
    element.style.background = 'bisque';
  })
}

let duplicateAmounts = duplicates.map( (element) => {
    return element.getElementsByClassName('money')[0].innerText;
})
debugger
