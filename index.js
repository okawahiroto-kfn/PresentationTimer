const btnInput = document.getElementById('btnInput');

const table = document.getElementById('table');
const totalMin = document.getElementById('totalMin');
const totalSec = document.getElementById('totalSec');
const totalHour = document.getElementById('totalHour');

const btnDelete = document.getElementById('btnDelete');
const itemText = document.getElementById('itemText');
const inputForm = document.getElementById('inputForm');

const timerMinute = document.getElementById('timerMinute');
const timerSecond = document.getElementById('timerSecond');

const setButton = document.getElementById('setButton');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
let modeButton = 'pause';

let countdownTimer = '';
let overTimeTimer = '';

let hour = 0;
let min = 0;
let sec = 0;

let sumMin = 0;
let sumSec = 0;
let secToMin = 0;
let minToSec = 0;

// 行の時間を秒にしたものrowTimeSec
let rowTimeSec = 0;

// 行の時間を秒にしたものを合計したもの
let rowTimeSecSum = 0;

// 全ての時間を秒にしたものallTimeSec
let allTimeSec = 0;

let countdownSeconds = 0;
let countupSeconds = 0;

let countupOverTimeSeconds = 0;

let rowItem = '';
let rowCount = 0;
let rowMin = 0;
let rowSec = 0;

// 全ての行の時間を秒に変換し、合計したもの(総合計秒)
// let rowTimeSec = 0;

// 各行の時間を秒に変換し、合計したもの(各行の秒)
// let rowTimeSecSum = 0;

let totalTime = 0;

// canvas表示用(円グラフ)
const canvas = document.getElementById('graph');
const graph = canvas.getContext('2d');

const graphText = document.getElementById('graphText');
const graphTime = document.getElementById('graphTime');

let progressPercent = 0;

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
function setTimer() {
  console.log('setボタンが押されました');

  // 1秒も入力されていなかったら、アラートを出す。
  if (allTimeSec == 0) {
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
  minToSec = Number(table.rows[i].cells[2].innerText) * 60;
  rowSec = Number(table.rows[i].cells[3].innerText);
  rowTimeSec = minToSec + rowSec;

  console.log(rowText + ':' + rowTimeSec);

  // 各行の時間の割合を計算
  let pct = rowTimeSec / allTimeSec;

  // パーセントの合計を計算
  pctGoukei = pctGoukei + pct;

  // 円の描画開始・終了の角度
  // console.log('開始：pctGoukei - pct:' + 360 * (pctGoukei - pct) + '°');

  // 色をランダムに設定
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // 円グラフを描画
  graph.beginPath();
  graph.arc(150, 150, 100, (360 * (pctGoukei - pct)) * Math.PI /180, (360 * pctGoukei) * Math.PI /180, false);
  graph.strokeStyle = randomColor;
  graph.lineWidth = 40;
  graph.stroke();
  };

  // タイマー初期値を設定
  // カウントダウン・カウントアップの変数宣言
  totalTimeCalc();

  countdownSeconds = allTimeSec;
  countupSeconds = 0;

  rowCount = 1;
  rowTimeSec = 0;
  rowTimeSecSum = 0;

  rowItem = table.rows[rowCount].cells[0].innerText;
  rowMin = Number(table.rows[rowCount].cells[2].innerText);
  rowSec = Number(table.rows[rowCount].cells[3].innerText);
  minToSec = rowMin * 60;

  rowTimeSec = minToSec + rowSec;

  graphText.innerText = rowItem;
  graphTime.innerText = timeConvert(allTimeSec);

  console.log(timeConvert(allTimeSec));

  rowTimeSecSum = rowTimeSecSum + rowTimeSec;

  console.log(rowTimeSec);
  console.log(rowTimeSecSum);
  // 1行目の項目名、秒数を取得
  // rowMin = Number(table.rows[rowCount].cells[2].innerText);
  // rowSec = Number(table.rows[rowCount].cells[3].innerText);
  // rowTimeSecSum = rowMin * 60 + rowSec;
  // graphText.innerText = rowItem;
  // graphTime.innerText = allTimeSec;

  // inputForm.style.display = 'none';
  // itemText.disabled = true;
  // timerMinute.disabled = true;
  // timerSecond.disabled = true;
  // btnInput.disabled = true;
};

// STARTボタンを押した時の処理
startButton.addEventListener('click', function() {
  console.log('startボタンが押されました');
  let startTime = new Date();
  console.log('Start:' + startTime);

  // setIntervalで1秒ごとにcountdownGraphを実行
  countdownTimer = setInterval(countdownGraph, 1000);
});

