let btnInput = document.getElementById('btnInput');
let table = document.getElementById('table');
let total = document.getElementById('total');
let btnDelete = document.getElementById('btnDelete');
let itemText = document.getElementById('itemText');
let itemTime = document.getElementById('itemTime');
let itemSec = document.getElementById('itemSec');
let setButton = document.getElementById('setButton');

let sumCells = 0;

// canvas表示用(円グラフ)
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

// タイマー初期表示
context.beginPath();
context.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
context.strokeStyle = 'gray';
context.lineWidth = 40;
context.stroke();

window.onload = function() {

  // 項目入力欄を初期化
  itemText.value = '';

  // 項目時間入力欄を初期化
  itemTime.value = '';

  // 項目時間入力欄を初期化
  itemSec.value = '';

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // trにidを付与
  let row = table.rows[i];
  row.setAttribute('id', i);

  // 削除ボタンにidを付与
  let dButton = table.rows[i].cells[3].children[0];
  dButton.setAttribute('id', i);

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[2].innerText);
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
  let newCell04 = newRow.insertCell();

  // 項目名を表示
  newCell01.innerText = itemText.value;

  // 項目入力欄を初期化
  itemText.value = '';

  // 時間欄に入力された時間を追加
  newCell03.innerText = itemSec.value;

  // 項目時間入力欄を初期化
  itemSec.value = '';

  // 削除ボタンを追加
  newCell04.innerHTML = '<button id="' + (table.rows.length - 2) + '" onclick="clickDelete(this)">削除</button>';

  // ループして合計を出す前に0にする。
  sumCells = 0;

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // trにidを付与
  let row = table.rows[i];
  row.setAttribute('id', i);

  // 項目欄のナンバリング
  // row.cells[0].innerText = i + '.';

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[2].innerText);
  total.innerText = sumCells;
  };

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // 各行の時間の割合を計算
  let pct = table.rows[i].cells[2].innerText / sumCells * 100;
  console.log(pct + '%');

  // 各行の時間の割合を角度に変換
  let kakudo = Math.round(360 * pct / 100);
  console.log(kakudo + '°');

  // 60°になったときは、OK!と表示(360割る6が60°になることを確認)
  if (kakudo == 60) {
    console.log('OK!');
    };
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
  sumCells = sumCells - Number(row.cells[2].innerText);
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
  let dButton = table.rows[i].cells[3].children[0];
  dButton.setAttribute('id', i);

  // 合計計算
  sumCells = sumCells + Number(table.rows[i].cells[2].innerText);
  total.innerText = sumCells;
  };
};

setButton.addEventListener('click', function() {
  console.log('setボタンが押されました');

  // パーセントの合計
  let pctGoukei = 0;

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // 各行の時間の割合を計算
  let pct = table.rows[i].cells[2].innerText / sumCells;

  // パーセントの合計を計算
  pctGoukei = pctGoukei + pct;

  // 円の描画開始・終了の角度
  console.log(i + '---');
  console.log('開始：pctGoukei - pct:' + 360 * (pctGoukei - pct) + '°');
  console.log('終了：pctGoukei      :' + 360 * pctGoukei + '°');

  // 色をランダムに設定
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // 円グラフを描画
  context.beginPath();
  context.arc(150, 150, 100, (360 * (pctGoukei - pct)) * Math.PI /180, (360 * pctGoukei) * Math.PI /180, false);
  context.strokeStyle = randomColor;
  context.lineWidth = 40;
  context.stroke();
  };
});
