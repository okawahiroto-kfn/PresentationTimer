const btnInput = document.getElementById('btnInput');

const table = document.getElementById('table');
const totalTime = document.getElementById('totalTime');

const itemText = document.getElementById('itemText');
const inputForm = document.getElementById('inputForm');

const timerMinute = document.getElementById('timerMinute');
const timerSecond = document.getElementById('timerSecond');

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
let modeButton = 'pause';

let countdownTimer = '';
let overTimeTimer = '';

let hour = 0;
let min = 0;
let sec = 0;

let minToSec = 0;

// 入力された時間の秒数
let inputTimeSec = 0;

// 各行の秒数
let rowTimeSec = 0;

// 各行の秒数を足し込んだもの
let rowTimeSecSum = 0;

// カウントアップ用
let countupSeconds = 0;
let rowTimeCountupSeconds = 0;

let remainTimeSec = 0;
let remainRowTimeSec = 0;

// タイマー終了後の秒数
let countupOverTimeSeconds = 0;

let rowItem = '';
let rowMin = 0;
let rowSec = 0;

// canvas表示用(円グラフ)
const canvas = document.getElementById('timerGraph');
const timerGraph = canvas.getContext('2d');

// グラフ内部の項目・残り時間
const timerItem = document.getElementById('timerItem');
const timerTime = document.getElementById('timerTime');

// 項目と時間の配列
let itemAndTimeArray = [];
let arrayItemAndTime= { itemText: '', itemTimeSec: 0 };
let arrayID = 0;

// 配列の時間の合計
let arrayTimeTotal = 0;

// 追加する行
let newRow = '';

// 削除する行の要素(tr)
let deleteRowTr = '';

// 削除する行のID
let deleteRowId = 0;

// tableの各行
let tableRow = '';

// tableの各行のID
let tableRowID = 0;

// tableの削除ボタン
let tableDeleteButton = '';

// グラフ表示に用いるパーセント
let percent = 0;
let percentSum = 0;
let percentProgress = 0;

// 読み込み時------------------------------------------------------------------------------------------------------------------------
window.onload = function() {
  timerInit();
  startButton.disabled = true;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  arrayID = 0;
};

// タイマー初期表示------------------------------------------------------------------------------------------------------------------------
timerInit();

// 入力ボタン------------------------------------------------------------------------------------------------------------------------
btnInput.addEventListener('click', function() {
  console.log('入力ボタンが押されました');

  // 時間が入力されているか確認
  if ((Number(timerMinute.value) + Number(timerSecond.value)) == 0) {
    alert('時間を入力してください(1秒以上)');
    return;
  };

  // 合計行の上に新しい行を追加
  newRow = table.insertRow(table.rows.length - 1);

  // 各行にidを付与
  newRow.setAttribute('id', table.rows.length - 3);

  // セルを追加
  let newItemCell = newRow.insertCell();
  let newTimeCell = newRow.insertCell();
  let newRemainCell = newRow.insertCell();
  let newDeleteCell = newRow.insertCell();

  // 項目名を表示
  newItemCell.innerText = itemText.value;

  // 分を秒に変換し、合計
  rowMin = Number(timerMinute.value);
  rowSec = Number(timerSecond.value);
  minToSec = rowMin * 60;

  inputTimeSec = minToSec + rowSec;

  // 時間表示用のセル追加
  newTimeCell.innerText = timeConvert(inputTimeSec);
  newTimeCell.style.textAlign = 'right';

  // 時間表示用のセル追加(暫定)
  newRemainCell.innerText = timeConvert(inputTimeSec);
  newRemainCell.className = 'p-rowRemainTime';
  newRemainCell.style.textAlign = 'right';

  // 削除ボタンを追加
  newDeleteCell.innerHTML = '<button id="' + (table.rows.length - 3) + '" onclick="clickDelete(this)" class="delete"></button>';
  newDeleteCell.style.textAlign = 'center';

  // 各行の項目と秒数を配列に格納
  arrayItemAndTime = { itemText: itemText.value, itemTimeSec: inputTimeSec };
  itemAndTimeArray.push(arrayItemAndTime);
  console.log(itemAndTimeArray);
  console.log(remainTimeSec);
  console.log(remainRowTimeSec);

  // 配列の合計時間を計算、表示
  totalTimeCalcArray();
  console.log(arrayTimeTotal);
  totalTime.innerText = timeConvert(arrayTimeTotal);

  // グラフを計算・表示
  setTimer();

  // 入力フォームにフォーカスし、空にする
  document.getElementById('itemText').focus();
  document.getElementById('itemText').value = '';

});

