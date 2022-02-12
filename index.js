let btnInput = document.getElementById('btnInput');

let table = document.getElementById('table');
let totalMin = document.getElementById('totalMin');
let totalSec = document.getElementById('totalSec');
let totalHour = document.getElementById('totalHour');

let btnDelete = document.getElementById('btnDelete');
let itemText = document.getElementById('itemText');
let inputForm = document.getElementById('inputForm');

let timerMinute = document.getElementById('timerMinute');
let timerSecond = document.getElementById('timerSecond');

let setButton = document.getElementById('setButton');
const startButton = document.getElementById('startButton');

let sumMin = 0;
let sumSec = 0;
let secToMin = 0;
let minToSec = 0;
let allSecTotal = 0;

let countdownTimer = 0;

// canvas表示用(円グラフ)
let canvas = document.getElementById('graph');
let graph = canvas.getContext('2d');

// タイマー初期表示
graph.beginPath();
graph.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
graph.strokeStyle = 'gray';
graph.lineWidth = 40;
graph.stroke();

// window.onload = function() {
// };

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
  let newCell05 = newRow.insertCell();

  // 項目名を表示
  newCell01.innerText = itemText.value;

  // 時間を表示
  newCell02.style.textAlign = 'right';

  // 分を表示
  newCell03.innerText = timerMinute.value;
  newCell03.style.textAlign = 'right';

  // 秒を表示
  newCell04.innerText = timerSecond.value;
  newCell04.style.textAlign = 'right';

  // 削除ボタンを追加
  newCell05.innerHTML = '<button id="' + (table.rows.length - 2) + '" onclick="clickDelete(this)" class="delete">削除</button>';

  // ループして合計を出す前に0にする。
  sumSec = 0;
  sumMin = 0;

  // 時間の合計を計算
  totalTimeCalc();

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // 各行の時間の割合を計算
  let pct = table.rows[i].cells[3].innerText / sumSec * 100;
  console.log(pct + '%');

  // 各行の時間の割合を角度に変換
  let kakudo = Math.round(360 * pct / 100);
  console.log(kakudo + '°');

  };
});

// 削除ボタンが押された時の処理
function clickDelete(ele) {
  console.log('deleteボタンが押されました');

  // 削除ボタンのidを取得
  let id_value = ele.id;

  // tableの各行の要素を取得
  let row = document.getElementsByTagName('tr')[id_value];

  // tableから削除
  row.remove();

  // ループして合計を出す前に0にする。
  sumMin = 0;
  sumSec = 0;

  // tableの行数分ループしてidを更新
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // trにidを付与
  let row = table.rows[i];
  row.setAttribute('id', i);

  // 項目欄のナンバリング
  // row.cells[0].innerText = i + '.';

  // 削除ボタンにidを付与
  let dButton = table.rows[i].cells[4].children[0];
  dButton.setAttribute('id', i);
  };

  // 時間の合計を計算
  totalTimeCalc();
};

// setボタンが押された時の処理
setButton.addEventListener('click', function() {
  console.log('setボタンが押されました');

  // 1秒も入力されていなかったら、アラートを出す。
  if (allSecTotal == 0) {
    alert('時間を入力してください(1秒以上)');
    return;
  };

  // パーセントの合計
  let pctGoukei = 0;

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // 各行の項目名を取得
  let rowText = table.rows[i].cells[0].innerText;

  // 各行の秒数を計算
  let minToSec = Number(table.rows[i].cells[2].innerText) * 60;
  let sec = Number(table.rows[i].cells[3].innerText);
  let rowSec = minToSec + sec;

  console.log(rowText + ':' + rowSec);

  // 各行の時間の割合を計算
  let pct = rowSec / allSecTotal;

  // パーセントの合計を計算
  pctGoukei = pctGoukei + pct;

  // 円の描画開始・終了の角度
  console.log('開始：pctGoukei - pct:' + 360 * (pctGoukei - pct) + '°');

  // 色をランダムに設定
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // 円グラフを描画
  graph.beginPath();
  graph.arc(150, 150, 100, (360 * (pctGoukei - pct)) * Math.PI /180, (360 * pctGoukei) * Math.PI /180, false);
  graph.strokeStyle = randomColor;
  graph.lineWidth = 40;
  graph.stroke();
  };

  // inputForm.style.display = 'none';
  // itemText.disabled = true;
  // timerMinute.disabled = true;
  // timerSecond.disabled = true;
  // btnInput.disabled = true;
});

  // 時間の合計を計算
function totalTimeCalc() {
  console.log('totalTimeCalcが実行されました');
  sumMin = 0;
  sumSec = 0;
  for (let i = 1; i < (table.rows.length - 1); i++) {
    sumMin = sumMin + Number(table.rows[i].cells[2].innerText);
    sumSec = sumSec + Number(table.rows[i].cells[3].innerText);
  };
  minToSec = sumMin * 60;
  allSecTotal = (minToSec + sumSec);
  let hour = Math.floor(allSecTotal / 3600);
  let min = Math.floor(allSecTotal / 60) % 60;
  let sec = allSecTotal % 60;
  totalHour.innerText = hour;
  totalMin.innerText = min;
  totalSec.innerText = sec;
};

// STARTボタンを押した時の処理
startButton.addEventListener('click', function() {
  console.log('startボタンが押されました');
  let startTime = new Date();
  console.log('Start' + startTime);

  // countdownTimer = setInterval(countdownGraph, 1000);
});

