let check = document.getElementById('btnSum');
let table = document.getElementById('table');
let total = document.getElementById('total');
let btnDelete = document.getElementById('btnDelete');

let sumCells = 0;

// 合計ボタンが押された時の処理
btnSum.addEventListener('click', function() {
  console.log('合計ボタンが押されました');

  // tebleの要素を表示
  console.log(table);

  // tableの各行の要素を表示
  console.log(table.rows);

  // tableの行数を表示
  console.log(table.rows.length);

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {
    // 時間の合計を計算
    sumCells = sumCells + Number(table.rows[i].cells[1].innerText);

    // trにidを付与
    let row = table.rows[i];
    row.setAttribute('id', i);
    console.log(row);

    // 削除ボタンにidを付与
    let dButton = table.rows[i].cells[2].children[0];
    dButton.setAttribute('id', i);
    console.log(dButton);
  };

  console.log(sumCells);
  total.innerText = sumCells;
  sumCells = 0;
});

// 削除ボタンが押された時の処理
function clickDelete() {
  console.log('deleteボタンが押されました');
  console.log(btnDelete.id);
  console.log(btnDelete.parentNode.parentNode.cells[1].innerText);
  console.log(btnDelete.parentNode);
  console.log(btnDelete.parentNode.parentNode);
  console.log(document.getElementById(btnDelete.id));
  let row = document.getElementById(btnDelete.id);
  console.log(row);
  // row.parentNode.removeChild(row);
};