// 1秒ごとにグラフを描画
function countdownGraph() {
  console.log('----------------------');
  console.log('タイマー開始');
  let startTime = new Date();
  console.log('Start:' + startTime);

  rowItem = table.rows[rowCount].cells[0].innerText;
  // rowMin = Number(table.rows[rowCount].cells[2].innerText);
  // rowSec = Number(table.rows[rowCount].cells[3].innerText);
  // minToSec = rowMin * 60;

  // rowTimeSecSum = rowTimeSecSum + rowTimeSec;


  // 項目名と項目秒を取得・表示
  console.log('▼前---');
  console.log('countdownSeconds:' + countdownSeconds);
  console.log('countupSeconds:' + countupSeconds);
  console.log('rowCount:' + rowCount);
  console.log('rowItem:' + rowItem);
  console.log('rowTimeSec:' + rowTimeSec);
  console.log('rowTimeSecSum:' + rowTimeSecSum);

  // カウントアップした秒が項目秒の合計と等しくなったら次の行に移る。
  if (countupSeconds + 1 >= rowTimeSecSum) {
    rowCount = rowCount + 1;

    rowMin = Number(table.rows[rowCount].cells[2].innerText);
    rowSec = Number(table.rows[rowCount].cells[3].innerText);
    minToSec = rowMin * 60;
    rowTimeSec = minToSec + rowSec;

    rowTimeSecSum = rowTimeSecSum + rowTimeSec;
  };

  console.log('▼後---');
  console.log('countdownSeconds:' + countdownSeconds);
  console.log('countupSeconds:' + countupSeconds);
  console.log('rowCount:' + rowCount);
  console.log('rowItem:' + rowItem);
  console.log('rowTimeSec:' + rowTimeSec);
  console.log('rowTimeSecSum:' + rowTimeSecSum);



  // カウントダウン・カウントアップを実行
  countdownSeconds = countdownSeconds - 1;
  countupSeconds = countupSeconds + 1;

  graphText.innerText = rowItem;
  graphTime.innerText = timeConvert(allTimeSec - countupSeconds);

  // // 全体の時間の何%経過したか計算
  progressPercent = countupSeconds / allTimeSec;

  // 円グラフの経過時間をグレーで表示
  graph.beginPath();
  graph.arc(150, 150, 100, 0 * Math.PI / 180, (360 * progressPercent) * Math.PI /180, false);
  graph.strokeStyle = 'gray';
  graph.lineWidth = 40;
  graph.stroke();

  if (countdownSeconds <= 0) {
    clearInterval(countdownTimer);
    console.log('END!');
    let endTime = new Date();
    console.log('END:' + endTime);

    graphText.innerText = 'END!';

    graphTime.style.color = 'red';

    // graphTime.innerText = allTimeSec - countupSeconds;

    // タイマー終了表示
    graph.beginPath();
    graph.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
    graph.strokeStyle = 'red';
    graph.lineWidth = 40;
    graph.stroke();

    countupOverTimeSeconds = 0;

    timeOver();
  };
};

// PAUSEボタン(RESUMEボタン)を押した時の処理
function pause() {
  switch (modeButton) {
    case 'pause':
      console.log('pauseボタンが押されました');
      pauseButton.value = 'RESUME';
      modeButton = 'resume';

      if (countdownSeconds > 0) {
        clearInterval(countdownTimer);
      } else {
        clearInterval(overTimeTimer);
      }
      break;

      case 'resume':
      console.log('resumeボタンが押されました');
      pauseButton.value = 'PAUSE';
      modeButton = 'pause';

      if (countdownSeconds > 0) {
        countdownTimer = setInterval(countdownGraph, 1000);
      } else {
        overTimeTimer = setInterval(countupOverTime, 1000);
      };

      break;
  };
};

// RESETボタンを押した時の処理
resetButton.addEventListener('click', function() {
  console.log('resetボタンが押されました');
  clearInterval(countdownTimer);
  clearInterval(overTimeTimer);
  graphTime.style.color = 'black';
  setTimer();
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
  allTimeSec = (minToSec + sumSec);
  hour = Math.floor(allTimeSec / 3600);
  min = Math.floor(allTimeSec / 60) % 60;
  sec = allTimeSec % 60;

  min = ('0' + min).slice(-2);
  sec = ('0' + sec).slice(-2);

  // 合計時間を時・分・秒に分けて表示
  totalHour.innerText = hour;
  totalMin.innerText = min;
  totalSec.innerText = sec;
  totalTime = hour + ':' + min + ':' + sec;

  // 合計時間を表示
  // totalSec.innerText = timeConvert(allTimeSec);
};

// 秒を時間：分:秒に変換
function timeConvert(time) {
  hour = Math.floor(time / 3600);
  min = Math.floor(time / 60) % 60;
  sec = time % 60;

  // min = ('0' + min).slice(-2);
  // sec = ('0' + sec).slice(-2);

  if (hour > 0) {
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);
    return hour + ':' + min + ':' + sec;
  } else {
    sec = ('0' + sec).slice(-2);
    return min + ':' + sec;
  };
};

function timeOver() {
  console.log('timeOverが実行されました');
  overTimeTimer = setInterval(countupOverTime, 1000);
};

function countupOverTime() {
  countupOverTimeSeconds ++;
  graphTime.innerText = timeConvert(countupOverTimeSeconds);
};

