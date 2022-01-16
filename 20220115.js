let btn = document.getElementById('btnAddTable');
let check = document.getElementById('check');
let set = document.getElementById('btnSet');

let itemtext = document.getElementById('itemText');
let min = document.getElementById('itemMin');
let sec = document.getElementById('itemSec');

let sumMin = 0;
let sumSec = 0;

let btnCount = 0;

check.addEventListener('click', function() {
  console.log('checkボタンが押されました');
  let itemtext = document.getElementById('itemText');
  console.log(itemtext.value);
  itemtext.value = '';
  let min = document.getElementById('itemMin');
  let sec = document.getElementById('itemSec');
});

btn.addEventListener('click', function() {
  console.log('Clicked');
  btnCount++;
  console.log(itemtext.value);
  console.log(min.value);
  console.log(sec.value);

  let tbody = document.getElementById('tbody');
  let tr = document.createElement('tr');
  // let td0 = document.createElement('td');
  // td0.innerText = btnCount;
  let td1 = document.createElement('td');
  td1.innerText = itemtext.value;

  let td2 = document.createElement('td');
  let minDisplay = ('00' + min.value).slice(-2);
  let secDisplay = ('00' + sec.value).slice(-2);
  td2.innerText = minDisplay + ':' + secDisplay;
  td2.style.textAlign = 'right';

  sumMin = sumMin + Number(min.value);
  sumSec = sumSec + Number(sec.value);
  console.log(sumSec);

  let td3 = document.createElement('td');
  td3.innerHTML = '<button id="btnRowDelete" onclick="clickAlert()">削除</button>';

  tbody.appendChild(tr);
  // tr.appendChild(td0);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  console.log(btnCount);


  itemtext.value = '';
});

function clickAlert() {
  console.log('削除ボタンが押されました');
  btnCount--;

  tdID = document.getElementById('btnRowDelete');
  console.log('remove前');
  console.log(tdID.parentNode.parentNode);
  tdID.parentNode.parentNode.remove();

  console.log('remove後');
  console.log(tdID.parentNode.parentNode.parentNode);

  if (btnCount == 0) {
    console.log('btnCountが0になりました');
    let tfoot = document.getElementById('tfoot');
    console.log(tfoot);
    console.log(tfoot.childNodes);
    tfoot.childNodes.remove();
    sumMin = 0;
    sumSec = 0;
  }
};

set.addEventListener('click', function() {
  console.log('setボタンが押されました');

  // 秒->分へ切り上げ計算
  let secMin = Math.floor(sumSec / 60);

  // 残りの秒を計算
  let secRem = sumSec % 60;

  // 分の合計を計算
  sumMin = sumMin + secMin;

  let hourMin = Math.floor(sumMin / 60);

  let minRem = sumMin % 60;


  let hourDisplay = ('00' + hourMin).slice(-2);
  let minDisplay = ('00' + minRem).slice(-2);
  let secDisplay = ('00' + secRem).slice(-2);


  console.log(hourMin + ':' + minRem + ':' + secRem);

  let sumTime = document.getElementById('sumTime');
  sumTime.innerText = hourDisplay + ':' + minDisplay + ':' + secDisplay;

  // let tfoot = document.getElementById('tfoot');
  // let tr = document.createElement('tr');
  // let td1 = document.createElement('td');
  // let td2 = document.createElement('td');
  // td1.innerText = '合計';
  // td2.innerText = hourMin + ':' + minRem + ':' + secRem;
  // tfoot.appendChild(tr);
  // tr.appendChild(td1);
  // tr.appendChild(td2);
});