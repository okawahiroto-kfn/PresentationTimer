let btnInput = document.getElementById('btnInput');
let table = document.getElementById('table');
let total = document.getElementById('total');
let btnDelete = document.getElementById('btnDelete');
let itemText = document.getElementById('itemText');
let itemTime = document.getElementById('itemTime');

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

// 入力ボタンが押された時の処理
btnInput.addEventListener('click', function() {
  console.log('入力ボタンが押されました');

  // 合計行の上に新しい行を追加
  let newRow = table.insertRow(table.rows.length - 1);

  // 各行にidを付与
  newRow.setAttribute('id', table.rows.length - 2);

  // セルを追加
  let newCell01 = newRow.insertCell();
  let newCell02 = newRow.insertCell();
  let newCell03 = newRow.insertCell();

  // 項目欄のナンバリング
  newCell01.innerText = itemText.value;

  // 時間欄に入力された時間を追加
  newCell02.innerText = itemTime.value;

  // 削除ボタンを追加
  newCell03.innerHTML = '<button id="' + (table.rows.length - 2) + '" onclick="clickDelete(this)">削除</button>';

  // ループして合計を出す前に0にする。
  sumCells = 0;

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[1].innerText);
  total.innerText = sumCells;
  };

  // 各行の時間の割合を計算(途中)
  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  let pct = table.rows[i].cells[1].innerText / sumCells * 100;
  console.log(pct);
  console.log(360 * pct / 100);
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
  // row.cells[0].innerText = i + '.';

  // 削除ボタンにidを付与
  let dButton = table.rows[i].cells[2].children[0];
  dButton.setAttribute('id', i);

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[1].innerText);
  total.innerText = sumCells;
  };
};