// 削除ボタン------------------------------------------------------------------------------------------------------------------------
function clickDelete(ele) {
  console.log('deleteボタンが押されました');


  // 削除ボタンの行の要素(tr)を取得
  deleteRowTr = ele.parentNode.parentNode;

  // tableから行を削除
  deleteRowTr.remove();

  // 削除ボタンのid取得＝削除する行のid
  deleteRowId = ele.id;

  // 削除する行のidを元に配列から削除
  itemAndTimeArray.splice(deleteRowId, 1);
  console.log(itemAndTimeArray);

  // tableの行数分ループしてidを更新
  // タイトル行をとばすので、1から始める。
  for (let i = 1; i < (table.rows.length - 1); i++) {

  // trにidを付与
  tableRow = table.rows[i];
  tableRow.setAttribute('id', i - 1);

  // 項目欄のナンバリング
  // row.cells[0].innerText = i + '.';

  // 削除ボタンにidを付与
  tableDeleteButton = table.rows[i].cells[3].children[0];
  tableDeleteButton.setAttribute('id', i - 1);
  };

  // 配列の合計時間を計算、表示
  totalTimeCalcArray();
  totalTime.innerText = timeConvert(arrayTimeTotal);

  // 行を全て削除したら、グラフの中は、初期値(Item・Time)を表示、スタートボタンを非活性化する。
  // 行に項目がある場合は、グラフを表示する。
  if (table.rows.length == 2) {
    startButton.disabled = true;
    timerInit();
  } else {
    setTimer();
  };
};

// タイマーのセット------------------------------------------------------------------------------------------------------------------------
function setTimer() {
  console.log('グラフ描画開始');

  // 配列の合計時間を計算
  totalTimeCalcArray();

  // カウントアップ用
  countupSeconds = 0;

  // 項目ごとの時間のカウントアップ用
  rowTimeCountupSeconds = 0;

  // tableの行ID
  tableRowID = 1;

  // 配列カウント
  arrayID = 0;

  // 各行の時間を秒に変換したものの合計
  rowTimeSecSum = 0;

  // 各行の項目と時間(配列から取得)
  rowItem = itemAndTimeArray[arrayID].itemText;
  rowTimeSec = itemAndTimeArray[arrayID].itemTimeSec;

  // 残り時間の計算(全体・行)
  remainTimeSec = arrayTimeTotal - countupSeconds;
  remainRowTimeSec = rowTimeSec - rowTimeCountupSeconds;

  // グラフの項目と時間(配列から取得)
  timerItem.innerText = itemAndTimeArray[arrayID].itemText;
  timerTime.innerText = timeConvert(arrayTimeTotal);

  // 各行の秒数を足し込んでいく
  rowTimeSecSum = rowTimeSecSum + rowTimeSec;

  // パーセントの合計
  percentSum = 0;

  // tableの行数分ループ
  for (let i = 0; i < (itemAndTimeArray.length); i++) {

    // 各行の項目を配列から取得
    rowItem = itemAndTimeArray[i].itemText;
    rowTimeSec = itemAndTimeArray[i].itemTimeSec;

    // 各行の項目と秒数を表示
    console.log(rowItem + ':' + rowTimeSec);

    // 各行の時間の割合を計算
    percent = rowTimeSec / arrayTimeTotal;

    // パーセントの合計を計算
    percentSum = percentSum + percent;

    // 色をランダムに設定
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    // 円グラフを描画
    timerGraph.beginPath();
    timerGraph.arc(150, 150, 100, (360 * (percentSum - percent)) * Math.PI /180, (360 * percentSum) * Math.PI /180, false);
    timerGraph.strokeStyle = randomColor;
    timerGraph.lineWidth = 40;
    timerGraph.stroke();
  };

  rowTimeSec = itemAndTimeArray[arrayID].itemTimeSec;
  remainRowTimeSec = rowTimeSec - rowTimeCountupSeconds;
  // STARTボタンを無効化
  startButton.disabled = false;
};

// STARTボタン------------------------------------------------------------------------------------------------------------------------
startButton.addEventListener('click', function() {
  console.log('startボタンが押されました');

  // STARTボタンが押された時間
  let startTime = new Date();
  console.log('Start:' + startTime);

  // ボタンの有効化
  pauseButton.disabled = false;
  resetButton.disabled = false;

  arrayID = 0;
  rowTimeCountupSeconds = 0;

  // 入力部分を非表示
  inputForm.style.display = 'none';

  // ボタンを無効化
  btnInput.disabled = true;
  startButton.disabled = true;

  // 削除ボタンを非表示
  for (let i = 1; i < (table.rows.length - 1); i++) {
    table.rows[i].cells[3].children[0].style.display = 'none';
  };
  remainRowTimeSec = rowTimeSec - rowTimeCountupSeconds;

  remainTimeSec = arrayTimeTotal;

  // setIntervalで1秒ごとにcountdownGraphを実行
  countdownTimer = setInterval(countdownGraph, 1000);

});

