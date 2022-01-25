let check = document.getElementById('btnSum');
let table = document.getElementById('table');
let total = document.getElementById('total');
let btnDelete = document.getElementById('btnDelete');

let sumCells = 0;

window.onload = function() {
  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // trにidを付与
  let row = table.rows[i];
  row.setAttribute('id', i);

  // 削除ボタンにidを付与
  let dButton = table.rows[i].cells[2].children[0];
  dButton.setAttribute('id', i);

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[1].innerText);
  total.innerText = sumCells;
  };
};

// 合計ボタンが押された時の処理
btnSum.addEventListener('click', function() {
  console.log('合計ボタンが押されました');

  // ループして合計を出す前に0にする。
  sumCells = 0;

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[1].innerText);
  total.innerText = sumCells;
  };
});

// 削除ボタンが押された時の処理
function clickDelete(ele) {
  console.log('deleteボタンが押されました');

  // 削除ボタンのidを取得
  let id_value = ele.id;

  // tableの各行の要素を取得
  let row = document.getElementsByTagName('tr')[id_value];

  // 合計を減算
  sumCells = sumCells - Number(row.cells[1].innerText);
  total.innerText = sumCells;

  // tableから削除
  row.remove();

  // ループして合計を出す前に0にする。
  sumCells = 0;

  // tableの行数分ループしてidを更新
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // trにidを付与
  let row = table.rows[i];
  row.setAttribute('id', i);

  // 項目欄のナンバリング
  row.cells[0].innerText = i + '.';

  // 削除ボタンにidを付与
  let dButton = table.rows[i].cells[2].children[0];
  dButton.setAttribute('id', i);

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[1].innerText);
  total.innerText = sumCells;
  };
};

