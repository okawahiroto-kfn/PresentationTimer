let btn = document.getElementById('btn');
let inputText = document.getElementById('inputText');
let ulElement = document.getElementById('list');

let btnAddNode = document.getElementById('btnAddNode');
let divElement = document.getElementById('addNode');
let btnSet = document.getElementById('btnSet');

let btnDelete = document.getElementById('btnDelete');
console.log(btnDelete);

const btnDeleteNode = document.getElementById('btnDeleteNode');

let btnCount = 0;

btn.addEventListener('click', function() {
  console.log('ボタンが押されました！');

  // 20220116
  // 複数の要素を作成する。
  let fragment = document.createDocumentFragment();

  // ul要素の子要素に、li要素を追加する。
  let childNode = document.createElement('li');

  // ボタンを追加する。
  let childBtn = document.createElement('button');

  // li要素のテキストに、テキストボックスのテキストを入れる。
  childNode.textContent = inputText.value;
  // テキストボックスを空欄にする。
  inputText.value = '';
  // ul要素の子要素に、li要素を追加する。
  //  ulElement.appendChild(childNode);

  // ul要素の子要素に、li要素を追加する。
  childBtn.textContent = '削除';

//  ulElement.appendChild(childBtn);

  //　li要素と、ボタン要素を追加する。(改行されてしまう)
  fragment.append(childNode);
  fragment.append(childBtn);

  console.log(fragment);

  ulElement.appendChild(fragment);

  // li要素の数を数える。
  let childElementCount = ulElement.childElementCount;

  // for文を用いて、li要素のテキストをli要素の数だけ取得、表示する。
  for (let i = 0; i < childElementCount; i++) {
    console.log(ulElement.children[i].textContent);
  };

  // li要素の数を表示する。
  console.log(childElementCount);

});


// 配列を用いて、li要素の値を取得、表示する。
// console.log(ulElement.children[2].textContent);

btnAddNode.addEventListener('click', function() {
  // AddNodeボタンを押した回数カウント
  btnCount = btnCount + 1;
  console.log('ボタンが押されました' + btnCount + '回目');

  // templateの内容を取得し、有効にする。
  var template = document.getElementById('template');
  var content = template.content;
  var clone = document.importNode(content, true);

  // ナンバリング(ボタンを押した回数をもとに、ナンバリングする)
  clone.getElementById('itemNumber').innerText = btnCount + 1 + '.';

  // 各行ごとのid名付与(後で、削除できるようにするため)
  const divNo = clone.querySelector('div');
  divNo.setAttribute('id', btnCount);

  // 削除ボタンにもid名付与(後で、削除できるようにするためだが、これではダメかも)
  var btnDelete = clone.getElementById('btnDelete');
  // deleteNo.setAttribute('id', 'btnDelete' + btnCount);

  // div要素の子要素に、template(の内容)を追加する。
  document.getElementById('addNode').appendChild(clone);

  // divの子要素の数カウント(テキストボックス他のカウント)
  let childElementCount = divElement.childElementCount;
  console.log('子要素の数:' + childElementCount);

  // addNodeの子要素を取得(テキストボックス他のカウント)
  let childNode = document.getElementById('addNode').children;
  console.log(childNode);

  // 1行目の削除ボタンの要素を取得
  console.log(childNode[0].children[4]);

  console.log(btnDelete);
});

btnDeleteNode.addEventListener('click', function() {
  console.log('削除ボタンが押されました');

  // 削除ボタンを押した回数に応じて、削除する要素を指定する。
  const target = document.getElementById(btnCount);
  target.parentNode.removeChild(target);

  btnCount = btnCount - 1;

});


btnSet.addEventListener('click', function() {
  console.log('セットボタンが押されました');
  console.log(addNode.children);
  addNode.children.disabled = true;
});

var idx = 1;
function addElement() {
  // 要素を作成する。
  var element = document.createElement('button');
  element.innerText = 'No.' + idx;
  idx++;
  // 要素にクリックイベントを追加する。
  element.onclick = function() {
    element.innerText += 'クリックされました';
  };

  // 要素を追加する「親要素」を指定する。
  var parent = document.getElementById('parent');
  // 要素を追加する。
  parent.appendChild(element);
  // 次の要素を開業して追加するためにbr要素を追加する。
  parent.appendChild(document.createElement('br'));
};

// 各行の削除ボタンが有効かどうか確認する。
if (btnDelete != null) {
  btnDelete.addEventListener('click', function() {
  console.log('削除ボタンが押されました');
  });
} else {
  console.log('btnDeleteがnullです');
};

// tableの要素取得
var tableElement = document.getElementById('table');

// tableの行の要素取得
var rowsElement = tableElement.rows;

// 参考：行数(タイトル・合計含む)
// console.log(rowsElement.length);

// 参考：2行目の2列目(「導入」行の「分」列)の値
// console.log(rowsElement[1].cells[1].textContent);

// 参考：2行目の3列目(「導入」行の「秒」列)の値
// console.log(rowsElement[1].cells[2].textContent);

// 分の合計を計算
var sumMin = 0;
for (let i = 1; i < (rowsElement.length - 1); i++) {
  var minValue = Number(rowsElement[i].cells[1].textContent);
  var sumMin = sumMin + minValue;
};

// 秒の合計を計算
var sumSec = 0;
for (let i = 1; i < (rowsElement.length - 1); i++) {
  var secValue = Number(rowsElement[i].cells[2].textContent);
  var sumSec = sumSec + secValue;
};

// 秒を分と秒に分ける
// 分を計算
let secMin = Math.floor(sumSec / 60);

// 残りの秒を計算
let secRem = sumSec % 60;

// 分の合計を計算
sumMin = sumMin + secMin;

// 合計をtebleに表示
rowsElement[5].cells[1].textContent = sumMin;
rowsElement[5].cells[2].textContent = secRem;

let btnAddNode02 = document.getElementById('btnAddNode02');

// templateを使って、テキストを変更する。
btnAddNode02.addEventListener('click', function() {
  console.log('ボタンが押されました！');

  const template02 = document.getElementById('template02');
  const content02 = template02.content;

  const clone02 = document.importNode(content02, true);

  let userName = 'Yamada';

  clone02.getElementById('name').innerText = userName;

  document.getElementById('addNode02').appendChild(clone02);

  console.log(clone02);
});
