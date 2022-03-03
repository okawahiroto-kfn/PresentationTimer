const btnInput = document.getElementById('btnInput');

const table = document.getElementById('table');
const totalMin = document.getElementById('totalMin');
const totalSec = document.getElementById('totalSec');
const totalHour = document.getElementById('totalHour');
const totalTime = document.getElementById('totalTime');

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

// 各行の秒数
let rowTimeSec = 0;

// 各行の秒数を足し込んだもの
let rowTimeSecSum = 0;

// 全ての時間の秒数
let allTimeSec = 0;

// カウントダウン用
let countdownSeconds = 0;

// カウントアップ用
let countupSeconds = 0;

// タイマー終了後の秒数
let countupOverTimeSeconds = 0;

let rowItem = '';
let rowCount = 0;
let rowMin = 0;
let rowSec = 0;

let totalTimehhmmss = 0;

// canvas表示用(円グラフ)
const canvas = document.getElementById('graph');
const graph = canvas.getContext('2d');

// グラフ内部の項目・残り時間
const graphText = document.getElementById('graphText');
const graphTime = document.getElementById('graphTime');

let progressPercent = 0;

let rowTime = [];
let rowItemAndTime= { itemText: '', rowTimeSec: 0 };
let rowTimeTotal = 0;

// タイマー初期表示
graph.beginPath();
graph.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
graph.strokeStyle = 'gray';
graph.lineWidth = 40;
graph.stroke();

window.onload = function() {
  // setButton.disabled = true;
  startButton.disabled = true;
  pauseButton.disabled = true;
  resetButton.disabled = true;
};

// 入力ボタンが押された時の処理
btnInput.addEventListener('click', function() {
  console.log('入力ボタンが押されました');

  // 時間が入力されているか確認
  if ((Number(timerMinute.value) + Number(timerSecond.value)) == 0) {
    alert('時間を入力してください(1秒以上)');
    return;
  };

  // 合計行の上に新しい行を追加
  let newRow = table.insertRow(table.rows.length - 1);

  // 各行にidを付与
  newRow.setAttribute('id', table.rows.length - 3);

  // セルを追加
  let newCell01 = newRow.insertCell();
  let newCell02 = newRow.insertCell();
  let newCell03 = newRow.insertCell();
  let newCell04 = newRow.insertCell();
  let newCell05 = newRow.insertCell();
  let newCell06 = newRow.insertCell();

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
  newCell05.innerHTML = '<button id="' + (table.rows.length - 3) + '" onclick="clickDelete(this)" class="delete">削除</button>';

  // 分を秒に変換し、合計
  rowMin = Number(timerMinute.value);
  rowSec = Number(timerSecond.value);
  minToSec = rowMin * 60;

  rowTimeSec = minToSec + rowSec;

  // 時間表示用のセル追加(暫定)
  newCell06.innerText = timeConvert(rowTimeSec);
  newCell06.style.textAlign = 'right';

  // 各行の項目と秒数を配列に格納
  rowItemAndTime = { itemText: itemText.value, rowTimeSec: rowTimeSec };
  rowTime.push(rowItemAndTime);
  console.log(rowTime);

  // 配列の合計時間を計算、表示
  totalTimeCalcArray();
  console.log(rowTimeTotal);
  totalTime.innerText = timeConvert(rowTimeTotal);

  // ループして合計を出す前に0にする。
  sumSec = 0;
  sumMin = 0;

  // 時間の合計を計算
  // totalTimeCalc();

  // グラフを計算・表示
  setTimer();

  // 入力フォームにフォーカスし、空にする
  document.getElementById('itemText').focus();
  document.getElementById('itemText').value = '';

});

// 削除ボタンが押された時の処理
function clickDelete(ele) {
  console.log('deleteボタンが押されました');


  // 削除ボタンの行の要素を取得
  let tr = ele.parentNode.parentNode;

  // tableから削除
  tr.remove();

  console.log(rowTime);

  // 削除ボタンのid取得＝削除する行のid
  let deleteRow = ele.id;

  // 削除する行のidを元に配列から削除
  rowTime.splice(deleteRow, 1);
  console.log(rowTime);


  // ループして合計を出す前に0にする。
  sumMin = 0;
  sumSec = 0;

  // tableの行数分ループしてidを更新
  // タイトル行をとばすので、1から始める。
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // trにidを付与
  let row = table.rows[i];
  row.setAttribute('id', i - 1);

  // 項目欄のナンバリング
  // row.cells[0].innerText = i + '.';

  // 削除ボタンにidを付与
  let dButton = table.rows[i].cells[4].children[0];
  dButton.setAttribute('id', i - 1);
  };

  // 配列の合計時間を計算、表示
  totalTimeCalcArray();
  totalTime.innerText = timeConvert(rowTimeTotal);

  // 時間の合計を計算
  totalTimeCalc();

  setTimer();

  if (table.rows.length == 2) {
    startButton.disabled = true;
  };
};