// 1秒ごとにグラフを描画------------------------------------------------------------------------------------------------------------------------
function countdownGraph() {
  console.log('グラフ描画開始');

  // 残り時間を計算
  remainTimeSec = remainTimeSec - 1;

  // カウントアップ
  countupSeconds = countupSeconds + 1;

  // 項目ごとの時間のカウントアップ
  rowTimeCountupSeconds = rowTimeCountupSeconds + 1;

  // 各項目の時間
  rowTimeSec = itemAndTimeArray[arrayID].itemTimeSec;

  // 各項目の残り時間
  remainRowTimeSec = rowTimeSec - rowTimeCountupSeconds;

  console.log(remainTimeSec);
  console.log(remainRowTimeSec);

  // グラフに残り時間を表示
  timerTime.innerText = timeConvert(remainTimeSec);
  timerItem.innerText = itemAndTimeArray[arrayID].itemText;
  table.rows[tableRowID].cells[2].innerText = timeConvert(remainRowTimeSec);

  // // 全体の時間の何%経過したか計算
  percentProgress = countupSeconds / arrayTimeTotal;

  // 円グラフの経過時間をグレーで表示
  timerGraph.beginPath();
  timerGraph.arc(150, 150, 100, 0 * Math.PI / 180, (360 * percentProgress) * Math.PI /180, false);
  timerGraph.strokeStyle = 'gray';
  timerGraph.lineWidth = 40;
  timerGraph.stroke();

  // 残り時間が0になったら、タイマー終了
  if (remainTimeSec <= 0) {
    clearInterval(countdownTimer);

    let endTime = new Date();

    console.log('END:' + endTime);
    console.log('----------------------');

    timerItem.innerText = 'END!';

    timerTime.style.color = 'red';

    // タイマー終了表示
    timerGraph.beginPath();
    timerGraph.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
    timerGraph.strokeStyle = 'red';
    timerGraph.lineWidth = 40;
    timerGraph.stroke();

    countupOverTimeSeconds = 0;

    timeOver();
  };

  // 各項目の残り時間が0になったら、次の項目へ
  if (remainRowTimeSec <= 0) {
    table.rows[tableRowID].cells[2].className = 'p-rowRemainTimeOver';
    arrayID = arrayID + 1;
    tableRowID = tableRowID + 1;
    rowTimeCountupSeconds = 0;
  };
};

// PAUSEボタン(RESUMEボタン)------------------------------------------------------------------------------------------------------------------------
function pause() {
  switch (modeButton) {

    // PAUSEボタンが押されたとき
    case 'pause':
      console.log('pauseボタンが押されました');
      pauseButton.value = 'RESUME';
      modeButton = 'resume';

      // タイマーを一時停止
      // カウントダウンを確認し、一時停止するタイマーを選択
      if (remainTimeSec > 0) {
        clearInterval(countdownTimer);
      } else {
        clearInterval(overTimeTimer);
      }
      break;

      // RESUMEボタンが押されたとき
      case 'resume':
      console.log('resumeボタンが押されました');
      pauseButton.value = 'PAUSE';
      modeButton = 'pause';

      // タイマーを再開
      // カウントダウンを確認し、再開するタイマーを選択
      if (remainTimeSec > 0) {
        countdownTimer = setInterval(countdownGraph, 1000);
      } else {
        overTimeTimer = setInterval(countupOverTime, 1000);
      };
      break;
  };
};

// RESETボタン------------------------------------------------------------------------------------------------------------------------
resetButton.addEventListener('click', function() {
  console.log('resetボタンが押されました');
  clearInterval(countdownTimer);
  clearInterval(overTimeTimer);
  timerTime.style.color = 'black';
  setTimer();

  if (modeButton == 'resume') {
    modeButton = 'pause';
    pauseButton.value = 'PAUSE';
  };

  btnInput.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;

  inputForm.style.display = 'block';

    // 残り時間を表示、削除ボタンを表示
  for (let i = 1; i < (table.rows.length - 1); i++) {
    table.rows[i].cells[2].innerText = timeConvert(itemAndTimeArray[i - 1].itemTimeSec);
    table.rows[i].cells[2].className = 'p-rowRemainTime';

    table.rows[i].cells[3].children[0].style.display = 'block';
  };
});

// 秒を、時間：分:秒に変換------------------------------------------------------------------------------------------------------------------------
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

// タイマー終了後の処理------------------------------------------------------------------------------------------------------------------------
function timeOver() {
  console.log('timeOverが実行されました');
  overTimeTimer = setInterval(countupOverTime, 1000);
};

// タイマー終了後のカウントアップ・表示------------------------------------------------------------------------------------------------------------------------
function countupOverTime() {
  countupOverTimeSeconds ++;
  timerTime.innerText = timeConvert(countupOverTimeSeconds);
};

// 配列の時間を合計(arrayTimeTotal)------------------------------------------------------------------------------------------------------------------------
function totalTimeCalcArray() {
  let initialValue = 0;
  arrayTimeTotal = itemAndTimeArray.reduce(function(previousValue, currentValue) {
    return previousValue + currentValue.itemTimeSec;
  }, initialValue);
};

// タイマー初期化------------------------------------------------------------------------------------------------------------------------
function timerInit() {
  console.log('timerInitが実行されました');
  timerGraph.beginPath();
  timerGraph.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
  timerGraph.strokeStyle = 'gray';
  timerGraph.lineWidth = 40;
  timerGraph.stroke();

  timerItem.innerText = 'Item';
  timerTime.innerText = 'Time';
  timerTime.style.color = 'black';
};