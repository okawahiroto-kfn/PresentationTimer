let check = document.getElementById('btnSum');
let table = document.getElementById('table');
let total = document.getElementById('total');

let sumCells = 0;

btnSum.addEventListener('click', function() {
  console.log('checkボタンが押されました');
  console.log(table);
  console.log(table.rows);
  console.log(table.rows.length);

  for (let i = 1; i < (table.rows.length - 1); i++) {
    console.log(table.rows[i].cells[1].innerText);
    sumCells = sumCells + Number(table.rows[i].cells[1].innerText);
  };
  console.log(sumCells);
  total.innerText = sumCells;
  sumCells = 0;
});