// setボタンが押された時の処理
function setTimer() {
  console.log('グラフ描画開始');

  // タイマー初期値を設定
  // カウントダウン・カウントアップの変数宣言
  totalTimeCalc();

  // 時間の合計をカウントダウンに用いる。
  countdownSeconds = allTimeSec;

  // カウントアップ用
  countupSeconds = 0;

  // 行数カウント
  rowCount = 1;

  // 各行の時間を秒に変換
  rowTimeSec = 0;

  // 各行の時間を秒に変換したものの合計
  rowTimeSecSum = 0;

  rowItem = table.rows[rowCount].cells[0].innerText;
  rowMin = Number(table.rows[rowCount].cells[2].innerText);
  rowSec = Number(table.rows[rowCount].cells[3].innerText);
  minToSec = rowMin * 60;

  // 各行の秒数
  rowTimeSec = minToSec + rowSec;

  graphText.innerText = rowItem;
  graphTime.innerText = timeConvert(allTimeSec);

  // 各行の秒数を足し込んでいく
  rowTimeSecSum = rowTimeSecSum + rowTimeSec;

  // パーセントの合計
  let pctGoukei = 0;

  // tableの行数分ループ
  for (let i = 1; i < (table.rows.length - 1); i++) {

    // 各行の項目を配列から取得
    let rowText = rowTime[i - 1].itemText;

    // 各行の項目と秒数を表示
    console.log(rowText + ':' + rowTimeTotal);

    // 各行の時間の割合を計算
    let pct = rowTime[i - 1].rowTimeSec / rowTimeTotal;

    // パーセントの合計を計算
    pctGoukei = pctGoukei + pct;

    // 色をランダムに設定
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    // 円グラフを描画
    graph.beginPath();
    graph.arc(150, 150, 100, (360 * (pctGoukei - pct)) * Math.PI /180, (360 * pctGoukei) * Math.PI /180, false);
    graph.strokeStyle = randomColor;
    graph.lineWidth = 40;
    graph.stroke();
  };

  // STARTボタンを無効化
  startButton.disabled = false;
};

// STARTボタンを押した時の処理
startButton.addEventListener('click', function() {
  console.log('startボタンが押されました');
  let startTime = new Date();
  console.log('Start:' + startTime);

  pauseButton.disabled = false;
  resetButton.disabled = false;

  // setIntervalで1秒ごとにcountdownGraphを実行
  countdownTimer = setInterval(countdownGraph, 1000);

  inputForm.style.display = 'none';

  btnInput.disabled = true;
  // setButton.disabled = true;
  startButton.disabled = true;

  // 削除ボタンを非表示
  for (let i = 1; i < (table.rows.length - 1); i++) {
    table.rows[i].cells[4].children[0].style.display = 'none';
  };

});

// 1秒ごとにグラフを描画
function countdownGraph() {
  console.log('----------------------');

  rowItem = table.rows[rowCount].cells[0].innerText;

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

    let endTime = new Date();

    console.log('----------------------');
    console.log('END:' + endTime);

    graphText.innerText = 'END!';

    graphTime.style.color = 'red';

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

  if (modeButton == 'resume') {
    modeButton = 'pause';
    pauseButton.value = 'PAUSE';
  };

  btnInput.disabled = false;
  // setButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;

  inputForm.style.display = 'block';

    // 削除ボタンを表示
  for (let i = 1; i < (table.rows.length - 1); i++) {
    let deleteButton = table.rows[i].cells[4].children[0].style.display = 'block';
    console.log(deleteButton);
  };
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
  totalTimehhmmss = hour + ':' + min + ':' + sec;

};

// 秒を時間：分:秒に変換
function timeConvert(time) {
  hour = Math.floor(time / 3600);
  min = Math.floor(time / 60) % 60;
  sec = time % 60;

  if (hour > 0) {
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);
    return hour + ':' + min + ':' + sec;
  } else {
    sec = ('0' + sec).slice(-2);
    return min + ':' + sec;
  };
};

// 時間を超えたときの処理
function timeOver() {
  console.log('timeOverが実行されました');
  overTimeTimer = setInterval(countupOverTime, 1000);
};

// 超過した時間のカウントアップ・表示
function countupOverTime() {
  countupOverTimeSeconds ++;
  graphTime.innerText = timeConvert(countupOverTimeSeconds);
};

// 配列の時間を合計
function totalTimeCalcArray() {
  let initialValue = 0;
  rowTimeTotal = rowTime.reduce(function(previousValue, currentValue) {
    return previousValue + currentValue.rowTimeSec
  }, initialValue);
};
